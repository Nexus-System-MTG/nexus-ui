import type { Meta, StoryObj } from '@storybook/react';
import { NexusSlider } from './NexusSlider';
import { within, expect } from '@storybook/test';

const meta = {
  title: 'Components/Slider',
  component: NexusSlider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NexusSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
      defaultValue: [50],
      max: 100,
      step: 1,
      className: "w-[300px]"
  },
  play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const slider = canvas.getByRole('slider');
      await expect(slider).toBeInTheDocument();
      // Interaction with slider thumb (complex to mock drag in storybook without specific events)
      // Usually checking presence and default value.
      await expect(slider).toHaveAttribute('aria-valuenow', '50');
  }
};
