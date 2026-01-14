import type { Meta, StoryObj } from '@storybook/react';
import { NexusCheckbox } from './NexusCheckbox';
import { userEvent, within, expect } from '@storybook/test';

const meta = {
  title: 'Components/Checkbox',
  component: NexusCheckbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NexusCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
      <div className="flex items-center space-x-2">
        <NexusCheckbox id="terms" {...args} />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
        >
          Accept terms and conditions
        </label>
      </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');
    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();
  }
};

export const Disabled: Story = {
    args: {
        disabled: true
    }
}
