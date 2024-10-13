import { api } from '../lib/axios'
import { product } from './types/product'

interface GetSellerProductsResponse {
  products: product[]
}

export async function getSellerProducts() {
  const response = await api.get<GetSellerProductsResponse>('/products/me')

  return response.data?.products
}
