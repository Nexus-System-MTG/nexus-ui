import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeAll } from 'vitest';
import { 
    NexusTooltip, 
    NexusTooltipProvider,
    NexusTooltipTrigger,
    NexusTooltipContent
} from './NexusTooltip';

describe('NexusTooltip', () => {
     beforeAll(() => {
        // Mock ResizeObserver for floating-ui/radix
        global.ResizeObserver = class ResizeObserver {
            observe() {}
            unobserve() {}
            disconnect() {}
        };
    });

    it.skip('renders tooltip on hover', async () => {
        const user = userEvent.setup();
        render(
            <NexusTooltipProvider delayDuration={0}>
                <NexusTooltip>
                    <NexusTooltipTrigger asChild>
                         <button>Hover me</button>
                    </NexusTooltipTrigger>
                    <NexusTooltipContent>
                        Tooltip Text
                    </NexusTooltipContent>
                </NexusTooltip>
            </NexusTooltipProvider>
        );

        const trigger = screen.getByText('Hover me');
        expect(screen.queryByText('Tooltip Text')).not.toBeInTheDocument();

        // Radix Tooltip might need focus or hover.
        await user.hover(trigger);
        await user.click(trigger); // Sometimes click helps in test env if hover is flaky

        await waitFor(() => {
            expect(screen.getByRole('tooltip')).toBeInTheDocument();
            expect(screen.getByText('Tooltip Text')).toBeInTheDocument();
        });
    });
});
