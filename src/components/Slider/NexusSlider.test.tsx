import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { NexusSlider } from './NexusSlider';

describe('NexusSlider', () => {
  it('renders correctly', () => {
    render(<NexusSlider defaultValue={[50]} max={100} />);
    const slider = screen.getByRole('slider');
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveAttribute('aria-valuenow', '50');
  });
});
