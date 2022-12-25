import {
  getCommerceProvider,
  useCommerce as useCoreCommerce,
} from '@shop0/commerce'
import { shopifyProvider, ShopifyProvider } from './provider'

export { shopifyProvider }
export type { ShopifyProvider }

export const CommerceProvider = getCommerceProvider(shopifyProvider)

export const useCommerce = () => useCoreCommerce<ShopifyProvider>()
