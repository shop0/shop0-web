import { GetAPISchema, createEndpoint } from '@shop0/commerce/api'
import customerEndpoint from '@shop0/commerce/api/endpoints/customer'
import type { CustomerSchema } from '@shop0/commerce/types/customer'
import type { BigcommerceAPI } from '../..'
import getLoggedInCustomer from './get-logged-in-customer'

export type CustomerAPI = GetAPISchema<BigcommerceAPI, CustomerSchema>

export type CustomerEndpoint = CustomerAPI['endpoint']

export const handlers: CustomerEndpoint['handlers'] = { getLoggedInCustomer }

const customerApi = createEndpoint<CustomerAPI>({
  handler: customerEndpoint,
  handlers,
})

export default customerApi
