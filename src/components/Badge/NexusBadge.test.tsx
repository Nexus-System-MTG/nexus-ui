import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { NexusBadge } from './NexusBadge';

describe('NexusBadge', () => {
    it('renders content correctly', () => {
        render(
            <NexusBadge content={5}>
                <div role="button">Icon</div>
            </NexusBadge>
        );
        expect(screen.getByText('5')).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('handles max prop', () => {
        render(
            <NexusBadge content={100} max={99}>
                <div>Icon</div>
            </NexusBadge>
        );
        expect(screen.getByText('99+')).toBeInTheDocument();
    });

    it('renders dot variant', () => {
        const { container } = render(
            <NexusBadge size="dot" variant="destructive">
                <div>Icon</div>
            </NexusBadge>
        );
        // Should not render text
        expect(screen.queryByText('5')).not.toBeInTheDocument();
        // Check for class (simplified check, escaping dot)
        expect(container.querySelector('.w-2\\.5')).toBeInTheDocument();
    });

     it('does not render when invisible', () => {
        render(
            <NexusBadge content={5} invisible>
                <div>Icon</div>
            </NexusBadge>
        );
        expect(screen.queryByText('5')).not.toBeInTheDocument();
    });
});
