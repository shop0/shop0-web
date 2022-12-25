import type { SpreeApiProvider, SpreeApi } from '..'
import createEndpoints from '@shop0/commerce/api/endpoints'
import checkout from './checkout'

const endpoints = {
  checkout,
}

export default function spreeAPI(commerce: SpreeApi) {
  return createEndpoints<SpreeApiProvider>(commerce, endpoints)
}
