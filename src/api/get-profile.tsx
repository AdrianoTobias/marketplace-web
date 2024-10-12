import { api } from '../lib/axios'

type avatar = {
  id: string
  url: string
}

interface GetProfileResponse {
  seller: {
    id: string
    name: string
    phone: string
    email: string
    avatar: avatar | null
  }
}

export async function getProfile() {
  const response = await api.get<GetProfileResponse>('/sellers/me')

  return response.data?.seller
}
