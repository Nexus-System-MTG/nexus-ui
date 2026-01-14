// Imports fixed in previous step
import { cn } from "../../lib/utils"
// We will need icons here.
// Assuming Lucide is available as requested.
// import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff } from "lucide-react" 
// But context says Material Symbols. I should stick to Material Symbols if possible for consistency, 
// OR use Lucide as requested in Phase 5 ("Install @tanstack/react-table and lucide-react").
// I will use Lucide since user explicitly asked for it for the table phase.
import { ArrowDown, ArrowUp } from "lucide-react"

// import { Button } from "../Button/Button"
// import {
//   NexusDropdownMenu,
//   NexusDropdownMenuContent,
//   NexusDropdownMenuItem,
//   NexusDropdownMenuSeparator,
//   NexusDropdownMenuTrigger,
// } from "../DropdownMenu/NexusDropdownMenu"
import { type Column } from "@tanstack/react-table"

interface NexusTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function NexusTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: NexusTableColumnHeaderProps<TData, TValue>) {
  // Sorting is now handled globally via Toolbar.
  // We only show visual feedback if sorted.
  
  return (
    <div className={cn("flex items-center space-x-2", className)}>
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        {column.getIsSorted() === "desc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
        ) : column.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
        ) : null}
    </div>
  )
}
