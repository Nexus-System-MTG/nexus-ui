import type { Meta, StoryObj } from '@storybook/react';
import { NexusRating } from './NexusRating';
import { userEvent, within } from '@storybook/test';

const meta = {
  title: 'Components/Rating',
  component: NexusRating,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NexusRating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 3
  },
  play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const stars = canvas.getAllByRole('button');
      
      // 3rd star should be filled (yellow) if implemented with class check, 
      // but easier to check if we can click the 5th star.
      const star5 = stars[4];
      await userEvent.click(star5);
      // Visual verify or check callback if mocked
  }
};
