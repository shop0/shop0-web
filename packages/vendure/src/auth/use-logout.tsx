import { useCallback } from 'react'
import type { MutationHook } from '@shop0/commerce/utils/types'
import useLogout, { type UseLogout } from '@shop0/commerce/auth/use-logout'
import useCustomer from '../customer/use-customer'
import type { LogoutMutation } from '../../schema'
import { logoutMutation } from '../utils/mutations/log-out-mutation'
import type { LogoutHook } from '@shop0/commerce/types/logout'

export default useLogout as UseLogout<typeof handler>

export const handler: MutationHook<LogoutHook> = {
  fetchOptions: {
    query: logoutMutation,
  },
  async fetcher({ options, fetch }) {
    await fetch<LogoutMutation>({
      ...options,
    })
    return null
  },
  useHook:
    ({ fetch }) =>
    () => {
      const { mutate } = useCustomer()

      return useCallback(
        async function logout() {
          const data = await fetch()
          await mutate(null, false)
          return data
        },
        [fetch, mutate]
      )
    },
}
