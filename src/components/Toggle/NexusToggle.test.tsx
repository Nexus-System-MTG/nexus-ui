import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { NexusToggle } from './NexusToggle';
import { NexusToggleGroup, NexusToggleGroupItem } from './NexusToggleGroup';

describe('NexusToggle', () => {
  it('toggles state', async () => {
    const user = userEvent.setup();
    render(<NexusToggle aria-label="Toggle It">Toggle</NexusToggle>);
    
    const toggle = screen.getByLabelText('Toggle It');
    expect(toggle).toHaveAttribute('data-state', 'off');
    
    await user.click(toggle);
    expect(toggle).toHaveAttribute('data-state', 'on');
  });
});

describe('NexusToggleGroup', () => {
    it('handles single selection', async () => {
        const user = userEvent.setup();
        render(
            <NexusToggleGroup type="single" defaultValue="1">
                <NexusToggleGroupItem value="1" aria-label="One">1</NexusToggleGroupItem>
                <NexusToggleGroupItem value="2" aria-label="Two">2</NexusToggleGroupItem>
            </NexusToggleGroup>
        );

        const t1 = screen.getByLabelText('One');
        const t2 = screen.getByLabelText('Two');

        expect(t1).toHaveAttribute('data-state', 'on');
        
        await user.click(t2);
        expect(t2).toHaveAttribute('data-state', 'on');
        expect(t1).toHaveAttribute('data-state', 'off');
    });

    it('handles multiple selection', async () => {
        const user = userEvent.setup();
        render(
            <NexusToggleGroup type="multiple">
                <NexusToggleGroupItem value="1" aria-label="One">1</NexusToggleGroupItem>
                <NexusToggleGroupItem value="2" aria-label="Two">2</NexusToggleGroupItem>
            </NexusToggleGroup>
        );

        const t1 = screen.getByLabelText('One');
        const t2 = screen.getByLabelText('Two');

        await user.click(t1);
        expect(t1).toHaveAttribute('data-state', 'on');
        
        await user.click(t2);
        expect(t2).toHaveAttribute('data-state', 'on');
        expect(t1).toHaveAttribute('data-state', 'on'); // Both selected
    });
});
