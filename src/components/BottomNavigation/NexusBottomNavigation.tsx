import * as React from "react"
import { cn } from "../../lib/utils"

export interface NexusBottomNavigationProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: any
  onChange?: (event: React.SyntheticEvent, newValue: any) => void
  showLabels?: boolean
}

const NexusBottomNavigation = React.forwardRef<HTMLDivElement, NexusBottomNavigationProps>(
  ({ className, value, onChange, showLabels = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-full h-16 bg-background border-t flex items-center justify-center fixed bottom-0 left-0 right-0 z-50",
          className
        )}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) {
            return null
          }
          const childElement = child as React.ReactElement<any>;
          return React.cloneElement(childElement, {
            selected: value === childElement.props.value,
            onChange,
            showLabel: showLabels,
            value: childElement.props.value
          })
        })}
      </div>
    )
  }
)
NexusBottomNavigation.displayName = "NexusBottomNavigation"

export interface NexusBottomNavigationActionProps extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'onChange'> {
  label?: string
  value?: any
  icon?: React.ReactNode
  selected?: boolean
  showLabel?: boolean
  onChange?: (event: React.SyntheticEvent, newValue: any) => void
}

const NexusBottomNavigationAction = React.forwardRef<HTMLButtonElement, NexusBottomNavigationActionProps>(
  ({ className, label, icon, value, selected, onChange, showLabel, ...props }, ref) => {
    const handleChange = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (onChange) {
        onChange(event, value)
      }
    }

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleChange}
        className={cn(
          "flex-1 flex flex-col items-center justify-center gap-1 min-w-[64px] h-full text-muted-foreground transition-colors hover:text-primary",
          selected && "text-primary",
          !showLabel && !selected && "pt-2", // Add clear spacing if labels are hidden but pop up on select (standard material behavior, though here we either show or hide)
           className
        )}
        {...props}
      >
        {/* Render Icon (expecting Material Symbol string or Element) */}
        {typeof icon === 'string' ? (
             <span className={cn(
                 "material-symbols-outlined text-2xl transition-transform",
                 selected ? "scale-110" : "scale-100"
             )}>{icon}</span>
        ) : icon}

        {(showLabel || selected) && (
            <span className={cn(
                "text-xs font-medium transition-all",
                selected ? "opacity-100" : "opacity-75 scale-90"
            )}>
                {label}
            </span>
        )}
      </button>
    )
  }
)
NexusBottomNavigationAction.displayName = "NexusBottomNavigationAction"

export { NexusBottomNavigation, NexusBottomNavigationAction }
