import * as React from "react";
import { type Row } from "@tanstack/react-table";
export type DetailViewMode = 'modal' | 'sheet' | 'fullscreen';
export interface DetailSection {
    id: string;
    title: string;
    columns: string[];
    columnsPerMatch?: number;
}
interface NexusTableDetailViewProps<TData> {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    row: Row<TData> | null;
    enableCustomization?: boolean;
    viewMode?: DetailViewMode;
    onViewModeChange?: (mode: DetailViewMode) => void;
    initialSections?: DetailSection[];
    onLayoutChange?: (sections: DetailSection[]) => void;
    renderDetail?: (row: TData) => React.ReactNode;
}
export declare function NexusTableDetailView<TData>({ open, onOpenChange, row, enableCustomization, viewMode, initialSections, onLayoutChange, renderDetail, onViewModeChange }: NexusTableDetailViewProps<TData>): import("react/jsx-runtime").JSX.Element | null;
export {};
