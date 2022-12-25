import { CommerceAPI, createEndpoint, GetAPISchema } from '@shop0/commerce/api'
import { CheckoutSchema } from '@shop0/commerce/types/checkout'
import { SWELL_CHECKOUT_URL_COOKIE } from '../../../const'
import checkoutEndpoint from '@shop0/commerce/api/endpoints/checkout'

const getCheckout: CheckoutEndpoint['handlers']['getCheckout'] = async ({
  req,
}) => {
  const { cookies } = req
  const checkoutUrl = cookies.get(SWELL_CHECKOUT_URL_COOKIE)?.value

  if (checkoutUrl) {
    return { redirectTo: checkoutUrl }
  } else {
    return { redirectTo: '/cart' }
  }
}
export const handlers: CheckoutEndpoint['handlers'] = { getCheckout }

export type CheckoutAPI = GetAPISchema<CommerceAPI, CheckoutSchema>
export type CheckoutEndpoint = CheckoutAPI['endpoint']

const checkoutApi = createEndpoint<CheckoutAPI>({
  handler: checkoutEndpoint,
  handlers,
})

export default checkoutApi
