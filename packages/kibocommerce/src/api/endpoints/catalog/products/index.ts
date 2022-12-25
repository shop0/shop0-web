import { GetAPISchema, createEndpoint } from '@shop0/commerce/api'
import productsEndpoint from '@shop0/commerce/api/endpoints/catalog/products'
import type { KiboCommerceAPI } from '../../..'
import getProducts from '../products/products'

export type ProductsAPI = GetAPISchema<KiboCommerceAPI, any>

export type ProductsEndpoint = ProductsAPI['endpoint']

export const handlers: ProductsEndpoint['handlers'] = { getProducts }

const productsApi = createEndpoint<ProductsAPI>({
  handler: productsEndpoint,
  handlers,
})

export default productsApi
