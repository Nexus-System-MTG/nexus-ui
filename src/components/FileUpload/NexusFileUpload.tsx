import * as React from "react"
import { cn } from "../../lib/utils"

export interface NexusFileUploadProps extends React.HTMLAttributes<HTMLDivElement> {
    onFilesSelected: (files: File[]) => void
    accept?: string[] // e.g. ['image/*', 'video/mp4']
    maxSizeInMB?: number
    multiple?: boolean
    label?: string
    description?: string
    disabled?: boolean
}

export function NexusFileUpload({ 
    className, 
    onFilesSelected, 
    accept, 
    maxSizeInMB, 
    multiple = false,
    label = "Arraste e solte arquivos aqui",
    description = "Ou clique para selecionar",
    disabled = false,
    ...props 
}: NexusFileUploadProps) {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [isDragging, setIsDragging] = React.useState(false)

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (!disabled) setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (!disabled && !isDragging) setIsDragging(true)
    }

    const validateFiles = (fileList: FileList | null): File[] => {
        if (!fileList) return []
        const files = Array.from(fileList)
        const validFiles: File[] = []

        files.forEach(file => {
             // Type check
             if (accept && accept.length > 0) {
                 const fileType = file.type
                 // Simple check: does any accepted type match?
                 // Support 'image/*' wildcards
                 const isValidType = accept.some(type => {
                     if (type.endsWith('/*')) {
                         const baseType = type.split('/')[0]
                         return fileType.startsWith(baseType + '/')
                     }
                     return fileType === type || (type.startsWith('.') && file.name.endsWith(type))
                 })
                 
                 if (!isValidType) {
                     // Could trigger toast error here
                     console.warn(`File type ${file.type} not accepted.`)
                     return
                 }
             }

             // Size check
             if (maxSizeInMB) {
                 const sizeInMB = file.size / (1024 * 1024)
                 if (sizeInMB > maxSizeInMB) {
                     console.warn(`File size ${sizeInMB.toFixed(2)}MB exceeds limit of ${maxSizeInMB}MB.`)
                     return
                 }
             }

             validFiles.push(file)
        })

        return validFiles
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
        if (disabled) return

        const files = validateFiles(e.dataTransfer.files)
        if (files.length > 0) {
            onFilesSelected(multiple ? files : [files[0]])
        }
    }

    const handleClick = () => {
        if (!disabled) inputRef.current?.click()
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = validateFiles(e.target.files)
        if (files.length > 0) {
            onFilesSelected(multiple ? files : [files[0]])
        }
        // Reset input so same file can be selected again if needed
        if (inputRef.current) inputRef.current.value = ''
    }

    // Build accept string for input
    const acceptString = accept?.join(',')

    return (
        <div 
            onClick={handleClick}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
                "group relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl transition-all duration-200 cursor-pointer overflow-hidden",
                isDragging 
                    ? "border-primary bg-primary/5 active:scale-[0.99]" 
                    : "border-border bg-background hover:bg-muted/30 hover:border-primary/50",
                disabled && "opacity-50 cursor-not-allowed hover:bg-background hover:border-border",
                className
            )}
            {...props}
        >
            <input 
                ref={inputRef}
                type="file"
                className="hidden"
                multiple={multiple}
                accept={acceptString}
                onChange={handleInputChange}
                disabled={disabled}
            />

            <div className="flex flex-col items-center gap-4 text-center p-6 transition-transform duration-200 group-hover:-translate-y-1">
                <div className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-colors",
                    isDragging ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                )}>
                    <span className="material-symbols-outlined text-3xl">cloud_upload</span>
                </div>
                
                <div className="space-y-1">
                     <p className="text-lg font-semibold text-foreground">
                         {label}
                     </p>
                     <p className="text-sm text-muted-foreground">
                         {description}
                     </p>
                </div>

                {accept && (
                    <div className="text-xs text-muted-foreground/60 uppercase tracking-widest mt-2">
                        {accept.join(', ').replace(/\*/g, 'Todos').replace(/image\//g, 'IMG ').replace(/video\//g, 'VIDEO ')}
                    </div>
                )}
            </div>
            
            {/* Visual ripple/glow effect on drag */}
            {isDragging && (
                <div className="absolute inset-0 z-[-1] bg-primary/5 animate-pulse" />
            )}
        </div>
    )
}
