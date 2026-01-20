import * as React from "react";
export interface NexusAppBarProps extends React.HTMLAttributes<HTMLDivElement> {
    position?: "fixed" | "absolute" | "sticky" | "static" | "relative";
    color?: "primary" | "default" | "transparent";
    mobileMenuContent?: React.ReactNode;
}
declare const NexusAppBar: React.ForwardRefExoticComponent<NexusAppBarProps & React.RefAttributes<HTMLDivElement>>;
export { NexusAppBar };
