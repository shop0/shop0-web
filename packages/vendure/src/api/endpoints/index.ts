import type { Provider, VendureAPI } from '..'

import createEndpoints from '@shop0/commerce/api/endpoints'
import checkout from './checkout'

const endpoints = {
  checkout,
}

export default function vendureAPI(commerce: VendureAPI) {
  return createEndpoints<Provider>(commerce, endpoints)
}