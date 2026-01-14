import * as React from "react"
import { cn } from "../../lib/utils"

const NexusList = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-col space-y-1", className)}
    {...props}
  />
))
NexusList.displayName = "NexusList"

const NexusListItem = React.forwardRef<
  HTMLLIElement,
  React.LiHTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn(
      "px-3 py-2 rounded-md transition-colors hover:bg-white/5 text-sm text-white/80",
      className
    )}
    {...props}
  />
))
NexusListItem.displayName = "NexusListItem"

export { NexusList, NexusListItem }
