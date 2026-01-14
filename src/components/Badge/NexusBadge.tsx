import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "absolute flex items-center justify-center rounded-full text-[10px] font-bold leading-none text-white transition-all transform -translate-y-1/2 translate-x-1/2 z-10",
  {
    variants: {
      variant: {
        default: "bg-primary border border-white/20 text-primary-foreground",
        destructive: "bg-red-500 border border-white/20",
        secondary: "bg-secondary text-secondary-foreground",
        outline: "bg-background text-foreground border border-input",
      },
      size: {
        default: "h-5 min-w-[1.25rem] px-1",
        dot: "h-2.5 w-2.5 p-0",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface NexusBadgeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'>, VariantProps<typeof badgeVariants> {
    content?: React.ReactNode
    max?: number
    showZero?: boolean
    invisible?: boolean
}

function NexusBadge({ 
    className, 
    variant, 
    size,
    content, 
    max = 99, 
    showZero = false,
    invisible = false,
    children, 
    ...props 
}: NexusBadgeProps) {
    
    // Logic for max
    const contentToRender = typeof content === 'number' && content > max ? `${max}+` : content;

    if (invisible) return <>{children}</>;
    
    // If no children, just render the badge itself (less common but possible)
    if (!children) {
         return (
            <span 
                className={cn(badgeVariants({ variant, size }), className, "relative translate-x-0 translate-y-0")}
                {...props}
            >
                {size !== 'dot' && contentToRender}
            </span>
         )
    }

    if (content === 0 && !showZero && !props.hidden && size !== 'dot') return <div className="relative inline-flex shrink-0">{children}</div>;

    return (
        <div className="relative inline-flex shrink-0">
            {children}
            <span 
                className={cn(badgeVariants({ variant, size }), className, "top-0 right-0")}
                {...props}
            >
                {size !== 'dot' && contentToRender}
            </span>
        </div>
    )
}

export { NexusBadge, badgeVariants }
