import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { PlayCircle } from 'lucide-react'
import { useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { startAppointment } from '@/api/appointments/start-appointment'
import { getUserProjects } from '@/api/projects/get-user-projects'

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

const startAppointmentFormSchema = z.object({
  projectId: z.string().optional(),
})

type StartAppointmentFormValues = z.infer<typeof startAppointmentFormSchema>

export function StartTimeTrackerDialog() {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const queryClient = useQueryClient()

  const { data: projects } = useQuery({
    queryKey: ['user-projects'],
    queryFn: getUserProjects,
  })

  const {
    mutateAsync: startAppointmentFn,
    isPending: isLoadingStartAppointment,
  } = useMutation({
    mutationFn: startAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['current-appointment'],
      })
      closeButtonRef.current?.click()
      toast.success('Apontamento iniciado com sucesso')
    },
    onError: () => {
      toast.error('Erro ao iniciar apontamento, tente novamente mais tarde')
    },
  })

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<StartAppointmentFormValues>({
    resolver: zodResolver(startAppointmentFormSchema),
    defaultValues: {
      projectId: undefined,
    },
  })

  async function handleStartAppointment({
    projectId,
  }: StartAppointmentFormValues) {
    if (!projectId) {
      setError('projectId', {
        message: 'Selecione um projeto',
      })

      return
    }

    await startAppointmentFn({ projectId })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="border-r rounded-r-none">
          <PlayCircle className="size-6" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Iniciando apontamento</DialogTitle>
          <DialogClose ref={closeButtonRef} />
        </DialogHeader>

        <form
          id="start-appointment"
          onSubmit={handleSubmit(handleStartAppointment)}
        >
          <FormControl errorMessage={errors.projectId?.message}>
            <Label htmlFor="projectId">Projeto</Label>
            <Controller
              control={control}
              name="projectId"
              render={({ field: { value, onChange } }) => (
                <Select value={value} onValueChange={onChange}>
                  <SelectTrigger id="projectId">
                    <SelectValue placeholder="Selecione um projeto..." />
                  </SelectTrigger>
                  <SelectContent>
                    {projects?.projects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </FormControl>
        </form>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            className="text-rose-500 dark:text-rose-400"
            disabled={isLoadingStartAppointment}
            onClick={() => closeButtonRef.current?.click()}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            form="start-appointment"
            disabled={isLoadingStartAppointment}
          >
            Iniciar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
