import type { Wishlist } from '@shop0/commerce/types/wishlist'
import { HookFetcher } from '@shop0/commerce/utils/types'

export interface UseWishlistOptions {
  includeProducts?: boolean
}

export interface UseWishlistInput extends UseWishlistOptions {
  customerId?: number
}

export const fetcher: HookFetcher<Wishlist | null, UseWishlistInput> = () => {
  return null
}

export function extendHook(
  customFetcher: typeof fetcher,
  // swrOptions?: SwrOptions<Wishlist | null, UseWishlistInput>
  swrOptions?: any
) {
  const useWishlist = ({ includeProducts }: UseWishlistOptions = {}) => {
    return { data: null }
  }

  useWishlist.extend = extendHook

  return useWishlist
}

export default extendHook(fetcher)
