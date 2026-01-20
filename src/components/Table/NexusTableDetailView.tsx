import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { type Row, flexRender } from "@tanstack/react-table"
import { Button } from "../Button/Button"
import { NexusInput } from "../Input/NexusInput"
import { NexusSelect } from "../Select/NexusSelect"
import { cn } from "../../lib/utils"

export type DetailViewMode = 'modal' | 'sheet' | 'fullscreen'

export interface DetailSection {
  id: string
  title: string
  columns: string[] // columnIds
  columnsPerMatch?: number // 1-4, def 1
}

interface NexusTableDetailViewProps<TData> {
  open: boolean
  onOpenChange: (open: boolean) => void
  row: Row<TData> | null
  title?: string
  enableCustomization?: boolean
  viewMode?: DetailViewMode
  onViewModeChange?: (mode: DetailViewMode) => void
  initialSections?: DetailSection[]
  onLayoutChange?: (sections: DetailSection[]) => void
  renderDetail?: (row: TData) => React.ReactNode
  onEdit?: (row: TData) => void
  onDelete?: (row: TData) => void
  rowActions?: Array<{
    label: string
    icon?: string
    onClick: (row: TData) => void
    variant?: 'primary' | 'destructive' | 'ghost' | 'secondary' | 'outline'
  }>
}

