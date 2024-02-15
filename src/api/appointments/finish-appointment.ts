import { api } from '@/lib/axios'

interface StartAppointmentRequest {
  appointmentId: string
  description: string
}

export async function finishAppointment({
  appointmentId,
  description,
}: StartAppointmentRequest) {
  return await api.post(`/appointments/${appointmentId}/finish`, {
    description,
  })
}
