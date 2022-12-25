import type { GetCheckoutHook } from '@shop0/commerce/types/checkout'

import { useMemo } from 'react'
import { SWRHook } from '@shop0/commerce/utils/types'
import useCheckout, {
  UseCheckout,
} from '@shop0/commerce/checkout/use-checkout'
import useSubmitCheckout from './use-submit-checkout'

export default useCheckout as UseCheckout<typeof handler>

export const handler: SWRHook<GetCheckoutHook> = {
  fetchOptions: {
    url: '/api/commerce/checkout',
    method: 'GET',
  },
  useHook: ({ useData }) =>
    function useHook(input) {
      const submit = useSubmitCheckout()
      const response = useData({
        swrOptions: { revalidateOnFocus: false, ...input?.swrOptions },
      })

      return useMemo(
        () =>
          Object.create(response, {
            isEmpty: {
              get() {
                return response.data?.lineItems?.length ?? 0
              },
              enumerable: true,
            },
            submit: {
              get() {
                return submit
              },
              enumerable: true,
            },
          }),
        [response, submit]
      )
    },
}
