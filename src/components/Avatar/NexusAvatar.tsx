import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cn } from "../../lib/utils"

const NexusAvatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-[var(--nx-glass-border)] shadow-sm",
      className
    )}
    {...props}
  />
))
NexusAvatar.displayName = AvatarPrimitive.Root.displayName

const NexusAvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
NexusAvatarImage.displayName = AvatarPrimitive.Image.displayName

const NexusAvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-[rgba(25,34,51,0.6)] backdrop-blur-[4px] text-white/80 font-medium",
      className
    )}
    {...props}
  />
))
NexusAvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { NexusAvatar, NexusAvatarImage, NexusAvatarFallback }
