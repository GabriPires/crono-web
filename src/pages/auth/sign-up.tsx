import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { signUp } from '@/api/user/register'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signUpFormSchema = z.object({
  name: z.string().min(1, { message: 'Digite um nome' }),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: 'Digite uma senha com no mínimo 6 caracteres' }),
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

  const { mutateAsync: signUpFn } = useMutation({
    mutationFn: signUp,
  })

  async function handleSignUp({ name, email, password }: SignUpForm) {
    try {
      await signUpFn({
        name,
        email,
        password,
      })

      toast.success('Cadastro efetuado com sucesso.', {
        action: {
          label: 'Continuar para o login',
          onClick: () => navigate(`/sign-in?email=${email}`),
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
              <Label htmlFor="name">Seu nome</Label>
              <Input id="name" type="text" {...register('name')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Sua senha</Label>
              <Input id="password" type="password" {...register('password')} />
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
