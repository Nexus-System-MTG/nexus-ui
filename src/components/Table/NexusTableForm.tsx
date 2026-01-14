
import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { Button } from "../Button/Button"
import { NexusInput } from "../Input/NexusInput"
import { NexusSelect } from "../Select/NexusSelect" 
// Note: We might need to export NexusColumnDef from a separate types file to avoid circular dep if NexusTable imports this.
// Ideally, types should be in types.ts. For now, assuming NexusTable imports NexusTableForm, so NexusTableForm shouldn't import NexusTable?
// Circular dependency risk.
// Solution: Move types to "NexusTableTypes.ts" or define locally for now and refactor later.
// Let's redefine a local interface compatible or just use any for columns to allow flexibility.
// Or better: I will ask to move types to separate file in next step if this fails.
// For now, I will use `any` for the column definition in props to avoid import cycle, or just import types if possible.

// Let's rely on standard ColumnDef but we need the 'form' property which is custom.
// I'll define an interface here that extends the shape we expect.

interface FormColumn {
    key: string
    label: string
    form?: {
        required?: boolean
        label?: string
        type?: 'text' | 'number' | 'date' | 'select' | 'password' | 'textarea'
        options?: { label: string, value: any }[]
        defaultValue?: any
    }
}

interface NexusTableFormProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    initialData?: any
    columns: FormColumn[]
    onSave: (data: any) => void
    isNew?: boolean
    loading?: boolean
}

export function NexusTableForm({ isOpen, onOpenChange, initialData, columns, onSave, isNew = false, loading = false }: NexusTableFormProps) {
    const [formData, setFormData] = React.useState<any>(initialData || {})

    // Reset form when opening/closing or switching mode
    React.useEffect(() => {
        if (isOpen) {
            setFormData(initialData || {})
        }
    }, [isOpen, initialData])

    // Filter columns that have form config
    const formFields = React.useMemo(() => {
        return columns.filter(col => col.form)
    }, [columns])

    const handleChange = (key: string, value: any) => {
        setFormData((prev: any) => ({ ...prev, [key]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Basic required validation
        for (const field of formFields) {
            if (field.form?.required && !formData[field.key]) {
                // Ideally show error toast
                alert(`O campo ${field.form.label || field.label} é obrigatório.`)
                return
            }
        }
        onSave(formData)
        onOpenChange(false)
    }

    return (
        <DialogPrimitive.Root open={isOpen} onOpenChange={onOpenChange}>
            <DialogPrimitive.Portal>
                <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
                    <div className="flex flex-col space-y-1.5 text-center sm:text-left">
                        <DialogPrimitive.Title className="text-lg font-semibold leading-none tracking-tight">
                            {isNew ? 'Adicionar Registro' : 'Editar Registro'}
                        </DialogPrimitive.Title>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                        {formFields.map((col) => (
                            <div key={col.key} className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor={col.key} className="text-right text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    {col.form?.label || col.label}
                                    {col.form?.required && <span className="text-destructive ml-1">*</span>}
                                </label>
                                <div className="col-span-3">
                                    {col.form?.type === 'select' ? (
                                       <NexusSelect
                                            options={col.form.options || []}
                                            value={formData[col.key]}
                                            onChange={(val) => handleChange(col.key, val)}
                                            placeholder="Selecione..."
                                       />
                                    ) : (
                                        <NexusInput
                                            id={col.key}
                                            isPassword={col.form?.type === 'password'}
                                            value={formData[col.key] || ''}
                                            onChange={(e) => handleChange(col.key, e.target.value)}
                                            className="w-full"
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                        
                        <div className="flex justify-end gap-2 mt-4">
                            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} disabled={loading}>
                                Cancelar
                            </Button>
                            <Button type="submit" variant="primary" disabled={loading}>
                                {loading ? (
                                    <>
                                        <span className="material-symbols-outlined text-[16px] animate-spin mr-2">progress_activity</span>
                                        Salvando...
                                    </>
                                ) : (
                                    'Salvar'
                                )}
                            </Button>
                        </div>
                    </form>
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    )
}
