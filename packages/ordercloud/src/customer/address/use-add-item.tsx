import type { AddItemHook } from '@shop0/commerce/types/customer/address'
import type { MutationHook } from '@shop0/commerce/utils/types'

import { useCallback } from 'react'
import useAddItem, {
  UseAddItem,
} from '@shop0/commerce/customer/address/use-add-item'
import useAddresses from './use-addresses'

export default useAddItem as UseAddItem<typeof handler>

export const handler: MutationHook<AddItemHook> = {
  fetchOptions: {
    url: '/api/commerce/customer/address',
    method: 'POST',
  },
  async fetcher({ input: item, options, fetch }) {
    const data = await fetch({
      ...options,
      body: { item },
    })

    return data
  },
  useHook: ({ fetch }) =>
    function useHook() {
      const { mutate } = useAddresses()

      return useCallback(
        async function addItem(input) {
          const data = await fetch({ input })
          await mutate(data ? [data] : [], false)
          return data
        },
        [fetch, mutate]
      )
    },
}
