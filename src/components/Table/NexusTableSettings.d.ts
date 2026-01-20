import type { Table } from "@tanstack/react-table";
import type { DetailViewMode } from "./NexusTableDetailView";
interface NexusTableSettingsProps<TData> {
    table: Table<TData>;
    detailViewMode: DetailViewMode;
    onDetailViewModeChange: (mode: DetailViewMode) => void;
    layoutMode: 'table' | 'card';
    onLayoutModeChange: (mode: 'table' | 'card') => void;
    enableCustomization?: boolean;
}
export declare function NexusTableSettings<TData>({ table, detailViewMode, onDetailViewModeChange, layoutMode, onLayoutModeChange, enableCustomization }: NexusTableSettingsProps<TData>): import("react/jsx-runtime").JSX.Element;
export {};
