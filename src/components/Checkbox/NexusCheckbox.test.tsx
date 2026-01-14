import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { NexusCheckbox } from './NexusCheckbox';

describe('NexusCheckbox', () => {
  it('renders correctly', () => {
    render(<NexusCheckbox />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('toggles checked state', async () => {
    const user = userEvent.setup();
    render(<NexusCheckbox />);
    const checkbox = screen.getByRole('checkbox');
    
    expect(checkbox).not.toBeChecked();
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('handles disabled state', async () => {
    const user = userEvent.setup();
    render(<NexusCheckbox disabled />);
    const checkbox = screen.getByRole('checkbox');
    
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});
