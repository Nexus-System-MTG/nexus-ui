import type { Meta, StoryObj } from '@storybook/react';
import { NexusTable, type NexusColumnDef } from './NexusTable';
import { type ColumnDef } from '@tanstack/react-table';
import { NexusChip } from '../Chip/NexusChip';
import { NexusTableColumnHeader } from './NexusTableColumnHeader';
import { NexusCheckbox } from '../Checkbox/NexusCheckbox';
import { Button } from '../Button/Button';
import {
  NexusDropdownMenu,
  NexusDropdownMenuContent,
  NexusDropdownMenuItem,
  NexusDropdownMenuLabel,
  NexusDropdownMenuSeparator,
  NexusDropdownMenuTrigger,
} from '../DropdownMenu/NexusDropdownMenu';

// Define a sample data type
type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
  date: string
  type: "card" | "transfer" | "pix"
}

const data: Payment[] = [
  { id: "728ed52f", amount: 100, status: "pending", email: "m@example.com", date: "2024-01-15", type: "card" },
  { id: "489e1d42", amount: 125, status: "processing", email: "example@gmail.com", date: "2024-01-16", type: "pix" },
  { id: "629d8a31", amount: 50, status: "success", email: "user@test.com", date: "2024-01-14", type: "transfer" },
  { id: "123abc45", amount: 200, status: "failed", email: "failed@test.com", date: "2024-01-10", type: "card" },
  { id: "987xyz12", amount: 300, status: "success", email: "bigspender@test.com", date: "2024-01-12", type: "pix" },
  { id: "456def78", amount: 75, status: "pending", email: "wait@test.com", date: "2024-01-18", type: "card" },
  { id: "999aaabb", amount: 1000, status: "success", email: "rich@test.com", date: "2024-01-01", type: "transfer" },
]

const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <NexusCheckbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <NexusCheckbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <NexusTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
        const status = row.getValue("status") as string
        const variant = status === 'success' ? 'default' : status === 'pending' ? 'secondary' : 'destructive'
        const label = {
            pending: 'Pendente',
            processing: 'Processando',
            success: 'Sucesso',
            failed: 'Falhou'
        }[status] || status
        return <NexusChip label={label} variant={variant} />
    },
    meta: {
        type: 'select',
        options: [
            { label: 'Pendente', value: 'pending' },
            { label: 'Processando', value: 'processing' },
            { label: 'Sucesso', value: 'success' },
            { label: 'Falhou', value: 'failed' }
        ]
    }
  },
  {
    accessorKey: "email",
    header: ({ column }) => <NexusTableColumnHeader column={column} title="E-mail" />,
    meta: { type: 'text' }
  },
  {
    accessorKey: "type",
    header: ({ column }) => <NexusTableColumnHeader column={column} title="Tipo" />,
    meta: { 
        type: 'select',
        options: [
            { label: 'Cartão', value: 'card' },
            { label: 'PIX', value: 'pix' },
            { label: 'Transferência', value: 'transfer' },
        ]
    }
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <NexusTableColumnHeader column={column} title="Valor" />,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount)
 
      return <div className="font-medium text-left">{formatted}</div>
    },
    meta: { type: 'number' }
  },
  {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original
        return (
          <NexusDropdownMenu>
            <NexusDropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <span className="material-symbols-outlined text-[18px]">more_horiz</span>
              </Button>
            </NexusDropdownMenuTrigger>
            <NexusDropdownMenuContent align="end">
              <NexusDropdownMenuLabel>Ações</NexusDropdownMenuLabel>
              <NexusDropdownMenuItem
                onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(payment.id)
                }}
              >
                <span className="material-symbols-outlined text-[16px] mr-2">content_copy</span>
                Copiar ID
              </NexusDropdownMenuItem>
              <NexusDropdownMenuSeparator />
              <NexusDropdownMenuItem onClick={(e) => e.stopPropagation()}>
                  <span className="material-symbols-outlined text-[16px] mr-2">visibility</span>
                  Visualizar
              </NexusDropdownMenuItem>
            </NexusDropdownMenuContent>
          </NexusDropdownMenu>
        )
      },
    },
]

const meta = {
  title: 'Components/Table',
  component: NexusTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NexusTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
      columns: columns as any,
      data: data,
      tableId: "table-default",
      enableCustomization: false
  }
};

export const WithCustomization: Story = {
    args: {
        columns: columns as any,
        data: data,
        tableId: "table-customizable",
        enableCustomization: true,
        defaultDetailViewMode: 'modal'
    },
    parameters: {
        docs: {
            description: {
                story: 'Enabled customization allows users to drag & drop columns in detail view and save layouts.'
            }
        }
    }
};

export const SheetView: Story = {
    args: {
        columns: columns as any,
        data: data,
        tableId: "table-sheet",
        defaultDetailViewMode: 'sheet'
    },
    parameters: {
        docs: {
            description: {
                story: 'Detail view opens as a side sheet/drawer.'
            }
        }
    }
};

export const FullscreenView: Story = {
    args: {
        columns: columns as any,
        data: data,
        tableId: "table-fullscreen",
        defaultDetailViewMode: 'fullscreen'
    }
};

