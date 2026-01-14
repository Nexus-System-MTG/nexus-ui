import * as React from "react"
import { cn } from "../../lib/utils"

type GridSpacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12
type GridSize = boolean | "auto" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export interface NexusGridProps extends React.HTMLAttributes<HTMLDivElement> {
  container?: boolean
  item?: boolean
  spacing?: GridSpacing
  xs?: GridSize
  sm?: GridSize
  md?: GridSize
  lg?: GridSize
  xl?: GridSize
}

// Helper to map spacing to Tailwind gap classes
const spacingMap: Record<GridSpacing, string> = {
  0: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8",
  10: "gap-10",
  12: "gap-12",
}

// Helper to generate col-span classes
const getColSpanClass = (size?: GridSize, prefix?: string) => {
  if (!size) return ""
  if (size === true) return prefix ? `${prefix}:col-span-1` : "col-span-1" // Default or flex-grow logic could go here
  if (size === "auto") return prefix ? `${prefix}:col-auto` : "col-auto"
  return prefix ? `${prefix}:col-span-${size}` : `col-span-${size}`
}

const NexusGrid = React.forwardRef<HTMLDivElement, NexusGridProps>(
  ({ 
    className, 
    container, 
    item, 
    spacing = 0, 
    xs, 
    sm, 
    md, 
    lg, 
    xl, 
    children, 
    ...props 
  }, ref) => {
    
    // If it's a container, it behaves like a grid row wrapper
    if (container) {
      return (
        <div
          ref={ref}
          className={cn(
            "grid grid-cols-12", // 12 column system
            spacingMap[spacing],
            className
          )}
          {...props}
        >
          {children}
        </div>
      )
    }

    // If it's an item, it behaves like a grid column
    // We treat 'xs' as the default (mobile) breakpoint
    return (
      <div
        ref={ref}
        className={cn(
          getColSpanClass(xs),
          getColSpanClass(sm, "sm"),
          getColSpanClass(md, "md"),
          getColSpanClass(lg, "lg"),
          getColSpanClass(xl, "xl"),
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
NexusGrid.displayName = "NexusGrid"

export { NexusGrid }
