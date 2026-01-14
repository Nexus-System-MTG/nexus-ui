import * as React from "react"
import { cn } from "../../lib/utils"
import { NexusThemeToggle } from "../Theme/NexusThemeToggle"

export interface NexusLoginTemplateProps extends React.HTMLAttributes<HTMLDivElement> {
    logo?: React.ReactNode
    visualContent?: React.ReactNode
    children?: React.ReactNode
    backgroundImage?: string
}

export function NexusLoginTemplate({ 
    className, 
    logo, 
    visualContent,
    children, 
    backgroundImage,
    ...props 
}: NexusLoginTemplateProps) {
    return (
        <div className={cn("min-h-screen grid grid-cols-1 lg:grid-cols-2", className)} {...props}>
            {/* Left Side (Visual) */}
            <div className="relative hidden lg:flex flex-col items-center justify-center p-12 bg-sidebar-background text-white overflow-hidden">
                 {/* Background Pattern/Image */}
                 {backgroundImage ? (
                     <div className="absolute inset-0 z-0">
                         <img src={backgroundImage} alt="Background" className="w-full h-full object-cover opacity-50" />
                         <div className="absolute inset-0 bg-gradient-to-t from-sidebar-background via-sidebar-background/80 to-transparent" />
                     </div>
                 ) : (
                     // Default Branding Gradient
                     <div className="absolute inset-0 z-0 bg-sidebar-background bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/40 via-sidebar-background to-sidebar-background" />
                 )}

                 <div className="relative z-10 w-full max-w-lg">
                     {visualContent ? visualContent : (
                         <div className="space-y-8">
                             {/* Placeholder visual content matching the reference somewhat */}
                             <div className="rounded-3xl p-0">
                                 <div className="mb-4">{logo}</div>
                                 <h2 className="text-2xl font-bold mb-2">Plataforma Completa</h2>
                                 <p className="text-white/70">Gestão integrada, fidelidade e controle total para o seu negócio evoluir.</p>
                             </div>
                             
                             <div className="space-y-4 text-sm font-medium text-white/80">
                                 <div className="flex items-center gap-3">
                                     <span className="material-symbols-outlined text-green-400">check_circle</span>
                                     Programa de Fidelidade e Pontos
                                 </div>
                                 <div className="flex items-center gap-3">
                                     <span className="material-symbols-outlined text-green-400">check_circle</span>
                                     Gestão de Clientes e Recompensas
                                 </div>
                                 <div className="flex items-center gap-3">
                                     <span className="material-symbols-outlined text-green-400">check_circle</span>
                                     Relatórios de Performance em Tempo Real
                                 </div>
                             </div>
                         </div>
                     )}
                 </div>
            </div>

            {/* Right Side (Form) */}
            <div className="flex flex-col items-center justify-center p-6 sm:p-12 lg:p-24 bg-background text-foreground transition-colors duration-300 relative">
                <div className="absolute top-6 right-6">
                    <NexusThemeToggle />
                </div>

                <div className="w-full max-w-md space-y-8">
                    {/* Header for Mobile (Logo usually shown here on mobile) */}
                    <div className="lg:hidden flex justify-center mb-8">
                        {logo}
                    </div>

                    <div className="space-y-2 text-center lg:text-left">
                        <h1 className="text-3xl font-bold tracking-tight">Bem-vindo</h1>
                        <p className="text-muted-foreground">Insira suas credenciais para acessar sua conta.</p>
                    </div>

                    <div className="mt-8">
                        {children}
                    </div>

                    <div className="mt-6 text-center text-sm text-muted-foreground">
                        Protegido por Nexus Security &copy; {new Date().getFullYear()}
                    </div>
                </div>
            </div>
        </div>
    )
}
