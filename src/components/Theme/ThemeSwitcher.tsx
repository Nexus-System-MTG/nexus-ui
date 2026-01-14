import { Moon, Sun, Laptop } from "lucide-react"
import { useTheme } from "../../hooks/useTheme"
import { Button } from "../Button/Button"
import { NexusDropdownMenu, NexusDropdownMenuContent, NexusDropdownMenuItem, NexusDropdownMenuTrigger } from "../DropdownMenu/NexusDropdownMenu"
// import { NexusInput } from "../Input/NexusInput"

// Helper to convert Hex to HSL for the simple picker
const hexToHSL = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return null;
    let r = parseInt(result[1], 16);
    let g = parseInt(result[2], 16);
    let b = parseInt(result[3], 16);
    
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;
    
    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    s = s * 100;
    s = Math.round(s);
    l = l * 100;
    l = Math.round(l);
    h = Math.round(h * 360);

    return `${h} ${s}% ${l}%`; // Format for our CSS variables
}


export function ThemeSwitcher() {
  const { setTheme, setColors } = useTheme()

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const hsl = hexToHSL(e.target.value)
      if (hsl) {
          // This is a simplified example updating only primary color
          // Ideally we would generate shades, foregrounds etc.
          setColors({ 
              primary: hsl,
              // We might want to auto-calculate foreground based on lightness
          })
      }
  }

  return (
    <div className="flex items-center gap-2 p-4 border border-[var(--nx-glass-border)] rounded-lg bg-[rgba(25,34,51,0.6)] backdrop-blur-[4px]">
        <NexusDropdownMenu>
        <NexusDropdownMenuTrigger asChild>
            <Button variant="glass" size="sm" iconOnly>
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
            </Button>
        </NexusDropdownMenuTrigger>
        <NexusDropdownMenuContent align="end">
            <NexusDropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="mr-2 h-4 w-4" />
                Light
            </NexusDropdownMenuItem>
            <NexusDropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="mr-2 h-4 w-4" />
                Dark
            </NexusDropdownMenuItem>
            <NexusDropdownMenuItem onClick={() => setTheme("system")}>
                <Laptop className="mr-2 h-4 w-4" />
                System
            </NexusDropdownMenuItem>
        </NexusDropdownMenuContent>
        </NexusDropdownMenu>

        <div className="flex items-center gap-2">
            <label htmlFor="color-picker" className="text-sm font-medium text-white/80">
                Primary Color:
            </label>
            <div className="relative">
                <input 
                    type="color" 
                    id="color-picker"
                    onChange={handleColorChange}
                    className="w-8 h-8 rounded overflow-hidden cursor-pointer border-none p-0"
                    title="Choose primary color"
                />
            </div>
            
        </div>
    </div>
  )
}
