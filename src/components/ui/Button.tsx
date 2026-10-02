import type { ButtonHTMLAttributes } from 'react'
import { Link, type LinkProps } from 'react-router'

import { cn } from '../../utils/cn'
import { buttonStyles, type ButtonStyleProps } from './buttonStyles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ButtonStyleProps

export function Button({ variant, size, fullWidth, className, type = 'button', ...props }: ButtonProps) {
  return <button type={type} className={cn(buttonStyles({ variant, size, fullWidth }), className)} {...props} />
}

type ButtonLinkProps = LinkProps & ButtonStyleProps

export function ButtonLink({ variant, size, fullWidth, className, ...props }: ButtonLinkProps) {
  return <Link className={cn(buttonStyles({ variant, size, fullWidth }), className)} {...props} />
}
