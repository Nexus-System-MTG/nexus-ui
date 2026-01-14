import * as React from "react"
import { cn } from "../../lib/utils"

export interface NexusBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
}

const NexusBox = React.forwardRef<HTMLDivElement, NexusBoxProps>(
  ({ className, as: Component = "div", ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn("", className)}
        {...props}
      />
    )
  }
)
NexusBox.displayName = "NexusBox"

export { NexusBox }
