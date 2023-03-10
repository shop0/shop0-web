import { useMemo } from 'react'
import { SWRHook } from '@shop0/commerce/utils/types'
import useCart, { UseCart } from '@shop0/commerce/cart/use-cart'

export default useCart as UseCart<typeof handler>

export const handler: SWRHook<any> = {
  fetchOptions: {
    method: 'GET',
    url: '/api/commerce/cart',
  },
  async fetcher({ options, fetch }) {
    return await fetch({ ...options })
  },
  useHook:
    ({ useData }) =>
    (input) => {
      const response = useData({
        swrOptions: { revalidateOnFocus: false, ...input?.swrOptions },
      })

      return useMemo(
        () =>
          Object.create(response, {
            isEmpty: {
              get() {
                return (response.data?.lineItems.length ?? 0) <= 0
              },
              enumerable: true,
            },
          }),
        [response]
      )
    },
}
