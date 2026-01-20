import { type Row } from "@tanstack/react-table";
interface NexusTableCardProps<TData> {
    row: Row<TData>;
    onClick?: () => void;
}
export declare function NexusTableCard<TData>({ row, onClick }: NexusTableCardProps<TData>): import("react/jsx-runtime").JSX.Element;
export {};
