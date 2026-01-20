import * as React from "react";
export interface SelectOption {
    value: string;
    label: string;
    group?: string;
    icon?: string;
}
export interface NexusSelectProps {
    options: SelectOption[];
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    label?: string;
    leftIcon?: string;
    error?: string;
    disabled?: boolean;
    className?: string;
    fullWidth?: boolean;
}
export declare function NexusSelect({ options, value, onChange, placeholder, label, leftIcon, error, disabled, className, fullWidth, id, ...props }: NexusSelectProps & {
    id?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'>): import("react/jsx-runtime").JSX.Element;
