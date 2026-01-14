import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { cn } from "../../lib/utils"

const NexusAccordion = AccordionPrimitive.Root

const NexusAccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b border-black/5 last:border-b-0", className)}
    {...props}
  />
))
NexusAccordionItem.displayName = "NexusAccordionItem"

const NexusAccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:bg-black/5 px-2 rounded-t-sm [&[data-state=open]]:bg-black/5 [&[data-state=open]>span]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <span className="material-symbols-outlined text-[18px] transition-transform duration-200">expand_more</span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
NexusAccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const NexusAccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
        "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down data-[state=open]:bg-black/5 rounded-b-sm",
      className
    )}
    {...props}
  >
    <div className={cn("pb-4 pt-0 px-2", className)}>{children}</div>
  </AccordionPrimitive.Content>
))
NexusAccordionContent.displayName = AccordionPrimitive.Content.displayName

export { NexusAccordion, NexusAccordionItem, NexusAccordionTrigger, NexusAccordionContent }
