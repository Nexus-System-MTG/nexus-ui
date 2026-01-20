import * as React from "react";
export interface NexusPaperProps extends React.HTMLAttributes<HTMLDivElement> {
    elevation?: 0 | 1 | 2 | 3 | 4 | 5;
    square?: boolean;
}
declare const NexusPaper: React.ForwardRefExoticComponent<NexusPaperProps & React.RefAttributes<HTMLDivElement>>;
export { NexusPaper };
