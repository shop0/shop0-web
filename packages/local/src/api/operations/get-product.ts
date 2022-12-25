import type { LocalConfig } from '../index'
import { Product } from '@shop0/commerce/types/product'
import { GetProductOperation } from '@shop0/commerce/types/product'
import data from '../../data.json'
import type { OperationContext } from '@shop0/commerce/api/operations'

export default function getProductOperation(_p: OperationContext<any>) {
  async function getProduct<T extends GetProductOperation>({
    query = '',
    variables,
    config,
  }: {
    query?: string
    variables?: T['variables']
    config?: Partial<LocalConfig>
    preview?: boolean
  } = {}): Promise<Product | {} | any> {
    return {
      product: data.products.find(({ slug }) => slug === variables!.slug),
    }
  }

  return getProduct
}
