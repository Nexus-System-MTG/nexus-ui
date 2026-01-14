import * as React from "react"
import { useForm, FormProvider } from "react-hook-form"
import type { SubmitHandler, UseFormProps, FieldValues, UseFormReturn } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { ZodType } from "zod"
import { cn } from "../../lib/utils"
import { Button } from "../Button/Button"
import { NexusAlert } from "../Alert/NexusAlert"

export interface NexusFormProps<T extends FieldValues> extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'children'> {
    onSubmit: SubmitHandler<T>
    schema?: ZodType<T, any, any>
    defaultValues?: UseFormProps<T>['defaultValues']
    children: React.ReactNode | ((methods: UseFormReturn<T>) => React.ReactNode)
    submitLabel?: string
    loadingLabel?: string
    isLoading?: boolean
    error?: string | null
    successMessage?: string | null
    footer?: React.ReactNode
}

/**
 * NexusForm - A smart wrapper for forms using react-hook-form and zod.
 * Handles validation, loading states, error display, and success messages automatically.
 */
export function NexusForm<T extends FieldValues>({ 
    className,
    onSubmit,
    children,
    schema,
    defaultValues,
    submitLabel = "Salvar",
    loadingLabel = "Salvando...",
    isLoading: externalLoading = false,
    error: externalError = null,
    successMessage = null,
    footer,
    ...props 
}: NexusFormProps<T>) {
    const methods = useForm<T>({
        // @ts-ignore - Resolver types allow flexible schemas but TS struggles with generic T
        resolver: schema ? zodResolver(schema) : undefined,
        defaultValues,
    })

    const { handleSubmit, formState: { isSubmitting: formSubmitting } } = methods
    
    // Combine external and internal loading states
    const isLoading = externalLoading || formSubmitting

    return (
        <FormProvider {...methods}>
            <form 
                onSubmit={handleSubmit(onSubmit)} 
                className={cn("flex flex-col gap-6 w-full", className)} 
                {...props}
            >
                {/* Global Error Alert */}
                {externalError && (
                    <NexusAlert variant="error" title="Erro" className="animate-in fade-in slide-in-from-top-2">
                        {externalError}
                    </NexusAlert>
                )}

                 {/* Success Alert */}
                 {successMessage && !isLoading && !externalError && (
                    <NexusAlert variant="success" title="Sucesso" className="animate-in fade-in slide-in-from-top-2">
                        {successMessage}
                    </NexusAlert>
                )}

                <div className="flex flex-col gap-4">
                    {typeof children === 'function' ? children(methods) : children}
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
        </FormProvider>
    )
}
