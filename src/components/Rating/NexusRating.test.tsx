import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { NexusRating } from './NexusRating';

describe('NexusRating', () => {
  it('renders all stars', () => {
    render(<NexusRating max={5} />);
    expect(screen.getAllByRole('button')).toHaveLength(5);
  });

  it('updates value on click', async () => {
    const user = userEvent.setup();
    render(<NexusRating />);
    const stars = screen.getAllByRole('button');
    
    // Initially 0. Click 3rd star.
    await user.click(stars[2]);
    
    // Check if internal state updated visual classes.
    // 'text-yellow-400' means filled.
    expect(stars[2]).toHaveClass('text-yellow-400');
    expect(stars[3]).not.toHaveClass('text-yellow-400');
    expect(stars[4]).not.toHaveClass('text-yellow-400');
  });
});
