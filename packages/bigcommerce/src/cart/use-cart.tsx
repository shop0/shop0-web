import { useMemo } from 'react'
import { SWRHook } from '@shop0/commerce/utils/types'
import useCart, { UseCart } from '@shop0/commerce/cart/use-cart'
import type { GetCartHook } from '@shop0/commerce/types/cart'

export default useCart as UseCart<typeof handler>

export const handler: SWRHook<GetCartHook> = {
  fetchOptions: {
    url: '/api/commerce/cart',
    method: 'GET',
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
