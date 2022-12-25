import type { GraphQLFetcher } from '@shop0/commerce/api'
import type { CommercejsConfig } from '../'

import { FetcherError } from '@shop0/commerce/utils/errors'

const fetchGraphqlApi: (getConfig: () => CommercejsConfig) => GraphQLFetcher =
  () => async () => {
    throw new FetcherError({
      errors: [{ message: 'GraphQL fetch is not implemented' }],
      status: 500,
    })
  }

export default fetchGraphqlApi
