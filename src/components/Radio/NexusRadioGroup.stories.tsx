import type { Meta, StoryObj } from '@storybook/react';
import { NexusRadioGroup, NexusRadioGroupItem } from './NexusRadioGroup';
import { userEvent, within, expect } from '@storybook/test';

const meta = {
  title: 'Components/RadioGroup',
  component: NexusRadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NexusRadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <NexusRadioGroup defaultValue="comfortable" {...args}>
      <div className="flex items-center space-x-2">
        <NexusRadioGroupItem value="default" id="r1" />
        <label htmlFor="r1" className="text-white">Default</label>
      </div>
      <div className="flex items-center space-x-2">
        <NexusRadioGroupItem value="comfortable" id="r2" />
        <label htmlFor="r2" className="text-white">Comfortable</label>
      </div>
      <div className="flex items-center space-x-2">
        <NexusRadioGroupItem value="compact" id="r3" />
        <label htmlFor="r3" className="text-white">Compact</label>
      </div>
    </NexusRadioGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const r1 = canvas.getByLabelText('Default');
    const r2 = canvas.getByLabelText('Comfortable');

    await expect(r2).toBeChecked();
    await userEvent.click(r1);
    await expect(r1).toBeChecked();
    await expect(r2).not.toBeChecked();
  }
};
