import type { LogoutHook } from '@shop0/commerce/types/logout'
import type { MutationHook } from '@shop0/commerce/utils/types'

import { useCallback } from 'react'
import useLogout, { UseLogout } from '@shop0/commerce/auth/use-logout'
import useCustomer from '../customer/use-customer'
import { getCustomerToken, setCustomerToken } from '../utils/customer-token'

export default useLogout as UseLogout<typeof handler>

export const handler: MutationHook<LogoutHook> = {
  fetchOptions: {
    query: 'account',
    method: 'logout',
  },
  async fetcher({ options, fetch }) {
    await fetch({
      ...options,
      variables: {
        customerAccessToken: getCustomerToken(),
      },
    })
    setCustomerToken(null)
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
