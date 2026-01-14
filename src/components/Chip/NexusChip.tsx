import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

// Moved from NexusBadge.tsx to be independent
const chipVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:opacity-80 shadow-[0_4px_14px_0_rgba(0,102,255,0.39)]",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive/80 text-destructive-foreground shadow hover:bg-destructive/60",
        outline: "text-foreground",
        glass: "border-white/10 bg-background/60 backdrop-blur-[4px] text-foreground hover:bg-white/10"
      },
    },
    defaultVariants: {
      variant: "glass", // Chip default
    },
  }
)

interface NexusChipProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {
    label: string
    onDelete?: () => void
    onClick?: () => void
    icon?: string
}

function NexusChip({ className, variant, label, onDelete, onClick, icon, ...props }: NexusChipProps) {
    const isClickable = !!onClick;
    
    return (
        <div 
            className={cn(
                chipVariants({ variant }), 
                "gap-1 pr-1 pl-2 py-1 text-sm cursor-default",
                isClickable && "cursor-pointer hover:opacity-80 active:scale-95 transition-all select-none",
                className
            )}
            onClick={onClick}
            role={isClickable ? "button" : undefined}
            tabIndex={isClickable ? 0 : undefined}
            {...props}
        >
            {icon && <span className="material-symbols-outlined text-[16px]">{icon}</span>}
            <span className="mr-1">{label}</span>
            {onDelete && (
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                    className="rounded-full hover:bg-white/20 p-0.5 flex items-center justify-center transition-colors focus:outline-none"
                    aria-label="Delete"
                >
                     <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
            )}
        </div>
    )
}

export { NexusChip, chipVariants }
