import type { CustomerCardSchema } from '@shop0/commerce/types/customer/card'
import type { OrdercloudAPI } from '../../..'

import { GetAPISchema, createEndpoint } from '@shop0/commerce/api'
import customerCardEndpoint from '@shop0/commerce/api/endpoints/customer/card'

import getCards from './get-cards'
import addItem from './add-item'
import updateItem from './update-item'
import removeItem from './remove-item'

export type CustomerCardAPI = GetAPISchema<OrdercloudAPI, CustomerCardSchema>
export type CustomerCardEndpoint = CustomerCardAPI['endpoint']

export const handlers: CustomerCardEndpoint['handlers'] = {
  getCards,
  addItem,
  updateItem,
  removeItem,
}

const customerCardApi = createEndpoint<CustomerCardAPI>({
  handler: customerCardEndpoint,
  handlers,
})

export default customerCardApi
