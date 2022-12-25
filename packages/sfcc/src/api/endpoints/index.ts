import type { Provider, SFCCProviderAPI } from '..'

import createEndpoints from '@shop0/commerce/api/endpoints'

import products from './catalog/products'

const endpoints = {
  'catalog/products': products,
}

export default function sfccApi(commerce: SFCCProviderAPI) {
  return createEndpoints(commerce, endpoints)
}
