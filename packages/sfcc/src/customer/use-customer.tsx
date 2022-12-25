import { SWRHook } from '@shop0/commerce/utils/types'
import useCustomer, {
  UseCustomer,
} from '@shop0/commerce/customer/use-customer'

export default useCustomer as UseCustomer<typeof handler>
export const handler: SWRHook<any> = {
  fetchOptions: {
    query: '',
  },
  async fetcher({ input, options, fetch }) {},
  useHook: () => () => {
    return async function addItem() {
      return {}
    }
  },
}
