import type { GetCardsHook } from '@shop0/commerce/types/customer/card'
import { useMemo } from 'react'
import { SWRHook } from '@shop0/commerce/utils/types'
import useCard, { UseCards } from '@shop0/commerce/customer/card/use-cards'

export default useCard as UseCards<typeof handler>

export const handler: SWRHook<GetCardsHook> = {
  fetchOptions: {
    query: '_',
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
