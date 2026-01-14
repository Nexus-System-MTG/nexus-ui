import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { NexusList, NexusListItem } from './NexusList';

describe('NexusList', () => {
    it('renders list with items', () => {
        render(
            <NexusList>
                <NexusListItem>Item 1</NexusListItem>
                <NexusListItem>Item 2</NexusListItem>
            </NexusList>
        );
        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();
        expect(screen.getByRole('list')).toBeInTheDocument();
        expect(screen.getAllByRole('listitem')).toHaveLength(2);
    });
});
