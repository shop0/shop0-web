import { GetAPISchema, createEndpoint } from '@shop0/commerce/api'
import logoutEndpoint from '@shop0/commerce/api/endpoints/logout'
import type { LogoutSchema } from '@shop0/commerce/types/logout'
import type { BigcommerceAPI } from '../..'
import logout from './logout'

export type LogoutAPI = GetAPISchema<BigcommerceAPI, LogoutSchema>

export type LogoutEndpoint = LogoutAPI['endpoint']

export const handlers: LogoutEndpoint['handlers'] = { logout }

const logoutApi = createEndpoint<LogoutAPI>({
  handler: logoutEndpoint,
  handlers,
})

export default logoutApi
