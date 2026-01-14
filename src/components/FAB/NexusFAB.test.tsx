import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { NexusFAB } from './NexusFAB';

describe('NexusFAB', () => {
  it('renders correctly', () => {
    render(<NexusFAB icon="add" aria-label="Add" />);
    expect(screen.getByRole('button', { name: /Add/i })).toBeInTheDocument();
    expect(screen.getByText('add')).toBeInTheDocument();
  });

  it('handles click', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<NexusFAB icon="edit" onClick={handleClick} />);
    
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
