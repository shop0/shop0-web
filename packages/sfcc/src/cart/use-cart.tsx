import { useMemo } from 'react'
import { SWRHook } from '@shop0/commerce/utils/types'
import useCart, { UseCart } from '@shop0/commerce/cart/use-cart'

export default useCart as UseCart<typeof handler>

export const handler: SWRHook<any> = {
  fetchOptions: {
    query: '',
  },
  async fetcher() {
    return {
      id: '',
      createdAt: '',
      currency: { code: '' },
      taxesIncluded: '',
      lineItems: [],
      lineItemsSubtotalPrice: '',
      subtotalPrice: 0,
      totalPrice: 0,
    }
  },
  useHook:
    ({ useData }) =>
    (input) => {
      return useMemo(
        () =>
          Object.create(
            {},
            {
              isEmpty: {
                get() {
                  return true
                },
                enumerable: true,
              },
            }
          ),
        []
      )
    },
}
