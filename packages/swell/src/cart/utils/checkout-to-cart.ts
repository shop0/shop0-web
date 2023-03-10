import type { Cart } from '@shop0/commerce/types/cart'
import { CommerceError } from '@shop0/commerce/utils/errors'

import {
  CheckoutLineItemsAddPayload,
  CheckoutLineItemsRemovePayload,
  CheckoutLineItemsUpdatePayload,
  Maybe,
} from '../../../schema'
import { normalizeCart } from '../../utils'

export type CheckoutPayload =
  | CheckoutLineItemsAddPayload
  | CheckoutLineItemsUpdatePayload
  | CheckoutLineItemsRemovePayload

const checkoutToCart = (checkoutPayload?: Maybe<CheckoutPayload>): Cart => {
  if (!checkoutPayload) {
    throw new CommerceError({
      message: 'Invalid response from Swell',
    })
  }
  return normalizeCart(checkoutPayload as any)
}

export default checkoutToCart
