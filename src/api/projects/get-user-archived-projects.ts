import { api } from '@/lib/axios'

export type Project = {
  id: string
  name: string
  description: string
  createdAt: string
  userId: string
  isArchived: boolean
}

interface GetUserArchivedProjectsResponse {
  projects: Project[]
}

export async function getUserArchivedProjects() {
  const response = await api.get<GetUserArchivedProjectsResponse>('/projects', {
    params: {
      isArchived: true,
    },
  })

  return response.data
}
