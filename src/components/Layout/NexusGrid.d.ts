import * as React from "react";
type GridSpacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
type GridSize = boolean | "auto" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export interface NexusGridProps extends React.HTMLAttributes<HTMLDivElement> {
    container?: boolean;
    item?: boolean;
    spacing?: GridSpacing;
    xs?: GridSize;
    sm?: GridSize;
    md?: GridSize;
    lg?: GridSize;
    xl?: GridSize;
}
declare const NexusGrid: React.ForwardRefExoticComponent<NexusGridProps & React.RefAttributes<HTMLDivElement>>;
export { NexusGrid };
