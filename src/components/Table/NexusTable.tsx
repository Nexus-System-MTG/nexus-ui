import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  useReactTable,
  type Row,
  type GroupingState,
  type ExpandedState,
} from "@tanstack/react-table"
import { Button } from "../Button/Button"
import { NexusSelect } from "../Select/NexusSelect"
import { NexusChip } from "../Chip/NexusChip"
import { NexusCheckbox } from "../Checkbox/NexusCheckbox"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { NexusTableCard } from "./NexusTableCard"
import { NexusTableToolbar } from "./NexusTableToolbar"
import { NexusTableForm } from "./NexusTableForm"
import { NexusTableLoading } from "./NexusTableLoading"
import { NexusTableDetailView, type DetailViewMode, type DetailSection } from "./NexusTableDetailView"
import { NexusTableMassEdit } from "./NexusTableMassEdit"
import { NexusDropdownMenu, NexusDropdownMenuContent, NexusDropdownMenuItem, NexusDropdownMenuTrigger } from "../DropdownMenu/NexusDropdownMenu"
import { cn } from "../../lib/utils"


// Advanced Filter Types
export type FilterOperator = 'contains' | 'equals' | 'startsWith' | 'endsWith' | 'gt' | 'lt' | 'ne' | 'isEmpty' | 'isNotEmpty'

// Simplified Column Definitions
export type NexusDataType = 'text' | 'number' | 'select' | 'multiselect' | 'date' | 'currency' | 'status'

export interface NexusColumnDef {
    key: string
    label: string
    dataType?: NexusDataType
    valueColorMap?: Record<string, string>
    form?: {
        required?: boolean
        label?: string
        type?: 'text' | 'number' | 'date' | 'select' | 'password' | 'textarea'
        options?: { label: string, value: any }[]
        defaultValue?: any
    }
}

export interface NexusRowAction<TData> {
    label: string
    icon?: string
    onClick?: (row: TData) => void
    variant?: 'primary' | 'destructive' | 'ghost' | 'secondary' | 'outline'
}

export interface NexusBulkAction<TData> {
    label: string
    icon?: string
    onClick: (rows: TData[]) => void
    variant?: 'primary' | 'destructive' | 'secondary' | 'outline'
}

export interface FilterRule {
    id: string
    columnId: string
    operator: FilterOperator
    value: any
}

export interface AdvancedFilterState {
    query: string
    logic: 'and' | 'or'
    rules: FilterRule[]
}

// Custom Filter Function
const advancedGlobalFilterFn = (row: Row<any>, _columnId: string, filterValue: any): boolean => {
    // filterValue is expected to be AdvancedFilterState
    // If it's just a string, treat as standard global text search
    if (typeof filterValue === 'string') {
         if (!filterValue) return true
         return row.getVisibleCells().some(cell => 
            String(cell.getValue()).toLowerCase().includes(filterValue.toLowerCase())
         )
    }

    const state = filterValue as AdvancedFilterState
    if (!state) return true

    // 1. Check Global Search Query
    let queryMatch = true
    if (state.query) {
        queryMatch = row.getVisibleCells().some(cell => 
            String(cell.getValue()).toLowerCase().includes(state.query.toLowerCase())
        )
    }
    // If query exists and fails, row is out (unless we want query OR rules? usually it's AND)
    // Let's assume (Search AND Rules)
    if (!queryMatch) return false

    // 2. Check Rules
    if (!state.rules || state.rules.length === 0) return true

    const rulesResults = state.rules.map(rule => {
        const cellValue = row.getValue(rule.columnId)
        const val = String(cellValue).toLowerCase()
        const target = String(rule.value || '').toLowerCase()

        switch (rule.operator) {
            case 'contains': return val.includes(target)
            case 'equals': return val === target
            case 'startsWith': return val.startsWith(target)
            case 'endsWith': return val.endsWith(target)
            case 'gt': return parseFloat(val) > parseFloat(target)
            case 'lt': return parseFloat(val) < parseFloat(target)
            case 'ne': return val !== target
            case 'isEmpty': return !cellValue
            case 'isNotEmpty': return !!cellValue
            default: return true
        }
    })

    if (state.logic === 'and') {
        return rulesResults.every(r => r)
    } else {
        return rulesResults.some(r => r)
    }
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[] | NexusColumnDef[]
  data: TData[]
  tableId?: string
  enableCustomization?: boolean
  defaultDetailViewMode?: DetailViewMode
  toolbarActions?: React.ReactNode
  title?: string
  titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  onSave?: (data: TData, isNew: boolean) => Promise<void> | void
  onDelete?: (data: TData) => Promise<void> | void
  rowActions?: NexusRowAction<TData>[]
  bulkActions?: NexusBulkAction<TData>[]
  loading?: boolean
  loadingType?: 'spinner' | 'bar'
  loadingColor?: string
  renderDetail?: (row: TData) => React.ReactNode
  detailSections?: DetailSection[]
  onBulkDelete?: (rows: TData[]) => Promise<void> | void
  onBulkEdit?: (rows: TData[], columnId: string, value: any) => Promise<void> | void
}

