import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const chipVariants: (props?: ({
    variant?: "secondary" | "destructive" | "glass" | "outline" | "default" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
interface NexusChipProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof chipVariants> {
    label: string;
    onDelete?: () => void;
    onClick?: () => void;
    icon?: string;
}
declare function NexusChip({ className, variant, label, onDelete, onClick, icon, ...props }: NexusChipProps): import("react/jsx-runtime").JSX.Element;
export { NexusChip, chipVariants };
