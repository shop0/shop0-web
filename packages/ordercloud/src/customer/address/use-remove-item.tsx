import type {
  MutationHookContext,
  HookFetcherContext,
} from '@shop0/commerce/utils/types'
import type {
  Address,
  RemoveItemHook,
} from '@shop0/commerce/types/customer/address'

import { useCallback } from 'react'

import { ValidationError } from '@shop0/commerce/utils/errors'
import useRemoveItem, {
  UseRemoveItem,
} from '@shop0/commerce/customer/address/use-remove-item'

import useAddresses from './use-addresses'

export type RemoveItemFn<T = any> = T extends Address
  ? (input?: RemoveItemActionInput<T>) => Promise<Address | null>
  : (input: RemoveItemActionInput<T>) => Promise<Address | null>

export type RemoveItemActionInput<T = any> = T extends Address
  ? Partial<RemoveItemHook['actionInput']>
  : RemoveItemHook['actionInput']

export default useRemoveItem as UseRemoveItem<typeof handler>

export const handler = {
  fetchOptions: {
    url: '/api/commerce/customer/address',
    method: 'DELETE',
  },
  async fetcher({
    input: { itemId },
    options,
    fetch,
  }: HookFetcherContext<RemoveItemHook>) {
    return await fetch({ ...options, body: { itemId } })
  },
  useHook: ({ fetch }: MutationHookContext<RemoveItemHook>) =>
    function useHook<T extends Address | undefined = undefined>(
      ctx: { item?: T } = {}
    ) {
      const { item } = ctx
      const { mutate } = useAddresses()
      const removeItem: RemoveItemFn<Address> = async (input) => {
        const itemId = input?.id ?? item?.id

        if (!itemId) {
          throw new ValidationError({
            message: 'Invalid input used for this operation',
          })
        }

        const data = await fetch({ input: { itemId } })

        await mutate([], false)

        return data
      }

      return useCallback(removeItem as RemoveItemFn<T>, [fetch, mutate])
    },
}
