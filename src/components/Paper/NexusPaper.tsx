import * as React from "react"
import { cn } from "../../lib/utils"

export interface NexusPaperProps extends React.HTMLAttributes<HTMLDivElement> {
  elevation?: 0 | 1 | 2 | 3 | 4 | 5
  square?: boolean
}

const elevationMap = {
  0: "shadow-none",
  1: "shadow-sm",
  2: "shadow",
  3: "shadow-md",
  4: "shadow-lg",
  5: "shadow-xl"
}

const NexusPaper = React.forwardRef<HTMLDivElement, NexusPaperProps>(
  ({ className, elevation = 1, square = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-card text-card-foreground border",
          elevationMap[elevation],
          !square && "rounded-lg",
          className
        )}
        {...props}
      />
    )
  }
)
NexusPaper.displayName = "NexusPaper"

export { NexusPaper }
