import type { Meta, StoryObj } from '@storybook/react';
import { NexusToggle } from './NexusToggle';
import { NexusToggleGroup, NexusToggleGroupItem } from './NexusToggleGroup';
import { userEvent, within, expect } from '@storybook/test';

const meta = {
  title: 'Components/Toggle',
  component: NexusToggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NexusToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
      children: <span className="material-symbols-outlined">favorite</span>,
      variant: 'default'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole('button');
    
    await expect(toggle).toHaveAttribute('data-state', 'off');
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute('data-state', 'on');
  }
};

export const ToggleGroup: StoryObj<typeof NexusToggleGroup> = {
    render: (args) => (
        // @ts-ignore - Storybook args typing for discriminated unions can be tricky
        <NexusToggleGroup type="single" defaultValue="left" {...args} value={undefined}>
            <NexusToggleGroupItem value="left" aria-label="Left Aligned">
                <span className="material-symbols-outlined">format_align_left</span>
            </NexusToggleGroupItem>
            <NexusToggleGroupItem value="center" aria-label="Center Aligned">
                <span className="material-symbols-outlined">format_align_center</span>
            </NexusToggleGroupItem>
            <NexusToggleGroupItem value="right" aria-label="Right Aligned">
                <span className="material-symbols-outlined">format_align_right</span>
            </NexusToggleGroupItem>
        </NexusToggleGroup>
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const left = canvas.getByLabelText('Left Aligned');
        const center = canvas.getByLabelText('Center Aligned');

        await expect(left).toHaveAttribute('data-state', 'on');
        await userEvent.click(center);
        await expect(center).toHaveAttribute('data-state', 'on');
        await expect(left).toHaveAttribute('data-state', 'off');
    }
}
