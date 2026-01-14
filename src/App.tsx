import { NexusThemeProvider } from "./components/Theme/NexusThemeProvider"
import { NexusThemeToggle } from "./components/Theme/NexusThemeToggle"
import { NexusAppBar } from "./components/AppBar/NexusAppBar"
import { NexusTypography } from "./components/Typography/NexusTypography"

function App() {
  return (
    <NexusThemeProvider defaultTheme="system" storageKey="nexus-ui-theme">
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300 flex flex-col items-center">
        <NexusAppBar position="sticky">
          <div className="flex justify-between items-center w-full">
            <NexusTypography variant="h4" className="font-semibold">
              Nexus UI
            </NexusTypography>
            <div className="flex items-center gap-4">
               {/* Add other header items here like links if needed */}
               <NexusThemeToggle />
            </div>
          </div>
        </NexusAppBar>

        <main className="w-full max-w-4xl p-8 flex flex-col gap-8">
            <div className="text-center space-y-4">
                 <NexusTypography variant="h1" className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
                    Design System
                </NexusTypography>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    A premium component library built with React, Tailwind CSS, and Framer Motion. 
                    Inspired by modern design principles from Apple and Google.
                </p>
            </div>
            
             {/* Content placeholder or demo components could go here */}
             <div className="p-12 border border-dashed border-border rounded-xl bg-card/50 flex flex-col items-center justify-center text-muted-foreground">
                <span className="material-symbols-outlined text-4xl mb-2">widgets</span>
                <p>Select a story from the sidebar to view components.</p>
             </div>
        </main>
      </div>
    </NexusThemeProvider>
  )
}

export default App
