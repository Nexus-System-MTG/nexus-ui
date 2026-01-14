import * as React from "react"
import { cn } from "../../lib/utils"

import { NexusDrawer, NexusDrawerContent, NexusDrawerTrigger } from "../Drawer/NexusDrawer"
import { Button } from "../Button/Button"

export interface NexusAppBarProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: "fixed" | "absolute" | "sticky" | "static" | "relative"
  color?: "primary" | "default" | "transparent"
  mobileMenuContent?: React.ReactNode
}

const NexusAppBar = React.forwardRef<HTMLDivElement, NexusAppBarProps>(
  ({ className, position = "fixed", color = "primary", mobileMenuContent, children, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={cn(
          "w-full flex flex-col z-50 transition-all duration-300",
          position === "fixed" && "fixed top-0 left-0 right-0",
          position === "sticky" && "sticky top-0",
          position === "absolute" && "absolute top-0 left-0 right-0",
          position === "relative" && "relative",
          
          color === "primary" && "bg-primary text-primary-foreground shadow-md",
          color === "default" && "bg-background border-b shadow-sm",
          color === "transparent" && "bg-transparent",
          className
        )}
        {...props}
      >
        <div className="flex items-center w-full px-4 h-16">
            {mobileMenuContent && (
                <div className="md:hidden mr-4">
                    <NexusDrawer>
                        <NexusDrawerTrigger asChild>
                            <Button variant="ghost" iconOnly className={cn(
                                "hover:bg-black/10", // adjust hover based on bg
                                color === 'primary' ? "text-primary-foreground hover:text-primary-foreground" : ""
                            )}>
                                <span className="material-symbols-outlined text-2xl">menu</span>
                            </Button>
                        </NexusDrawerTrigger>
                        <NexusDrawerContent side="left" className="w-[300px] sm:w-[350px]">
                             <div className="flex flex-col h-full">
                                {mobileMenuContent}
                             </div>
                        </NexusDrawerContent>
                    </NexusDrawer>
                </div>
            )}
            <div className="flex-1 flex items-center w-full">
                {children}
            </div>
        </div>
      </header>
    )
  }
)
NexusAppBar.displayName = "NexusAppBar"

export { NexusAppBar }
