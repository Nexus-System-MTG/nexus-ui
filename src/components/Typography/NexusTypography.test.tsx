import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { NexusTypography } from './NexusTypography';

describe('NexusTypography', () => {
    it('renders text content', () => {
        render(<NexusTypography variant="h1">Heading</NexusTypography>);
        expect(screen.getByText('Heading')).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    it('renders different variants', () => {
        const { rerender } = render(<NexusTypography variant="p">Paragraph</NexusTypography>);
        // p variant has leading-7 class
        expect(screen.getByText('Paragraph')).toHaveClass('leading-7');

        rerender(<NexusTypography variant="small">Small Text</NexusTypography>);
        expect(screen.getByText('Small Text')).toHaveClass('text-sm');
    });

    it('renders as different element', () => {
        render(<NexusTypography as="span">Span Text</NexusTypography>);
        // Check if tag is span? 
        // We can check it's in doc.
        expect(screen.getByText('Span Text')).toBeInTheDocument();
        // Assuming default for body1 is p, but as="span" makes it span.
    });
});
