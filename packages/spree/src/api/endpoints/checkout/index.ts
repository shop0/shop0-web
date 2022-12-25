import { createEndpoint } from '@shop0/commerce/api'
import type { GetAPISchema, CommerceAPI } from '@shop0/commerce/api'
import checkoutEndpoint from '@shop0/commerce/api/endpoints/checkout'
import type { CheckoutSchema } from '@shop0/commerce/types/checkout'
import getCheckout from './get-checkout'
import type { SpreeApiProvider } from '../..'

export type CheckoutAPI = GetAPISchema<
  CommerceAPI<SpreeApiProvider>,
  CheckoutSchema
>

export type CheckoutEndpoint = CheckoutAPI['endpoint']

export const handlers: CheckoutEndpoint['handlers'] = { getCheckout }

const checkoutApi = createEndpoint<CheckoutAPI>({
  handler: checkoutEndpoint,
  handlers,
})

export default checkoutApi
