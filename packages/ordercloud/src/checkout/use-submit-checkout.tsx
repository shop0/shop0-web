import type { SubmitCheckoutHook } from '@shop0/commerce/types/checkout'
import type { MutationHook } from '@shop0/commerce/utils/types'

import { useCallback } from 'react'
import useSubmitCheckout, {
  UseSubmitCheckout,
} from '@shop0/commerce/checkout/use-submit-checkout'

export default useSubmitCheckout as UseSubmitCheckout<typeof handler>

export const handler: MutationHook<SubmitCheckoutHook> = {
  fetchOptions: {
    url: '/api/commerce/checkout',
    method: 'POST',
  },
  async fetcher({ input: item, options, fetch }) {
    // @TODO: Make form validations in here, import generic error like import { CommerceError } from '@shop0/commerce/utils/errors'
    // Get payment and delivery information in here

    const data = await fetch({
      ...options,
      body: { item },
    })

    return data
  },
  useHook: ({ fetch }) =>
    function useHook() {
      return useCallback(
        async function onSubmitCheckout(input) {
          const data = await fetch({ input })

          return data
        },
        [fetch]
      )
    },
}