import type {
  HookFetcherContext,
  MutationHookContext,
} from '@shop0/commerce/utils/types'
import type {
  UpdateItemHook,
  Address,
} from '@shop0/commerce/types/customer/address'

import { useCallback } from 'react'

import { MutationHook } from '@shop0/commerce/utils/types'
import useUpdateItem, {
  UseUpdateItem,
} from '@shop0/commerce/customer/address/use-update-item'

import useAddresses from './use-addresses'

export type UpdateItemActionInput<T = any> = T extends Address
  ? Partial<UpdateItemHook['actionInput']>
  : UpdateItemHook['actionInput']

export default useUpdateItem as UseUpdateItem<any>

export const handler: MutationHook<any> = {
  fetchOptions: {
    url: '/api/commerce/customer/address',
    method: 'PUT',
  },
  async fetcher({
    input: { itemId, item },
    options,
    fetch,
  }: HookFetcherContext<UpdateItemHook>) {
    return await fetch({
      ...options,
      body: { itemId, item },
    })
  },
  useHook: ({ fetch }: MutationHookContext<UpdateItemHook>) =>
    function useHook() {
      const { mutate } = useAddresses()

      return useCallback(
        async function updateItem(input) {
          const data = await fetch({ input })

          await mutate([], false)

          return data
        },
        [fetch, mutate]
      )
    },
}
