import type { LoginHook } from '@shop0/commerce/types/login'
import type { MutationHook } from '@shop0/commerce/utils/types'
import type {
  CustomerUserError,
  Mutation,
  MutationCheckoutCreateArgs,
} from '../../schema'

import { useCallback } from 'react'
import { CommerceError, ValidationError } from '@shop0/commerce/utils/errors'
import useCustomer from '../customer/use-customer'
import useLogin, { type UseLogin } from '@shop0/commerce/auth/use-login'
import { setCustomerToken } from '../utils'

export default useLogin as UseLogin<typeof handler>

const getErrorMessage = ({ code, message }: CustomerUserError) => {
  switch (code) {
    case 'UNIDENTIFIED_CUSTOMER':
      message = 'Cannot find an account that matches the provided credentials'
      break
  }
  return message
}

export const handler: MutationHook<LoginHook> = {
  fetchOptions: {
    query: 'account',
    method: 'login',
  },
  async fetcher({ input: { email, password }, options, fetch }) {
    if (!(email && password)) {
      throw new CommerceError({
        message:
          'A first name, last name, email and password are required to login',
      })
    }

    const { customerAccessTokenCreate } = await fetch<
      Mutation,
      MutationCheckoutCreateArgs
    >({
      ...options,
      variables: [email, password],
    })

    const errors = customerAccessTokenCreate?.customerUserErrors

    if (errors && errors.length) {
      throw new ValidationError({
        message: getErrorMessage(errors[0]),
      })
    }
    const customerAccessToken = customerAccessTokenCreate?.customerAccessToken
    const accessToken = customerAccessToken?.accessToken

    if (accessToken) {
      setCustomerToken(accessToken)
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
