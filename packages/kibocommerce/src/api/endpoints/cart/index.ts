import { GetAPISchema, createEndpoint } from '@shop0/commerce/api'
import cartEndpoint from '@shop0/commerce/api/endpoints/cart'
import type { KiboCommerceAPI } from '../..'
import getCart from './get-cart'
import addItem from './add-item'
import updateItem from './update-item'
import removeItem from './remove-item'

export type CartAPI = GetAPISchema<KiboCommerceAPI, any>

export type CartEndpoint = CartAPI['endpoint']

export const handlers: CartEndpoint['handlers'] = {
  getCart,
  addItem,
  updateItem,
  removeItem,
}

const cartApi = createEndpoint<CartAPI>({
  handler: cartEndpoint,
  handlers,
})

export default cartApi
