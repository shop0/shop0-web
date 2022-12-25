import type { GetAddressesHook } from '@shop0/commerce/types/customer/address'

import { useMemo } from 'react'
import { SWRHook } from '@shop0/commerce/utils/types'
import useAddresses, {
  UseAddresses,
} from '@shop0/commerce/customer/address/use-addresses'

export default useAddresses as UseAddresses<typeof handler>

export const handler: SWRHook<GetAddressesHook> = {
  fetchOptions: {
    url: '_',
    method: '_',
  },
  useHook: () =>
    function useHook() {
      return useMemo(
        () =>
          Object.create(
            {},
            {
              isEmpty: {
                get() {
                  return true
                },
                enumerable: true,
              },
            }
          ),
        []
      )
    },
}
