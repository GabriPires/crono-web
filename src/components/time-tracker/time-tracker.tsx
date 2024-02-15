import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'

import { getCurrentAppointment } from '@/api/appointments/get-current'

import { Skeleton } from '../ui/skeleton'
import { StartTimeTrackerDialog } from './start-time-tracker-dialog'
import { StopTimeTrackerDialog } from './stop-time-tracker-dialog'

export function TimeTracker() {
  const [startDateDifferenceInSeconds, setStartDateDifferenceInSeconds] =
    useState(0)

  const {
    data: currentAppointmentData,
    isLoading: isLoadingCurrentAppointment,
  } = useQuery({
    queryKey: ['current-appointment'],
    retry: false,
    queryFn: async () => {
      const response = await getCurrentAppointment()

      setStartDateDifferenceInSeconds(
        response.appointment
          ? dayjs().diff(response.appointment.startDate, 'second')
          : 0,
      )

      return response
    },
  })

  const currentAppointment = useMemo(
    () => currentAppointmentData?.appointment ?? undefined,
    [currentAppointmentData],
  )

  const isTracking = useMemo(
    () => currentAppointment?.current ?? false,
    [currentAppointment],
  )
  const startDate = useMemo(
    () =>
      currentAppointment
        ? dayjs(currentAppointment.startDate).toDate()
        : undefined,
    [currentAppointment],
  )

  const hours = useMemo(
    () =>
      Math.floor(startDateDifferenceInSeconds / 3600)
        .toString()
        .padStart(2, '0'),
    [startDateDifferenceInSeconds],
  )

  const minutes = useMemo(
    () =>
      Math.floor((startDateDifferenceInSeconds % 3600) / 60)
        .toString()
        .padStart(2, '0'),
    [startDateDifferenceInSeconds],
  )

  const seconds = useMemo(
    () => (startDateDifferenceInSeconds % 60).toString().padStart(2, '0'),
    [startDateDifferenceInSeconds],
  )

  useEffect(() => {
    if (!startDate) return

    const interval = setInterval(() => {
      setStartDateDifferenceInSeconds(dayjs().diff(startDate, 'second'))
    }, 1000)

    return () => clearInterval(interval)
  }, [startDate])

  return (
    <div>
      {isLoadingCurrentAppointment ? (
        <Skeleton className="w-[128px] h-[40px]" />
      ) : isTracking ? (
        <div className="flex flex-row items-center border pr-2 rounded-md h-10 w-[128px]">
          <StopTimeTrackerDialog appointmentId={currentAppointment?.id!} />

          <div className="ml-2.5 pointer-events-none">
            <span className="font-medium text-sm tabular-nums select-none">
              {hours}:{minutes}:{seconds}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-row items-center border pr-2 rounded-md h-10 w-[128px]">
          <StartTimeTrackerDialog />

          <div className="ml-2.5 opacity-50 pointer-events-none">
            <span className="font-medium text-sm tabular-nums select-none">
              00:00:00
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
