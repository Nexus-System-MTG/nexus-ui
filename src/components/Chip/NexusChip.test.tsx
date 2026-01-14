import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { NexusChip } from './NexusChip';

describe('NexusChip', () => {
    it('renders label', () => {
        render(<NexusChip label="Test Chip" />);
        expect(screen.getByText('Test Chip')).toBeInTheDocument();
    });

    it('handles onClick', async () => {
        const user = userEvent.setup();
        const handleClick = vi.fn();
        render(<NexusChip label="Clickable" onClick={handleClick} />);
        
        await user.click(screen.getByText('Clickable'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles onDelete', async () => {
        const user = userEvent.setup();
        const handleDelete = vi.fn();
        const handleClick = vi.fn();
        render(<NexusChip label="Deletable" onClick={handleClick} onDelete={handleDelete} />);
        
        const deleteBtn = screen.getByRole('button', { name: /delete/i });
        await user.click(deleteBtn);
        
        expect(handleDelete).toHaveBeenCalledTimes(1);
        expect(handleClick).not.toHaveBeenCalled(); // Stops propagation
    });

    it('renders icon', () => {
        render(<NexusChip label="Icon Chip" icon="star" />);
        expect(screen.getByText('star')).toBeInTheDocument();
    });
});
