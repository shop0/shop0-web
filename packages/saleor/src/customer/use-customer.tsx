import useCustomer, { UseCustomer } from '@shop0/commerce/customer/use-customer'
import { CustomerHook } from '@shop0/commerce/types/customer'
import { SWRHook } from '@shop0/commerce/utils/types'

import * as query from '../utils/queries'

export default useCustomer as UseCustomer<typeof handler>

export const handler: SWRHook<CustomerHook> = {
  fetchOptions: {
    query: query.CustomerCurrent,
  },
  async fetcher({ options, fetch }) {
    const data = await fetch<any | null>({
      ...options,
      variables: {},
    })
    return data.me ?? null
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
