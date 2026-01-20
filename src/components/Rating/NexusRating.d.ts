import * as React from "react";
export interface NexusRatingProps {
    max?: number;
    value?: number;
    onChange?: (value: number) => void;
    disabled?: boolean;
    className?: string;
}
declare const NexusRating: React.ForwardRefExoticComponent<NexusRatingProps & React.RefAttributes<HTMLDivElement>>;
export { NexusRating };
