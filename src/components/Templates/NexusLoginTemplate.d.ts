import * as React from "react";
export interface NexusLoginTemplateProps extends React.HTMLAttributes<HTMLDivElement> {
    logo?: React.ReactNode;
    visualContent?: React.ReactNode;
    children?: React.ReactNode;
    backgroundImage?: string;
}
export declare function NexusLoginTemplate({ className, logo, visualContent, children, backgroundImage, ...props }: NexusLoginTemplateProps): import("react/jsx-runtime").JSX.Element;
