import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const typographyVariants = cva("text-white/90", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      p: "leading-7 [&:not(:first-child)]:mt-6",
      blockquote: "mt-6 border-l-2 pl-6 italic",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "p",
  },
})

interface NexusTypographyProps
  extends React.HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement>,
    VariantProps<typeof typographyVariants> {
    as?: React.ElementType
}

const NexusTypography = React.forwardRef<HTMLElement, NexusTypographyProps>(
  ({ className, variant, as, ...props }, ref) => {
    const Comp = as || (variant === "large" || variant === "small" || variant === "muted" ? "span" : variant || "p")
    
    // Casting ref to any because the specific element type depends on 'as' prop which is dynamic
    return (
      // @ts-ignore
      <Comp
        ref={ref}
        className={cn(typographyVariants({ variant, className }))}
        {...props}
      />
    )
  }
)
NexusTypography.displayName = "NexusTypography"

export { NexusTypography, typographyVariants }
