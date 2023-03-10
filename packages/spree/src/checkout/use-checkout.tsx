import { SWRHook } from '@shop0/commerce/utils/types'
import useCheckout, {
  UseCheckout,
} from '@shop0/commerce/checkout/use-checkout'

export default useCheckout as UseCheckout<typeof handler>

export const handler: SWRHook<any> = {
  // Provide fetchOptions for SWR cache key
  fetchOptions: {
    // TODO: Revise url and query
    url: 'checkout',
    query: 'show',
  },
  async fetcher({ input, options, fetch }) {},
  useHook:
    ({ useData }) =>
    async (input) => ({}),
}
