import { SearchProductsBody } from '@shop0/commerce/types/product'

const getFilterVariables = ({
  search,
  categoryId,
}: {
  search?: string | null
  categoryId?: string | number | null
}) => {
  let filterVariables: { [key: string]: any } = {}
  if (search) {
    filterVariables.query = search
  }
  if (categoryId) {
    filterVariables['category_id'] = categoryId
  }
  return filterVariables
}

const getSortVariables = ({ sort }: { sort?: string | null }) => {
  let sortVariables: { [key: string]: any } = {}
  switch (sort) {
    case 'trending-desc':
    case 'latest-desc':
      sortVariables = {
        sortBy: 'updated',
        sortDirection: 'desc',
      }
      break
    case 'price-asc':
      sortVariables = {
        sortBy: 'price',
        sortDirection: 'asc',
      }
      break
    case 'price-desc':
      sortVariables = {
        sortBy: 'price',
        sortDirection: 'desc',
      }
      break
  }
  return sortVariables
}

export const getProductSearchVariables = (input: SearchProductsBody) => {
  const { search, categoryId, sort } = input
  const filterVariables = getFilterVariables({ search, categoryId })
  const sortVariables = getSortVariables({ sort })
  return {
    ...filterVariables,
    ...sortVariables,
  }
}
