import { FetcherError } from '@shop0/commerce/utils/errors'
import type { GraphQLFetcher } from '@shop0/commerce/api'
import type { LocalConfig } from '../index'

const fetchGraphqlApi: (getConfig: () => LocalConfig) => GraphQLFetcher =
  (getConfig) =>
  async (query: string, { variables, preview } = {}, headers?: HeadersInit) => {
    const config = getConfig()
    const res = await fetch(config.commerceUrl, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })

    const json = await res.json()
    if (json.errors) {
      throw new FetcherError({
        errors: json.errors ?? [{ message: 'Failed to fetch for API' }],
        status: res.status,
      })
    }

    return { data: json.data, res }
  }

export default fetchGraphqlApi
