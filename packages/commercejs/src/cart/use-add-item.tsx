import type { AddItemHook } from '@shop0/commerce/types/cart'
import type { MutationHook } from '@shop0/commerce/utils/types'
import { useCallback } from 'react'
import useAddItem, { UseAddItem } from '@shop0/commerce/cart/use-add-item'
import type { CommercejsCart } from '../types'
import { normalizeCart } from '../utils/normalize-cart'
import useCart from './use-cart'

export default useAddItem as UseAddItem<typeof handler>

export const handler: MutationHook<AddItemHook> = {
  fetchOptions: {
    query: 'cart',
    method: 'add',
  },
  async fetcher({ input: item, options, fetch }) {
    // Frontend stringifies variantId even if undefined.
    const hasVariant = !item.variantId || item.variantId !== 'undefined'

    const variables = [item.productId, item?.quantity || 1]
    if (hasVariant) {
      variables.push(item.variantId)
    }

    const cart = await fetch<CommercejsCart>({
      query: options.query,
      method: options.method,
      variables,
    })

    return normalizeCart(cart)
  },
  useHook: ({ fetch }) =>
    function useHook() {
      const { mutate } = useCart()
      return useCallback(
        async function addItem(input) {
          const cart = await fetch({ input })
          await mutate(cart, false)
          return cart
        },
        [mutate]
      )
    },
}