export function NexusTableDetailView<TData>({
  open,
  onOpenChange,
  row,
  title = "Detalhes",
  enableCustomization = false,
  viewMode = 'modal',
  initialSections,
  onLayoutChange,
  renderDetail,
  onViewModeChange,
  onEdit,
  onDelete,
  rowActions = []
}: NexusTableDetailViewProps<TData>) {
  const [isCustomizing, setIsCustomizing] = React.useState(false)
  const [sections, setSections] = React.useState<DetailSection[]>([])

  // Initialize sections
  React.useEffect(() => {
    if (!open || !row) return

    if (initialSections && initialSections.length > 0) {
      setSections(initialSections)
    } else {
      const allColumns = row.getVisibleCells()
        .filter(cell => cell.column.id !== 'select' && cell.column.id !== 'actions')
        .map(cell => cell.column.id)
      
      setSections([
        { id: 'default', title: 'Propriedades', columns: allColumns, columnsPerMatch: 1 }
      ])
    }
  }, [open, row, initialSections])

  if (!row) return null

  // --- Layout Helpers ---
  const handleAddSection = () => {
    const newSection: DetailSection = {
        id: crypto.randomUUID(),
        title: 'Nova Seção',
        columns: [],
        columnsPerMatch: 1
    }
    setSections([...sections, newSection])
  }

  const handleUpdateSection = (id: string, updates: Partial<DetailSection>) => {
      setSections(sections.map(s => s.id === id ? { ...s, ...updates } : s))
  }

  const handleMoveField = (columnId: string, targetSectionId: string) => {
      const newSections = sections.map(section => {
          const newCols = section.columns.filter(c => c !== columnId)
          if (section.id === targetSectionId) {
              return { ...section, columns: [...newCols, columnId] }
          }
          return { ...section, columns: newCols }
      })
      setSections(newSections)
  }

  const handleSave = () => {
      if (onLayoutChange) onLayoutChange(sections)
      setIsCustomizing(false)
  }

  const handleDeleteSection = (id: string) => {
    // Basic delete logic: move items to first section or create default
    const sectionToDelete = sections.find(s => s.id === id)
    if (!sectionToDelete) return

    const remainingSections = sections.filter(s => s.id !== id)
    if (remainingSections.length > 0) {
        // Move orphaned cols to first remaining section
        remainingSections[0].columns.push(...sectionToDelete.columns)
        setSections(remainingSections)
    } else {
        // If last section, recreate default with deleted cols
        setSections([{ id: 'default', title: 'Propriedades', columns: sectionToDelete.columns }])
    }
  }

  // --- Data Map ---
  const allCellMap = new Map(row.getVisibleCells().map(c => [c.column.id, c]))
  const assignedColumnIds = new Set(sections.flatMap(s => s.columns))
  const unassignedCells = row.getVisibleCells().filter(
      cell => !assignedColumnIds.has(cell.column.id) && cell.column.id !== 'select' && cell.column.id !== 'actions'
  )

  // --- View Mode Styles ---
  const contentStyles = {
    modal: "fixed left-[50%] top-[50%] z-[150] grid w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] gap-4 border border-input bg-background/95 backdrop-blur-[16px] shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg max-h-[90vh] flex flex-col",
    sheet: "fixed inset-y-0 right-0 z-[150] h-full w-3/4 gap-4 border-l border-input bg-background/95 backdrop-blur-[16px] p-0 shadow-2xl transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-xl flex flex-col",
    fullscreen: "fixed inset-0 z-[150] w-full h-full bg-background/95 backdrop-blur-[16px] p-0 shadow-2xl transition-all data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 flex flex-col"
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[150] bg-background/80 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        
        <DialogPrimitive.Content className={contentStyles[viewMode]}>
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-input bg-background/95 backdrop-blur-xl z-20 min-h-[70px]">
              <div className="flex items-center gap-3">
                  {viewMode === 'sheet' && (
                      <div className="flex items-center gap-1 mr-2">
                          <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-muted"
                              onClick={() => onOpenChange(false)}
                              title="Fechar"
                          >
                               <span className="material-symbols-outlined text-[20px]">close</span>
                          </Button>
                          <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-muted"
                              onClick={() => onViewModeChange && onViewModeChange('fullscreen')}
                              title="Expandir"
                          >
                               <span className="material-symbols-outlined text-[20px]">open_in_full</span>
                          </Button>
                      </div>
                  )}
                  <DialogPrimitive.Title className="text-lg font-semibold text-foreground">
                      {isCustomizing ? 'Personalizar Layout' : title}
                  </DialogPrimitive.Title>
              </div>
              
              <div className="flex items-center gap-2">
                   {isCustomizing ? (
                       <>
                           <Button variant="ghost" size="sm" onClick={() => setIsCustomizing(false)} className="text-muted-foreground hover:text-foreground">
                               Cancelar
                           </Button>
                           <Button variant="primary" size="sm" onClick={handleSave} className="bg-primary text-primary-foreground">
                               Salvar Layout
                           </Button>
                       </>
                   ) : (
                       /* Only show right close button if NOT in sheet mode */
                       <>
                           {enableCustomization && (
                               <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-muted ml-2"
                                    onClick={() => setIsCustomizing(true)}
                                    title="Personalizar Layout"
                               >
                                    <span className="material-symbols-outlined text-[20px]">edit</span>
                               </Button>
                           )}

                           {viewMode !== 'sheet' && (
                               <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-muted ml-2"
                                    onClick={() => onOpenChange(false)}
                               >
                                    <span className="material-symbols-outlined text-[20px]">close</span>
                               </Button>
                           )}
                       </>
                   )}
              </div>
          </div>

          {/* Content */}
          <div className={cn("flex-1 overflow-y-auto px-6 py-6 space-y-8 max-h-[calc(100vh-200px)]", viewMode === 'fullscreen' ? "max-w-7xl mx-auto w-full" : "")}>
            
            {isCustomizing ? (
                /* EDIT MODE */
                <div className="space-y-6 pb-20">
                    <div className="flex justify-end sticky top-0 bg-background z-10 py-2 border-b border-border">
                        <Button variant="outline" size="sm" onClick={handleAddSection} className="text-xs">
                             <span className="material-symbols-outlined text-[14px] mr-1">add</span>
                             Nova Seção
                        </Button>
                    </div>
                    
                    {sections.map(section => (
                        <div key={section.id} className="border border-border rounded-lg p-4 bg-card">
                            <div className="flex flex-wrap items-center gap-4 mb-4 border-b border-border pb-2">
                                <div className="flex-1">
                                    <label className="text-xs text-muted-foreground mb-1 block">Título</label>
                                    <NexusInput 
                                        value={section.title} 
                                        onChange={(e) => handleUpdateSection(section.id, { title: e.target.value })}
                                        className="h-8 text-sm"
                                    />
                                </div>
                                <div className="w-[150px]">
                                    <label className="text-xs text-muted-foreground mb-1 block">Colunas (Grid)</label>
                                    <NexusSelect 
                                        value={String(section.columnsPerMatch || 1)}
                                        onChange={(val: string) => handleUpdateSection(section.id, { columnsPerMatch: Number(val) })}
                                        options={[
                                          { label: '1 Col', value: '1' },
                                          { label: '2 Cols', value: '2' },
                                          { label: '3 Cols', value: '3' },
                                          { label: '4 Cols', value: '4' },
                                        ]}
                                        fullWidth
                                    />
                                </div>
                                <div className="self-end">
                                    <Button variant="ghost" size="sm" onClick={() => handleDeleteSection(section.id)} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                                        Remover
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-2 border-l-2 border-primary/20 pl-4">
                                <div className="text-xs font-semibold text-muted-foreground uppercase mb-2">Campos nesta seção</div>
                                {section.columns.map(colId => {
                                    const cell = allCellMap.get(colId)
                                    if (!cell) return null
                                    return (
                                        <div key={colId} className="flex items-center justify-between text-sm bg-accent/50 p-2 rounded border border-border">
                                            <span className="text-foreground">{cell.column.columnDef.header as string}</span>
                                            {/* Move Dropdown */}
                                            <select 
                                                className="bg-background text-xs text-foreground border border-input rounded px-2 py-1 outline-none"
                                                value={section.id}
                                                onChange={(e) => handleMoveField(colId, e.target.value)}
                                            >
                                                {sections.map(s => (
                                                    <option key={s.id} value={s.id}>{s.title}</option>
                                                ))}
                                            </select>
                                        </div>
                                    )
                                })}
                                {section.columns.length === 0 && (
                                    <div className="text-xs text-muted-foreground italic p-2 border border-dashed border-border rounded">Nenhum campo atribuído</div>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Unassigned Area */}
                    {unassignedCells.length > 0 && (
                        <div className="border-2 border-dashed border-border rounded-lg p-6 bg-muted/20">
                            <h4 className="text-sm font-semibold text-muted-foreground mb-4 uppercase">Campos não atribuídos</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {unassignedCells.map(cell => (
                                    <div key={cell.column.id} className="flex items-center justify-between text-sm bg-background p-3 rounded border border-input shadow-sm">
                                        <span className="text-foreground font-medium">{cell.column.columnDef.header as string}</span>
                                        <select 
                                            className="bg-accent/50 text-xs text-foreground border border-input rounded px-2 py-1 outline-none cursor-pointer"
                                            value=""
                                            onChange={(e) => handleMoveField(cell.column.id, e.target.value)}
                                            title="Move field to section"
                                        >
                                            <option value="" disabled>Mover para...</option>
                                            {sections.map(s => (
                                                <option key={s.id} value={s.id}>{s.title}</option>
                                            ))}
                                        </select>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
              /* VIEW MODE */
              <div className="flex flex-col gap-6">
                 {/* Actions Section */}
                 {(onEdit || onDelete || rowActions.length > 0) && row && (
                    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                       <div className="bg-muted/30 px-4 py-3 border-b border-border">
                          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                             Ações
                          </h3>
                       </div>
                       <div className="p-4 flex flex-wrap gap-2">
                          {onEdit && (
                             <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => onEdit(row.original)}
                                className="gap-2"
                             >
                                <span className="material-symbols-outlined text-[18px]">edit</span>
                                Editar
                             </Button>
                          )}
                          {onDelete && (
                             <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => onDelete(row.original)}
                                className="gap-2"
                             >
                                <span className="material-symbols-outlined text-[18px]">delete</span>
                                Excluir
                             </Button>
                          )}
                          {rowActions.map((action, idx) => (
                             <Button
                                key={idx}
                                variant={action.variant || 'secondary'}
                                size="sm"
                                onClick={() => action.onClick(row.original)}
                                className="gap-2"
                             >
                                {action.icon && <span className="material-symbols-outlined text-[18px]">{action.icon}</span>}
                                {action.label}
                             </Button>
                          ))}
                       </div>
                    </div>
                 )}

                 {/* Custom Render Detail (Pre-Sections) */}
                 {renderDetail && row && (
                    <div className="bg-card border border-border rounded-xl p-0 overflow-hidden shadow-sm">
                        {renderDetail(row.original)}
                    </div>
                 )}

                 {/* Default Sections */}
                 {sections.map(section => {
                    // Determine grid class
                    const cols = section.columnsPerMatch || 1
                    const gridClass = cols === 1 ? 'grid-cols-1' :
                                      cols === 2 ? 'grid-cols-1 sm:grid-cols-2' :
                                      cols === 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' :
                                      'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'

                    return (
                        <div key={section.id} className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                             {/* Section Header */}
                             <div className="bg-muted/30 px-4 py-3 border-b border-border">
                                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                                    {section.title}
                                </h3>
                             </div>

                             <div className={cn("p-4 grid gap-6", gridClass)}>
                                 {section.columns.map(colId => {
                                     const cell = allCellMap.get(colId)
                                     if (!cell) return null
                                     return (
                                         <div key={cell.id} className="flex flex-col gap-1.5 group">
                                             <div className="text-xs font-medium text-muted-foreground uppercase flex items-center gap-2">
                                                 {cell.column.columnDef.header as string}
                                             </div>
                                             <div className="text-sm text-foreground min-h-[24px] break-words">
                                                 {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                             </div>
                                         </div>
                                     )
                                 })}
                             </div>
                        </div>
                   )
                })}

                {/* Unassigned fallback (shouldn't happen in configured layout usually, but good for safety) */}
                {unassignedCells.length > 0 && (
                    <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
                        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 border-b border-border pb-2">Outros Detalhes</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                             {unassignedCells.map(cell => (
                                 <div key={cell.id} className="flex flex-col gap-1.5">
                                     <div className="text-xs font-medium text-muted-foreground uppercase">
                                         {cell.column.columnDef.header as string}
                                     </div>
                                     <div className="text-sm text-foreground">
                                         {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                     </div>
                                 </div>
                             ))}
                        </div>
                    </div>
                )}
               </div>
            )}

          </div>

        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
