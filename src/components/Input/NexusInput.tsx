import * as React from "react"
import { IMaskInput } from "react-imask"
import { cn } from "../../lib/utils"

export type InputMaskType = 'cpf' | 'cnpj' | 'cep' | 'phone' | 'currency' | 'date'

export interface NexusInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  type?: string
  mask?: InputMaskType
  leftIcon?: string
  rightIcon?: string
  onRightIconClick?: () => void
  isPassword?: boolean
  label?: string
  error?: string
  fullWidth?: boolean
}

const masks = {
  cpf: '000.000.000-00',
  cnpj: '00.000.000/0000-00',
  cep: '00000-000',
  phone: '(00) 00000-0000',
  date: '00/00/0000',
  currency: 'R$ num', // simplified for custom handling if needed, but imask has specific currency support
}

const NexusInput = React.forwardRef<HTMLInputElement, NexusInputProps>(
  ({ className, mask, leftIcon, rightIcon, onRightIconClick, isPassword, label, error, fullWidth = true, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const [hasValue, setHasValue] = React.useState(!!props.value || !!props.defaultValue);

     // Sync hasValue with external value changes
    React.useEffect(() => {
        setHasValue(!!props.value || !!props.defaultValue);
    }, [props.value, props.defaultValue]);

    const inputType = isPassword ? (showPassword ? 'text' : 'password') : 'text'

    const handleRightIconClick = () => {
      if (isPassword) {
        setShowPassword(!showPassword)
      } else if (onRightIconClick) {
        onRightIconClick()
      }
    }

    const effectiveRightIcon = isPassword 
      ? (showPassword ? 'visibility_off' : 'visibility')
      : rightIcon

    const wrapperClasses = cn(
      "group flex items-center relative rounded-md border border-input bg-background/60 backdrop-blur-[4px] px-3 py-2.5 text-sm ring-offset-background transition-all duration-200",
      "focus-within:border-primary focus-within:ring-0 focus-within:ring-offset-0",
      error && "border-destructive focus-within:border-destructive",
      fullWidth ? "w-full" : "w-auto min-w-[200px]",
      className
    )
    
    // Floating label logic using peer-placeholder-shown or state
    // We'll use state "hasValue" combined with focus-within on wrapper
    
    // Input needs to match parent height basically, and move text down slightly if we wanted contained,
    // but for outlined floating label (like Material UI), the label sits ON the border.
    
    // However, the request image shows the placeholder moving to the TOP.
    // Let's emulate the "Outlined" Material Input.
    
    const labelClasses = cn(
        "absolute left-3 transition-all duration-200 pointer-events-none bg-background px-1 z-10",
        // Floating state (active or has value)
        "group-focus-within:-top-2 group-focus-within:text-xs group-focus-within:text-primary",
        hasValue ? "-top-2 text-xs" : "top-2.5 text-muted-foreground text-sm",
        error && "text-destructive group-focus-within:text-destructive"
    )

    const inputClasses = "w-full bg-transparent border-none p-0 focus:outline-none text-foreground font-body h-6"
    
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHasValue(!!e.target.value);
        if (props.onChange) props.onChange(e);
    }

    const uniqueId = React.useId()
    const inputId = props.id || uniqueId

    const renderInput = () => {
      const commonProps = {
          className: inputClasses,
          placeholder: " ", 
          ...props,
          id: inputId,
          onChange: onChangeHandler
      }

      if (mask) {
         if (mask === 'currency') {
             return (
                 <IMaskInput
                    mask={Number}
                    scale={2}
                    thousandsSeparator='.'
                    padFractionalZeros={true}
                    normalizeZeros={true}
                    radix=','
                    mapToRadix={['.']}
                    min={0}
                    // @ts-ignore
                    unmask={true}
                    inputRef={ref}
                    {...commonProps as any}
                    placeholder=" " // Hide default placeholder to let label float
                 />
             )
         }
        return (
          <IMaskInput
            mask={masks[mask as keyof typeof masks]}
            // @ts-ignore
            inputRef={ref}
            {...commonProps as any}
            placeholder=" "
          />
        )
      }

      return (
        <input
          type={inputType}
          ref={ref}
          {...commonProps}
          placeholder=" "
        />
      )
    }

    return (
      <div className="flex flex-col gap-1.5">
        <div className={wrapperClasses}>
          {label && (
              <label htmlFor={inputId} className={labelClasses}>
                  {label}
              </label>
          )}
          
          {leftIcon && (
            <span className="material-symbols-outlined text-muted-foreground mr-2 text-[20px]">
              {leftIcon}
            </span>
          )}
          
          {renderInput()}

          {effectiveRightIcon && (
            <button
              type="button"
              onClick={handleRightIconClick}
              className="ml-2 focus:outline-none text-muted-foreground hover:text-foreground transition-colors"
            >
               <span className="material-symbols-outlined text-[20px]">
                  {effectiveRightIcon}
               </span>
            </button>
          )}
        </div>
        
        {error && <span className="text-xs text-red-400 ml-1">{error}</span>}
      </div>
    )
  }
)
NexusInput.displayName = "NexusInput"

export { NexusInput }
