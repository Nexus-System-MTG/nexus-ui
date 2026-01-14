import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cn } from "../../lib/utils"

const NexusTooltipRoot = TooltipPrimitive.Root
const NexusTooltipTrigger = TooltipPrimitive.Trigger
const NexusTooltipProvider = TooltipPrimitive.Provider

const NexusTooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md border border-[var(--nx-glass-border)] bg-[rgba(25,34,51,0.8)] backdrop-blur-[8px] px-3 py-1.5 text-xs text-white shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
NexusTooltipContent.displayName = TooltipPrimitive.Content.displayName

export interface NexusTooltipProps {
    children: React.ReactNode
    content: React.ReactNode
}

function NexusTooltip({ children, content }: NexusTooltipProps) {
    const isSingleChild = React.Children.count(children) === 1 && React.isValidElement(children)
    
    return (
        <NexusTooltipProvider>
            <NexusTooltipRoot>
                <NexusTooltipTrigger asChild>
                    {isSingleChild ? children : <span>{children}</span>}
                </NexusTooltipTrigger>
                <NexusTooltipContent>
                    {content}
                </NexusTooltipContent>
            </NexusTooltipRoot>
        </NexusTooltipProvider>
    )
}

export { NexusTooltip, NexusTooltipRoot, NexusTooltipTrigger, NexusTooltipContent, NexusTooltipProvider }
