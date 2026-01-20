import * as React from "react";
export interface NexusBoxProps extends React.HTMLAttributes<HTMLDivElement> {
    as?: React.ElementType;
}
declare const NexusBox: React.ForwardRefExoticComponent<NexusBoxProps & React.RefAttributes<HTMLDivElement>>;
export { NexusBox };
