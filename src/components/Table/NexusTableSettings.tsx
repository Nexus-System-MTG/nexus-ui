import * as React from "react"
import type { Table } from "@tanstack/react-table"
import { NexusSelect } from "../Select/NexusSelect"
import { Popover, PopoverContent, PopoverTrigger, PopoverPortal } from "@radix-ui/react-popover"
import { NexusCheckbox } from "../Checkbox/NexusCheckbox"
import type { DetailViewMode } from "./NexusTableDetailView"
import { NexusTooltip, NexusTooltipContent, NexusTooltipProvider, NexusTooltipTrigger } from "../Tooltip/NexusTooltip"
import { Reorder } from "framer-motion"

interface NexusTableSettingsProps<TData> {
    table: Table<TData>
    detailViewMode: DetailViewMode
    onDetailViewModeChange: (mode: DetailViewMode) => void
    layoutMode: 'table' | 'card'
    onLayoutModeChange: (mode: 'table' | 'card') => void
    enableCustomization?: boolean
}

export function NexusTableSettings<TData>({ 
    table, 
    detailViewMode, 
    onDetailViewModeChange,
    layoutMode,
    onLayoutModeChange,
    enableCustomization 
}: NexusTableSettingsProps<TData>) {
    const [open, setOpen] = React.useState(false)

    // Columns for Visibility
    const allColumns = table.getAllLeafColumns()

    // Grouping: Filter items that are groupable AND (select, multiselect, status, or boolean)
    // We assume columnDef.meta.dataType holds the type
    const groupableColumns = allColumns.filter(col => {
        const meta = col.columnDef.meta as any
        return col.getCanGroup() && (
            meta?.dataType === 'select' || 
            meta?.dataType === 'multiselect' || 
            meta?.dataType === 'status' || 
            meta?.dataType === 'boolean'
        )
    })
    
    const grouping = table.getState().grouping
    
    // Check if grouping is supported
    const canGroup = groupableColumns.length > 0 && !!table.getGroupedRowModel

    // Active state check: Grouping active or columns hidden
    const isCustomized = grouping.length > 0 || !table.getIsAllColumnsVisible()

    return (
         <NexusTooltipProvider>
            <Popover open={open} onOpenChange={setOpen}>
                <NexusTooltip>
                    <NexusTooltipTrigger asChild>
                        <PopoverTrigger asChild>
                            <button 
                                className={`w-8 h-8 flex items-center justify-center transition-colors relative ${isCustomized || open ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                            >
                                <span className="material-symbols-outlined text-[20px]">settings</span>
                                {isCustomized && (
                                     <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full" />
                                )}
                            </button>
                        </PopoverTrigger>
                    </NexusTooltipTrigger>
                    <NexusTooltipContent side="top">
                        <p>Configurações</p>
                    </NexusTooltipContent>
                </NexusTooltip>
            
            <PopoverPortal>
                <PopoverContent className="w-[320px] p-0 bg-background border border-border rounded-xl shadow-2xl z-[1000] overflow-hidden" align="end" sideOffset={5}>
                     <div className="px-4 py-3 border-b border-border bg-muted/30">
                         <h4 className="font-semibold text-foreground">Configurações da Tabela</h4>
                    </div>
                
                <div className="p-4 space-y-6 max-h-[400px] overflow-y-auto">
                    {/* Layout Mode */}
                    <div className="space-y-2">
                            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Layout</label>
                            <div className="flex bg-muted/20 rounded p-1 border border-border">
                                <button 
                                    onClick={() => onLayoutModeChange('table')} 
                                    className={`flex-1 flex items-center justify-center p-1.5 rounded transition-all ${layoutMode === 'table' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-white/10'}`}
                                >
                                  <span className="material-symbols-outlined text-[16px] mr-2">table_rows</span>
                                  <span className="text-xs font-medium">Tabela</span>
                                </button>
                                <button 
                                    onClick={() => onLayoutModeChange('card')} 
                                    className={`flex-1 flex items-center justify-center p-1.5 rounded transition-all ${layoutMode === 'card' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-white/10'}`}
                                >
                                  <span className="material-symbols-outlined text-[16px] mr-2">grid_view</span>
                                  <span className="text-xs font-medium">Cards</span>
                                </button>
                            </div>
                    </div>

                    {/* View Mode */}
                    {enableCustomization && (
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Detalhes (Ao Clicar)</label>
                            <div className="flex bg-muted/20 rounded p-1 border border-border">
                                <button 
                                    onClick={() => onDetailViewModeChange('modal')} 
                                    className={`flex-1 flex items-center justify-center p-1.5 rounded transition-all ${detailViewMode === 'modal' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-white/10'}`}
                                    title="Modal (Centro)"
                                >
                                  <span className="material-symbols-outlined text-[18px]">branding_watermark</span>
                                </button>
                                <button 
                                    onClick={() => onDetailViewModeChange('sheet')} 
                                    className={`flex-1 flex items-center justify-center p-1.5 rounded transition-all ${detailViewMode === 'sheet' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-white/10'}`}
                                    title="Sheet (Lateral)"
                                >
                                  <span className="material-symbols-outlined text-[18px]">dock_to_right</span>
                                </button>
                                <button 
                                    onClick={() => onDetailViewModeChange('fullscreen')} 
                                    className={`flex-1 flex items-center justify-center p-1.5 rounded transition-all ${detailViewMode === 'fullscreen' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-white/10'}`}
                                    title="Tela Cheia"
                                >
                                  <span className="material-symbols-outlined text-[18px]">fullscreen</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Grouping */}
                    {canGroup && enableCustomization && (
                        <div className="space-y-2">
                             <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Agrupar por</label>
                             <NexusSelect
                                value={grouping[0] || ''}
                                onChange={(val) => {
                                    if(!val) table.setGrouping([])
                                    else table.setGrouping([val])
                                }}
                                placeholder="Nenhum agrupamento"
                                options={[
                                    { label: 'Nenhum', value: '' },
                                    ...groupableColumns.map(col => ({
                                        label: typeof col.columnDef.header === 'string' ? col.columnDef.header : col.id,
                                        value: col.id
                                    }))
                                ]}
                             />
                        </div>
                    )}

                    {/* Column Visibility */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Colunas Visíveis</label>
                        <Reorder.Group 
                            axis="y" 
                            values={allColumns.filter(c => c.getCanHide()).map(c => c.id)} 
                            onReorder={(newOrder) => {
                                // We need to preserve the order of non-hideable columns (like actions)
                                const fixedColumns = allColumns.filter(c => !c.getCanHide()).map(c => c.id)
                                // Standard approach: put reordered columns first, then fixed columns (usually actions is at the end)
                                table.setColumnOrder([...newOrder, ...fixedColumns])
                            }}
                            className="space-y-1 bg-accent/20 rounded-lg p-2 max-h-[150px] overflow-y-auto"
                        >
                            {allColumns.filter(column => column.getCanHide()).map(column => (
                                <Reorder.Item 
                                    key={column.id} 
                                    value={column.id}
                                    className="flex items-center gap-2 px-2 py-1.5 hover:bg-muted/50 rounded transition-colors group cursor-grab active:cursor-grabbing"
                                >
                                    {/* Drag Handle */}
                                    <span className="material-symbols-outlined text-[16px] text-muted-foreground/30 group-hover:text-muted-foreground transition-colors cursor-grab">
                                        drag_indicator
                                    </span>

                                    <NexusCheckbox 
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(val) => column.toggleVisibility(!!val)}
                                        className="mr-2"
                                    />
                                    <span className="text-sm select-none">
                                        {typeof column.columnDef.header === 'string' ? column.columnDef.header : column.id}
                                    </span>
                                </Reorder.Item>
                            ))}
                        </Reorder.Group>
                    </div>
                </div>
                </PopoverContent>
            </PopoverPortal>
            </Popover>
          </NexusTooltipProvider>
    )
}
