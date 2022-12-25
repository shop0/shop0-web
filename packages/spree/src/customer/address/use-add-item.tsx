import useAddItem from '@shop0/commerce/customer/address/use-add-item'
import type { UseAddItem } from '@shop0/commerce/customer/address/use-add-item'
import type { MutationHook } from '@shop0/commerce/utils/types'

export default useAddItem as UseAddItem<typeof handler>

export const handler: MutationHook<any> = {
  // Provide fetchOptions for SWR cache key
  fetchOptions: {
    url: 'account',
    query: 'createAddress',
  },
  async fetcher({ input, options, fetch }) {},
  useHook:
    ({ fetch }) =>
    () =>
    async () => ({}),
}
