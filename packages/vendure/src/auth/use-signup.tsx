import { useCallback } from 'react'
import { MutationHook } from '@shop0/commerce/utils/types'
import { CommerceError, ValidationError } from '@shop0/commerce/utils/errors'
import useSignup, { type UseSignup } from '@shop0/commerce/auth/use-signup'
import useCustomer from '../customer/use-customer'
import type { SignupMutation, SignupMutationVariables } from '../../schema'
import { signupMutation } from '../utils/mutations/sign-up-mutation'
import type { SignupHook } from '@shop0/commerce/types/signup'

export default useSignup as UseSignup<typeof handler>

export type SignupInput = {
  email: string
  firstName: string
  lastName: string
  password: string
}

export const handler: MutationHook<SignupHook> = {
  fetchOptions: {
    query: signupMutation,
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
    const variables: SignupMutationVariables = {
      input: {
        firstName,
        lastName,
        emailAddress: email,
        password,
      },
    }
    const { registerCustomerAccount } = await fetch<SignupMutation>({
      ...options,
      variables,
    })

    if (registerCustomerAccount.__typename !== 'Success') {
      throw new ValidationError(registerCustomerAccount)
    }

    return null
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
