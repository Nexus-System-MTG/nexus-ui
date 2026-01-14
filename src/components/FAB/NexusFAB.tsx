import * as React from "react"
import { cn } from "../../lib/utils"
import { Button } from "../Button/Button"

export interface NexusFABProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string
  label?: string
  position?: 'bottom-right' | 'bottom-left' | 'none'
}

const NexusFAB = React.forwardRef<HTMLButtonElement, NexusFABProps>(
  ({ className, icon, label, position = 'none', ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="primary" // We'll override bg
        className={cn(
          "rounded-full w-14 h-14 p-0 shadow-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-black/20",
          position === 'bottom-right' && "fixed bottom-6 right-6 z-50",
          position === 'bottom-left' && "fixed bottom-6 left-6 z-50",
          className
        )}
        {...props}
      >
        <span className="material-symbols-outlined text-2xl">{icon}</span>
        {label && <span className="sr-only">{label}</span>}
      </Button>
    )
  }
)
NexusFAB.displayName = "NexusFAB"

export { NexusFAB }
