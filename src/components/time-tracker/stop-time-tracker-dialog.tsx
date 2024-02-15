import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Save, StopCircle, Trash } from 'lucide-react'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { finishAppointment } from '@/api/appointments/finish-appointment'

import { FormControl } from '../form/form-control'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'

const stopAppointmentFormSchema = z.object({
  description: z.string(),
})

type StopAppointmentFormValues = z.infer<typeof stopAppointmentFormSchema>

interface StopTimeTrackerDialogProps {
  appointmentId: string
}

export function StopTimeTrackerDialog({
  appointmentId,
}: StopTimeTrackerDialogProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const queryClient = useQueryClient()

  const {
    mutateAsync: finishAppointmentFn,
    isPending: isLoadingFinishAppointment,
  } = useMutation({
    mutationFn: finishAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['current-appointment'],
      })
      closeButtonRef.current?.click()
      toast.success('Apontamento finalizado com sucesso')
    },
    onError: () => {
      toast.error('Erro ao finalizar apontamento, tente novamente mais tarde')
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StopAppointmentFormValues>({
    resolver: zodResolver(stopAppointmentFormSchema),
    defaultValues: {
      description: '',
    },
  })

  async function handleFinishAppointment({
    description,
  }: StopAppointmentFormValues) {
    await finishAppointmentFn({
      appointmentId,
      description,
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="border-r rounded-r-none">
          <StopCircle className="size-6" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Encerrando apontamento</DialogTitle>
          <DialogClose ref={closeButtonRef} />
        </DialogHeader>

        <form
          id="finish-appointment"
          onSubmit={handleSubmit(handleFinishAppointment)}
        >
          <FormControl errorMessage={errors.description?.message}>
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              className="resize-none"
              placeholder="Dê uma breve descrição do que foi feito..."
              {...register('description')}
            />
          </FormControl>
        </form>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            className="text-rose-500 dark:text-rose-400"
            disabled={isLoadingFinishAppointment}
          >
            <Trash className="size-4 mr-1" />
            Excluir
          </Button>
          <Button
            type="submit"
            form="finish-appointment"
            disabled={isLoadingFinishAppointment}
          >
            <Save className="size-4 mr-1" />
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
