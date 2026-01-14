import * as React from "react"
import { type Row, flexRender } from "@tanstack/react-table"
import { cn } from "../../lib/utils"
import { motion, useMotionValue, useTransform } from "framer-motion"

interface NexusTableCardProps<TData> {
    row: Row<TData>
    onClick?: () => void
}

export function NexusTableCard<TData>({ row, onClick }: NexusTableCardProps<TData>) {
    const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
    const isLongPress = React.useRef(false)
    const [isSelected, setIsSelected] = React.useState(row.getIsSelected())
    
    // Swipe Logic
    const x = useMotionValue(0)
    const backgroundOpacity = useTransform(x, [-50, 0], [1, 0])
    
    React.useEffect(() => {
        setIsSelected(row.getIsSelected())
    }, [row.getIsSelected()])

    const handleTouchStart = () => {
        isLongPress.current = false
        timerRef.current = setTimeout(() => {
            isLongPress.current = true
            row.toggleSelected(!row.getIsSelected())
            if (window.navigator?.vibrate) window.navigator.vibrate(50)
        }, 500)
    }

    const handleTouchEnd = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current)
            timerRef.current = null
        }
    }

    const handleClick = () => {
        // Only trigger click if not dragged significantly
        if (Math.abs(x.get()) > 10) return

        if (!isLongPress.current && !isSelected) {
            onClick?.()
        } else if (!isLongPress.current && isSelected) {
             row.toggleSelected(!row.getIsSelected())
        }
    }

    return (
        <div className="relative overflow-hidden rounded-xl">
             {/* Background Actions */}
             <motion.div 
                style={{ opacity: backgroundOpacity }}
                className="absolute inset-y-0 right-0 flex w-[150px] items-center justify-end gap-2 pr-4 bg-red-500/20 rounded-xl"
             >
                 <button className="p-2 rounded-full bg-blue-500 text-white shadow-lg" onClick={() => console.log('Edit', row.id)}>
                    <span className="material-symbols-outlined text-[20px]">edit</span>
                 </button>
                 <button className="p-2 rounded-full bg-red-500 text-white shadow-lg" onClick={() => console.log('Delete', row.id)}>
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                 </button>
             </motion.div>

            <motion.div 
                className={cn(
                    "rounded-xl border bg-card/60 backdrop-blur-[4px] p-4 space-y-3 transition-all relative select-none touch-none",
                    isSelected ? "border-primary bg-primary/10" : "border-border"
                )}
                style={{ x }}
                drag="x"
                dragConstraints={{ left: -150, right: 0 }}
                dragElastic={0.1}
                onDragEnd={() => {
                    // Logic to snap back or stay open? 
                    // Usually snap back after action or if not pulled enough.
                    // For now simple slide.
                }}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onClick={handleClick}
                onContextMenu={(e) => {
                    e.preventDefault() 
                }}
            >
             {/* Selection Indicator */}
             {isSelected && (
                 <div className="absolute top-2 right-2 flex items-center justify-center h-5 w-5 rounded-full bg-primary shadow-[0_0_10px_var(--primary)] text-primary-foreground">
                    <span className="material-symbols-outlined text-[14px]">check</span>
                 </div>
             )}

             {row.getVisibleCells().map(cell => {
             if (cell.column.id === 'select' || cell.column.id === 'actions') return null
             
             return (
                 <div key={cell.id} className="flex flex-col gap-1 py-2 border-b border-border/40 last:border-0 px-1">
                     <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{cell.column.columnDef.header as string}</span>
                     <span className="text-sm text-foreground font-medium">
                         {flexRender(cell.column.columnDef.cell, cell.getContext())}
                     </span>
                 </div>
             )
        })}
        </motion.div>
    </div>
    )
}
