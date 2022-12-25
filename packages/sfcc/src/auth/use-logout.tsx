import { MutationHook } from '@shop0/commerce/utils/types'
import useLogout, { UseLogout } from '@shop0/commerce/auth/use-logout'

export default useLogout as UseLogout<typeof handler>

export const handler: MutationHook<any> = {
  fetchOptions: {
    query: '',
  },
  async fetcher() {
    return null
  },
  useHook:
    ({ fetch }) =>
    () =>
    async () => {},
}
