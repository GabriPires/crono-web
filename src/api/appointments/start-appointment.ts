import { api } from '@/lib/axios'

interface StartAppointmentRequest {
  projectId: string
}

export async function startAppointment({ projectId }: StartAppointmentRequest) {
  return await api.post('/appointments/start', {
    projectId,
  })
}
