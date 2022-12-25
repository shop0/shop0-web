import { useCallback } from 'react'
import { MutationHook } from '@shop0/commerce/utils/types'
import useLogin, { type UseLogin } from '@shop0/commerce/auth/use-login'
import type { LoginHook } from '@shop0/commerce/types/login'
import { CommerceError, ValidationError } from '@shop0/commerce/utils/errors'
import useCustomer from '../customer/use-customer'
import type { LoginMutation, LoginMutationVariables } from '../../schema'
import { loginMutation } from '../utils/mutations/log-in-mutation'

export default useLogin as UseLogin<typeof handler>

export const handler: MutationHook<LoginHook> = {
  fetchOptions: {
    query: loginMutation,
  },
  async fetcher({ input: { email, password }, options, fetch }) {
    if (!(email && password)) {
      throw new CommerceError({
        message: 'A email and password are required to login',
      })
    }

    const variables: LoginMutationVariables = {
      username: email,
      password,
    }

    const { login } = await fetch<LoginMutation>({
      ...options,
      variables,
    })

    if (login.__typename !== 'CurrentUser') {
      throw new ValidationError(login)
    }

    return null
  },
  useHook:
    ({ fetch }) =>
    () => {
      const { mutate } = useCustomer()

      return useCallback(
        async function login(input) {
          const data = await fetch({ input })
          await mutate()
          return data
        },
        [fetch, mutate]
      )
    },
}
