import * as React from "react"
import { cn } from "../../lib/utils"
import { Button } from "../Button/Button"
import { NexusAlert } from "../Alert/NexusAlert"

export interface NexusFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    onSubmit: (e: React.FormEvent) => Promise<void> | void
    defaultValues?: Record<string, any>
    children: React.ReactNode
    submitLabel?: string
    loadingLabel?: string
    isLoading?: boolean
    error?: string | null
    successMessage?: string | null
    footer?: React.ReactNode
}

/**
 * NexusForm - A smart wrapper for forms.
 * Handles loading states, error display, and success messages automatically.
 */
export function NexusForm({ 
    className,
    onSubmit,
    children,
    submitLabel = "Salvar",
    loadingLabel = "Salvando...",
    isLoading: externalLoading = false,
    error: externalError = null,
    successMessage = null,
    footer,
    ...props 
}: NexusFormProps) {
    const [internalLoading, setInternalLoading] = React.useState(false)
    const [internalError, setInternalError] = React.useState<string | null>(null)

    const isLoading = externalLoading || internalLoading
    const error = externalError || internalError

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        e.stopPropagation()

        setInternalLoading(true)
        setInternalError(null)

        try {
            await onSubmit(e)
        } catch (err: any) {
            console.error("NexusForm Submit Error:", err)
            setInternalError(err.message || "Ocorreu um erro inesperado ao salvar.")
        } finally {
            setInternalLoading(false)
        }
    }

    return (
        <form 
            onSubmit={handleSubmit} 
            className={cn("flex flex-col gap-6 w-full", className)} 
            {...props}
        >
            {/* Global Error Alert */}
            {error && (
                <NexusAlert variant="error" title="Erro" className="animate-in fade-in slide-in-from-top-2">
                    {error}
                </NexusAlert>
            )}

             {/* Success Alert */}
             {successMessage && !isLoading && !error && (
                <NexusAlert variant="success" title="Sucesso" className="animate-in fade-in slide-in-from-top-2">
                    {successMessage}
                </NexusAlert>
            )}

            <div className="flex flex-col gap-4">
                {children}
            </div>

            {/* Footer / Actions */}
            <div className="pt-4 flex items-center gap-4 justify-end border-t border-border mt-2">
                 {footer ? footer : (
                     <Button 
                        type="submit" 
                        isLoading={isLoading}
                        disabled={isLoading}
                     >
                        {isLoading ? loadingLabel : submitLabel}
                     </Button>
                 )}
            </div>
        </form>
    )
}
