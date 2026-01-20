import * as React from "react"
import type { Table } from "@tanstack/react-table"
import { NexusSelect } from "../Select/NexusSelect"
import { Button } from "../Button/Button"
import { Popover, PopoverContent, PopoverTrigger, PopoverPortal } from "@radix-ui/react-popover"
import { NexusTooltip, NexusTooltipProvider, NexusTooltipTrigger } from "../Tooltip/NexusTooltip"

interface NexusTableSortProps<TData> {
    table: Table<TData>
}

export function NexusTableSort<TData>({ table }: NexusTableSortProps<TData>) {
    const [open, setOpen] = React.useState(false)
    const sorting = table.getState().sorting

    const sortableColumns = React.useMemo(() => {
        return table.getAllColumns().filter((column) => column.getCanSort())
    }, [table])

    const handleAddSort = () => {
        const firstCol = sortableColumns[0]
        if (!firstCol) return
        
        // Add new sort rule (default asc)
        const newSorting = [...sorting, { id: firstCol.id, desc: false }]
        table.setSorting(newSorting)
    }

    const handleRemoveSort = (index: number) => {
        const newSorting = sorting.filter((_, i) => i !== index)
        table.setSorting(newSorting)
    }

    const handleUpdateSort = (index: number, updates: { id?: string, desc?: boolean }) => {
        const newSorting = sorting.map((sort, i) => {
            if (i !== index) return sort
            return { ...sort, ...updates }
        })
        table.setSorting(newSorting)
    }

    const handleSaveSort = () => {
        // Persist current sorting configuration
        const tableId = (table.options.meta as any)?.tableId
        if (tableId && typeof window !== 'undefined') {
            localStorage.setItem(`nexus-table-${tableId}-saved-sort`, JSON.stringify(sorting))
        }
        setOpen(false)
    }

    const handleClear = () => {
        table.setSorting([])
    }

    return (
        <NexusTooltipProvider>
            <Popover open={open} onOpenChange={setOpen}>
                <NexusTooltip content="Ordenar">
                    <NexusTooltipTrigger asChild>
                        <PopoverTrigger asChild>
                            <button 
                                className={`w-8 h-8 flex items-center justify-center transition-colors relative ${sorting.length > 0 || open ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                            >
                                <span className="material-symbols-outlined text-[20px]">swap_vert</span>
                                {sorting.length > 0 && (
                                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full" />
                                )}
                            </button>
                        </PopoverTrigger>
                    </NexusTooltipTrigger>
                </NexusTooltip>
                <PopoverPortal>
                    <PopoverContent className="w-[450px] p-0 bg-background border border-border rounded-xl shadow-2xl z-[1000] overflow-hidden" align="end" sideOffset={5}>
                    <div className="px-4 py-3 border-b border-border bg-muted/30 flex items-center justify-between">
                        <h4 className="font-semibold text-foreground">Ordenar</h4>
                    </div>

                <div className="p-4 space-y-4">
                     {sorting.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground border-2 border-dashed border-border/50 rounded-lg">
                             <p className="text-sm mb-4">Nenhuma ordenação aplicada.</p>
                             <Button variant="outline" size="sm" onClick={handleAddSort}>
                                <span className="material-symbols-outlined text-[16px] mr-2">add</span>
                                Adicionar ordenação
                             </Button>
                        </div>
                     ) : (
                         <div className="space-y-2">
                             {sorting.map((sort, index) => (
                                 <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-accent/20">
                                     <span className="text-xs font-medium text-muted-foreground w-12 text-right shrink-0">
                                         {index === 0 ? 'Por' : 'E por'}
                                     </span>
                                     
                                     <div className="flex-1 min-w-0">
                                         <NexusSelect
                                            value={sort.id}
                                            onChange={(val) => handleUpdateSort(index, { id: val })}
                                            options={sortableColumns.map(col => ({
                                                label: typeof col.columnDef.header === 'string' ? col.columnDef.header : col.id,
                                                value: col.id
                                            }))}
                                            className="truncate"
                                         />
                                     </div>

                                     <div className="w-[120px] shrink-0">
                                         <NexusSelect
                                            value={sort.desc ? 'desc' : 'asc'}
                                            onChange={(val) => handleUpdateSort(index, { desc: val === 'desc' })}
                                            options={[
                                                { label: 'Asc (A-Z)', value: 'asc' },
                                                { label: 'Desc (Z-A)', value: 'desc' },
                                            ]}
                                         />
                                     </div>

                                     <button 
                                        onClick={() => handleRemoveSort(index)}
                                        className="h-9 w-9 shrink-0 flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors rounded hover:bg-destructive/10"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">close</span>
                                    </button>
                                 </div>
                             ))}
                             
                             <div className="pl-[56px] pt-1">
                                <Button variant="ghost" size="sm" onClick={handleAddSort} className="text-primary hover:text-primary hover:bg-primary/10">
                                    <span className="material-symbols-outlined text-[16px] mr-2">add</span>
                                    Adicionar
                                </Button>
                             </div>
                         </div>
                     )}
                </div>
                
                 {/* Footer */}
                <div className="px-4 py-3 bg-muted/30 border-t border-border flex items-center justify-between">
                    <Button variant="ghost" size="sm" onClick={handleClear} className="text-muted-foreground hover:text-foreground">
                        Limpar
                    </Button>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => setOpen(false)} className="min-w-[100px]">
                            Fechar
                        </Button>
                        <Button variant="primary" size="sm" onClick={handleSaveSort} className="min-w-[100px] font-semibold">
                            <span className="material-symbols-outlined text-[16px] mr-2">bookmark</span>
                            Salvar Ordenação
                        </Button>
                    </div>
                </div>
            </PopoverContent>
            </PopoverPortal>
            </Popover>
        </NexusTooltipProvider>
    )
}
