import * as React from "react";
export interface NexusBottomNavigationProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    value?: any;
    onChange?: (event: React.SyntheticEvent, newValue: any) => void;
    showLabels?: boolean;
}
declare const NexusBottomNavigation: React.ForwardRefExoticComponent<NexusBottomNavigationProps & React.RefAttributes<HTMLDivElement>>;
export interface NexusBottomNavigationActionProps extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'onChange'> {
    label?: string;
    value?: any;
    icon?: React.ReactNode;
    selected?: boolean;
    showLabel?: boolean;
    onChange?: (event: React.SyntheticEvent, newValue: any) => void;
}
declare const NexusBottomNavigationAction: React.ForwardRefExoticComponent<NexusBottomNavigationActionProps & React.RefAttributes<HTMLButtonElement>>;
export { NexusBottomNavigation, NexusBottomNavigationAction };
