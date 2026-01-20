import * as React from "react";
import { type Table } from "@tanstack/react-table";
import type { DetailViewMode } from "./NexusTableDetailView";
interface NexusTableToolbarProps<TData> {
    table: Table<TData>;
    searchValue: string;
    onSearchChange: (value: string) => void;
    detailViewMode: DetailViewMode;
    onDetailViewModeChange: (mode: DetailViewMode) => void;
    layoutMode: 'table' | 'card';
    onLayoutModeChange: (mode: 'table' | 'card') => void;
    enableCustomization?: boolean;
    actions?: React.ReactNode;
}
export declare function NexusTableToolbar<TData>({ table, searchValue, onSearchChange, detailViewMode, onDetailViewModeChange, layoutMode, onLayoutModeChange, enableCustomization, actions }: NexusTableToolbarProps<TData>): import("react/jsx-runtime").JSX.Element;
export {};
