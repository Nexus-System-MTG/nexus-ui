import * as React from "react"
import { cn } from "../../lib/utils"
import type { ButtonProps } from "../Button/Button"

const NexusPagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
)
NexusPagination.displayName = "NexusPagination"

const NexusPaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
))
NexusPaginationContent.displayName = "NexusPaginationContent"

const NexusPaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
NexusPaginationItem.displayName = "NexusPaginationItem"

type NexusPaginationLinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">

const NexusPaginationLink = ({
  className,
  isActive,
  size = "md",
  ...props
}: NexusPaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
        // We reuse component button styles or generic logic
      "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 cursor-pointer",
      isActive && "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground",
      size === "sm" && "h-8 w-8 text-xs",
      size === "lg" && "h-10 w-10 text-base",
      className
    )}
    {...props}
  />
)
NexusPaginationLink.displayName = "NexusPaginationLink"

const NexusPaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof NexusPaginationLink>) => (
  <NexusPaginationLink
    aria-label="Go to previous page"
    size="md"
    className={cn("bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground p-0", className)}
    {...props}
  >
    <span className="material-symbols-outlined text-[18px]">chevron_left</span>
  </NexusPaginationLink>
)
NexusPaginationPrevious.displayName = "NexusPaginationPrevious"

const NexusPaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof NexusPaginationLink>) => (
  <NexusPaginationLink
    aria-label="Go to next page"
    size="md"
    className={cn("bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground p-0", className)}
    {...props}
  >
    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
  </NexusPaginationLink>
)
NexusPaginationNext.displayName = "NexusPaginationNext"

const NexusPaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <span className="material-symbols-outlined text-[18px]">more_horiz</span>
    <span className="sr-only">More pages</span>
  </span>
)
NexusPaginationEllipsis.displayName = "NexusPaginationEllipsis"

export {
  NexusPagination,
  NexusPaginationContent,
  NexusPaginationEllipsis,
  NexusPaginationItem,
  NexusPaginationLink,
  NexusPaginationNext,
  NexusPaginationPrevious,
}
