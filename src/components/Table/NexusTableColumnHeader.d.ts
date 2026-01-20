import { type Column } from "@tanstack/react-table";
interface NexusTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>;
    title: string;
}
export declare function NexusTableColumnHeader<TData, TValue>({ column, title, className, }: NexusTableColumnHeaderProps<TData, TValue>): import("react/jsx-runtime").JSX.Element;
export {};
