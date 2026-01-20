import * as React from "react";
export interface NexusSidebarItem {
    id: string;
    label: string;
    icon?: string;
    href?: string;
    onClick?: () => void;
    isActive?: boolean;
    subItems?: NexusSidebarItem[];
}
export interface NexusSidebarSection {
    id: string;
    title?: string;
    items: NexusSidebarItem[];
    collapsible?: boolean;
}
export interface NexusSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    logo?: React.ReactNode;
    logoCollapsed?: React.ReactNode;
    sections: NexusSidebarSection[];
    collapsed?: boolean;
    onCollapseChange?: (collapsed: boolean) => void;
    footer?: React.ReactNode;
    activeItem?: string;
}
export declare function NexusSidebar({ className, logo, logoCollapsed, sections, collapsed, onCollapseChange, footer, activeItem, ...props }: NexusSidebarProps): import("react/jsx-runtime").JSX.Element;
