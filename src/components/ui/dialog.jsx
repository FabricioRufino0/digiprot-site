import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { cn } from '@/lib/utils'

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogClose = DialogPrimitive.Close

export function DialogContent({ className, children, ...props }) {
  return <DialogPrimitive.Portal>
    <DialogPrimitive.Backdrop className="ui-dialog-backdrop" />
    <DialogPrimitive.Popup data-slot="dialog-content" className={cn('ui-dialog-content', className)} {...props}>{children}</DialogPrimitive.Popup>
  </DialogPrimitive.Portal>
}

export function DialogTitle({ className, ...props }) {
  return <DialogPrimitive.Title className={cn('ui-dialog-title', className)} {...props} />
}

export function DialogDescription({ className, ...props }) {
  return <DialogPrimitive.Description className={cn('ui-dialog-description', className)} {...props} />
}
