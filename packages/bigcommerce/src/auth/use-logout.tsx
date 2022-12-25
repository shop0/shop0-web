import { useCallback } from 'react'
import type { MutationHook } from '@shop0/commerce/utils/types'
import useLogout, { UseLogout } from '@shop0/commerce/auth/use-logout'
import type { LogoutHook } from '@shop0/commerce/types/logout'
import useCustomer from '../customer/use-customer'

export default useLogout as UseLogout<typeof handler>

export const handler: MutationHook<LogoutHook> = {
  fetchOptions: {
    url: '/api/commerce/logout',
    method: 'GET',
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
