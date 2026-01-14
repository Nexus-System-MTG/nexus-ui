import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cn } from "../../lib/utils"

const NexusDialog = DialogPrimitive.Root

const NexusDialogTrigger = DialogPrimitive.Trigger

const NexusDialogPortal = DialogPrimitive.Portal

const NexusDialogClose = DialogPrimitive.Close

const NexusDialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
NexusDialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const NexusDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & { closeRight?: boolean }
>(({ className, children, closeRight = true, ...props }, ref) => (
  <NexusDialogPortal>
    <NexusDialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] border bg-background shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        // Flex column layout for fixed header/footer
        "flex flex-col max-h-[90vh] p-0 gap-0", 
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close 
        className={cn(
            "absolute top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
            closeRight ? "right-4" : "left-4"
        )}
      >
        <span className="material-symbols-outlined text-[20px]">close</span>
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </NexusDialogPortal>
))
NexusDialogContent.displayName = DialogPrimitive.Content.displayName

const NexusDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left px-6 py-4 border-b border-border",
      className
    )}
    {...props}
  />
)
NexusDialogHeader.displayName = "NexusDialogHeader"

const NexusDialogBody = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex-1 overflow-y-auto px-6 py-4",
      className
    )}
    {...props}
  />
)
NexusDialogBody.displayName = "NexusDialogBody"

const NexusDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 border-t border-border px-6 py-3 bg-muted/20 shrink-0 gap-2",
      className
    )}
    {...props}
  />
)
NexusDialogFooter.displayName = "NexusDialogFooter"

const NexusDialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
NexusDialogTitle.displayName = DialogPrimitive.Title.displayName

const NexusDialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
NexusDialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  NexusDialog,
  NexusDialogPortal,
  NexusDialogOverlay,
  NexusDialogClose,
  NexusDialogTrigger,
  NexusDialogContent,
  NexusDialogHeader,
  NexusDialogFooter,
  NexusDialogTitle,
  NexusDialogDescription,
  NexusDialogBody
}
