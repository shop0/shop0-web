import { useCallback } from 'react'
import type { MutationHook } from '@shop0/commerce/utils/types'
import { CommerceError } from '@shop0/commerce/utils/errors'
import useRemoveItem, {
  UseRemoveItem,
} from '@shop0/commerce/wishlist/use-remove-item'
import type { RemoveItemHook } from '@shop0/commerce/types/wishlist'
import useCustomer from '../customer/use-customer'
import useWishlist from './use-wishlist'

export default useRemoveItem as UseRemoveItem<typeof handler>

export const handler: MutationHook<RemoveItemHook> = {
  fetchOptions: {
    url: '/api/commerce/wishlist',
    method: 'DELETE',
  },
  useHook:
    ({ fetch }) =>
    ({ wishlist } = {}) => {
      const { data: customer } = useCustomer()
      const { mutate } = useWishlist(wishlist)

      return useCallback(
        async function removeItem(input) {
          if (!customer) {
            // A signed customer is required in order to have a wishlist
            throw new CommerceError({
              message: 'Signed customer not found',
            })
          }

          const data = await fetch({ input: { itemId: String(input.id) } })
          await mutate()
          return data
        },
        [fetch, mutate, customer]
      )
    },
}
