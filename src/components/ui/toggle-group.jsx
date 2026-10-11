import { Toggle } from '@base-ui/react/toggle'
import { ToggleGroup as ToggleGroupPrimitive } from '@base-ui/react/toggle-group'
import { cn } from '@/lib/utils'

export function ToggleGroup({ className, ...props }) {
  return <ToggleGroupPrimitive data-slot="toggle-group" className={cn('ui-toggle-group', className)} {...props} />
}

export function ToggleGroupItem({ className, ...props }) {
  return <Toggle data-slot="toggle-group-item" className={cn('ui-toggle', className)} {...props} />
}
