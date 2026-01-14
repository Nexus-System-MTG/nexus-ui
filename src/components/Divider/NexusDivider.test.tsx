import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { NexusDivider } from './NexusDivider';

describe('NexusDivider', () => {
    it('renders horizontal by default', () => {
        const { container } = render(<NexusDivider />);
        const divider = container.querySelector('[role="none"]');
        expect(divider).toBeInTheDocument();
        expect(divider).toHaveClass('w-full');
        expect(divider).toHaveAttribute('data-orientation', 'horizontal');
    });

    it('renders vertical', () => {
        const { container } = render(<NexusDivider orientation="vertical" />);
        const divider = container.querySelector('[role="none"]');
        expect(divider).toBeInTheDocument();
        expect(divider).toHaveClass('h-full');
        expect(divider).toHaveAttribute('data-orientation', 'vertical');
    });
});
