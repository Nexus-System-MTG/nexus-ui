import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const badgeVariants: (props?: ({
    variant?: "secondary" | "destructive" | "outline" | "default" | null | undefined;
    size?: "default" | "dot" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface NexusBadgeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'>, VariantProps<typeof badgeVariants> {
    content?: React.ReactNode;
    max?: number;
    showZero?: boolean;
    invisible?: boolean;
}
declare function NexusBadge({ className, variant, size, content, max, showZero, invisible, children, ...props }: NexusBadgeProps): import("react/jsx-runtime").JSX.Element;
export { NexusBadge, badgeVariants };
