import * as React from "react";
import type { ButtonProps } from "../Button/Button";
declare const NexusPagination: {
    ({ className, ...props }: React.ComponentProps<"nav">): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const NexusPaginationContent: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>, "ref"> & React.RefAttributes<HTMLUListElement>>;
declare const NexusPaginationItem: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>, "ref"> & React.RefAttributes<HTMLLIElement>>;
type NexusPaginationLinkProps = {
    isActive?: boolean;
} & Pick<ButtonProps, "size"> & React.ComponentProps<"a">;
declare const NexusPaginationLink: {
    ({ className, isActive, size, ...props }: NexusPaginationLinkProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const NexusPaginationPrevious: {
    ({ className, ...props }: React.ComponentProps<typeof NexusPaginationLink>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const NexusPaginationNext: {
    ({ className, ...props }: React.ComponentProps<typeof NexusPaginationLink>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const NexusPaginationEllipsis: {
    ({ className, ...props }: React.ComponentProps<"span">): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export { NexusPagination, NexusPaginationContent, NexusPaginationEllipsis, NexusPaginationItem, NexusPaginationLink, NexusPaginationNext, NexusPaginationPrevious, };
