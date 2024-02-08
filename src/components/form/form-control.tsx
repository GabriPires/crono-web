import { twMerge } from 'tailwind-merge'

import { FormErrorMessage } from './form-error-message'

interface FormControlProps {
  children: React.ReactNode
  errorMessage?: string
  className?: string
}

export function FormControl({
  children,
  errorMessage,
  className,
}: FormControlProps) {
  return (
    <div className={twMerge('flex flex-col gap-2', className)}>
      {children}
      {errorMessage && <FormErrorMessage errorMessage={errorMessage} />}
    </div>
  )
}
