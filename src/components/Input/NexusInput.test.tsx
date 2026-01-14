import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { NexusInput } from './NexusInput';

describe('NexusInput', () => {
  it('renders correctly', () => {
    render(<NexusInput label="Test Input" />);
    expect(screen.getByLabelText('Test Input')).toBeInTheDocument();
  });

  describe('Masking', () => {
    it('applies CPF mask', async () => {
      const user = userEvent.setup();
      render(<NexusInput mask="cpf" label="CPF" />);
      const input = screen.getByLabelText('CPF') as HTMLInputElement;
      
      await user.type(input, '12345678900');
      // Verify mask application
      expect(input.value).toBe('123.456.789-00');
    });

    it('applies Currency mask', async () => {
      const user = userEvent.setup();
      render(<NexusInput mask="currency" label="Currency" />);
      const input = screen.getByLabelText('Currency') as HTMLInputElement;
      
      await user.type(input, '1000');
      // For currency mask, it might depend on implementation details (e.g. prefix R$ or not, spaces).
      // Assuming it formats to something containing 1.000
      expect(input.value).toContain('1.000');
    });
  });

  describe('Password Toggle', () => {
    it('toggles password visibility', async () => {
      const user = userEvent.setup();
      render(<NexusInput isPassword label="Password" />);
      const input = screen.getByLabelText('Password') as HTMLInputElement;
      const toggleBtn = screen.getByRole('button');

      expect(input.type).toBe('password');
      
      await user.click(toggleBtn);
      expect(input.type).toBe('text'); // Visible

      await user.click(toggleBtn);
      expect(input.type).toBe('password'); // Hidden
    });

    it('shows correct icons', async () => {
      const user = userEvent.setup();
      render(<NexusInput isPassword />);
      expect(screen.getByText('visibility')).toBeInTheDocument(); 
      
      await user.click(screen.getByRole('button'));
      expect(screen.getByText('visibility_off')).toBeInTheDocument();
    });
  });

  describe('Icons', () => {
    it('renders left icon', () => {
      render(<NexusInput leftIcon="search" />);
      expect(screen.getByText('search')).toBeInTheDocument();
    });

    it('renders right icon and handles click', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<NexusInput rightIcon="close" onRightIconClick={handleClick} />);
      
      const iconBtn = screen.getByRole('button');
      await user.click(iconBtn);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});
