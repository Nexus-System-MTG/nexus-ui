import * as React from "react"
import type { Table } from "@tanstack/react-table"
import { NexusInput } from "../Input/NexusInput"
import { NexusSelect } from "../Select/NexusSelect"
import { Button } from "../Button/Button"
import { Popover, PopoverContent, PopoverTrigger, PopoverPortal } from "@radix-ui/react-popover"
import { NexusTooltip, NexusTooltipContent, NexusTooltipProvider, NexusTooltipTrigger } from "../Tooltip/NexusTooltip"
import { type AdvancedFilterState, type FilterRule } from "./NexusTable"

interface NexusTableFilterProps<TData> {
    table: Table<TData>
}

export function NexusTableFilter<TData>({ table }: NexusTableFilterProps<TData>) {
    const [open, setOpen] = React.useState(false)
    
    // Internal state for configuring filters before applying
    const [localState, setLocalState] = React.useState<AdvancedFilterState>({
        query: "",
        logic: "and",
        rules: []
    })

    // Sync with table state on open
    React.useEffect(() => {
        if (open) {
            const current = table.getState().globalFilter
            if (typeof current === 'object' && current !== null) {
                setLocalState(current as AdvancedFilterState)
            } else {
                 // Standard string search or empty
                 setLocalState({
                     query: typeof current === 'string' ? current : '',
                     logic: 'and',
                     rules: []
                 })
            }
        }
    }, [open, table])

    const filterableColumns = React.useMemo(() => {
        return table.getAllLeafColumns().filter((column) => column.getCanFilter())
    }, [table])

    const handleAddRule = () => {
        const firstCol = filterableColumns[0]
        if (!firstCol) return
        
        const newRule: FilterRule = {
            id: crypto.randomUUID(),
            columnId: firstCol.id,
            operator: 'contains',
            value: ''
        }
        setLocalState(prev => ({ ...prev, rules: [...prev.rules, newRule] }))
    }

    const handleRemoveRule = (ruleId: string) => {
        setLocalState(prev => ({ 
            ...prev, 
            rules: prev.rules.filter(r => r.id !== ruleId) 
        }))
    }

    const handleUpdateRule = (ruleId: string, updates: Partial<FilterRule>) => {
        setLocalState(prev => ({
            ...prev,
            rules: prev.rules.map(r => {
                if (r.id !== ruleId) return r
                
                // If column changes, reset operator/value defaults might be good, 
                // but let's keep it simple or check type
                if (updates.columnId && updates.columnId !== r.columnId) {
                    const col = table.getColumn(updates.columnId!)
                    const type = (col?.columnDef.meta as any)?.type || 'text'
                    // Reset operator based on type if needed
                    return { ...r, ...updates, value: '', operator: type === 'number' ? 'equals' : 'contains' } 
                }
                
                return { ...r, ...updates }
            })
        }))
    }

    const handleApply = () => {
        table.setGlobalFilter(localState)
        setOpen(false)
    }

    const handleClear = () => {
        const cleared: AdvancedFilterState = { query: localState.query, logic: 'and', rules: [] }
        setLocalState(cleared)
        table.setGlobalFilter(cleared) // Optional: apply immediately on clear? Or wait for Apply? Usually Clear applies.
    }

    // Helper to get operators for a column
    const getColumnOperators = (columnId: string) => {
        const col = table.getColumn(columnId)
        const type = (col?.columnDef.meta as any)?.type || 'text'
        return getOperators(type)
    }
    
    // Helper to get column type
    const getColumnType = (columnId: string) => {
        const col = table.getColumn(columnId)
        return (col?.columnDef.meta as any)?.type || 'text'
    }

    // Helper to get options
    const getColumnOptions = (columnId: string) => {
         const col = table.getColumn(columnId)
         return (col?.columnDef.meta as any)?.options || []
    }

    return (
        <NexusTooltipProvider>
            <Popover open={open} onOpenChange={setOpen}>
                <NexusTooltip content="Filtrar">
                    <NexusTooltipTrigger asChild>
                        <PopoverTrigger asChild>
                            <button 
                                className={`w-8 h-8 flex items-center justify-center transition-colors relative ${localState.rules.length > 0 || open ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                            >
                                <span className="material-symbols-outlined text-[20px]">filter_list</span>
                                {localState.rules.length > 0 && (
                                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full" />
                                )}
                            </button>
                        </PopoverTrigger>
                    </NexusTooltipTrigger>
                    <NexusTooltipContent side="top">
                        <p>Filtrar</p>
                    </NexusTooltipContent>
                </NexusTooltip>
                
                <PopoverPortal>
                    <PopoverContent className="w-[600px] p-0 bg-background border border-border rounded-xl shadow-2xl z-[1000] overflow-hidden" align="end" sideOffset={5}>
                    {/* Header */}
                    <div className="px-4 py-3 border-b border-border bg-muted/30 flex items-center justify-between">
                        <h4 className="font-semibold text-foreground">Filtros de Pesquisa</h4>
                    </div>

                {/* Body */}
                <div className="p-4 space-y-4">
                    
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Regras de Filtragem</span>
                        {localState.rules.length > 1 && (
                            <div className="flex items-center bg-muted rounded-lg p-1 border border-border ml-2">
                                <button
                                    onClick={() => setLocalState(s => ({ ...s, logic: 'and' }))}
                                    className={`px-3 py-0.5 text-xs rounded-md transition-all ${localState.logic === 'and' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                                >
                                    E
                                </button>
                                <button
                                    onClick={() => setLocalState(s => ({ ...s, logic: 'or' }))}
                                    className={`px-3 py-0.5 text-xs rounded-md transition-all ${localState.logic === 'or' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                                >
                                    OU
                                </button>
                            </div>
                        )}
                    </div>

                    {localState.rules.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground border-2 border-dashed border-border/50 rounded-lg">
                             <p className="text-sm mb-4">Nenhum filtro aplicado.</p>
                             <Button variant="outline" size="sm" onClick={handleAddRule}>
                                <span className="material-symbols-outlined text-[16px] mr-2">add</span>
                                Adicionar regra
                             </Button>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {localState.rules.map((rule, index) => (
                                <div key={rule.id} className="group flex items-start gap-2 p-2 rounded-lg bg-accent/20 border border-transparent hover:border-border/50 transition-colors">
                                    {/* Label logic: Show "Onde" for first, "E/OU" for others */}
                                    <div className="w-16 pt-2 text-right">
                                        <span className="text-xs font-medium text-muted-foreground">
                                            {index === 0 ? 'Onde' : (localState.logic === 'and' ? 'E' : 'Ou')}
                                        </span>
                                    </div>

                                    {/* Column Select */}
                                    <div className="w-[160px]">
                                        <NexusSelect
                                            value={rule.columnId}
                                            onChange={(val) => handleUpdateRule(rule.id, { columnId: val })}
                                            options={filterableColumns.map(col => ({
                                                label: typeof col.columnDef.header === 'string' ? col.columnDef.header : col.id,
                                                value: col.id
                                            }))}
                                            className="h-9"
                                            aria-label="Coluna"
                                        />
                                    </div>

                                    {/* Operator Select */}
                                    <div className="w-[140px]">
                                        <NexusSelect
                                            value={rule.operator}
                                            onChange={(val) => handleUpdateRule(rule.id, { operator: val as any })}
                                            options={getColumnOperators(rule.columnId)}
                                            className="h-9"
                                            aria-label="Operador"
                                        />
                                    </div>

                                    {/* Value Input */}
                                    <div className="flex-1">
                                        {getColumnType(rule.columnId) === 'select' ? (
                                             <NexusSelect
                                                value={rule.value}
                                                onChange={(val) => handleUpdateRule(rule.id, { value: val })}
                                                options={getColumnOptions(rule.columnId)}
                                                className="h-9"
                                                aria-label="Valor"
                                            />
                                        ) : getColumnType(rule.columnId) === 'boolean' ? (
                                            <NexusSelect
                                                value={String(rule.value)}
                                                onChange={(val) => handleUpdateRule(rule.id, { value: val === 'true' })}
                                                options={[
                                                    { label: 'Verdadeiro', value: 'true' },
                                                    { label: 'Falso', value: 'false' }
                                                ]}
                                                className="h-9"
                                                aria-label="Valor"
                                            />
                                        ) : ['isEmpty', 'isNotEmpty'].includes(rule.operator) ? (
                                            null
                                        ) : (
                                            <NexusInput
                                                value={rule.value}
                                                onChange={(e) => handleUpdateRule(rule.id, { value: e.target.value })}
                                                placeholder="Valor..."
                                                type={getColumnType(rule.columnId) === 'number' ? 'number' : 'text'}
                                                className="h-9"
                                                aria-label="Valor"
                                            />
                                        )}
                                    </div>

                                    {/* Delete */}
                                    <button 
                                        onClick={() => handleRemoveRule(rule.id)}
                                        className="h-9 w-9 flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors rounded hover:bg-destructive/10"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">delete</span>
                                    </button>
                                </div>
                            ))}
                            
                            <div className="pl-[72px] pt-2">
                                <Button variant="ghost" size="sm" onClick={handleAddRule} className="text-primary hover:text-primary hover:bg-primary/10">
                                    <span className="material-symbols-outlined text-[16px] mr-2">add</span>
                                    Adicionar regra
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-4 py-3 bg-muted/30 border-t border-border flex items-center justify-between">
                    <Button variant="ghost" size="sm" onClick={handleClear} className="text-muted-foreground hover:text-foreground">
                        Limpar Filtros
                    </Button>
                    <Button variant="primary" size="sm" onClick={handleApply} className="min-w-[100px] bg-amber-400 text-black hover:bg-amber-500 font-semibold">
                        Filtrar
                    </Button>
                </div>
            </PopoverContent>
            </PopoverPortal>
        </Popover>
        </NexusTooltipProvider>
    )
}

function getOperators(type: string) {
    // Common operators for all types
    const common = [
        { label: 'Contém', value: 'contains' },
        { label: 'Igual a', value: 'equals' },
        { label: 'Diferente de', value: 'ne' },
        { label: 'Vazio', value: 'isEmpty' },
        { label: 'Preenchido', value: 'isNotEmpty' },
    ]

    switch (type) {
        case 'number':
            return [
                { label: 'Igual a', value: 'equals' },
                { label: 'Diferente de', value: 'ne' },
                { label: 'Maior que', value: 'gt' },
                { label: 'Menor que', value: 'lt' },
                { label: 'Vazio', value: 'isEmpty' },
                { label: 'Preenchido', value: 'isNotEmpty' },
            ]
        case 'select':
        case 'boolean':
        case 'status':
             return [
                { label: 'Igual a', value: 'equals' },
                { label: 'Diferente de', value: 'ne' },
                { label: 'Vazio', value: 'isEmpty' },
                { label: 'Preenchido', value: 'isNotEmpty' },
            ]
        default:
            return common
    }
}
