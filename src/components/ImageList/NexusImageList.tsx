import * as React from "react"
import { cn } from "../../lib/utils"

export interface NexusImageListProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "standard" | "masonry" | "woven"
  cols?: number
  gap?: number
}

const NexusImageList = React.forwardRef<HTMLDivElement, NexusImageListProps>(
  ({ className, variant = "standard", cols = 3, gap = 4, ...props }, ref) => {
    
    // Convert generic number to Tailwind valid grid-cols (limited set for safety/simplicity or arbitrary style)
    // For robust layouts, we might inject inline styles for exact cols/gap, which is often cleaner for grids than thousands of classes.
    const style = {
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gap: `${gap * 0.25}rem` // assuming gap=1 is 0.25rem (tailwind standard)
    }

    return (
      <div
        ref={ref}
        className={cn(
          "grid",
          variant === "masonry" && "grid-rows-[masonry]", // Requires experimental support or custom implementation usually. We'll stick to standard grid for now.
          className
        )}
        style={style}
        {...props}
      />
    )
  }
)
NexusImageList.displayName = "NexusImageList"

const NexusImageListItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { 
      cols?: number
      rows?: number
  }
>(({ className, cols = 1, rows = 1, style, ...props }, ref) => {
    const itemStyle = {
        gridColumn: `span ${cols} / span ${cols}`,
        gridRow: `span ${rows} / span ${rows}`,
        ...style
    }

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden rounded-md", className)}
      style={itemStyle}
      {...props}
    />
  )
})
NexusImageListItem.displayName = "NexusImageListItem"

export { NexusImageList, NexusImageListItem }