export function NexusTable<TData, TValue>({
  columns,
  data,
  tableId,
  enableCustomization = false,
  defaultDetailViewMode = 'modal',
  toolbarActions,
  title,
  titleAs = 'h1',
  onSave,
  onDelete,
  rowActions,
  bulkActions,
  loading = false,
  loadingType = 'spinner',
  loadingColor = 'primary',
  renderDetail,
  detailSections,
  onBulkDelete,
  onBulkEdit
}: DataTableProps<TData, TValue>) {
  // Form State
  const [isFormOpen, setIsFormOpen] = React.useState(false)
  const [formData, setFormData] = React.useState<any>(null)
  const [isNewRecord, setIsNewRecord] = React.useState(false)
  
  // Mass Edit State
  const [massEditDialogOpen, setMassEditDialogOpen] = React.useState(false)

  // Delete Dialog State
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [itemToDelete, setItemToDelete] = React.useState<TData | null>(null)
  const [isOperationLoading, setIsOperationLoading] = React.useState(false)

  const handleAdd = () => {
      setFormData({})
      setIsNewRecord(true)
      setIsFormOpen(true)
  }

  const handleEdit = (row: TData) => {
      setFormData(row)
      setIsNewRecord(false)
      setIsFormOpen(true)
  }

  const handleSaveData = (data: any) => {
      if (onSave) {
          onSave(data, isNewRecord)
      }
      setIsFormOpen(false)
  }

  const handleDeleteRequest = (row: TData) => {
      setItemToDelete(row)
      setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = async () => {
      if (onDelete && itemToDelete) {
          setIsOperationLoading(true)
          try {
            await onDelete(itemToDelete)
            setDeleteDialogOpen(false)
            setItemToDelete(null)
          } catch (error) {
            console.error("Failed to delete", error)
          } finally {
            setIsOperationLoading(false)
          }
      }
  }

  // Determine if we need selection column
  const hasBulkActions = (bulkActions && bulkActions.length > 0) || !!onBulkDelete || !!onBulkEdit

  // Normalize columns
  const tableColumns = React.useMemo(() => {
      if (!columns || columns.length === 0) return []
      // Check if it's NexusColumnDef
      const firstCol = columns[0]
      const isSimplified = 'key' in firstCol && !('accessorKey' in firstCol) && !('id' in firstCol && !('key' in firstCol))
      
      let normalizedCols: ColumnDef<TData, any>[] = []

      if (isSimplified) {
          normalizedCols = (columns as NexusColumnDef[]).map(col => {
             const baseCol: ColumnDef<TData, any> = {
                 accessorKey: col.key,
                 header: col.label,
                 enableColumnFilter: true,
                 enableGlobalFilter: true,
                 enableGrouping: true,
                 meta: {
                    dataType: col.dataType,
                    options: col.form?.options
                 }
             }

             if (col.dataType === 'date') {
                 baseCol.cell = ({ getValue }) => {
                     const val = getValue()
                     if (!val) return '-'
                     return new Date(val as string).toLocaleDateString('pt-BR')
                 }
             } else if (col.dataType === 'currency') {
                 baseCol.cell = ({ getValue }) => {
                     const val = getValue()
                     if (val === undefined || val === null) return '-'
                     return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(val))
                 }
             } else if (col.dataType === 'status' || col.dataType === 'select') {
                 baseCol.cell = ({ getValue }) => {
                     const val = getValue() as string
                     if (!val) return '-'
                     
                     // Custom color map logic
                     if (col.valueColorMap && col.valueColorMap[val]) {
                         return (
                            <div 
                                className="inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 gap-1 pr-1 pl-2"
                                style={{ backgroundColor: col.valueColorMap[val], color: '#fff' }} // Assuming white text for custom colors, or we could calculate contrast
                            >
                                {val}
                            </div>
                         )
                     }

                     let variant: 'default' | 'secondary' | 'destructive' | 'outline' = 'secondary'
                     const v = val.toLowerCase()
                     if (v === 'ativo' || v === 'active' || v === 'pago') variant = 'default'
                     else if (v === 'inativo' || v === 'pendente') variant = 'secondary'
                     else if (v === 'banido' || v === 'cancelado') variant = 'destructive'
                     
                     return (
                         <NexusChip variant={variant} label={val} />
                     )
                 }
             } else if (col.dataType === 'multiselect') {
                 baseCol.cell = ({ getValue }) => {
                     const val = getValue() as string[]
                     if (!val || !Array.isArray(val) || val.length === 0) return '-'
                     return (
                         <div className="flex flex-wrap gap-1">
                             {val.map((v, i) => (
                                 <NexusChip key={i} variant="secondary" label={v} />
                             ))}
                         </div>
                     )
                 }
             }

             return baseCol
          })
      } else {
          normalizedCols = [...(columns as ColumnDef<TData, TValue>[])]
      }

      // Logic to auto-add Selection Column if bulkActions are present
      if (hasBulkActions) {
          // Check if selection column already exists to avoid duplication
          const hasSelection = normalizedCols.some(c => c.id === 'select' || (c as any).accessorKey === 'select')
          if (!hasSelection) {
              normalizedCols.unshift({
                  id: "select",
                  header: ({ table }) => (
                    <div className="px-1">
                        <NexusCheckbox
                            checked={
                                table.getIsAllPageRowsSelected() ||
                                (table.getIsSomePageRowsSelected() && "indeterminate")
                            }
                            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                            aria-label="Select all"
                        />
                    </div>
                  ),
                  cell: ({ row }) => (
                    <div className="px-1" onClick={(e) => e.stopPropagation()}>
                        <NexusCheckbox
                            checked={row.getIsSelected()}
                            onCheckedChange={(value) => row.toggleSelected(!!value)}
                            aria-label="Select row"
                        />
                    </div>
                  ),
                  enableSorting: false,
                  enableHiding: false,
                  size: 40, // Fixed width for selection
              })
          }
      }

      // Logic to auto-add Actions column with Kebab Menu
      if (rowActions || onSave || onDelete) {
          normalizedCols.push({
              id: 'actions',
              header: '',
              enableHiding: false, // Always visible
              size: 50,
              cell: ({ row }) => {
                  return (
                      <div className="flex justify-end pr-2" onClick={(e) => e.stopPropagation()}>
                        <NexusDropdownMenu>
                            <NexusDropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
                                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                                </Button>
                            </NexusDropdownMenuTrigger>
                            <NexusDropdownMenuContent align="end" className="w-48 z-50">
                                <NexusDropdownMenuItem onClick={() => setActiveRow(row)}>
                                    <span className="material-symbols-outlined mr-2 text-[18px]">visibility</span>
                                    Visualizar
                                </NexusDropdownMenuItem>
                                {onSave && (
                                    <NexusDropdownMenuItem onClick={() => handleEdit(row.original)}>
                                        <span className="material-symbols-outlined mr-2 text-[18px]">edit</span>
                                        Editar
                                    </NexusDropdownMenuItem>
                                )}
                                {onDelete && (
                                    <NexusDropdownMenuItem 
                                        onClick={() => handleDeleteRequest(row.original)}
                                        className="text-destructive focus:text-destructive focus:bg-destructive/10"
                                    >
                                        <span className="material-symbols-outlined mr-2 text-[18px]">delete</span>
                                        Excluir
                                    </NexusDropdownMenuItem>
                                )}
                                {(onSave || onDelete) && rowActions && rowActions.length > 0 && (
                                    <div className="h-[1px] bg-border my-1"></div>
                                )}
                                {rowActions?.map((action, idx) => (
                                    <NexusDropdownMenuItem 
                                        key={idx}
                                        onClick={() => {
                                            if (action.onClick) action.onClick(row.original)
                                        }}
                                    >
                                        {action.icon && <span className="material-symbols-outlined mr-2 text-[18px]">{action.icon}</span>}
                                        {action.label}
                                    </NexusDropdownMenuItem>
                                ))}
                            </NexusDropdownMenuContent>
                        </NexusDropdownMenu>
                      </div>
                  )
              }
          })
      }

      return normalizedCols
  }, [columns, rowActions, hasBulkActions])

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [grouping, setGrouping] = React.useState<GroupingState>([])
  const [expanded, setExpanded] = React.useState<ExpandedState>({})
  const [globalFilter, setGlobalFilter] = React.useState<AdvancedFilterState | string>("")
  
  // Helper to safely get query string
  const globalFilterQuery = typeof globalFilter === 'string' ? globalFilter : globalFilter?.query || ''

  // Load persistence
  React.useEffect(() => {
      if (!tableId) return;
      const saved = localStorage.getItem(`nexus-table-${tableId}-visibility`)
      const savedFilter = localStorage.getItem(`nexus-table-${tableId}-filter`)
      
      if (saved) setColumnVisibility(JSON.parse(saved))
      if (savedFilter && enableCustomization) {
          try {
             setGlobalFilter(JSON.parse(savedFilter)) 
          } catch(e) {}
      }
  }, [tableId])

  // Auto-save persistence
  React.useEffect(() => {
      if (!tableId || !enableCustomization) return;
      localStorage.setItem(`nexus-table-${tableId}-visibility`, JSON.stringify(columnVisibility))
      localStorage.setItem(`nexus-table-${tableId}-filter`, JSON.stringify(globalFilter))
  }, [tableId, enableCustomization, columnVisibility, globalFilter])

  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGroupingChange: setGrouping,
    onExpandedChange: setExpanded,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: advancedGlobalFilterFn,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      grouping,
      expanded,
      globalFilter
    },
  })

  // Calculate effective bulk actions
  const effectiveBulkActions = React.useMemo(() => {
      const actions: NexusBulkAction<TData>[] = bulkActions ? [...bulkActions] : []
      
      if (onBulkEdit) {
          actions.push({
              label: 'Editar',
              icon: 'edit_note',
              variant: 'secondary',
              onClick: () => setMassEditDialogOpen(true)
          })
      }

      if (onBulkDelete) {
          actions.push({
              label: 'Excluir',
              icon: 'delete',
              variant: 'destructive',
              onClick: async (rows) => {
                  if (confirm(`Tem certeza que deseja excluir ${rows.length} registros?`)) {
                      await onBulkDelete(rows)
                      table.resetRowSelection()
                  }
              }
          })
      }
      return actions
  }, [bulkActions, onBulkDelete, onBulkEdit, table])

  // Responsive & View Mode Logic
  const [viewMode, setViewMode] = React.useState<'table' | 'card'>('table')

  React.useEffect(() => {
    const checkMobile = () => {
        const mobile = window.innerWidth < 768
        if (mobile) setViewMode('card')
        else setViewMode('table')
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Detail Modal Logic
  const [activeRow, setActiveRow] = React.useState<Row<TData> | null>(null)
  const [detailViewMode, setDetailViewMode] = React.useState<DetailViewMode>(defaultDetailViewMode)
  const [detailLayout, setDetailLayout] = React.useState<DetailSection[]>([])

  // Load layout persistence
  React.useEffect(() => {
      if (!tableId || !enableCustomization) return;
      const savedLayout = localStorage.getItem(`nexus-table-${tableId}-detail-layout`)
      const savedMode = localStorage.getItem(`nexus-table-${tableId}-view-mode`)
      
      if (savedLayout) {
          try { setDetailLayout(JSON.parse(savedLayout)) } catch (e) { console.error(e) }
      }
      if (savedMode && ['modal', 'sheet', 'fullscreen'].includes(savedMode)) {
          setDetailViewMode(savedMode as DetailViewMode)
      }
  }, [tableId, enableCustomization])

  const handleLayoutSave = (sections: DetailSection[]) => {
      setDetailLayout(sections)
      if (tableId) {
          localStorage.setItem(`nexus-table-${tableId}-detail-layout`, JSON.stringify(sections))
      }
  }

  const handleViewModeChange = (mode: DetailViewMode) => {
      setDetailViewMode(mode)
      if (tableId) {
          localStorage.setItem(`nexus-table-${tableId}-view-mode`, mode)
      }
  }

  // Search Value
  const [searchValue, setSearchValue] = React.useState(globalFilterQuery)

  // Debounce search
  React.useEffect(() => {
     const timeout = setTimeout(() => {
         // Update only query part of globalFilter
         setGlobalFilter(prev => {
             if (typeof prev === 'string') return searchValue
             // If object, keep rules, update query
             return { ...prev, query: searchValue, logic: prev?.logic || 'and', rules: prev?.rules || [] }
         })
     }, 300)
     return () => clearTimeout(timeout)
  }, [searchValue])


  const TitleTag = titleAs

  return (
    <div className="flex flex-col gap-4 text-foreground min-h-screen p-6 w-full max-w-[1400px] mx-auto">
      
      {/* Header Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 mb-2 justify-between items-end md:items-center">
          <div>
              {title ? (
                 <TitleTag className="text-xl font-bold tracking-tight">{title}</TitleTag>
              ) : (
                <>
                  <h2 className="text-xl font-bold tracking-tight">Tabela</h2>
                  <p className="text-muted-foreground text-sm">Gerencie e visualize seus dados.</p>
                </>
              )}
          </div>

          <NexusTableToolbar 
              table={table}
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              detailViewMode={detailViewMode}
              onDetailViewModeChange={handleViewModeChange}
              layoutMode={viewMode}
              onLayoutModeChange={setViewMode}
              enableCustomization={enableCustomization}
              actions={
                  <>
                      {toolbarActions}
                  </>
              }
           />
       </div>

       {/* Bulk Actions Floating Bar */}
       {effectiveBulkActions.length > 0 && table.getFilteredSelectedRowModel().rows.length > 0 && (
           <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4">
               <div className="bg-foreground text-background rounded-full px-6 py-3 shadow-xl flex items-center gap-4 border border-border/20">
                   <span className="font-semibold text-sm whitespace-nowrap">
                       {table.getFilteredSelectedRowModel().rows.length} selecionado(s)
                   </span>
                   <div className="h-4 w-[1px] bg-background/20"></div>
                   <div className="flex items-center gap-2">
                       {effectiveBulkActions.map((action, idx) => (
                           <Button
                               key={idx}
                               size="sm"
                               variant={action.variant === 'destructive' ? 'destructive' : 'secondary'}
                               className={cn("h-8 rounded-full text-xs gap-1.5", 
                                   action.variant === 'primary' && "bg-background text-foreground hover:bg-background/90",
                                   action.variant === 'outline' && "bg-transparent border border-background/20 text-background hover:bg-background/10"
                               )}
                               onClick={() => action.onClick(table.getFilteredSelectedRowModel().rows.map(r => r.original))}
                           >
                               {action.icon && <span className="material-symbols-outlined text-[16px]">{action.icon}</span>}
                               {action.label}
                           </Button>
                       ))}
                   </div>
                   <Button 
                       variant="ghost" 
                       size="sm" 
                       className="h-8 w-8 p-0 rounded-full text-background/70 hover:text-background hover:bg-background/10 ml-2"
                       onClick={() => table.resetRowSelection()}
                   >
                       <span className="material-symbols-outlined text-[20px]">close</span>
                   </Button>
               </div>
           </div>
       )}

       <NexusTableForm  
            isOpen={isFormOpen}
            onOpenChange={setIsFormOpen}
            onSave={handleSaveData}
            initialData={formData}
            isNew={isNewRecord}
            columns={columns as NexusColumnDef[]} 
      />

      {/* Mass Edit Dialog */}
      {onBulkEdit && (
          <NexusTableMassEdit
             open={massEditDialogOpen}
             onOpenChange={setMassEditDialogOpen}
             columns={columns as NexusColumnDef[]}
             onSave={async (colId, val) => {
                 const selectedRows = table.getFilteredSelectedRowModel().rows.map(r => r.original)
                 await onBulkEdit(selectedRows, colId, val)
                 table.resetRowSelection()
             }}
          />
      )}

      {viewMode === 'table' ? (
      <div className="rounded-md border border-input bg-background/60 backdrop-blur-[4px] overflow-hidden relative min-h-[200px]">
        {loading && <NexusTableLoading type={loadingType} color={loadingColor} />}
        <div className="w-full overflow-auto">
            <table className="w-full caption-bottom text-sm text-left">
            <thead className="[&_tr]:border-b [&_tr]:border-border/50">
                {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    {headerGroup.headers.map((header) => {
                    return (
                        <th key={header.id} className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                        {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                            )}
                        </th>
                    )
                    })}
                </tr>
                ))}
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
                {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => {
                    // Grouped Row Rendering
                    if (row.getIsGrouped()) {
                        return (
                            <tr key={row.id} className="bg-muted/30 hover:bg-muted/50 transition-colors font-medium">
                                <td colSpan={row.getVisibleCells().length} className="p-2">
                                     <div 
                                        className="flex items-center gap-2 cursor-pointer select-none px-2"
                                        onClick={row.getToggleExpandedHandler()}
                                     >
                                        <span className={`material-symbols-outlined text-[20px] transition-transform duration-200 ${row.getIsExpanded() ? 'rotate-90' : ''}`}>
                                            chevron_right
                                        </span>
                                        <span className="text-sm text-foreground">
                                            {/* We can use the grouping value directly or render the cell */}
                                            {flexRender(
                                                row.getVisibleCells().find(cell => cell.column.getIsGrouped())?.column.columnDef.cell,
                                                row.getVisibleCells().find(cell => cell.column.getIsGrouped())?.getContext()!
                                            ) ?? <span className="capitalize">{String(row.original)}</span>}
                                        </span>
                                        <span className="text-xs text-muted-foreground ml-1">
                                            ({row.subRows.length} itens)
                                        </span>
                                     </div>
                                </td>
                            </tr>
                        )
                    }

                    // Standard Row
                    return (
                        <tr
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                        className="border-b border-border/50 transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted cursor-pointer"
                        onClick={() => setActiveRow(row)}
                        >
                        {row.getVisibleCells().map((cell) => {
                            if (cell.getIsGrouped()) return null 
                            
                            return (
                                <td key={cell.id} className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            )
                        })}
                        </tr>
                    )
                })
                ) : (
                <tr>
                    <td colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                    Nenhum resultado encontrado.
                    </td>
                </tr>
                )}
            </tbody>
            </table>
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-4 border-t border-input bg-muted/20 relative z-20">
              <div className="flex-1 text-sm text-muted-foreground mr-4">
                  {table.getFilteredSelectedRowModel().rows.length} de{" "}
                  {table.getFilteredRowModel().rows.length} linha(s) selecionada(s).
              </div>
              <div className="flex items-center space-x-6 lg:space-x-8">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-muted-foreground whitespace-nowrap">Linhas por página</p>
                    <div className="w-[70px]">
                        <NexusSelect
                            value={`${table.getState().pagination.pageSize}`}
                            placeholder="10"
                            className="h-8 py-0"
                            options={[
                                { label: '10', value: '10' },
                                { label: '25', value: '25' },
                                { label: '50', value: '50' },
                                { label: '100', value: '100' },
                            ]}
                            onChange={(val: string) => {
                                table.setPageSize(Number(val))
                            }}
                        />
                    </div>
                  </div>
              </div>
              <div className="flex w-[100px] items-center justify-center text-sm font-medium text-muted-foreground">
                  Página {table.getState().pagination.pageIndex + 1} de{" "}
                  {table.getPageCount()}
              </div>
              <div className="flex items-center space-x-2">
                  <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => table.setPageIndex(0)}
                      disabled={!table.getCanPreviousPage()}
                  >
                      <span className="material-symbols-outlined text-[16px]">first_page</span>
                  </Button>
                  <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                  >
                      <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                  </Button>
                  <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                  >
                       <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </Button>
                  <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                      disabled={!table.getCanNextPage()}
                  >
                      <span className="material-symbols-outlined text-[16px]">last_page</span>
                  </Button>
              </div>
      </div>
      </div>
      ) : (
        <div className="bg-background/60 backdrop-blur-[4px] relative min-h-[200px] rounded-xl">
             {loading && <NexusTableLoading type={loadingType} color={loadingColor} />}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-20 p-4">
                {table.getRowModel().rows.map(row => (
                    <NexusTableCard 
                        key={row.id} 
                        row={row} 
                        onClick={() => setActiveRow(row)}
                    />
                ))}
             </div>
        </div>
      )}

      <NexusTableDetailView
        open={!!activeRow}
        onOpenChange={(open) => !open && setActiveRow(null)}
        row={activeRow}
        enableCustomization={enableCustomization}
        viewMode={detailViewMode}
        onViewModeChange={handleViewModeChange}
        initialSections={detailSections || detailLayout}
        onLayoutChange={handleLayoutSave}
        renderDetail={renderDetail}
      />

        {/* Delete Confirmation Dialog */}
        <DialogPrimitive.Root open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogPrimitive.Portal>
                <DialogPrimitive.Overlay className="fixed inset-0 z-[100] bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-[101] grid w-full max-w-sm translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
                    <div className="flex flex-col space-y-2 text-center sm:text-left">
                        <DialogPrimitive.Title className="text-lg font-semibold leading-none tracking-tight">
                           Confirmar Exclusão
                        </DialogPrimitive.Title>
                        <DialogPrimitive.Description className="text-sm text-muted-foreground">
                            Tem certeza que deseja excluir este registro? Essa ação não pode ser desfeita.
                        </DialogPrimitive.Description>
                    </div>
                    <div className="flex justify-end gap-2 mt-2">
                        <Button 
                            variant="outline" 
                            onClick={() => setDeleteDialogOpen(false)}
                            disabled={isOperationLoading}
                        >
                            Cancelar
                        </Button>
                        <Button 
                            variant="destructive" 
                            onClick={handleConfirmDelete}
                            disabled={isOperationLoading}
                        >
                            {isOperationLoading ? (
                                <>
                                    <span className="material-symbols-outlined text-[16px] animate-spin mr-2">progress_activity</span>
                                    Excluindo...
                                </>
                            ) : (
                                'Excluir'
                            )}
                        </Button>
                    </div>
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>

       {/* Floating Action Button */}
       {onSave && (
        <div className="fixed bottom-6 right-6 z-40">
                <button 
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-transform hover:scale-110 active:scale-95 border border-white/20 backdrop-blur-md"
                    onClick={handleAdd}
                >
                    <span className="material-symbols-outlined text-[28px]">add</span>
                </button>
        </div>
       )}
    </div>
  )
}
