import { GetAPISchema, createEndpoint } from '@shop0/commerce/api'
import signupEndpoint from '@shop0/commerce/api/endpoints/signup'
import type { SignupSchema } from '@shop0/commerce/types/signup'
import type { KiboCommerceAPI } from '../..'
import signup from './signup'

export type SignupAPI = GetAPISchema<KiboCommerceAPI, SignupSchema>

export type SignupEndpoint = SignupAPI['endpoint']

export const handlers: SignupEndpoint['handlers'] = { signup }

const singupApi = createEndpoint<SignupAPI>({
  handler: signupEndpoint,
  handlers,
})

export default singupApi
