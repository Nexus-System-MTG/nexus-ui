import * as React from "react"
import { cn } from "../../lib/utils"

const alertVariants = {
  success: {
    container: "bg-green-500/10 text-green-700 border-green-700",
    icon: "text-green-700",
    defaultIcon: "check_circle"
  },
  error: {
    container: "bg-red-500/10 text-red-700 border-red-700",
    icon: "text-red-700",
    defaultIcon: "error"
  },
  warning: {
    container: "bg-yellow-500/10 text-yellow-700 border-yellow-700",
    icon: "text-yellow-700",
    defaultIcon: "warning"
  },
  info: {
    container: "bg-blue-500/10 text-blue-700 border-blue-700",
    icon: "text-blue-700",
    defaultIcon: "info"
  }
}

export interface NexusAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof alertVariants
  title?: string
  icon?: string
  onClose?: () => void
  /**
   * If true, the alert will automatically call onClose after `duration` ms.
   * Default: true
   */
  autoDismiss?: boolean
  /**
   * Duration in milliseconds before auto-dismissing.
   * Default: 5000
   */
  duration?: number
}

export function NexusAlert({ 
  variant = "info", 
  title, 
  icon, 
  onClose, 
  autoDismiss = true,
  duration = 5000,
  children, 
  className,
  ...props 
}: NexusAlertProps) {
  const styles = alertVariants[variant]
  const iconName = icon || styles.defaultIcon

  React.useEffect(() => {
    if (!autoDismiss || !onClose) return

    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [autoDismiss, duration, onClose])

  return (
    <div 
      role="alert"
      className={cn(
        "relative w-full rounded-lg border px-4 py-3 text-sm flex items-start gap-4",
        styles.container,
        className
      )}
      {...props}
    >
      <span className={cn("material-symbols-outlined text-[24px] mt-0.5 shrink-0 select-none", styles.icon)}>
        {iconName}
      </span>
      
      <div className="flex-1 space-y-1">
          {title && <h5 className="font-semibold leading-tight tracking-tight mb-1">{title}</h5>}
          <div className="text-sm opacity-90 leading-relaxed font-body">
            {children}
          </div>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className={cn(
            "ml-auto -mr-2 -mt-2 p-2 hover:bg-black/5 rounded-full transition-colors",
            styles.icon
          )}
        >
           <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      )}
    </div>
  )
}
