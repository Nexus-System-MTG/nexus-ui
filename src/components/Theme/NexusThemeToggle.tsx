import { Button } from "../Button/Button"
import {
  NexusDropdownMenu,
  NexusDropdownMenuContent,
  NexusDropdownMenuItem,
  NexusDropdownMenuTrigger,
} from "../DropdownMenu/NexusDropdownMenu"
import { useTheme } from "./NexusThemeProvider"

export function NexusThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <NexusDropdownMenu>
      <NexusDropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 w-9 px-0">
          <span className="material-symbols-outlined rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-[1.2rem]">
            light_mode
          </span>
          <span className="absolute material-symbols-outlined rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-[1.2rem]">
            dark_mode
          </span>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </NexusDropdownMenuTrigger>
      <NexusDropdownMenuContent align="end">
        <NexusDropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </NexusDropdownMenuItem>
        <NexusDropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </NexusDropdownMenuItem>
        <NexusDropdownMenuItem onClick={() => setTheme("system")}>
          System
        </NexusDropdownMenuItem>
      </NexusDropdownMenuContent>
    </NexusDropdownMenu>
  )
}
