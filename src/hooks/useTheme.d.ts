type Theme = "dark" | "light" | "system";
type ThemeProviderProps = {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
};
type ThemeContextState = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    colors: Record<string, string>;
    setColors: (colors: Record<string, string>) => void;
    resetColors: () => void;
};
export declare function ThemeProvider({ children, defaultTheme, storageKey, }: ThemeProviderProps): import("react/jsx-runtime").JSX.Element;
export declare const useTheme: () => ThemeContextState;
export {};
