import { GetAPISchema, createEndpoint } from '@shop0/commerce/api'
import productsEndpoint from '@shop0/commerce/api/endpoints/catalog/products'
import type { ProductsSchema } from '@shop0/commerce/types/product'
import type { BigcommerceAPI } from '../../..'
import getProducts from './get-products'

export type ProductsAPI = GetAPISchema<BigcommerceAPI, ProductsSchema>

export type ProductsEndpoint = ProductsAPI['endpoint']

export const handlers: ProductsEndpoint['handlers'] = { getProducts }

const productsApi = createEndpoint<ProductsAPI>({
  handler: productsEndpoint,
  handlers,
})

export default productsApi
