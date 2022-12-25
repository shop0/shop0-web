import type { SWRHook } from '@shop0/commerce/utils/types'
import useCustomer, {
  type UseCustomer,
} from '@shop0/commerce/customer/use-customer'
import type { CustomerHook } from '@shop0/commerce/types/customer'

export default useCustomer as UseCustomer<typeof handler>

export const handler: SWRHook<CustomerHook> = {
  fetchOptions: {
    url: '/api/commerce/customer',
    method: 'GET',
  },
  async fetcher({ options, fetch }) {
    const data = await fetch(options)
    return data?.customer ?? null
  },
  useHook:
    ({ useData }) =>
    (input) => {
      return useData({
        swrOptions: {
          revalidateOnFocus: false,
          ...input?.swrOptions,
        },
      })
    },
}