const crudColumns: NexusColumnDef[] = [
    { 
        key: 'name', 
        label: 'Nome',
        form: { required: true, label: 'Nome Completo', type: 'text' }
    },
    { 
        key: 'email', 
        label: 'E-mail',
        form: { required: true, type: 'text' }
    },
    { 
        key: 'role', 
        label: 'Cargo', 
        dataType: 'select',
        form: { 
            type: 'select', 
            options: [
                { label: 'Admin', value: 'Admin' }, 
                { label: 'User', value: 'User' },
                { label: 'Manager', value: 'Manager' }
            ],
            required: true
        }
    },
    {
        key: 'status',
        label: 'Status',
        dataType: 'status',
        form: {
            type: 'select',
            options: [
                { label: 'Ativo', value: 'active' },
                { label: 'Inativo', value: 'inactive' }
            ]
        }
    },
    {
        key: 'createdAt',
        label: 'Data Cadastro',
        dataType: 'date',
        form: { type: 'date' }
    }
];

const crudData = [
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'active', createdAt: '2023-01-15' },
    { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'User', status: 'inactive', createdAt: '2023-02-20' },
    { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', role: 'Manager', status: 'active', createdAt: '2023-03-10' },
];

export const WithCRUD: Story = {
    args: {
        title: "User Management with CRUD",
        columns: crudColumns as any,
        data: crudData,
        tableId: "table-crud",
        enableCustomization: true,
        onSave: async (data: any, isNew: boolean) => {
            // Artificial delay to show loading state
            await new Promise(resolve => setTimeout(resolve, 2000));
            alert(`Saving ${isNew ? 'new' : 'existing'} record: ${JSON.stringify(data)}`);
            return Promise.resolve();
        },
        onDelete: async (data: any) => {
            // Artificial delay to show loading state
            await new Promise(resolve => setTimeout(resolve, 2000));
            alert(`Deleting record: ${data.name}`);
            return Promise.resolve();
        },
    },
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates the built-in CRUD capabilities with Auto-Form and Row Actions.'
            }
        }
    }
};

export const WithBulkActions: Story = {
    args: {
        title: "Table with Bulk Actions",
        columns: columns.slice(1) as any, // Remove manual select column to test auto-injection
        data: data,
        tableId: "table-bulk-actions",
        enableCustomization: true,
        bulkActions: [
            {
                label: 'Delete Selected',
                icon: 'delete',
                variant: 'destructive',
                onClick: (rows) => {
                    alert(`Deleting ${rows.length} items: ${rows.map(r => (r as any).id).join(', ')}`);
                }
            },
            {
                label: 'Archive Selected',
                icon: 'archive',
                variant: 'secondary',
                onClick: (rows) => {
                    alert(`Archiving ${rows.length} items`);
                }
            },
            {
                label: 'Export CSV',
                icon: 'download',
                variant: 'outline',
                onClick: (rows) => {
                     alert(`Exporting ${rows.length} items`);
                }
            }
        ]
    },
    parameters: {
        docs: {
            description: {
                story: 'Shows a floating action bar when rows are selected, allowing bulk operations.'
            }
        }
    }
};

export const WithCustomDetail: Story = {
    args: {
        title: "Table with Custom Detail View",
        columns: columns as any,
        data: data,
        tableId: "table-custom-detail",
        defaultDetailViewMode: 'modal',
        renderDetail: (row: any) => (
            <div className="p-6 bg-accent/20 rounded-lg border border-accent/50 mb-6">
                <h4 className="text-lg font-bold mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined">analytics</span>
                    Payment Analysis for {row.email}
                </h4>
                <p className="text-muted-foreground mb-4">
                    This is a custom JSX content rendered via <code>renderDetail</code> prop. 
                    It has full access to the row data.
                </p>
                <div className="grid grid-cols-3 gap-4">
                     <div className="bg-background p-4 rounded shadow-sm text-center">
                        <div className="text-xs text-muted-foreground uppercase">Risk Score</div>
                        <div className="text-2xl font-bold text-green-500">Low</div>
                     </div>
                     <div className="bg-background p-4 rounded shadow-sm text-center">
                        <div className="text-xs text-muted-foreground uppercase">Customer LTV</div>
                        <div className="text-2xl font-bold">$1,250.00</div>
                     </div>
                     <div className="bg-background p-4 rounded shadow-sm text-center">
                        <div className="text-xs text-muted-foreground uppercase">Fraud Check</div>
                        <div className="text-2xl font-bold text-blue-500">Passed</div>
                     </div>
                </div>
            </div>
        )
    }
};
export const WithNativeBulkActions: Story = {
    args: {
        title: "Table with Native Bulk Delete & Edit",
        columns: crudColumns as any,
        data: crudData,
        tableId: "table-native-bulk",
        enableCustomization: true,
        onBulkDelete: async (rows) => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            alert(`Deleted ${rows.length} rows: ${rows.map(r => (r as any).name).join(', ')}`);
        },
        onBulkEdit: async (rows, colId, value) => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            alert(`Updated ${rows.length} rows. Column: ${colId}, New Value: ${value}`);
        }
    },
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates the built-in Bulk Delete and Mass Edit features. Select rows to see the actions.'
            }
        }
    }
};
