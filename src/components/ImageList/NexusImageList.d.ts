import * as React from "react";
export interface NexusImageListProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "standard" | "masonry" | "woven";
    cols?: number;
    gap?: number;
}
declare const NexusImageList: React.ForwardRefExoticComponent<NexusImageListProps & React.RefAttributes<HTMLDivElement>>;
declare const NexusImageListItem: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    cols?: number;
    rows?: number;
} & React.RefAttributes<HTMLDivElement>>;
export { NexusImageList, NexusImageListItem };
