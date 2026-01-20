import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { type DetailViewMode, type DetailSection } from "./NexusTableDetailView";
export type FilterOperator = 'contains' | 'equals' | 'startsWith' | 'endsWith' | 'gt' | 'lt' | 'ne' | 'isEmpty' | 'isNotEmpty';
export type NexusDataType = 'text' | 'number' | 'select' | 'multiselect' | 'date' | 'currency' | 'status';
export interface NexusColumnDef {
    key: string;
    label: string;
    dataType?: NexusDataType;
    valueColorMap?: Record<string, string>;
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
export interface NexusRowAction<TData> {
    label: string;
    icon?: string;
    onClick?: (row: TData) => void;
    variant?: 'primary' | 'destructive' | 'ghost' | 'secondary' | 'outline';
}
export interface NexusBulkAction<TData> {
    label: string;
    icon?: string;
    onClick: (rows: TData[]) => void;
    variant?: 'primary' | 'destructive' | 'secondary' | 'outline';
}
export interface FilterRule {
    id: string;
    columnId: string;
    operator: FilterOperator;
    value: any;
}
export interface AdvancedFilterState {
    query: string;
    logic: 'and' | 'or';
    rules: FilterRule[];
}
interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[] | NexusColumnDef[];
    data: TData[];
    tableId?: string;
    enableCustomization?: boolean;
    defaultDetailViewMode?: DetailViewMode;
    toolbarActions?: React.ReactNode;
    title?: string;
    titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    onSave?: (data: TData, isNew: boolean) => Promise<void> | void;
    onDelete?: (data: TData) => Promise<void> | void;
    rowActions?: NexusRowAction<TData>[];
    bulkActions?: NexusBulkAction<TData>[];
    loading?: boolean;
    loadingType?: 'spinner' | 'bar';
    loadingColor?: string;
    renderDetail?: (row: TData) => React.ReactNode;
    detailSections?: DetailSection[];
    onBulkDelete?: (rows: TData[]) => Promise<void> | void;
    onBulkEdit?: (rows: TData[], columnId: string, value: any) => Promise<void> | void;
}
export declare function NexusTable<TData, TValue>({ columns, data, tableId, enableCustomization, defaultDetailViewMode, toolbarActions, title, titleAs, onSave, onDelete, rowActions, bulkActions, loading, loadingType, loadingColor, renderDetail, detailSections, onBulkDelete, onBulkEdit }: DataTableProps<TData, TValue>): import("react/jsx-runtime").JSX.Element;
export {};
