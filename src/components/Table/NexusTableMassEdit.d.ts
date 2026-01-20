import type { NexusColumnDef } from "./NexusTable";
interface NexusTableMassEditProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    columns: NexusColumnDef[];
    onSave: (columnId: string, value: any) => Promise<void>;
}
export declare function NexusTableMassEdit({ open, onOpenChange, columns, onSave }: NexusTableMassEditProps): import("react/jsx-runtime").JSX.Element;
export {};
