import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[1rem] text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 duration-200",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:opacity-90 shadow-md",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        glass: "bg-background/5 border border-white/10 text-foreground backdrop-blur-md hover:bg-background/10 shadow-lg",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        sm: "h-9 px-3",
        md: "h-[54px] px-6 py-2",
        lg: "h-14 px-8",
        icon: "h-10 w-10",
      },
      iconOnly: {
        true: "p-0 rounded-full aspect-square",
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
    compoundVariants: [
       { iconOnly: true, size: "sm", class: "w-9 h-9" },
       { iconOnly: true, size: "md", class: "w-10 h-10" },
       { iconOnly: true, size: "lg", class: "w-11 h-11" },
    ]
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  leftIcon?: string
  rightIcon?: string
  isLoading?: boolean
  href?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, iconOnly, asChild = false, leftIcon, rightIcon, isLoading, children, href, ...props }, ref) => {
    // Determine the component to render
    const Comp = asChild ? Slot : (href ? "a" : "button")
    
    // Logic for props that should be passed to the element
    // strict type safety might complain about href on button, but runtime is fine.
    const elementProps = { ...props, href } as Record<string, any>

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, iconOnly, className }))}
        ref={ref as any}
        disabled={isLoading || props.disabled}
        {...elementProps}
      >
        {asChild ? (
          children
        ) : (
          isLoading ? (
             <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
          ) : (
            <>
              {leftIcon && !isLoading && (
                 <span className="material-symbols-outlined text-[20px] mr-2">{leftIcon}</span>
              )}
              {children}
              {rightIcon && !isLoading && (
                 <span className="material-symbols-outlined text-[20px] ml-2">{rightIcon}</span>
              )}
            </>
          )
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
