import { GetAPISchema, createEndpoint } from '@shop0/commerce/api'
import loginEndpoint from '@shop0/commerce/api/endpoints/login'
import type { LoginSchema } from '@shop0/commerce/types/login'
import type { KiboCommerceAPI } from '../..'
import login from './login'

export type LoginAPI = GetAPISchema<KiboCommerceAPI, LoginSchema>

export type LoginEndpoint = LoginAPI['endpoint']

export const handlers: LoginEndpoint['handlers'] = { login }

const loginApi = createEndpoint<LoginAPI>({
  handler: loginEndpoint,
  handlers,
})

export default loginApi
