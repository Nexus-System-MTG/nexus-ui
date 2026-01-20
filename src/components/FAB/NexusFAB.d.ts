import * as React from "react";
export interface NexusFABProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: string;
    label?: string;
    position?: 'bottom-right' | 'bottom-left' | 'none';
}
declare const NexusFAB: React.ForwardRefExoticComponent<NexusFABProps & React.RefAttributes<HTMLButtonElement>>;
export { NexusFAB };
