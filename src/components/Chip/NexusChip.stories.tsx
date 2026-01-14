import type { Meta, StoryObj } from '@storybook/react';
import { NexusChip } from './NexusChip';
import { userEvent, within, expect, fn } from '@storybook/test';

const meta = {
  title: 'Components/Chip',
  component: NexusChip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NexusChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
      label: 'React'
  }
};

export const Deletable: Story = {
    args: {
        label: 'Filters',
        onDelete: fn(),
        variant: 'glass'
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement);
        const deleteBtn = canvas.getByRole('button', { name: /delete/i });
        await userEvent.click(deleteBtn);
        await expect(args.onDelete).toHaveBeenCalled();
    }
}

export const Interactive: Story = {
    args: {
        label: 'Click Me',
        onClick: fn(),
        icon: 'touch_app'
    }
}
