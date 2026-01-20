interface FormColumn {
    key: string;
    label: string;
    form?: {
        required?: boolean;
        label?: string;
        type?: 'text' | 'number' | 'date' | 'select' | 'password' | 'textarea';
        options?: {
            label: string;
            value: any;
        }[];
        defaultValue?: any;
    };
}
interface NexusTableFormProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    initialData?: any;
    columns: FormColumn[];
    onSave: (data: any) => void;
    isNew?: boolean;
    loading?: boolean;
}
export declare function NexusTableForm({ isOpen, onOpenChange, initialData, columns, onSave, isNew, loading }: NexusTableFormProps): import("react/jsx-runtime").JSX.Element;
export {};
