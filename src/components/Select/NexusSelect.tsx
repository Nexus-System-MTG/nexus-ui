import * as React from "react"
import { Popover, PopoverContent, PopoverAnchor } from "@radix-ui/react-popover"
import Fuse from "fuse.js"
import { useDebounce } from "../../hooks/useDebounce"
import { cn } from "../../lib/utils"

export interface SelectOption {
  value: string
  label: string
  group?: string
  icon?: string
}

export interface NexusSelectProps {
  options: SelectOption[]
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
  leftIcon?: string
  error?: string
  disabled?: boolean
  className?: string
  fullWidth?: boolean
}

export function NexusSelect({
  options,
  value,
  onChange,
  placeholder = "Selecione...",
  label,
  leftIcon,
  error,
  disabled,
  className,
  fullWidth = true,
  id,
  ...props
}: NexusSelectProps & { id?: string } & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'>) {
  const uniqueId = React.useId()
  const inputId = id || uniqueId

  // Logic to handle input value vs selected value
  const selectedOption = options.find((opt) => opt.value === value)
  
  // Internal state for the text input
  // Initialize with selected label if present
  const [inputValue, setInputValue] = React.useState(selectedOption?.label || "")
  
  const [open, setOpen] = React.useState(false)
  
  // Determine if label should float
  // Float if: open (focused), has text in input, or has a selected value
  const hasValue = open || inputValue.length > 0 || !!selectedOption;

  // Sync input value when selected value changes externally
  React.useEffect(() => {
    if (selectedOption) {
      setInputValue(selectedOption.label)
    } else if (!open && !value) {
        // Only clear if not open (to avoid clearing while typing if something weird happens)
        // actually if value is cleared externally, we should likely clear input
        setInputValue("")
    }
  }, [selectedOption, value, open])

  const debouncedSearch = useDebounce(inputValue, 300)
  
  // Memoize fuse instance
  const fuse = React.useMemo(() => {
    return new Fuse(options, {
      keys: ['label', 'value', 'group'],
      threshold: 0.3,
    })
  }, [options])

  // Filter logic:
  // If the input value matches the selected option label EXACTLY, we probably want to show all options (like opening the dropdown)
  // Or if the user starts typing, we filter.
  // Let's filter by debouncedSearch always.
  const filteredOptions = React.useMemo(() => {
    if (!debouncedSearch) return options
    
    // If the search exactly matches the selected label, show all options
    // This allows opening the menu without auto-filtering to the current selection
    if (selectedOption && debouncedSearch === selectedOption.label) {
        return options
    }

    const results = fuse.search(debouncedSearch).map((res) => res.item)
    return results.length > 0 ? results : []
  }, [debouncedSearch, options, fuse, selectedOption])

  // Grouping logic remains the same
  const groupedOptions = React.useMemo(() => {
    const groups: Record<string, SelectOption[]> = {}
    const noGroup: SelectOption[] = []
    
    // If search returns no results but we want to be helpful, maybe show nothing.
    // However, if inputs are empty, we show all options (passed from previous memo)
    // If fuse returns empty, we show "No results".

    const targetList = (debouncedSearch && filteredOptions.length === 0) ? [] : filteredOptions

    targetList.forEach((opt) => {
      if (opt.group) {
        if (!groups[opt.group]) groups[opt.group] = []
        groups[opt.group].push(opt)
      } else {
        noGroup.push(opt)
      }
    })

    return { groups, noGroup, isEmpty: targetList.length === 0 && debouncedSearch !== '' }
  }, [filteredOptions, debouncedSearch])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    if (!open) setOpen(true)
  }

  const handleInputClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent bubbling issues
    if (!open) setOpen(true)
  }

  const handleFocus = () => {
    if (!open) setOpen(true)
  }

  const handleSelect = (opt: SelectOption) => {
    setInputValue(opt.label)
    onChange(opt.value)
    setOpen(false)
  }
  
  const wrapperClasses = cn(
      "group flex items-center relative rounded-md border border-input bg-background/60 backdrop-blur-[4px] px-3 h-[54px] text-sm ring-offset-background transition-all duration-200",
      "focus-within:border-primary focus-within:ring-0 focus-within:ring-offset-0",
      error && "border-destructive focus-within:border-destructive",
      disabled && "opacity-50 cursor-not-allowed",
      fullWidth ? "w-full" : "w-auto min-w-[200px]",
      className
  )
   
   const labelClasses = cn(
        "absolute left-3 transition-all duration-200 pointer-events-none bg-background px-1 z-10",
        // Floating state (active or has value)
        // We use 'open' state here effectively as focus-within, plus hasValue check
        (open || hasValue) ? "-top-2 text-xs text-primary" : "top-4 text-muted-foreground text-sm",
        !open && hasValue && "text-muted-foreground", // Reset color if not focused but has value
        open && "text-primary",
        error && "text-destructive"
    )

  const wrapperRef = React.useRef<HTMLDivElement>(null)

  return (
    <div className="flex flex-col gap-1.5 w-full relative">
      <Popover open={open} onOpenChange={(isOpen) => {
          setOpen(isOpen)
          if (!isOpen) {
             // On close, validate input
             if (selectedOption && inputValue !== selectedOption.label) {
                 setInputValue(selectedOption.label)
             } else if (!selectedOption && inputValue !== "") {
                 setInputValue("") // Clear if nothing selected (Strict mode)
             }
          }
      }}>
        <PopoverAnchor asChild>
            <div ref={wrapperRef} className={wrapperClasses}>
                {label && (
                    <label htmlFor={inputId} className={labelClasses}>
                        {label}
                    </label>
                )}
                
                {leftIcon && (
                  <span className="material-symbols-outlined text-muted-foreground mr-2 select-none text-[20px]">
                    {leftIcon}
                  </span>
                )}
                
                <input
                    type="text"
                    className="flex-1 bg-transparent border-none p-0 text-foreground text-sm placeholder:text-transparent focus:outline-none font-body h-6 min-w-0"
                    // Placeholder logic: 
                    // If label is present, it acts as placeholder. 
                    // If focused (open), label moves up, so we could show placeholder?
                    // Typically Material UI hides real placeholder until focused.
                    placeholder={open ? placeholder : ""} 
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                    onClick={handleInputClick}
                    disabled={disabled}
                    id={inputId}
                    {...props}
                />

                <button 
                  type="button"
                  tabIndex={-1} // Skip tab, as input handles focus
                  onClick={() => setOpen(!open)}
                  className="ml-2 flex items-center justify-center text-muted-foreground hover:text-foreground focus:outline-none transition-transform duration-200"
                  style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                    <span className="material-symbols-outlined text-[20px]">
                    keyboard_arrow_down
                    </span>
                </button>
            </div>
        </PopoverAnchor>
        
        <PopoverContent 
          className="w-[var(--radix-popover-trigger-width)] p-0 bg-popover/95 backdrop-blur-xl border border-border rounded-[1rem] shadow-xl overflow-hidden z-50 text-popover-foreground mt-1"
          align="start"
          onOpenAutoFocus={(e) => e.preventDefault()} // Keep focus on input
          onPointerDownOutside={(e) => {
            if (wrapperRef.current?.contains(e.target as Node)) {
                e.preventDefault()
            }
          }}
        >
          {/* Options List */}
          <div role="listbox" className="max-h-[240px] overflow-y-auto overflow-x-hidden py-1 custom-scrollbar">
            {groupedOptions.isEmpty && (
              <div className="py-3 px-4 text-sm text-muted-foreground text-center">
                Nenhum resultado encontrado.
              </div>
            )}

            {/* Ungrouped Items */}
            {groupedOptions.noGroup.map((opt) => (
              <OptionItem 
                key={opt.value} 
                option={opt} 
                isSelected={value === opt.value} 
                onSelect={() => handleSelect(opt)} 
              />
            ))}

            {/* Grouped Items */}
            {Object.entries(groupedOptions.groups).map(([groupName, groupOpts]) => (
              <React.Fragment key={groupName}>
                {(groupedOptions.noGroup.length > 0) && <div className="h-[1px] bg-border mx-2 my-1" />}
                 <div className="px-3 py-1.5 text-xs font-semibold text-primary uppercase tracking-wider bg-muted/50">
                   {groupName}
                 </div>
                 {groupOpts.map((opt) => (
                    <OptionItem 
                      key={opt.value} 
                      option={opt} 
                      isSelected={value === opt.value} 
                      onSelect={() => handleSelect(opt)} 
                    />
                 ))}
              </React.Fragment>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      
      {error && <span className="text-xs text-red-400 ml-1">{error}</span>}
    </div>
  )
}

function OptionItem({ option, isSelected, onSelect }: { option: SelectOption, isSelected: boolean, onSelect: () => void }) {
  return (
    <div
      role="option"
      aria-selected={isSelected}
      onClick={onSelect}
      className={cn(
        "flex items-center w-full px-3 py-2 cursor-pointer transition-colors text-sm",
        isSelected ? "bg-primary text-primary-foreground" : "hover:bg-accent text-foreground/90"
      )}
    >
      {option.icon && (
        <span className="material-symbols-outlined mr-2 text-[18px] opacity-80">
          {option.icon}
        </span>
      )}
      <span>{option.label}</span>
      {isSelected && (
        <span className="material-symbols-outlined ml-auto text-[18px]">check</span>
      )}
    </div>
  )
}
