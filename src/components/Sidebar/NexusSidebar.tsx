import * as React from "react"
import { cn } from "../../lib/utils"
import { NexusThemeToggle } from "../Theme/NexusThemeToggle"
import { Button } from "../Button/Button"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
// Actually I don't recall seeing ScrollArea in the list. I'll check.
// If not, I'll use a simple div with overflow-y-auto and custom scrollbar styles.

export interface NexusSidebarItem {
    id: string
    label: string
    icon?: string
    href?: string
    onClick?: () => void
    isActive?: boolean
    subItems?: NexusSidebarItem[]
}

export interface NexusSidebarSection {
    id: string
    title?: string
    items: NexusSidebarItem[]
    collapsible?: boolean // If true, section is an accordion item
}

export interface NexusSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    logo?: React.ReactNode
    logoCollapsed?: React.ReactNode
    sections: NexusSidebarSection[]
    collapsed?: boolean
    onCollapseChange?: (collapsed: boolean) => void
    footer?: React.ReactNode
    activeItem?: string
}

export function NexusSidebar({ 
    className, 
    logo, 
    logoCollapsed,
    sections, 
    collapsed = false, 
    onCollapseChange,
    footer,
    activeItem,
    ...props 
}: NexusSidebarProps) {
    // Accordion state
    const [openSections, setOpenSections] = React.useState<string[]>(
        sections.filter(s => s.collapsible).map(s => s.id)
    )

    return (
        <div 
            className={cn(
                "group flex flex-col h-screen bg-sidebar-background text-sidebar-foreground transition-all duration-300 ease-in-out border-r border-border/10 shadow-xl",
                collapsed ? "w-[80px]" : "w-[280px]",
                className
            )}
            {...props}
        >
            {/* Header / Logo */}
            <div 
                className={cn(
                    "shrink-0 flex transition-all duration-300", 
                    collapsed 
                        ? "flex-col items-center justify-center py-4 gap-4 h-auto" 
                        : "flex-row items-center justify-between h-16 px-6"
                )}
            >
                {!collapsed && logo}
                {collapsed && (
                    logoCollapsed ? (
                        <div className="flex justify-center">{logoCollapsed}</div>
                    ) : (
                        logo && <div className="scale-75 origin-center">{logo}</div>
                    )
                )}
                
                 {/* Collapse Toggle */}
                 <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => onCollapseChange?.(!collapsed)}
                    className={cn(
                        "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 hidden md:flex",
                        collapsed && "w-8 h-8"
                    )}
                 >
                    <span 
                        className={cn(
                            "material-symbols-outlined transition-transform duration-300", 
                            !collapsed && "rotate-180"
                        )}
                    >
                        chevron_right
                    </span>
                 </Button>
            </div>

             {/* Content */}
             <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 custom-scrollbar">
                <nav className="flex flex-col gap-2 px-3">
                    <AccordionPrimitive.Root 
                        type="multiple" 
                        value={openSections} 
                        onValueChange={setOpenSections}
                        className="w-full flex flex-col gap-6"
                    >
                        {sections.map((section) => (
                            <div key={section.id} className="flex flex-col gap-1">
                                {/* Section Title - Only show if line item is NOT collapsible (duplicates trigger otherwise) */}
                                {!collapsed && section.title && !section.collapsible && (
                                    <div className="px-3 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/60 mb-2 mt-2">
                                        {section.title}
                                    </div>
                                )}

                                {section.collapsible && !collapsed ? (
                                     <AccordionPrimitive.Item value={section.id} className="border-none">
                                        <AccordionPrimitive.Trigger className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent/50 rounded-md transition-colors group/accordion-trigger">
                                            <span className="flex items-center gap-3">
                                                {/* Could have section icon if needed */}
                                                {section.title}
                                            </span>
                                            <span className="material-symbols-outlined text-[16px] transition-transform duration-200 group-data-[state=open]/accordion-trigger:rotate-180">
                                                expand_more
                                            </span>
                                        </AccordionPrimitive.Trigger>
                                        <AccordionPrimitive.Content className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                                            <div className="flex flex-col gap-1 pt-1 pb-2">
                                                {section.items.map(item => (
                                                    <SidebarItem key={item.id} item={item} collapsed={collapsed} activeItem={activeItem} />
                                                ))}
                                            </div>
                                        </AccordionPrimitive.Content>
                                     </AccordionPrimitive.Item>
                                ) : (
                                    // Regular list or collapsed mode (where Accordion implies submenus which sidebar usually handles differently in collapsed)
                                    // For simplicity, in collapsed mode we just show items.
                                    // If section is NOT collapsible, just render items.
                                    <div className="flex flex-col gap-1">
                                        {section.items.map(item => (
                                            <SidebarItem key={item.id} item={item} collapsed={collapsed} activeItem={activeItem} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </AccordionPrimitive.Root>
                </nav>
             </div>

             {/* Footer */}
             <div className="p-4 border-t border-white/10 shrink-0 flex flex-col gap-2">
                 {footer}
                 <div className={cn("flex items-center", collapsed ? "justify-center" : "justify-between gap-2")}>
                    {!collapsed && <span className="text-xs font-medium opacity-70">Tema</span>}
                    <NexusThemeToggle />
                 </div>
             </div>
        </div>
    )
}

function SidebarItem({ item, collapsed, activeItem }: { item: NexusSidebarItem, collapsed: boolean, activeItem?: string }) {
    const isActive = item.isActive || item.id === activeItem

    return (
        <div 
            onClick={item.onClick}
            className={cn(
                "group/item relative flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer transition-all duration-200 select-none",
                isActive 
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold shadow-sm" 
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                collapsed && "justify-center px-2"
            )}
        >
            {isActive && !collapsed && (
                <div className="absolute left-0 w-1 h-6 bg-sidebar-primary rounded-r-full" />
            )}
            
            {item.icon && (
                <span className={cn("material-symbols-outlined text-[20px]", isActive ? "font-bold" : "")}>
                    {item.icon}
                </span>
            )}
            
            {!collapsed && (
                <span className="text-sm font-medium truncate">{item.label}</span>
            )}

            {/* Tooltip for collapsed mode could go here */}
        </div>
    )
}
