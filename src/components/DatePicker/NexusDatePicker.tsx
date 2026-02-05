import * as React from "react"
import { DayPicker } from "react-day-picker"
import { format } from "date-fns"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { ptBR } from "date-fns/locale"
import { cn } from "../../lib/utils"

// --- Components ---

// --- Components ---

// Custom Caption Component to match requested layout: "Month Year <Chevron>" ... " < > "
import { useNavigation } from "react-day-picker"

function CustomCaption(props: any) {
  const { goToMonth, nextMonth, previousMonth } = useNavigation()
  const { calendarMonth } = props
  const displayMonth = calendarMonth.date
  
  // Year Selection Logic
  const currentYear = displayMonth.getFullYear()
  const [isYearPickerOpen, setIsYearPickerOpen] = React.useState(false)
  const years = React.useMemo(() => Array.from({ length: 20 }, (_, i) => currentYear - 10 + i), [currentYear]) // range: -10 to +9 years

  return (
    <div className="flex items-center justify-between pt-1 relative px-2 w-full mb-2">
      <div className="flex items-center gap-1">
        <span className="text-lg font-semibold capitalize text-foreground">
           {format(displayMonth, "MMMM yyyy", { locale: ptBR })}
        </span>
        <PopoverPrimitive.Root open={isYearPickerOpen} onOpenChange={setIsYearPickerOpen}>
            <PopoverPrimitive.Trigger asChild>
                <button className="h-6 w-6 inline-flex items-center justify-center rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-200 focus:outline-none data-[state=open]:rotate-180">
                     <span className="material-symbols-outlined text-[20px]">arrow_drop_down</span>
                </button>
            </PopoverPrimitive.Trigger>
            <PopoverPrimitive.Content 
                className="w-[140px] max-h-[240px] overflow-y-auto p-2 z-50 bg-popover text-popover-foreground rounded-xl shadow-xl border border-border/50 animate-in fade-in zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95 duration-200"
                sideOffset={5}
                align="start"
            >
                 <div className="flex flex-col gap-1">
                    {years.map(year => (
                        <button
                            key={year}
                            onClick={() => {
                                const newDate = new Date(displayMonth)
                                newDate.setFullYear(year)
                                goToMonth && goToMonth(newDate)
                                setIsYearPickerOpen(false)
                            }}
                             className={cn(
                                "text-sm px-3 py-2 rounded-lg text-left transition-colors font-medium",
                                year === currentYear 
                                    ? "bg-primary text-primary-foreground shadow-sm" 
                                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                             )}
                        >
                            {year}
                        </button>
                    ))}
                 </div>
            </PopoverPrimitive.Content>
        </PopoverPrimitive.Root>
      </div>

      <div className="flex items-center gap-1">
         <button 
            type="button"
            disabled={!previousMonth}
            onClick={() => previousMonth && goToMonth(previousMonth)}
            className="h-8 w-8 inline-flex items-center justify-center rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
         >
             <span className="material-symbols-outlined text-[20px]">chevron_left</span>
         </button>
         <button 
             type="button"
             disabled={!nextMonth}
             onClick={() => nextMonth && goToMonth(nextMonth)}
             className="h-8 w-8 inline-flex items-center justify-center rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
         >
             <span className="material-symbols-outlined text-[20px]">chevron_right</span>
         </button>
      </div>
    </div>
  )
}

// 1. NexusCalendar (The static calendar view)
export type NexusCalendarProps = React.ComponentProps<typeof DayPicker>

