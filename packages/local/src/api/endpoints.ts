import createEndpoints from '@shop0/commerce/api/endpoints'
import type { LocalAPI } from '.'

const endpoints = {}

export default function localAPI(commerce: LocalAPI) {
  return createEndpoints(commerce, endpoints)
}
