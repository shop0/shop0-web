import type { Provider, SwellAPI } from '..'

import createEndpoints from '@shop0/commerce/api/endpoints'
import checkout from './checkout'

const endpoints = {
  checkout,
}

export default function handler(commerce: SwellAPI) {
  return createEndpoints<Provider>(commerce, endpoints)
}
