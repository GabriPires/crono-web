import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormControl } from '@/components/form/form-control'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { currencyInputMask } from '@/utils/currency-input-mask'

const createProjectFormSchema = z.object({
  title: z.string().min(1, { message: 'Título é obrigatório.' }),
  description: z.string().optional(),
  hourlyRate: z.coerce
    .number()
    .positive({ message: 'Valor por hora deve ser positivo.' }),
})

type CreateProjectFormValues = z.infer<typeof createProjectFormSchema>

export function CreateProjectDialog() {
  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProjectFormValues>({
    resolver: zodResolver(createProjectFormSchema),
    defaultValues: {
      title: '',
      description: '',
      hourlyRate: 0,
    },
  })

  async function handleCreateProject(values: CreateProjectFormValues) {
    console.log(values)
  }

  return (
    <Dialog
      onOpenChange={() => {
        reset()
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">Criar projeto</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criando novo projeto</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para criar um novo projeto. Você poderá
            alterar essas informações a qualquer momento após a criação.
          </DialogDescription>
        </DialogHeader>

        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(handleCreateProject)}
        >
          <FormControl errorMessage={errors.title?.message}>
            <Label htmlFor="title">Título do projeto</Label>
            <Input id="title" {...register('title')} />
          </FormControl>

          <FormControl>
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              className="resize-none"
              {...register('description')}
            />
          </FormControl>

          <Controller
            control={control}
            name="hourlyRate"
            render={({ field: { value, onChange } }) => (
              <FormControl errorMessage={errors.hourlyRate?.message}>
                <Label htmlFor="hourlyRate">Valor por hora (R$)</Label>
                <Input
                  id="hourlyRate"
                  value={value}
                  onChange={(e) => onChange(currencyInputMask(e.target.value))}
                />
              </FormControl>
            )}
          />

          <div className="flex flex-row items-center justify-end gap-4">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit">Criar projeto</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
