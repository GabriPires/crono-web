import { api } from '@/lib/axios'

export type AppointmentType = {
  id: string
  startDate: string
  endDate: string | null
  description: string
  userId: string
  projectId: string
  current: boolean
}

interface GetCurrentAppointmentResponse {
  appointment: AppointmentType
}

export async function getCurrentAppointment() {
  const response = await api.get<GetCurrentAppointmentResponse>(
    '/appointments/current',
  )

  return response.data
}
