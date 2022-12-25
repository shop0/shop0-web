import { Product } from '@shop0/commerce/types/product'
import { GetAllProductsOperation } from '@shop0/commerce/types/product'
import type { OperationContext } from '@shop0/commerce/api/operations'
import type { LocalConfig, Provider } from '../index'
import data from '../../data.json'

export default function getAllProductsOperation({
  commerce,
}: OperationContext<any>) {
  async function getAllProducts<T extends GetAllProductsOperation>({
    query = '',
    variables,
    config,
  }: {
    query?: string
    variables?: T['variables']
    config?: Partial<LocalConfig>
    preview?: boolean
  } = {}): Promise<{ products: Product[] | any[] }> {
    return {
      products: data.products,
    }
  }
  return getAllProducts
}
