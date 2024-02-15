import { api } from '@/lib/axios'

interface AuthenticateRequest {
  email: string
  password: string
}

export async function authenticate({ email, password }: AuthenticateRequest) {
  return await api.post('/authenticate', {
    email,
    password,
  })
}
