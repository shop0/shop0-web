import type { CommercejsAPI } from '..'

import createEndpoints from '@shop0/commerce/api/endpoints'

import login from './login'
import checkout from './checkout'

const endpoints = {
  login,
  checkout,
}

export default function commercejsAPI(commerce: CommercejsAPI) {
  return createEndpoints(commerce, endpoints)
}
