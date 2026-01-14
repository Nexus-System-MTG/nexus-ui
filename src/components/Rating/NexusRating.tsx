import * as React from "react"
import { cn } from "../../lib/utils"

export interface NexusRatingProps {
  max?: number
  value?: number
  onChange?: (value: number) => void
  disabled?: boolean
  className?: string
}

const NexusRating = React.forwardRef<HTMLDivElement, NexusRatingProps>(
  ({ max = 5, value = 0, onChange, disabled, className, ...props }, ref) => {
    const [hoverValue, setHoverValue] = React.useState<number | null>(null)
    const [internalValue, setInternalValue] = React.useState(value)

    const currentValue = hoverValue ?? (onChange ? value : internalValue)

    const handleMouseEnter = (index: number) => {
      if (!disabled) setHoverValue(index)
    }

    const handleMouseLeave = () => {
      setHoverValue(null)
    }

    const handleClick = (index: number) => {
      if (!disabled) {
        setInternalValue(index)
        onChange?.(index)
      }
    }

    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-1", className)}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {Array.from({ length: max }).map((_, i) => {
            const index = i + 1
            const isFilled = index <= currentValue
            
            return (
                <button
                    key={i}
                    type="button"
                    disabled={disabled}
                    className={cn(
                        "focus:outline-none transition-transform hover:scale-110 disabled:opacity-50 disabled:hover:scale-100",
                        isFilled ? "text-yellow-400" : "text-white/20 hover:text-yellow-400/50"
                    )}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onClick={() => handleClick(index)}
                >
                    <span 
                        className={cn(
                            "material-symbols-outlined text-[24px]",
                            isFilled && "font-variation-fill" // Assuming font supports fill or we swap icon
                        )}
                        style={isFilled ? { fontVariationSettings: "'FILL' 1" } : {}}
                    >
                        {isFilled ? 'star' : 'star'} 
                    </span>
                </button>
            )
        })}
      </div>
    )
  }
)
NexusRating.displayName = "NexusRating"

export { NexusRating }
