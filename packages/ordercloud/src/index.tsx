import { ordercloudProvider, OrdercloudProvider } from './provider'
import { getCommerceProvider, useCommerce as useCoreCommerce } from '@shop0/commerce'

export { ordercloudProvider }
export type { OrdercloudProvider }

export const CommerceProvider = getCommerceProvider(ordercloudProvider)

export const useCommerce = () => useCoreCommerce()
