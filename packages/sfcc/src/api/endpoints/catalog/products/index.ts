import type { SFCCProviderAPI } from '../../..'

import { createEndpoint, GetAPISchema } from '@shop0/commerce/api'
import { ProductsSchema } from '@shop0/commerce/types/product'
import getProducts from './get-products'
import productsEndpoint from '@shop0/commerce/api/endpoints/catalog/products'

export type ProductsAPI = GetAPISchema<SFCCProviderAPI, ProductsSchema>

export type ProductsEndpoint = ProductsAPI['endpoint']

export const handlers: ProductsEndpoint['handlers'] = { getProducts }

const productsApi = createEndpoint<ProductsAPI>({
  handler: productsEndpoint,
  handlers,
})

export default productsApi
