import type {
  OperationContext,
  OperationOptions,
} from '@shop0/commerce/api/operations'
import type { GetAllPagesOperation } from '@shop0/commerce/types/page'
import type { RecursivePartial, RecursiveRequired } from '../utils/types'
import { BigcommerceConfig, Provider } from '..'

import { definitions } from '../definitions/store-content'
import { normalizePage } from '../../lib/normalize'

export default function getAllPagesOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllPages<T extends GetAllPagesOperation>(opts?: {
    config?: Partial<BigcommerceConfig>
    preview?: boolean
  }): Promise<T['data']>

  async function getAllPages<T extends GetAllPagesOperation>(
    opts: {
      config?: Partial<BigcommerceConfig>
      preview?: boolean
    } & OperationOptions
  ): Promise<T['data']>

  async function getAllPages<T extends GetAllPagesOperation>({
    config,
    preview,
  }: {
    url?: string
    config?: Partial<BigcommerceConfig>
    preview?: boolean
  } = {}): Promise<T['data']> {
    const cfg = commerce.getConfig(config)
    // RecursivePartial forces the method to check for every prop in the data, which is
    // required in case there's a custom `url`
    const { data } = await cfg.storeApiFetch<
      RecursivePartial<{ data: definitions['page_Full'][] }>
    >('/v3/content/pages')
    const pages = (data as RecursiveRequired<typeof data>) ?? []

    return {
      pages: preview
        ? pages.map(normalizePage)
        : pages.filter((p) => p.is_visible).map(normalizePage),
    }
  }

  return getAllPages
}
