import React from 'react'
import { cn } from "../../lib/utils"

export interface NexusPageTemplateProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    fullHeight?: boolean
}

export function NexusPageTemplate({ 
    children, 
    className, 
    fullHeight = true,
    ...props 
}: NexusPageTemplateProps) {
    return (
        <div className={cn("flex flex-col gap-6", fullHeight && "h-full", className)} {...props}>
            <div className="flex-1 overflow-hidden rounded-lg border border-border bg-card shadow-sm flex flex-col">
                {children}
            </div>
        </div>
    )
}
