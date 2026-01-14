import * as React from "react"
import { cn } from "../../lib/utils"
import { Button } from "../Button/Button"
import { NexusCheckbox } from "../Checkbox/NexusCheckbox"

export interface TransferItem {
  id: string
  label: string
}

export interface TransferListProps {
    leftItems: TransferItem[]
    rightItems: TransferItem[]
    onChange: (left: TransferItem[], right: TransferItem[]) => void
    className?: string
}

const NexusTransferList = React.forwardRef<HTMLDivElement, TransferListProps>(
    ({ leftItems, rightItems, onChange, className }, ref) => {
        const [leftChecked, setLeftChecked] = React.useState<Set<string>>(new Set())
        const [rightChecked, setRightChecked] = React.useState<Set<string>>(new Set())

        const handleToggle = (id: string, side: 'left' | 'right') => {
            const set = side === 'left' ? new Set(leftChecked) : new Set(rightChecked)
            if (set.has(id)) set.delete(id)
            else set.add(id)
            
            if (side === 'left') setLeftChecked(set)
            else setRightChecked(set)
        }

        const moveRight = () => {
            const newRight = [...rightItems, ...leftItems.filter((i: TransferItem) => leftChecked.has(i.id))]
            const newLeft = leftItems.filter((i: TransferItem) => !leftChecked.has(i.id))
            onChange(newLeft, newRight)
            setLeftChecked(new Set())
        }

        const moveLeft = () => {
             const newLeft = [...leftItems, ...rightItems.filter((i: TransferItem) => rightChecked.has(i.id))]
             const newRight = rightItems.filter((i: TransferItem) => !rightChecked.has(i.id))
             onChange(newLeft, newRight)
             setRightChecked(new Set())
        }
        
        const moveAllRight = () => {
            onChange([], [...rightItems, ...leftItems])
            setLeftChecked(new Set())
        }

        const moveAllLeft = () => {
            onChange([...leftItems, ...rightItems], [])
            setRightChecked(new Set())
        }

        return (
            <div ref={ref} className={cn("flex items-center gap-4", className)}>
                <List 
                    items={leftItems} 
                    checked={leftChecked} 
                    onToggle={(id) => handleToggle(id, 'left')} 
                    title="Available"
                />
                <div className="flex flex-col gap-2">
                    <Button variant="glass" size="sm" onClick={moveAllRight} iconOnly aria-label="Move All Right">
                        <span className="material-symbols-outlined">keyboard_double_arrow_right</span>
                    </Button>
                    <Button variant="glass" size="sm" onClick={moveRight} iconOnly aria-label="Move Right">
                        <span className="material-symbols-outlined">chevron_right</span>
                    </Button>
                    <Button variant="glass" size="sm" onClick={moveLeft} iconOnly aria-label="Move Left">
                         <span className="material-symbols-outlined">chevron_left</span>
                    </Button>
                    <Button variant="glass" size="sm" onClick={moveAllLeft} iconOnly aria-label="Move All Left">
                         <span className="material-symbols-outlined">keyboard_double_arrow_left</span>
                    </Button>
                </div>
                <List 
                    items={rightItems} 
                    checked={rightChecked} 
                    onToggle={(id) => handleToggle(id, 'right')} 
                     title="Selected"
                />
            </div>
        )
})

const List = ({ items, checked, onToggle, title }: { items: TransferItem[], checked: Set<string>, onToggle: (id: string) => void, title: string }) => (
    <div className="flex-1 flex flex-col gap-2 h-64 w-48 rounded-xl border border-[var(--nx-glass-border)] bg-[rgba(25,34,51,0.6)] backdrop-blur-[4px] p-3 shadow-sm">
        <h4 className="text-sm font-medium text-white/80 ml-1">{title}</h4>
        <div className="flex-1 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
            {items.map(item => (
                <div 
                    key={item.id} 
                    className={cn(
                        "flex items-center gap-2 p-2 rounded-md hover:bg-white/5 cursor-pointer transition-colors",
                         checked.has(item.id) && "bg-white/10"
                    )}
                    onClick={() => onToggle(item.id)}
                >
                    <NexusCheckbox checked={checked.has(item.id)} onCheckedChange={() => {}} tabIndex={-1} />
                    <span className="text-sm text-white">{item.label}</span>
                </div>
            ))}
        </div>
    </div>
)


export { NexusTransferList }
