import * as React from "react"
import { cn } from "../../lib/utils"

const NexusBreadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ReactNode
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />)
NexusBreadcrumb.displayName = "NexusBreadcrumb"

const NexusBreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
      className
    )}
    {...props}
  />
))
NexusBreadcrumbList.displayName = "NexusBreadcrumbList"

const NexusBreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props}
  />
))
NexusBreadcrumbItem.displayName = "NexusBreadcrumbItem"

const NexusBreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? React.Fragment : "a"
  return (
    <Comp
      ref={ref}
      className={cn("transition-colors hover:text-foreground", className)}
      {...props}
    />
  )
})
NexusBreadcrumbLink.displayName = "NexusBreadcrumbLink"

const NexusBreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn("font-normal text-foreground", className)}
    {...props}
  />
))
NexusBreadcrumbPage.displayName = "NexusBreadcrumbPage"

const NexusBreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:size-3.5 flex items-center justify-center", className)}
    {...props}
  >
    {children ?? <span className="material-symbols-outlined text-[16px]">chevron_right</span>}
  </li>
)
NexusBreadcrumbSeparator.displayName = "NexusBreadcrumbSeparator"

export {
  NexusBreadcrumb,
  NexusBreadcrumbList,
  NexusBreadcrumbItem,
  NexusBreadcrumbLink,
  NexusBreadcrumbPage,
  NexusBreadcrumbSeparator,
}
