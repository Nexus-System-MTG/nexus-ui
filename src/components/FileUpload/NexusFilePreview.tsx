import * as React from "react"
import { cn } from "../../lib/utils"
import { Button } from "../Button/Button"

export interface NexusFilePreviewProps {
    file: File | string // Support File object or URL string
    onRemove?: () => void
    className?: string
}

export function NexusFilePreview({ file, onRemove, className }: NexusFilePreviewProps) {
    const isFileObject = file instanceof File
    const fileName = isFileObject ? file.name : (file as string).split('/').pop() || 'Arquivo'
    const fileSize = isFileObject ? (file.size / (1024 * 1024)).toFixed(2) + ' MB' : ''
    
    // Determine type
    const isImage = isFileObject 
        ? file.type.startsWith('image/') 
        : /\.(jpg|jpeg|png|gif|webp)$/i.test(file as string)
        
    const isVideo = isFileObject 
        ? file.type.startsWith('video/') 
        : /\.(mp4|webm|ogg)$/i.test(file as string)

    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null)

    React.useEffect(() => {
        if (isFileObject && (isImage || isVideo)) {
            const url = URL.createObjectURL(file)
            setPreviewUrl(url)
            return () => URL.revokeObjectURL(url)
        } else if (!isFileObject) {
            setPreviewUrl(file as string)
        }
    }, [file, isFileObject, isImage, isVideo])

    return (
        <div className={cn("group relative flex items-center gap-4 p-3 rounded-lg border border-border bg-card shadow-sm hover:shadow-md transition-all", className)}>
            
            {/* Thumbnail / Icon */}
            <div className="w-16 h-16 shrink-0 rounded-md overflow-hidden bg-muted flex items-center justify-center relative border border-border/50">
                {isImage && previewUrl ? (
                    <img src={previewUrl} alt={fileName} className="w-full h-full object-cover" />
                ) : isVideo && previewUrl ? (
                    <video src={previewUrl} className="w-full h-full object-cover" />
                ) : (
                    <span className="material-symbols-outlined text-muted-foreground text-2xl">
                        description
                    </span>
                )}
                
                {/* Play icon overlay for video */}
                {isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <span className="material-symbols-outlined text-white/80 drop-shadow-md">play_circle</span>
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate" title={fileName}>
                    {fileName}
                </p>
                <p className="text-xs text-muted-foreground">
                    {fileSize && <span>{fileSize} • </span>}
                    {isImage ? 'Imagem' : isVideo ? 'Vídeo' : 'Arquivo'}
                </p>
            </div>

            {/* Actions */}
            {onRemove && (
                <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={(e) => { e.stopPropagation(); onRemove(); }}
                    className="text-muted-foreground hover:text-destructive shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <span className="material-symbols-outlined">delete</span>
                </Button>
            )}
        </div>
    )
}
