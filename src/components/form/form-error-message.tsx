import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface FormErrorProps extends ComponentProps<'span'> {
  errorMessage: string
}

export function FormErrorMessage({
  errorMessage,
  className,
  ...props
}: FormErrorProps) {
  return (
    <span
      className={twMerge(
        'block text-xs text-rose-400 dark:text-rose-500',
        className,
      )}
      {...props}
    >
      {errorMessage}
    </span>
  )
}
