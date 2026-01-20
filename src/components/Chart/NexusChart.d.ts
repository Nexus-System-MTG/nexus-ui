import * as React from "react";
export interface NexusChartProps extends React.HTMLAttributes<HTMLDivElement> {
    data: any[];
    type: "bar" | "line" | "pie" | "scatter" | "donut";
    dataKeys?: string[];
    indexKey?: string;
    colors?: string[];
    height?: number | string;
    title?: string;
    subtitle?: string;
    moreInfoLink?: string;
    axisLabelX?: string;
    axisLabelY?: string;
    grid?: boolean;
    centerLabel?: string;
}
declare const NexusChart: React.ForwardRefExoticComponent<NexusChartProps & React.RefAttributes<HTMLDivElement>>;
export { NexusChart };
