import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { NexusTable } from './NexusTable';
import { type ColumnDef } from '@tanstack/react-table';

type TestData = {
    id: string
    name: string
    age: number
    role: string
}

const columns: ColumnDef<TestData>[] = [
    { accessorKey: 'id', header: 'ID', meta: { type: 'text' } },
    { accessorKey: 'name', header: 'Name', meta: { type: 'text' } },
    { accessorKey: 'age', header: 'Age', meta: { type: 'number' } },
    { accessorKey: 'role', header: 'Role', meta: { type: 'select', options: [{label:'Dev',value:'dev'}, {label:'Manager',value:'manager'}] } }
]

const data: TestData[] = [
    { id: '1', name: 'Alice', age: 25, role: 'dev' },
    { id: '2', name: 'Bob', age: 30, role: 'manager' },
    { id: '3', name: 'Charlie', age: 35, role: 'dev' },
    { id: '4', name: 'David', age: 40, role: 'manager' }
]

describe('NexusTable Advanced Filter', () => {
    it('filters by single text rule (contains)', async () => {
        render(<NexusTable columns={columns} data={data} />);
        
        // Open Filter
        fireEvent.click(screen.getByText('filter_list').closest('button')!);
        
        // Add Rule
        // The text "Adicionar regra" is inside the button which also has an icon span.
        const addRuleBtn = screen.getByRole('button', { name: /Adicionar regra/i });
        fireEvent.click(addRuleBtn);
        
        // Setup Rule: Default is ID (first col). ID contains "1" (Alice)
        
        const valueInput = screen.getByLabelText('Valor');
        fireEvent.change(valueInput, { target: { value: '1' } });
        
        // Click Apply
        fireEvent.click(screen.getByText('Filtrar'));
        
        // Expect Alice (ID 1) to be there. Bob (ID 2) might be gone.
        await waitFor(() => {
            expect(screen.getByText('Alice')).toBeInTheDocument();
            expect(screen.queryByText('Bob')).not.toBeInTheDocument();
        });
    });

    it('filters by number comparator (gt)', async () => {
        render(<NexusTable columns={columns} data={data} />);
        
        // Open Filter -> Add Rule
        fireEvent.click(screen.getByText('filter_list').closest('button')!);
        const addRuleBtn = screen.getByRole('button', { name: /Adicionar regra/i });
        fireEvent.click(addRuleBtn);
        
        const colTrigger = await screen.findByLabelText('Coluna');
        fireEvent.click(colTrigger);
        const ageOption = await screen.findByRole('option', { name: 'Age' });
        fireEvent.click(ageOption);
        
        // Operator should default to 'equals'. Change to 'gt' (Maior que)
        const opTrigger = await screen.findByLabelText('Operador');
        fireEvent.click(opTrigger);
        const gtOption = await screen.findByRole('option', { name: 'Maior que' });
        fireEvent.click(gtOption);
        
        // Helper for value input - it might be a text input or select, here it's input
        const valueInput = await screen.findByLabelText('Valor');
        fireEvent.change(valueInput, { target: { value: '30' } }); 
        
        fireEvent.click(screen.getByText('Filtrar'));
        
        await waitFor(() => {
            expect(screen.getByText('Charlie')).toBeInTheDocument();
            expect(screen.queryByText('Bob')).not.toBeInTheDocument(); 
            expect(screen.queryByText('Alice')).not.toBeInTheDocument(); 
        });
    });
});
