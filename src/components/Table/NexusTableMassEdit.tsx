import * as React from "react"
import { NexusDialog, NexusDialogContent, NexusDialogFooter, NexusDialogHeader, NexusDialogTitle, NexusDialogDescription } from "../Dialog/NexusDialog"
import { NexusSelect } from "../Select/NexusSelect"
import { NexusInput } from "../Input/NexusInput"
import { Button } from "../Button/Button"
import type { NexusColumnDef } from "./NexusTable"

interface NexusTableMassEditProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    columns: NexusColumnDef[]
    onSave: (columnId: string, value: any) => Promise<void>
}

export function NexusTableMassEdit({ open, onOpenChange, columns, onSave }: NexusTableMassEditProps) {
    const [selectedColumn, setSelectedColumn] = React.useState<string>('')
    const [value, setValue] = React.useState<any>('')
    const [loading, setLoading] = React.useState(false)

    // Filter editable columns (select, status, multiselect mostly, maybe basic types too if safe)
    // For safety in this iteration, we focus on safe enums: select, status
    const editableColumns = React.useMemo(() => {
        return columns.filter(col => 
            ['select', 'status', 'multiselect'].includes(col.dataType || '') || 
            (col.form?.type === 'select')
        )
    }, [columns])

    const activeColumn = React.useMemo(() => {
        return columns.find(c => c.key === selectedColumn)
    }, [selectedColumn, columns])

    const handleSave = async () => {
        if (!selectedColumn) return
        setLoading(true)
        try {
            await onSave(selectedColumn, value)
            onOpenChange(false)
            // Reset
            setSelectedColumn('')
            setValue('')
        } catch (error) {
            console.error("Mass edit failed", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <NexusDialog open={open} onOpenChange={onOpenChange}>
            <NexusDialogContent className="sm:max-w-[425px]">
                <NexusDialogHeader>
                    <NexusDialogTitle>Edição em Massa</NexusDialogTitle>
                    <NexusDialogDescription>
                        Selecione a coluna que deseja alterar para todos os registros selecionados.
                    </NexusDialogDescription>
                </NexusDialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">Coluna</label>
                        <NexusSelect
                            placeholder="Selecione uma coluna..."
                            value={selectedColumn}
                            onChange={setSelectedColumn}
                            options={editableColumns.map(col => ({
                                label: col.label,
                                value: col.key
                            }))}
                            aria-label="Selecionar Coluna"
                        />
                    </div>

                    {activeColumn && (
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">Novo Valor</label>
                            {/* Render Input based on type */}
                            {(activeColumn.dataType === 'select' || activeColumn.dataType === 'status' || activeColumn.dataType === 'multiselect' || activeColumn.form?.type === 'select') ? (
                                <NexusSelect
                                    placeholder="Selecione o valor..."
                                    value={value}
                                    onChange={setValue}
                                    options={activeColumn.form?.options || []}
                                    aria-label="Novo Valor"
                                />
                            ) : (
                                <NexusInput
                                    placeholder="Digite o valor..."
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    aria-label="Novo Valor"
                                />
                            )}
                        </div>
                    )}
                </div>

                <NexusDialogFooter>
                    <Button variant="ghost" onClick={() => onOpenChange(false)} disabled={loading}>
                        Cancelar
                    </Button>
                    <Button onClick={handleSave} disabled={!selectedColumn || !value || loading}>
                        {loading ? 'Salvando...' : 'Aplicar Alterações'}
                    </Button>
                </NexusDialogFooter>
            </NexusDialogContent>
        </NexusDialog>
    )
}
