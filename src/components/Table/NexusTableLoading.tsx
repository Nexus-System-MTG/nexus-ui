
// import * as React from "react"
import { cn } from "../../lib/utils"

interface NexusTableLoadingProps {
    type?: 'spinner' | 'bar'
    color?: string
}

export function NexusTableLoading({ type = 'spinner', color = 'primary' }: NexusTableLoadingProps) {
    if (type === 'bar') {
        return (
            <div className="w-full h-1 bg-muted overflow-hidden relative">
                <div 
                    className={cn(
                        "absolute top-0 left-0 h-full w-[40%] animate-loading-bar",
                        color === 'primary' ? "bg-primary" : `bg-[${color}]`
                    )} 
                />
            </div>
        )
    }

    return (
        <div className="absolute inset-0 z-[60] flex items-center justify-center bg-background/50 backdrop-blur-[1px]">
            <div 
                className={cn(
                    "animate-spin rounded-full h-8 w-8 border-b-2",
                    color === 'primary' ? "border-primary" : `border-[${color}]`
                )}
            />
        </div>
    )
}
