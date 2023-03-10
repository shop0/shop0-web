import { SWRHook } from '@shop0/commerce/utils/types'
import useCustomer, {
  UseCustomer,
} from '@shop0/commerce/customer/use-customer'
import { ActiveCustomerQuery } from '../../schema'
import { activeCustomerQuery } from '../utils/queries/active-customer-query'
import { CustomerHook } from '@shop0/commerce/types/customer'

export default useCustomer as UseCustomer<typeof handler>

export const handler: SWRHook<CustomerHook> = {
  fetchOptions: {
    query: activeCustomerQuery,
  },
  async fetcher({ options, fetch }) {
    const { activeCustomer } = await fetch<ActiveCustomerQuery>({
      ...options,
    })
    return activeCustomer
      ? ({
          firstName: activeCustomer.firstName ?? '',
          lastName: activeCustomer.lastName ?? '',
          email: activeCustomer.emailAddress ?? '',
        } as any)
      : null
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
