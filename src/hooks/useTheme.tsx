import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeContextState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  colors: Record<string, string>
  setColors: (colors: Record<string, string>) => void
  resetColors: () => void
}

const initialState: ThemeContextState = {
  theme: "system",
  setTheme: () => null,
  colors: {},
  setColors: () => null,
  resetColors: () => null,
}

const ThemeProviderContext = createContext<ThemeContextState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "nexus-ui-theme",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )

  const [colors, setColors] = useState<Record<string, string>>(() => {
    const storedColors = localStorage.getItem(`${storageKey}-colors`)
    return storedColors ? JSON.parse(storedColors) : {}
  })

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  // Apply custom colors to root
  useEffect(() => {
    const root = window.document.documentElement
    
    Object.entries(colors).forEach(([key, value]) => {
      // Expecting value to be "H S% L%" for HSL variables
      root.style.setProperty(`--${key}`, value)
    })
  }, [colors])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
    colors,
    setColors: (newColors: Record<string, string>) => {
        const merged = { ...colors, ...newColors }
        localStorage.setItem(`${storageKey}-colors`, JSON.stringify(merged))
        setColors(merged)
    },
    resetColors: () => {
        localStorage.removeItem(`${storageKey}-colors`)
        setColors({})
        // We might want to clear inline styles too, but reloading or re-render handles it usually
        // if we were resetting to specific defaults. 
        // For now, simpler implies removing the overrides. 
        // But since we set properties on root, we might need to removeProperty.
        const root = window.document.documentElement
        Object.keys(colors).forEach(key => {
            root.style.removeProperty(`--${key}`)
        })
    }
  }

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
