import * as React from "react";
export interface NexusContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    as?: React.ElementType;
    maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full" | false;
    centered?: boolean;
}
declare const NexusContainer: React.ForwardRefExoticComponent<NexusContainerProps & React.RefAttributes<HTMLDivElement>>;
export { NexusContainer };
