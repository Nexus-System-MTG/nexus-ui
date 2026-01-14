import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { NexusSwitch } from './NexusSwitch';

describe('NexusSwitch', () => {
  it('renders correctly', () => {
    render(<NexusSwitch aria-label="wifi" />);
    expect(screen.getByRole('switch', { name: "wifi" })).toBeInTheDocument();
  });

  it('toggles state', async () => {
    const user = userEvent.setup();
    render(<NexusSwitch aria-label="toggle" />);
    const switchEl = screen.getByRole('switch');
    
    expect(switchEl).not.toBeChecked();
    await user.click(switchEl);
    expect(switchEl).toBeChecked();
  });

  it('respects disabled state', async () => {
    const user = userEvent.setup();
    render(<NexusSwitch disabled aria-label="disabled" />);
    const switchEl = screen.getByRole('switch');
    
    await user.click(switchEl);
    expect(switchEl).not.toBeChecked();
  });
});
