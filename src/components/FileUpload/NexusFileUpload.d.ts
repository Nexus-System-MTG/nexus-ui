import * as React from "react";
export interface NexusFileUploadProps extends React.HTMLAttributes<HTMLDivElement> {
    onFilesSelected: (files: File[]) => void;
    accept?: string[];
    maxSizeInMB?: number;
    multiple?: boolean;
    label?: string;
    description?: string;
    disabled?: boolean;
}
export declare function NexusFileUpload({ className, onFilesSelected, accept, maxSizeInMB, multiple, label, description, disabled, ...props }: NexusFileUploadProps): import("react/jsx-runtime").JSX.Element;
