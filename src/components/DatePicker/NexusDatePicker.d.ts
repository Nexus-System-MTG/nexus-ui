import * as React from "react";
import { DayPicker } from "react-day-picker";
export type NexusCalendarProps = React.ComponentProps<typeof DayPicker>;
declare const NexusCalendar: {
    ({ className, classNames, showOutsideDays, ...props }: NexusCalendarProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export interface NexusDatePickerProps {
    date?: Date;
    onSelect?: (date: Date | undefined) => void;
    label?: string;
    placeholder?: string;
    className?: string;
}
declare const NexusDatePicker: {
    ({ date, onSelect, label, placeholder, className }: NexusDatePickerProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export interface NexusDateFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
    label?: string;
    value?: Date;
    onValueChange?: (date: Date | undefined) => void;
    formatStr?: string;
}
declare const NexusDateField: React.ForwardRefExoticComponent<NexusDateFieldProps & React.RefAttributes<HTMLInputElement>>;
export { NexusCalendar, NexusDatePicker, NexusDateField };
