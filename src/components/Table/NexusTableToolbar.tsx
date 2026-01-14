import * as React from "react"
import { type Table } from "@tanstack/react-table"
import { NexusTableFilter } from "./NexusTableFilter"
import { NexusTableSort } from "./NexusTableSort"
import { NexusTableSettings } from "./NexusTableSettings"
import type { DetailViewMode } from "./NexusTableDetailView"

interface NexusTableToolbarProps<TData> {
    table: Table<TData>
    searchValue: string
    onSearchChange: (value: string) => void
    detailViewMode: DetailViewMode
    onDetailViewModeChange: (mode: DetailViewMode) => void
    layoutMode: 'table' | 'card'
    onLayoutModeChange: (mode: 'table' | 'card') => void
    enableCustomization?: boolean
    actions?: React.ReactNode
}

export function NexusTableToolbar<TData>({ 
    table, 
    searchValue, 
    onSearchChange,
    detailViewMode,
    onDetailViewModeChange,
    layoutMode,
    onLayoutModeChange,
    enableCustomization,
    actions
}: NexusTableToolbarProps<TData>) {
    
    const [isSearchExpanded, setIsSearchExpanded] = React.useState(!!searchValue)
    const inputRef = React.useRef<HTMLInputElement>(null)

    React.useEffect(() => {
        if (isSearchExpanded && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isSearchExpanded])

    const handleSearchClick = () => {
        setIsSearchExpanded(true)
    }

    const handleClearSearch = () => {
        onSearchChange('')
        if (!inputRef.current?.value) {
           setIsSearchExpanded(false)
        }
    }

    return (
        <div className="flex flex-col md:flex-row gap-4 mb-2 justify-between items-end md:items-center bg-background/40 backdrop-blur-sm px-4 py-2 rounded-xl border border-border/50 shadow-sm transition-all">
             <div className="flex-1 w-full md:w-auto">
                  <div className="flex items-center gap-2">
                        {/* Search Expanded */}
                        <div className={`relative transition-all duration-300 ease-in-out h-10 ${isSearchExpanded ? 'w-64' : 'w-10'}`}>
                            <div 
                                className={`absolute left-0 top-0 h-10 w-10 flex items-center justify-center cursor-pointer text-muted-foreground hover:text-foreground z-10 transition-opacity ${isSearchExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                                onClick={handleSearchClick}
                            >
                                <span className="material-symbols-outlined text-[20px]">search</span>
                            </div>
                            
                            <input 
                                ref={inputRef}
                                value={searchValue}
                                onChange={(e) => onSearchChange(e.target.value)}
                                placeholder="Buscar..."
                                onBlur={() => !searchValue && setIsSearchExpanded(false)}
                                className={`
                                    absolute left-0 top-0 h-10 bg-background border border-input text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-body
                                    ${isSearchExpanded ? 'w-full rounded-lg pl-3 pr-8 opacity-100' : 'w-10 rounded-full opacity-0 pointer-events-none'}
                                `}
                            />
                            
                            {isSearchExpanded && (
                                <button 
                                    onMouseDown={(e) => e.preventDefault()} // Prevent blur
                                    onClick={handleClearSearch}
                                    className="absolute right-2 top-2 text-muted-foreground hover:text-foreground z-20 flex items-center justify-center h-6 w-6"
                                >
                                    {searchValue ? (
                                        <span className="material-symbols-outlined text-[18px]">close</span>
                                    ) : (
                                         <span className="material-symbols-outlined text-[18px]">search</span>
                                    )}
                                </button>
                            )}
                        </div>

                        <div className="h-6 w-[1px] bg-border mx-1"></div>

                        {/* Compact Actions Group */}
                        <div className="flex items-center gap-1">
                            <NexusTableFilter table={table} />
                            <NexusTableSort table={table} />
                            <NexusTableSettings 
                                table={table} 
                                detailViewMode={detailViewMode} 
                                onDetailViewModeChange={onDetailViewModeChange}
                                layoutMode={layoutMode}
                                onLayoutModeChange={onLayoutModeChange}
                                enableCustomization={enableCustomization}
                            />
                        </div>
                  </div>
              </div>

             <div className="flex items-center gap-2">
                 {actions}
             </div>
        </div>
    )
}
