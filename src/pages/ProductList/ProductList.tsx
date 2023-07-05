import { useQuery } from '@tanstack/react-query'
import { omitBy, isUndefined } from 'lodash'
import Aside from './Aside'
import Product from './Product'
import SortBar from './SortBar'
import productApi from 'src/apis/product.api'
import useQueryParams from 'src/hooks/useQueryParams'
import Pagination from './Pagitation'
import { ProductConfig } from 'src/types/product.type'
import categoryApi from 'src/apis/category.api'

export type QueryConfig = {
  [key in keyof ProductConfig]?: string
}
export default function ProductList() {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      exclude: queryParams.exclude,
      limit: queryParams.limit,
      name: queryParams.name,
      order: queryParams.order,
      page: queryParams.page || '1',
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter,
      sort_by: queryParams.sort_by,
      category: queryParams.category
    },
    isUndefined
  )

  const { data: productData } = useQuery({
    queryKey: ['product', queryParams],
    queryFn: () => productApi.getProductList(queryConfig as ProductConfig),
    keepPreviousData: true
  })

  const { data: categoryData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryApi.getCategories()
  })

  return (
    <div className='bg-gray-100'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-4 py-4'>
          <div className='col-span-3'>
            <Aside
              categories={categoryData?.data.data || []}
              queryConfig={queryConfig}
            />
          </div>
          {productData && (
            <div className='col-span-9'>
              <SortBar
                queryConfig={queryConfig}
                pageSize={productData.data.data.pagination.page_size}
              />
              <div className='my-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {productData.data.data.products.map((product) => {
                  return (
                    <div key={product._id} className='col-span-1'>
                      <Product product={product} />
                    </div>
                  )
                })}
              </div>
              <Pagination
                queryConfig={queryConfig}
                pageSize={productData.data.data.pagination.page_size}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
