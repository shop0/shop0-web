import type { SWRHook } from '@shop0/commerce/utils/types'
import type { CustomerHook } from '@shop0/commerce/types/customer'

import useCustomer, {
  type UseCustomer,
} from '@shop0/commerce/customer/use-customer'
import { normalizeCustomer } from '../utils/normalize'

export default useCustomer as UseCustomer<typeof handler>

export const handler: SWRHook<CustomerHook> = {
  fetchOptions: {
    query: 'account',
    method: 'get',
  },
  async fetcher({ options, fetch }) {
    const data = await fetch<any | null>({
      ...options,
    })
    return data ? normalizeCustomer(data) : null
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
