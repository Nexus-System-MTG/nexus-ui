import * as React from "react";
declare const alertVariants: {
    success: {
        container: string;
        icon: string;
        defaultIcon: string;
    };
    error: {
        container: string;
        icon: string;
        defaultIcon: string;
    };
    warning: {
        container: string;
        icon: string;
        defaultIcon: string;
    };
    info: {
        container: string;
        icon: string;
        defaultIcon: string;
    };
};
export interface NexusAlertProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: keyof typeof alertVariants;
    title?: string;
    icon?: string;
    onClose?: () => void;
    /**
     * If true, the alert will automatically call onClose after `duration` ms.
     * Default: true
     */
    autoDismiss?: boolean;
    /**
     * Duration in milliseconds before auto-dismissing.
     * Default: 5000
     */
    duration?: number;
}
export declare function NexusAlert({ variant, title, icon, onClose, autoDismiss, duration, children, className, ...props }: NexusAlertProps): import("react/jsx-runtime").JSX.Element;
export {};
