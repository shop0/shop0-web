import type { Provider, ShopifyAPI } from '..'

import createEndpoints from '@shop0/commerce/api/endpoints'
import checkout from './checkout'
import products from './catalog/products'

const endpoints = {
  checkout,
  'catalog/products': products,
}

export default function shopifyAPI(commerce: ShopifyAPI) {
  return createEndpoints<Provider>(commerce, endpoints)
}
