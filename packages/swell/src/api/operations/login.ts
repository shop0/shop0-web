import type {
  OperationContext,
  OperationOptions,
} from '@shop0/commerce/api/operations'
import type { LoginOperation } from '@shop0/commerce/types/login'

import { Provider, SwellConfig } from '..'

export default function loginOperation({
  commerce,
}: OperationContext<Provider>) {
  async function login<T extends LoginOperation>(opts: {
    variables: T['variables']
    config?: Partial<SwellConfig>
    res: Response
  }): Promise<T['data']>

  async function login<T extends LoginOperation>(
    opts: {
      variables: T['variables']
      config?: Partial<SwellConfig>
      res: Response
    } & OperationOptions
  ): Promise<T['data']>

  async function login<T extends LoginOperation>({
    variables,
    res: response,
    config: cfg,
  }: {
    query?: string
    variables: T['variables']
    res: Response
    config?: Partial<SwellConfig>
  }): Promise<T['data']> {
    const config = commerce.getConfig(cfg)

    const { data } = await config.fetch('account', 'login', [variables])

    return {
      result: data,
    }
  }

  return login
}
