import type { CommerceAPI, CommerceAPIConfig } from '@shop0/commerce/api'
import { getCommerceApi as commerceApi } from '@shop0/commerce/api'
import createFetcher from './utils/fetch-local'
import sdk, { Sdk } from './utils/sfcc-sdk'

import getAllPages from './operations/get-all-pages'
import getPage from './operations/get-page'
import getSiteInfo from './operations/get-site-info'
import getCustomerWishlist from './operations/get-customer-wishlist'
import getAllProductPaths from './operations/get-all-product-paths'
import getAllProducts from './operations/get-all-products'
import getProduct from './operations/get-product'

export interface SFCCConfig extends CommerceAPIConfig {
  sdk: Sdk
}
const config: SFCCConfig = {
  commerceUrl: '',
  apiToken: '',
  cartCookie: '',
  customerCookie: '',
  cartCookieMaxAge: 2592000,
  fetch: createFetcher(() => getCommerceApi().getConfig()),
  sdk, // SalesForce Cloud Commerce API SDK
}

const operations = {
  getAllPages,
  getPage,
  getSiteInfo,
  getCustomerWishlist,
  getAllProductPaths,
  getAllProducts,
  getProduct,
}

export const provider = { config, operations }

export type Provider = typeof provider
export type SFCCProviderAPI<P extends Provider = Provider> = CommerceAPI<
  P | any
>

export function getCommerceApi<P extends Provider>(
  customProvider: P = provider as any
): SFCCProviderAPI<P> {
  return commerceApi(customProvider as any)
}
