import type { HTMLAttributes } from 'react'

import { cn } from '../../utils/cn'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'default' | 'narrow'
}

export function Container({ size = 'default', className, ...props }: ContainerProps) {
  return (
    <div
      className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', size === 'narrow' ? 'max-w-3xl' : 'max-w-6xl', className)}
      {...props}
    />
  )
}
