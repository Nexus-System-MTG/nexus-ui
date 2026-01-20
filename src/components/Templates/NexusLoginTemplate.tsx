import * as React from "react"
import { cn } from "../../lib/utils"
import { NexusThemeToggle } from "../Theme/NexusThemeToggle"

// Define separate interfaces for cleaner code
export interface LoginFeature {
    icon?: string
    text: string
}

export interface NexusLoginTemplateProps extends React.HTMLAttributes<HTMLDivElement> {
    logo?: React.ReactNode
    visualContent?: React.ReactNode
    children?: React.ReactNode
    backgroundImage?: string
    action?: React.ReactNode
    heroTitle?: string
    heroDescription?: string
    features?: LoginFeature[]
    visualClassName?: string
    disableGradient?: boolean
}


export function NexusLoginTemplate({ 
    className, 
    logo, 
    visualContent,
    children, 
    backgroundImage,
    action,
    heroTitle = "Plataforma Completa",
    heroDescription = "Gestão integrada, fidelidade e controle total para o seu negócio evoluir.",
    features = [
        { icon: "check_circle", text: "Programa de Fidelidade e Pontos" },
        { icon: "check_circle", text: "Gestão de Clientes e Recompensas" },
        { icon: "check_circle", text: "Relatórios de Performance em Tempo Real" }
    ],
    visualClassName,
    disableGradient = false,
    ...props 
}: NexusLoginTemplateProps) {

    return (
        <div className={cn("min-h-screen grid grid-cols-1 lg:grid-cols-2", className)} {...props}>
            {/* Left Side (Visual) */}
            <div 
                className={cn(
                    "relative hidden lg:flex flex-col items-center justify-center p-12 overflow-hidden", 
                    !visualClassName && "bg-primary", // Only apply default bg-primary if no custom class
                    "text-primary-foreground",
                    visualClassName
                )}
            >


                 {/* Background Pattern/Image */}
                 {backgroundImage ? (
                     <div className="absolute inset-0 z-0">
                         <img src={backgroundImage} alt="Background" className="w-full h-full object-cover opacity-50" />
                         <div className="absolute inset-0 bg-gradient-to-t from-sidebar-background via-sidebar-background/80 to-transparent" />
                     </div>
                 ) : !disableGradient ? (
                     // Adaptive Diagonal Gradient - darker at bottom-left, lighter at top-right
                     <div className="absolute inset-0 z-0 bg-gradient-to-tr from-[hsl(var(--primary-dark))] via-primary to-[hsl(var(--primary-light))]" />
                 ) : null}


                 <div className="relative z-10 w-full max-w-lg">
                     {visualContent ? visualContent : (
                         <div className="space-y-8">
                             {/* Placeholder visual content matching the reference somewhat */}
                             <div className="rounded-3xl p-0">
                                 <div className="mb-4">
                                     {logo || (
                                         <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm mb-8">
                                             <span className="material-symbols-outlined text-white text-[40px]">apartment</span>
                                         </div>
                                     )}
                                 </div>
                                 <h2 className="text-2xl font-bold mb-2 text-primary-foreground">{heroTitle}</h2>
                                 <p className="text-primary-foreground/80">{heroDescription}</p>
                             </div>
                             
                             <div className="space-y-4 text-sm font-medium text-primary-foreground/90">

                                {features.map((feature, index) => (
                                     <div key={index} className="flex items-center gap-3">
                                         {feature.icon && (
                                             <span className="material-symbols-outlined text-[32px] text-white">
                                                 {feature.icon}
                                             </span>
                                         )}
                                         {feature.text}
                                     </div>
                                ))}
                             </div>
                         </div>
                     )}
                 </div>
            </div>


            {/* Right Side (Form) */}
            <div className="flex flex-col items-center justify-center p-6 sm:p-12 lg:p-24 bg-background text-foreground transition-colors duration-300 relative">
                <div className="absolute top-6 right-6">
                    {action || <NexusThemeToggle />}
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

