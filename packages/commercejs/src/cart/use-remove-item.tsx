import { useCallback } from 'react'
import type { MutationHook } from '@shop0/commerce/utils/types'
import type { RemoveItemHook } from '@shop0/commerce/types/cart'
import useRemoveItem, {
  UseRemoveItem,
} from '@shop0/commerce/cart/use-remove-item'
import type { CommercejsCart } from '../types'
import { normalizeCart } from '../utils/normalize-cart'
import useCart from './use-cart'

export default useRemoveItem as UseRemoveItem<typeof handler>

export const handler: MutationHook<RemoveItemHook> = {
  fetchOptions: {
    query: 'cart',
    method: 'remove',
  },
  async fetcher({ input, options, fetch }) {
    const cart = await fetch<CommercejsCart>({
      query: options.query,
      method: options.method,
      variables: input.itemId,
    })
    return normalizeCart(cart)
  },
  useHook: ({ fetch }) =>
    function useHook() {
      const { mutate } = useCart()
      return useCallback(
        async function removeItem(input) {
          const cart = await fetch({ input: { itemId: input.id } })
          await mutate(cart, false)
          return cart
        },
        [mutate]
      )
    },
}
