import type { Meta, StoryObj } from '@storybook/react';
import { NexusTooltip, NexusTooltipContent, NexusTooltipProvider, NexusTooltipTrigger } from './NexusTooltip';
import { Button } from '../Button/Button';
import { userEvent, within } from '@storybook/test';

const meta = {
  title: 'Components/Tooltip',
  component: NexusTooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NexusTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
      <NexusTooltipProvider>
          <NexusTooltip>
              <NexusTooltipTrigger asChild>
                  <Button variant="outline">Hover me</Button>
              </NexusTooltipTrigger>
              <NexusTooltipContent>
                  <p>Add to library</p>
              </NexusTooltipContent>
          </NexusTooltip>
      </NexusTooltipProvider>
  ),
  play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const button = canvas.getByText('Hover me');
      await userEvent.hover(button);
  }
};

const TooltipDemo = ({ side, align, label }: { side: any, align?: any, label: string }) => (
    <NexusTooltip delayDuration={0}>
        <NexusTooltipTrigger asChild>
            <Button variant="glass" className="w-[120px]">{label}</Button>
        </NexusTooltipTrigger>
        <NexusTooltipContent side={side} align={align}>
            <p>{label}</p>
        </NexusTooltipContent>
    </NexusTooltip>
)

export const Positions: Story = {
    render: () => (
        <NexusTooltipProvider>
            <div className="grid grid-cols-3 gap-8 p-8 items-center justify-items-center bg-[var(--nx-glass-bg)]/20 rounded-xl border border-[var(--nx-glass-border)]">
                {/* Top Row */}
                <TooltipDemo side="top" align="start" label="Up Left" />
                <TooltipDemo side="top" align="center" label="Up" />
                <TooltipDemo side="top" align="end" label="Up Right" />

                {/* Middle Row */}
                <TooltipDemo side="left" align="center" label="Left" />
                <div className="text-white/20 text-sm font-mono">Hover Buttons</div>
                <TooltipDemo side="right" align="center" label="Right" />

                {/* Bottom Row */}
                <TooltipDemo side="bottom" align="start" label="Down Left" />
                <TooltipDemo side="bottom" align="center" label="Down" />
                <TooltipDemo side="bottom" align="end" label="Down Right" />
            </div>
        </NexusTooltipProvider>
    )
}
