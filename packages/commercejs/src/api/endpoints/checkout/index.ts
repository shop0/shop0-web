import { GetAPISchema, createEndpoint } from '@shop0/commerce/api'
import checkoutEndpoint from '@shop0/commerce/api/endpoints/checkout'
import type { CheckoutSchema } from '@shop0/commerce/types/checkout'
import type { CommercejsAPI } from '../..'

import getCheckout from './get-checkout'
import submitCheckout from './submit-checkout'

export type CheckoutAPI = GetAPISchema<CommercejsAPI, CheckoutSchema>
export type CheckoutEndpoint = CheckoutAPI['endpoint']

export const handlers: CheckoutEndpoint['handlers'] = {
  getCheckout,
  submitCheckout,
}

const checkoutApi = createEndpoint<CheckoutAPI>({
  handler: checkoutEndpoint,
  handlers,
})

export default checkoutApi
