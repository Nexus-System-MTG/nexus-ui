import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { NexusTransferList } from './NexusTransferList';

const items = [
    { id: '1', label: 'One' },
    { id: '2', label: 'Two' }
];

describe('NexusTransferList', () => {
  it('renders lists', () => {
    render(<NexusTransferList leftItems={items} rightItems={[]} onChange={() => {}} />);
    expect(screen.getByText('Available')).toBeInTheDocument();
    expect(screen.getByText('Selected')).toBeInTheDocument();
    expect(screen.getByText('One')).toBeInTheDocument();
  });

  it('moves items right', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    
    render(<NexusTransferList leftItems={items} rightItems={[]} onChange={handleChange} />);
    
    // Select One
    await user.click(screen.getByText('One'));
    
    // Click Move Right (chevron_right)
    await user.click(screen.getByLabelText('Move Right'));
    
    expect(handleChange).toHaveBeenCalledWith(
        [{ id: '2', label: 'Two' }], // Left
        [{ id: '1', label: 'One' }] // Right
    );
  });
});
