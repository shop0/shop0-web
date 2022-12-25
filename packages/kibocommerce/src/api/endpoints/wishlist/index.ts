import { GetAPISchema, createEndpoint } from '@shop0/commerce/api'
import wishlistEndpoint from '@shop0/commerce/api/endpoints/wishlist'
import type { KiboCommerceAPI } from '../..'
import getWishlist from './get-wishlist'
import addItem from './add-item'
import removeItem from './remove-item'

export type WishlistAPI = GetAPISchema<KiboCommerceAPI, any>

export type WishlistEndpoint = WishlistAPI['endpoint']

export const handlers: WishlistEndpoint['handlers'] = {
  getWishlist,
  addItem,
  removeItem,
}

const wishlistApi = createEndpoint<WishlistAPI>({
  handler: wishlistEndpoint,
  handlers,
})

export default wishlistApi
