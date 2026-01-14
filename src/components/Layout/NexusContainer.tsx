import * as React from "react"
import { cn } from "../../lib/utils"

export interface NexusContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full" | false
  centered?: boolean
}

const NexusContainer = React.forwardRef<HTMLDivElement, NexusContainerProps>(
  ({ className, as: Component = "div", maxWidth = "lg", centered = true, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "w-full px-4 md:px-6", // Default padding
          centered && "mx-auto", // Center horizontally
          // Max Widths
          maxWidth === "sm" && "max-w-screen-sm",
          maxWidth === "md" && "max-w-screen-md",
          maxWidth === "lg" && "max-w-screen-lg",
          maxWidth === "xl" && "max-w-screen-xl",
          maxWidth === "2xl" && "max-w-screen-2xl",
          maxWidth === "full" && "max-w-full",
          className
        )}
        {...props}
      />
    )
  }
)
NexusContainer.displayName = "NexusContainer"

export { NexusContainer }
