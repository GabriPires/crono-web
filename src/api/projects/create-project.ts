import { api } from '@/lib/axios'

interface CreateProjectRequest {
  name: string
  description: string
}

export async function createProject({
  name,
  description,
}: CreateProjectRequest) {
  return await api.post('/projects', {
    name,
    description,
  })
}
