import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
declare const NexusTooltipRoot: React.FC<TooltipPrimitive.TooltipProps>;
declare const NexusTooltipTrigger: React.ForwardRefExoticComponent<TooltipPrimitive.TooltipTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const NexusTooltipProvider: React.FC<TooltipPrimitive.TooltipProviderProps>;
declare const NexusTooltipContent: React.ForwardRefExoticComponent<Omit<TooltipPrimitive.TooltipContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export interface NexusTooltipProps {
    children: React.ReactNode;
    content: React.ReactNode;
}
declare function NexusTooltip({ children, content }: NexusTooltipProps): import("react/jsx-runtime").JSX.Element;
export { NexusTooltip, NexusTooltipRoot, NexusTooltipTrigger, NexusTooltipContent, NexusTooltipProvider };
