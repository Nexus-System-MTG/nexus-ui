import * as React from "react"
import { cn } from "../../lib/utils"
import { NexusThemeToggle } from "../Theme/NexusThemeToggle"
import { NexusDropdownMenu, NexusDropdownMenuContent, NexusDropdownMenuItem, NexusDropdownMenuTrigger, NexusDropdownMenuSeparator } from "../DropdownMenu/NexusDropdownMenu"
import { Button } from "../Button/Button"

export interface NexusAppBarMenuItem {
    id: string
    label: string
    icon?: string
    onClick?: () => void
    variant?: 'default' | 'destructive'
}

export interface NexusAppBarUser {
    name: string
    email?: string
    avatar?: string
    initials?: string
}

export interface NexusAppBarProps extends React.HTMLAttributes<HTMLDivElement> {
    user?: NexusAppBarUser
    menuItems?: NexusAppBarMenuItem[]
    showThemeToggle?: boolean
    themeToggle?: React.ReactNode
    onLogout?: () => void
    onMenuClick?: () => void
}

export function NexusAppBar({ 
    className, 
    user,
    menuItems = [],
    showThemeToggle = true,
    themeToggle,
    onLogout,
    onMenuClick,
    ...props 
}: NexusAppBarProps) {
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
    }

    const userInitials = user?.initials || (user?.name ? getInitials(user.name) : 'U')

    return (
        <div 
            className={cn(
                "h-16 border-b border-border bg-background text-foreground transition-colors duration-300 flex items-center justify-between px-6 shrink-0",
                className
            )}
            {...props}
        >
            {/* Left side - Hamburger menu for mobile */}
            <div className="flex items-center gap-4">
                {onMenuClick && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onMenuClick}
                        className="md:hidden text-foreground hover:bg-accent"
                    >
                        <span className="material-symbols-outlined text-[24px]">menu</span>
                    </Button>
                )}
            </div>

            {/* Right side - Theme toggle and user menu */}
            <div className="flex items-center gap-3">
                {showThemeToggle && (
                    <div className="hidden md:flex">
                        {themeToggle || <NexusThemeToggle />}
                    </div>
                )}
                
                {user && (
                    <NexusDropdownMenu>
                        <NexusDropdownMenuTrigger asChild>
                            <Button 
                                variant="ghost" 
                                className="flex items-center gap-3 h-10 px-3 hover:bg-accent"
                            >
                                {/* Avatar */}
                                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold overflow-hidden">
                                    {user.avatar ? (
                                        <img 
                                            src={user.avatar} 
                                            alt={user.name} 
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        userInitials
                                    )}
                                </div>
                                
                                {/* User name */}
                                <span className="text-sm font-medium hidden sm:block">
                                    {user.name}
                                </span>
                                
                                {/* Dropdown icon */}
                                <span className="material-symbols-outlined text-[18px]">
                                    expand_more
                                </span>
                            </Button>
                        </NexusDropdownMenuTrigger>
                        
                        <NexusDropdownMenuContent align="end" className="w-56">
                            {/* User info header */}
                            <div className="px-2 py-1.5 text-sm">
                                <div className="font-medium">{user.name}</div>
                                {user.email && (
                                    <div className="text-xs text-muted-foreground">{user.email}</div>
                                )}
                            </div>
                            
                            {(menuItems.length > 0 || onLogout) && <NexusDropdownMenuSeparator />}
                            
                            {/* Custom menu items */}
                            {menuItems.map((item) => (
                                <NexusDropdownMenuItem 
                                    key={item.id}
                                    onClick={item.onClick}
                                    className={cn(
                                        item.variant === 'destructive' && "text-destructive focus:text-destructive"
                                    )}
                                >
                                    {item.icon && (
                                        <span className="material-symbols-outlined text-[18px] mr-2">
                                            {item.icon}
                                        </span>
                                    )}
                                    {item.label}
                                </NexusDropdownMenuItem>
                            ))}
                            
                            {/* Logout button */}
                            {onLogout && (
                                <>
                                    {menuItems.length > 0 && <NexusDropdownMenuSeparator />}
                                    <NexusDropdownMenuItem 
                                        onClick={onLogout}
                                        className="text-destructive focus:text-destructive"
                                    >
                                        <span className="material-symbols-outlined text-[18px] mr-2">
                                            logout
                                        </span>
                                        Sair
                                    </NexusDropdownMenuItem>
                                </>
                            )}
                        </NexusDropdownMenuContent>
                    </NexusDropdownMenu>
                )}
            </div>
        </div>
    )
}
