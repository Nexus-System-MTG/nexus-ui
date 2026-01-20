import * as React from "react";
export interface TransferItem {
    id: string;
    label: string;
}
export interface TransferListProps {
    leftItems: TransferItem[];
    rightItems: TransferItem[];
    onChange: (left: TransferItem[], right: TransferItem[]) => void;
    className?: string;
}
declare const NexusTransferList: React.ForwardRefExoticComponent<TransferListProps & React.RefAttributes<HTMLDivElement>>;
export { NexusTransferList };
