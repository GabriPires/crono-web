import dayjs from 'dayjs'
import { PlayCircle } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { Button } from '../ui/button'
import { StopTimeTrackerDialog } from './stop-time-tracker-dialog'

export function TimeTracker() {
  const [startDateDifferenceInSeconds, setTime] = useState(0)

  const isTracking = true
  const startDate = dayjs('2024-02-12T09:27:58.526Z').toDate()

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs().diff(startDate, 'second'))
    }, 1000)

    return () => clearInterval(interval)
  }, [startDate])

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

  return (
    <div>
      {isTracking ? (
        <div className="flex flex-row items-center border pr-2 rounded-md h-10">
          <StopTimeTrackerDialog />

          <div className="ml-2">
            <span className="font-medium text-sm tabular-nums">
              {hours}:{minutes}:{seconds}
            </span>
          </div>
        </div>
      ) : (
        <Button variant="outline">
          <PlayCircle className="size-6 mr-2" />
          Iniciar
        </Button>
      )}
    </div>
  )
}
