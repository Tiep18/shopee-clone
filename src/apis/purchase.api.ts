import { Purchase, PurchaseListStatus } from 'src/types/purchase.type'
import { SuccessResponseAPI } from 'src/types/utils.type'
import http from 'src/utils/http'

const purchaseApi = {
  addToCart: (body: { product_id: string; buy_count: number }) => {
    return http.post<SuccessResponseAPI<Purchase>>(
      'purchases/add-to-cart',
      body
    )
  },
  readPurchases: (status: PurchaseListStatus) => {
    return http.get<SuccessResponseAPI<Purchase[]>>('purchases', {
      params: {
        status
      }
    })
  }
}

export default purchaseApi
