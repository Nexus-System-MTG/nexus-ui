import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const typographyVariants: (props?: ({
    variant?: "small" | "h2" | "h3" | "p" | "blockquote" | "h1" | "h4" | "large" | "muted" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
interface NexusTypographyProps extends React.HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement>, VariantProps<typeof typographyVariants> {
    as?: React.ElementType;
}
declare const NexusTypography: React.ForwardRefExoticComponent<NexusTypographyProps & React.RefAttributes<HTMLElement>>;
export { NexusTypography, typographyVariants };
