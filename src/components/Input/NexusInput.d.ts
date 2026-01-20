import * as React from "react";
export type InputMaskType = 'cpf' | 'cnpj' | 'cep' | 'phone' | 'currency' | 'date';
export interface NexusInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
    type?: string;
    mask?: InputMaskType;
    leftIcon?: string;
    rightIcon?: string;
    onRightIconClick?: () => void;
    isPassword?: boolean;
    label?: string;
    error?: string;
    fullWidth?: boolean;
}
declare const NexusInput: React.ForwardRefExoticComponent<NexusInputProps & React.RefAttributes<HTMLInputElement>>;
export { NexusInput };
