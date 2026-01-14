import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeAll } from 'vitest';
import { 
    NexusDropdownMenu, 
    NexusDropdownMenuTrigger, 
    NexusDropdownMenuContent, 
    NexusDropdownMenuItem 
} from './NexusDropdownMenu';

// Radix UI relies on ResizeObserver and PointerEvents which might not be fully polyfilled in JSDOM environment used by Vitest
// But usually basic click interaction works. If fails, we might need mock ResizeObserver.

describe('NexusDropdownMenu', () => {
    beforeAll(() => {
        // Mock ResizeObserver
        global.ResizeObserver = class ResizeObserver {
            observe() {}
            unobserve() {}
            disconnect() {}
        };
    });

    it('renders trigger and opens menu on click', async () => {
        const user = userEvent.setup();
        render(
            <NexusDropdownMenu>
                <NexusDropdownMenuTrigger>Open Menu</NexusDropdownMenuTrigger>
                <NexusDropdownMenuContent>
                    <NexusDropdownMenuItem>Item 1</NexusDropdownMenuItem>
                    <NexusDropdownMenuItem>Item 2</NexusDropdownMenuItem>
                </NexusDropdownMenuContent>
            </NexusDropdownMenu>
        );

        const trigger = screen.getByText('Open Menu');
        expect(trigger).toBeInTheDocument();
        
        // Menu item should not be visible yet
        expect(screen.queryByText('Item 1')).not.toBeInTheDocument();

        // Click trigger
        await user.click(trigger);

        // Menu item should be visible (using waitFor as animation/portal might be async-ish or state update)
        await waitFor(() => {
             expect(screen.getByText('Item 1')).toBeInTheDocument();
             expect(screen.getByText('Item 2')).toBeInTheDocument();
        });
    });
});
