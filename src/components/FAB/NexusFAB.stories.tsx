import type { Meta, StoryObj } from '@storybook/react';
import { NexusFAB } from './NexusFAB';
import { within, expect } from '@storybook/test';

const meta = {
  title: 'Components/FAB',
  component: NexusFAB,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NexusFAB>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: 'add',
    'aria-label': 'Create New'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const fab = canvas.getByRole('button');
    await expect(fab).toBeInTheDocument();
  }
};

export const Positioned: Story = {
    args: {
        icon: 'chat',
        position: 'bottom-right'
    },
    parameters: {
        layout: 'fullscreen'
    },
    render: (args) => (
        <div className="h-[200px] w-full bg-slate-900 relative">
            <NexusFAB {...args} />
        </div>
    )
}
