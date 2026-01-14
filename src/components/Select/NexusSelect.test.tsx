import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { NexusSelect } from './NexusSelect';

const options = [
  { value: '1', label: 'Apple', group: 'Fruits' },
  { value: '2', label: 'Banana', group: 'Fruits' },
  { value: '3', label: 'Carrot', group: 'Vegetables' },
  { value: '4', label: 'Broker', icon: 'person' },
];

describe('NexusSelect', () => {
  it('renders correctly', () => {
    render(<NexusSelect aria-label="Select Item" options={options} onChange={() => {}} placeholder="Select Item" />);
    // Input exists via aria-label since placeholder is hidden when closed
    expect(screen.getByLabelText('Select Item')).toBeInTheDocument();
  });

  it('filters options (fuzzy search)', async () => {
    const user = userEvent.setup();
    render(<NexusSelect aria-label="search info" options={options} onChange={() => {}} placeholder="search info" />);
    const input = screen.getByLabelText('search info');

    // Focus triggers open
    await user.click(input);
    
    // Type 'ppl'
    await user.type(input, 'ppl');

    // Wait for debounce (300ms) + rendering so Carrot disappears
    await waitFor(() => {
        expect(screen.queryByText('Carrot')).not.toBeInTheDocument();
    }, { timeout: 2000 });
    
    // Apple should still be there
    expect(screen.getByText('Apple')).toBeInTheDocument();
  });

  it('renders groups', async () => {
    const user = userEvent.setup();
    render(<NexusSelect aria-label="groups" options={options} onChange={() => {}} placeholder="groups" />);
    const input = screen.getByLabelText('groups');
    
    await user.click(input);

    await waitFor(() => {
        expect(screen.getByText('Fruits')).toBeInTheDocument();
    });
  });

  it('renders icons', async () => {
    const user = userEvent.setup();
    render(<NexusSelect aria-label="icons" options={options} onChange={() => {}} placeholder="icons" />);
    const input = screen.getByLabelText('icons');
    await user.click(input);
    
    await waitFor(() => {
        expect(screen.getByText('person')).toBeInTheDocument();
    });
  });
});
