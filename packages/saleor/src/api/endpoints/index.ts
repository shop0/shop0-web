import type { Provider, SaleorAPI } from '..'

import createEndpoints from '@shop0/commerce/api/endpoints'
import checkout from './checkout'

const endpoints = {
  checkout,
}

export default function saleorAPI(commerce: SaleorAPI) {
  return createEndpoints<Provider>(commerce, endpoints)
}
