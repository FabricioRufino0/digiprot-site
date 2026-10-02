import { Tabs as TabsPrimitive } from '@base-ui/react/tabs'
import { cn } from '@/lib/utils'

function Tabs({ className, ...props }) { return <TabsPrimitive.Root data-slot="tabs" className={cn('digiprot-tabs', className)} {...props} /> }
function TabsList({ className, ...props }) { return <TabsPrimitive.List data-slot="tabs-list" className={cn('digiprot-tabs-list', className)} {...props} /> }
function TabsTrigger({ className, ...props }) { return <TabsPrimitive.Tab data-slot="tabs-trigger" className={cn('digiprot-tabs-trigger', className)} {...props} /> }
function TabsContent({ className, ...props }) { return <TabsPrimitive.Panel keepMounted data-slot="tabs-content" className={cn('digiprot-tabs-content', className)} {...props} /> }
export { Tabs, TabsList, TabsTrigger, TabsContent }
