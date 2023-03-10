import type { SignupHook } from '@shop0/commerce/types/signup'
import type { MutationHook } from '@shop0/commerce/utils/types'

import { useCallback } from 'react'
import { CommerceError } from '@shop0/commerce/utils/errors'
import useSignup, { type UseSignup } from '@shop0/commerce/auth/use-signup'
import useCustomer from '../customer/use-customer'
import handleLogin from '../utils/handle-login'

export default useSignup as UseSignup<typeof handler>

export const handler: MutationHook<SignupHook> = {
  fetchOptions: {
    query: 'account',
    method: 'create',
  },
  async fetcher({
    input: { firstName, lastName, email, password },
    options,
    fetch,
  }) {
    if (!(firstName && lastName && email && password)) {
      throw new CommerceError({
        message:
          'A first name, last name, email and password are required to signup',
      })
    }
    const data = await fetch({
      ...options,
      variables: {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      },
    })

    try {
      const loginData = await fetch({
        query: 'account',
        method: 'login',
        variables: [email, password],
      })
      handleLogin(loginData)
    } catch (error) {}
    return data
  },
  useHook:
    ({ fetch }) =>
    () => {
      const { mutate } = useCustomer()

      return useCallback(
        async function signup(input) {
          const data = await fetch({ input })
          await mutate()
          return data
        },
        [fetch, mutate]
      )
    },
}