const NexusCalendar = ({
  className,
  classNames,
  showOutsideDays = false,
  ...props
}: NexusCalendarProps) => {
  return (
    <DayPicker
      locale={ptBR}
      weekStartsOn={1} // Monday start to match "S T Q Q S S D"
      showOutsideDays={showOutsideDays}
      className={cn("p-5 bg-card text-card-foreground rounded-xl shadow-lg border border-border w-auto sm:min-w-[320px]", className)}
      components={{
        MonthCaption: CustomCaption,
        Nav: () => <></> // Hide default navigation
      }}
      formatters={{
        formatWeekdayName: (date) => {
             // Return S T Q Q S S D layout
             // ptBR locale usually returns 'dom', 'seg', etc.
             // We want the first letter, upper case.
             // Special case: capitalize and take first char?
             // ptBR: domingo, segunda, terça, quarta, quinta, sexta, sábado
             // initials: D S T Q Q S S
             // User requested: S T Q Q S S D (Wait, is this standard? Sunday usually first? Or Monday?)
             // Standard JS getDay(): 0=Sun, 1=Mon...
             // ptBR 'S' could be Segunda, Sexta, Sabado.
             // Let's use format(date, 'EEEEE', { locale: ptBR }) which gives narrow single letter.
             // Verify:
             // Sun -> D
             // Mon -> S
             // Tue -> T
             // Wed -> Q
             // Thu -> Q
             // Fri -> S
             // Sat -> S
             // This matches "D S T Q Q S S" (Sunday start) or "S T Q Q S S D" (Monday start).
             // Let's rely on date-fns for narrow format which is standard.
             return format(date, "EEEEE", { locale: ptBR }).toUpperCase()
        }
      }}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "hidden", 
        // Layout: CSS Grid with Flex containers to override 'table' behavior
        table: "flex flex-col w-full space-y-1",
        head: "w-full", // thead
        head_row: "grid grid-cols-7 w-full mb-1", // tr in thead
        head_cell: "text-muted-foreground font-normal text-[0.8rem] h-9 flex items-center justify-center select-none uppercase", // th
        tbody: "flex flex-col w-full space-y-1", // tbody
        row: "grid grid-cols-7 w-full", // tr in tbody
        cell: "h-9 w-full flex items-center justify-center text-center text-sm p-0 relative focus-within:relative focus-within:z-20", // td
        day: cn(
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100 inline-flex items-center justify-center rounded-full hover:bg-muted hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 m-0"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground font-semibold shadow-md",
        day_today: "bg-muted/50 text-accent-foreground font-bold border border-border",
        day_outside: "text-muted-foreground opacity-30 invisible",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      {...props}
    />
  )
}
NexusCalendar.displayName = "NexusCalendar"

// 2. NexusDatePicker (The Input + Popover wrapper)
export interface NexusDatePickerProps {
    date?: Date
    onSelect?: (date: Date | undefined) => void
    label?: string
    placeholder?: string
    className?: string
}

const NexusDatePicker = ({
    date,
    onSelect,
    label,
    placeholder = "Selecione uma data",
    className
}: NexusDatePickerProps) => {
    
    // Internal state for formatting
    const formattedDate = date ? format(date, "PPP", { locale: ptBR }) : ""

    return (
        <PopoverPrimitive.Root>
            <div className={cn("grid gap-2", className)}>
                {label && <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{label}</label>}
                <PopoverPrimitive.Trigger asChild>
                    <button
                        className={cn(
                            "flex h-[54px] w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <span className="capitalize">{formattedDate || placeholder}</span>
                        <span className="material-symbols-outlined text-lg opacity-50">calendar_today</span>
                    </button>
                </PopoverPrimitive.Trigger>
                <PopoverPrimitive.Content className="w-auto p-0 z-50 bg-popover text-popover-foreground rounded-md shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
                    <NexusCalendar 
                        mode="single"
                        selected={date}
                        onSelect={onSelect}
                        initialFocus
                    />
                </PopoverPrimitive.Content>
            </div>
        </PopoverPrimitive.Root>
    )
}
NexusDatePicker.displayName = "NexusDatePicker"

// 3. NexusDateField (Input only)
export interface NexusDateFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
    label?: string
    value?: Date
    onValueChange?: (date: Date | undefined) => void
    formatStr?: string
}

const NexusDateField = React.forwardRef<HTMLInputElement, NexusDateFieldProps>(
    ({ className, label, value, onValueChange, placeholder = "DD/MM/AAAA", formatStr = "PPP", ...props }, ref) => {
        const displayValue = value ? format(value, formatStr, { locale: ptBR }) : ""
        
        return (
            <div className={cn("grid gap-2", className)}>
                {label && <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{label}</label>}
                <div className="relative">
                     <input
                        ref={ref}
                        type="text"
                        className={cn(
                            "flex h-[54px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 capitalize",
                            className
                        )}
                        placeholder={placeholder}
                        value={displayValue}
                        readOnly // For now, simple read-only display of selected date if passed, or just a text field
                        {...props}
                    />
                </div>
            </div>
        )
    }
)
NexusDateField.displayName = "NexusDateField"

export { NexusCalendar, NexusDatePicker, NexusDateField }
