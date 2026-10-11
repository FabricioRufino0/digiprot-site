import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cn } from '@/lib/utils'

export function Button({ className, variant = 'default', size = 'default', ...props }) {
  return <ButtonPrimitive data-slot="button" data-variant={variant} data-size={size} className={cn('ui-button', className)} {...props} />
}
