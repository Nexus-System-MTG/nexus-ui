import * as React from "react"
import { cn } from "../../lib/utils"
import { NexusThemeToggle } from "../Theme/NexusThemeToggle"
import { Button } from "../Button/Button"
import * as AccordionPrimitive from "@radix-ui/react-accordion"

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
    collapsible?: boolean
}

export interface NexusSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    logo?: React.ReactNode
    logoCollapsed?: React.ReactNode
    sections: NexusSidebarSection[]
    collapsed?: boolean
    onCollapseChange?: (collapsed: boolean) => void
    footer?: React.ReactNode
    activeItem?: string
    showThemeToggle?: boolean
    themeToggle?: React.ReactNode
    linkComponent?: any
    disableGradient?: boolean
    disableOverlay?: boolean
    backgroundColor?: string
    mobileOpen?: boolean
    onMobileOpenChange?: (open: boolean) => void
}

export const NexusSidebar = React.memo(function NexusSidebar({ 
    className, 
    logo, 
    logoCollapsed,
    sections, 
    collapsed = false, 
    onCollapseChange,
    footer,
    activeItem,
    showThemeToggle = true,
    themeToggle,
    linkComponent,
    disableGradient = false,
    disableOverlay = false,
    backgroundColor,
    mobileOpen = false,
    onMobileOpenChange,
    ...props 
}: NexusSidebarProps) {
    const [openSections, setOpenSections] = React.useState<string[]>([])
    const [isMounted, setIsMounted] = React.useState(false)

    React.useEffect(() => {
        setIsMounted(true)
    }, [])

    React.useEffect(() => {
        if (isMounted) {
            setOpenSections(sections.filter(s => s.collapsible).map(s => s.id))
        }
    }, [isMounted, sections])

    // Default logo fallback
    const defaultLogoFallback = (
        <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[32px] text-white">business_center</span>
            {!collapsed && <span className="text-xl font-bold text-white">ERP</span>}
        </div>
    )

    const displayLogo = logo || defaultLogoFallback

    return (
        <>
            {/* Desktop Sidebar */}
            <div 
                className={cn(
                    "hidden md:flex flex-col h-screen transition-all duration-300 ease-in-out border-r border-border/10 shadow-xl relative overflow-hidden",
                    collapsed ? "w-[80px]" : "w-[280px]",
                    className
                )}
                style={backgroundColor ? { backgroundColor } : undefined}
                {...props}
            >
                {!disableGradient && !backgroundColor && (
                    <div className="absolute inset-0 z-0 bg-gradient-to-tr from-[hsl(var(--primary-dark))] via-primary to-[hsl(var(--primary-light))]" />
                )}
                
                {!disableOverlay && (
                    <div className="absolute inset-0 z-0 bg-black/10 dark:bg-black/20" />
                )}
                
                <div className="absolute inset-0 z-10 flex flex-col text-white">
                    {/* Header / Logo */}
                    <div className={cn(
                        "shrink-0 flex items-center justify-center transition-all duration-300 relative z-10 h-16",
                        collapsed ? "px-2" : "px-6"
                    )}>
                        {collapsed && logoCollapsed ? logoCollapsed : (
                            collapsed ? <div className="scale-75">{displayLogo}</div> : displayLogo
                        )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 custom-scrollbar relative z-10">
                        <nav className="flex flex-col gap-2 px-3">
                            <AccordionPrimitive.Root 
                                type="multiple" 
                                value={openSections} 
                                onValueChange={setOpenSections}
                                className="w-full flex flex-col gap-6"
                            >
                                {sections.map((section) => (
                                    <SidebarSection 
                                        key={section.id}
                                        section={section}
                                        collapsed={collapsed}
                                        activeItem={activeItem}
                                        linkComponent={linkComponent}
                                        isMounted={isMounted}
                                        onItemClick={() => onMobileOpenChange?.(false)}
                                    />
                                ))}
                            </AccordionPrimitive.Root>
                        </nav>
                    </div>

                    {/* Footer with Collapse Button */}
                    <div className="p-4 border-t border-white/10 shrink-0 flex flex-col gap-3 relative z-10">
                        {footer}
                        {showThemeToggle && (
                            <div className={cn("flex items-center", collapsed ? "justify-center" : "justify-between gap-2")}>
                                {!collapsed && <span className="text-xs font-medium opacity-70">Tema</span>}
                                {themeToggle || <NexusThemeToggle />}
                            </div>
                        )}
                        
                        {/* Collapse Button in Footer */}
                        <Button 
                            variant="ghost" 
                            size={collapsed ? "icon" : "sm"}
                            onClick={() => onCollapseChange?.(!collapsed)}
                            className={cn(
                                "text-white/70 hover:text-white hover:bg-white/10 w-full justify-center",
                                !collapsed && "justify-start gap-2"
                            )}
                        >
                            <span className={cn(
                                "material-symbols-outlined transition-transform duration-300",
                                collapsed && "rotate-180"
                            )}>
                                chevron_left
                            </span>
                            {!collapsed && <span className="text-sm">Esconder</span>}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar */}
            {mobileOpen && (
                <div className="md:hidden fixed inset-0 z-50 flex">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => onMobileOpenChange?.(false)}
                    />
                    
                    {/* Sidebar Content */}
                    <div 
                        className={cn(
                            "relative w-[280px] h-full flex flex-col border-r border-border/10 shadow-2xl overflow-hidden"
                        )}
                        style={backgroundColor ? { backgroundColor } : undefined}
                    >
                        {!disableGradient && !backgroundColor && (
                            <div className="absolute inset-0 z-0 bg-gradient-to-tr from-[hsl(var(--primary-dark))] via-primary to-[hsl(var(--primary-light))]" />
                        )}
                        
                        {!disableOverlay && (
                            <div className="absolute inset-0 z-0 bg-black/10 dark:bg-black/20" />
                        )}
                        
                        <div className="absolute inset-0 z-10 flex flex-col text-white">
                            {/* Header */}
                            <div className="shrink-0 flex items-center justify-center h-16 px-6 relative z-10">
                                {displayLogo}
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 custom-scrollbar relative z-10">
                                <nav className="flex flex-col gap-2 px-3">
                                    <AccordionPrimitive.Root 
                                        type="multiple" 
                                        value={openSections} 
                                        onValueChange={setOpenSections}
                                        className="w-full flex flex-col gap-6"
                                    >
                                        {sections.map((section) => (
                                            <SidebarSection 
                                                key={section.id}
                                                section={section}
                                                collapsed={false}
                                                activeItem={activeItem}
                                                linkComponent={linkComponent}
                                                isMounted={isMounted}
                                                onItemClick={() => onMobileOpenChange?.(false)}
                                            />
                                        ))}
                                    </AccordionPrimitive.Root>
                                </nav>
                            </div>

                            {/* Footer */}
                            <div className="shrink-0 p-6 mt-auto relative z-10">
                                {footer}
                                {showThemeToggle && (
                                    <div className="flex items-center justify-between gap-2 mt-4 py-2 px-3 bg-white/5 rounded-lg">
                                        <span className="text-xs font-medium opacity-70">Tema</span>
                                        {themeToggle || <NexusThemeToggle />}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
})

const SidebarSection = React.memo(function SidebarSection({
    section,
    collapsed,
    activeItem,
    linkComponent,
    isMounted,
    onItemClick
}: {
    section: NexusSidebarSection
    collapsed: boolean
    activeItem?: string
    linkComponent?: any
    isMounted: boolean
    onItemClick?: () => void
}) {
    return (
        <div className="flex flex-col gap-1">
            {!collapsed && section.title && !section.collapsible && (
                <div className="px-3 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/60 mb-2 mt-2">
                    {section.title}
                </div>
            )}

            {section.collapsible && !collapsed ? (
                isMounted ? (
                    <AccordionPrimitive.Item value={section.id} className="border-none">
                        <AccordionPrimitive.Trigger className="w-full flex items-center justify-between px-3 py-2 hover:bg-white/5 data-[state=open]:bg-white/10 rounded-md transition-all duration-200 group/accordion-trigger">
                            <span className="text-xs font-semibold uppercase tracking-wider text-white/70 group-hover/accordion-trigger:text-white group-data-[state=open]/accordion-trigger:text-white transition-colors">
                                {section.title}
                            </span>
                            <span className="material-symbols-outlined text-[18px] text-white/70 transition-transform duration-200 group-data-[state=open]/accordion-trigger:rotate-90 group-data-[state=open]/accordion-trigger:text-white group-hover/accordion-trigger:text-white">
                                chevron_right
                            </span>
                        </AccordionPrimitive.Trigger>
                        <AccordionPrimitive.Content className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                            <div className="flex flex-col gap-1 pt-1 pb-2">
                                {section.items.map(item => (
                                    <SidebarItem 
                                        key={item.id} 
                                        item={item} 
                                        collapsed={collapsed} 
                                        activeItem={activeItem}
                                        linkComponent={linkComponent}
                                        onItemClick={onItemClick}
                                    />
                                ))}
                            </div>
                        </AccordionPrimitive.Content>
                    </AccordionPrimitive.Item>
                ) : null
            ) : (
                <div className="flex flex-col gap-1">
                    {section.items.map(item => (
                        <SidebarItem 
                            key={item.id} 
                            item={item} 
                            collapsed={collapsed} 
                            activeItem={activeItem}
                            linkComponent={linkComponent}
                            onItemClick={onItemClick}
                        />
                    ))}
                </div>
            )}
        </div>
    )
})

const SidebarItem = React.memo(function SidebarItem({ 
    item, 
    collapsed, 
    activeItem,
    linkComponent: LinkComponent,
    onItemClick
}: { 
    item: NexusSidebarItem
    collapsed: boolean
    activeItem?: string
    linkComponent?: any
    onItemClick?: () => void
}) {
    const isActive = item.isActive || item.id === activeItem

    const Component = (item.href && LinkComponent) 
        ? LinkComponent 
        : (item.href ? 'a' : 'div')
        
    const props = item.href ? { href: item.href } : {}

    const handleClick = () => {
        item.onClick?.()
        onItemClick?.()
    }

    return (
        <Component 
            {...props}
            onClick={handleClick}
            className={cn(
                "group/item relative flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer transition-all duration-200 select-none no-underline",
                isActive 
                    ? "text-white font-bold" 
                    : "text-white/70 hover:bg-white/10 hover:text-white hover:translate-x-1",
                collapsed && "justify-center px-2 hover:translate-x-0"
            )}
        >
            {isActive && !collapsed && (
                <div className="absolute left-0 w-1 h-6 bg-white rounded-r-full shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
            )}
            
            <span className={cn("material-symbols-outlined text-[20px]", isActive && "font-bold")}>
                {item.icon || 'business_center'}
            </span>
            
            {!collapsed && (
                <span className="text-sm font-medium truncate">{item.label}</span>
            )}
        </Component>
    )
})
