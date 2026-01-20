import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { type VariantProps } from "class-variance-authority";
declare const NexusToggleGroup: React.ForwardRefExoticComponent<((Omit<ToggleGroupPrimitive.ToggleGroupSingleProps & React.RefAttributes<HTMLDivElement>, "ref"> | Omit<ToggleGroupPrimitive.ToggleGroupMultipleProps & React.RefAttributes<HTMLDivElement>, "ref">) & VariantProps<(props?: ({
    variant?: "glass" | "outline" | "default" | null | undefined;
    size?: "sm" | "lg" | "default" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string>) & React.RefAttributes<HTMLDivElement>>;
declare const NexusToggleGroupItem: React.ForwardRefExoticComponent<Omit<ToggleGroupPrimitive.ToggleGroupItemProps & React.RefAttributes<HTMLButtonElement>, "ref"> & VariantProps<(props?: ({
    variant?: "glass" | "outline" | "default" | null | undefined;
    size?: "sm" | "lg" | "default" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string> & React.RefAttributes<HTMLButtonElement>>;
export { NexusToggleGroup, NexusToggleGroupItem };
