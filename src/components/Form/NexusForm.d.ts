import * as React from "react";
import type { SubmitHandler, UseFormProps, FieldValues, UseFormReturn } from "react-hook-form";
import type { ZodType } from "zod";
export interface NexusFormProps<T extends FieldValues> extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'children'> {
    onSubmit: SubmitHandler<T>;
    schema?: ZodType<T, any, any>;
    defaultValues?: UseFormProps<T>['defaultValues'];
    children: React.ReactNode | ((methods: UseFormReturn<T>) => React.ReactNode);
    submitLabel?: string;
    loadingLabel?: string;
    isLoading?: boolean;
    error?: string | null;
    successMessage?: string | null;
    footer?: React.ReactNode;
}
/**
 * NexusForm - A smart wrapper for forms using react-hook-form and zod.
 * Handles validation, loading states, error display, and success messages automatically.
 */
export declare function NexusForm<T extends FieldValues>({ className, onSubmit, children, schema, defaultValues, submitLabel, loadingLabel, isLoading: externalLoading, error: externalError, successMessage, footer, ...props }: NexusFormProps<T>): import("react/jsx-runtime").JSX.Element;
