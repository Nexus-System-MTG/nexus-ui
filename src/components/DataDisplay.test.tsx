import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { NexusBadge } from "./Badge/NexusBadge";
import { NexusChip } from "./Chip/NexusChip";
import { NexusDivider } from "./Divider/NexusDivider";
import { NexusList, NexusListItem } from "./List/NexusList";
import { NexusTypography } from "./Typography/NexusTypography";

describe('Data Display Components', () => {
    describe('NexusBadge', () => {
        it('renders correct content', () => {
            render(<NexusBadge>Status</NexusBadge>);
            expect(screen.getByText('Status')).toBeInTheDocument();
        });
    });

    describe('NexusChip', () => {
        it('handles clicks and delete', async () => {
            const user = userEvent.setup();
            const handleDelete = vi.fn();
            const handleClick = vi.fn();

            render(<NexusChip label="Tag" onDelete={handleDelete} onClick={handleClick} />);
            
            await user.click(screen.getByText('Tag'));
            expect(handleClick).toHaveBeenCalled();

            await user.click(screen.getByRole('button', { name: /delete/i }));
            expect(handleDelete).toHaveBeenCalled();
        });
    });

    describe('NexusDivider', () => {
        it('renders', () => {
            const { container } = render(<NexusDivider />);
            expect(container.firstChild).toHaveClass('shrink-0');
        });
    });

    describe('NexusList', () => {
        it('renders list items', () => {
             render(
                 <NexusList>
                     <NexusListItem>Item 1</NexusListItem>
                 </NexusList>
             );
             expect(screen.getByText('Item 1')).toBeInTheDocument();
        });
    });

    describe('NexusTypography', () => {
        it('renders as h1', () => {
            render(<NexusTypography variant="h1">Title</NexusTypography>);
            expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Title');
        });
    });
});
