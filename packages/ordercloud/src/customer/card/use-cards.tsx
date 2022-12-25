import type { GetCardsHook } from '@shop0/commerce/types/customer/card'

import { useMemo } from 'react'
import { SWRHook } from '@shop0/commerce/utils/types'
import useCard, { UseCards } from '@shop0/commerce/customer/card/use-cards'

export default useCard as UseCards<typeof handler>

export const handler: SWRHook<GetCardsHook> = {
  fetchOptions: {
    url: '/api/commerce/customer/card',
    method: 'GET',
  },
  useHook: ({ useData }) =>
    function useHook(input) {
      const response = useData({
        swrOptions: { revalidateOnFocus: false, ...input?.swrOptions },
      })

      return useMemo(
        () =>
          Object.create(response, {
            isEmpty: {
              get() {
                return (response.data?.length ?? 0) <= 0
              },
              enumerable: true,
            },
          }),
        [response]
      )
    },
}
