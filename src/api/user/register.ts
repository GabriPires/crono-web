import { api } from '@/lib/axios'

interface RegisterRequest {
  name: string
  email: string
  password: string
}

export async function signUp({ name, email, password }: RegisterRequest) {
  return await api.post('/register', {
    name,
    email,
    password,
  })
}
