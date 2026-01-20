import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
declare const NexusDrawer: React.FC<DialogPrimitive.DialogProps>;
declare const NexusDrawerTrigger: React.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const NexusDrawerClose: React.ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & React.RefAttributes<HTMLButtonElement>>;
declare const NexusDrawerPortal: React.FC<DialogPrimitive.DialogPortalProps>;
declare const NexusDrawerOverlay: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogOverlayProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
interface NexusDrawerContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
    side?: "top" | "bottom" | "left" | "right";
}
declare const NexusDrawerContent: React.ForwardRefExoticComponent<NexusDrawerContentProps & React.RefAttributes<HTMLDivElement>>;
declare const NexusDrawerHeader: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const NexusDrawerFooter: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const NexusDrawerTitle: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogTitleProps & React.RefAttributes<HTMLHeadingElement>, "ref"> & React.RefAttributes<HTMLHeadingElement>>;
declare const NexusDrawerDescription: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogDescriptionProps & React.RefAttributes<HTMLParagraphElement>, "ref"> & React.RefAttributes<HTMLParagraphElement>>;
export { NexusDrawer, NexusDrawerPortal, NexusDrawerOverlay, NexusDrawerTrigger, NexusDrawerClose, NexusDrawerContent, NexusDrawerHeader, NexusDrawerFooter, NexusDrawerTitle, NexusDrawerDescription, };
