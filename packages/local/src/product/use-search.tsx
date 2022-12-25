import { SWRHook } from '@shop0/commerce/utils/types'
import useSearch, { UseSearch } from '@shop0/commerce/product/use-search'
export default useSearch as UseSearch<typeof handler>

export const handler: SWRHook<any> = {
  fetchOptions: {
    query: '',
  },
  async fetcher({ input, options, fetch }) {},
  useHook: () => () => {
    return {
      data: {
        products: [],
      },
    }
  },
}
