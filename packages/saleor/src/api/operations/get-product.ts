import type { OperationContext } from '@shop0/commerce/api/operations'
import { normalizeProduct } from '../../utils'
import type { Provider, SaleorConfig } from '..'

import * as Query from '../../utils/queries'

type Variables = {
  slug: string
}

type ReturnType = {
  product: any
}

export default function getProductOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getProduct({
    query = Query.ProductOneBySlug,
    variables,
    config: cfg,
  }: {
    query?: string
    variables: Variables
    config?: Partial<SaleorConfig>
    preview?: boolean
  }): Promise<ReturnType> {
    const { fetch, locale } = commerce.getConfig(cfg)

    const { data } = await fetch(
      query,
      { variables },
      {
        ...(locale && {
          'Accept-Language': locale,
        }),
      }
    )

    return {
      product: data && data.product ? normalizeProduct(data.product) : null,
    }
  }

  return getProduct
}
