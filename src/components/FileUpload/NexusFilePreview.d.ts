export interface NexusFilePreviewProps {
    file: File | string;
    onRemove?: () => void;
    className?: string;
}
export declare function NexusFilePreview({ file, onRemove, className }: NexusFilePreviewProps): import("react/jsx-runtime").JSX.Element;
