import { useCallback } from 'react'
import type { MutationHook } from '@shop0/commerce/utils/types'
import { CommerceError } from '@shop0/commerce/utils/errors'
import useSignup, { type UseSignup } from '@shop0/commerce/auth/use-signup'
import type { SignupHook } from '@shop0/commerce/types/signup'
import useCustomer from '../customer/use-customer'

export default useSignup as UseSignup<typeof handler>

export const handler: MutationHook<SignupHook> = {
  fetchOptions: {
    url: '/api/commerce/signup',
    method: 'POST',
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

    return fetch({
      ...options,
      body: { firstName, lastName, email, password },
    })
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
