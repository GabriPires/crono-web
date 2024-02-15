import { api } from '@/lib/axios'

export type Project = {
  id: string
  name: string
  description: string
  createdAt: string
  userId: string
}

interface GetUserProjectsResponse {
  projects: Project[]
}

export async function getUserProjects() {
  const response = await api.get<GetUserProjectsResponse>('/projects')

  return response.data
}
