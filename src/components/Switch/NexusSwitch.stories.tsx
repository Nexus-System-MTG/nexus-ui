import type { Meta, StoryObj } from '@storybook/react';
import { NexusSwitch } from './NexusSwitch';
import { userEvent, within, expect } from '@storybook/test';

const meta = {
  title: 'Components/Switch',
  component: NexusSwitch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NexusSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
      'aria-label': 'Toggle settings'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const switchEl = canvas.getByRole('switch');
    await expect(switchEl).toHaveAttribute('data-state', 'unchecked');
    
    await userEvent.click(switchEl);
    await expect(switchEl).toHaveAttribute('data-state', 'checked');
  }
};

export const Disabled: Story = {
    args: {
        disabled: true,
        'aria-label': 'Disabled toggle'
    }
}
