import { api } from '@/lib/axios'

interface User {
  id: string
  name: string
  email: string
  createdAt: string
}

export async function getProfile() {
  const response = await api.get<User>('/me')

  return response.data
}
