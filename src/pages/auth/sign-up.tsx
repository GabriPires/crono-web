import { zodResolver } from '@hookform/resolvers/zod'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signUpFormSchema = z.object({
  name: z.string().min(1, { message: 'Digite um nome' }),
  phone: z.string().min(11, { message: 'Digite um número de celular válido' }),
  email: z.string().email(),
})

type SignUpForm = z.infer<typeof signUpFormSchema>

export function SignUpPage() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpFormSchema),
  })

  async function handleSignUp(data: SignUpForm) {
    try {
      console.log(data)

      toast.success('Cadastro efetuado com sucesso.', {
        action: {
          label: 'Login',
          onClick: () => navigate(`/sign-in?email=${data.email}`),
        },
      })
    } catch (error) {
      toast.error('Erro ao se cadastrar, tente novamente.')
    }
  }

  return (
    <>
      <Helmet title="Crie uma conta" />
      <div className="p-8">
        <Button asChild variant="ghost" className="absolute right-8 top-8">
          <Link to="/sign-in">Fazer login</Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Comece a se organizar e alcance seus objetivos
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
            <div className="space-y-2">
              <Label htmlFor="email">Seu nome</Label>
              <Input type="text" {...register('name')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input type="email" {...register('email')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Seu celular</Label>
              <Input type="tel" {...register('phone')} />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              Finalizar cadastro
            </Button>
            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar, você concorda com nossos{' '}
              <a className="underline underline-offset-4" href="#">
                Termos de serviço
              </a>{' '}
              e{' '}
              <a className="underline underline-offset-4" href="#">
                Políticas de privacidade
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
