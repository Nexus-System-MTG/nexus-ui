import type { Meta, StoryObj } from '@storybook/react';
import { NexusAvatar, NexusAvatarImage, NexusAvatarFallback } from './NexusAvatar';

const meta = {
  title: 'Components/Avatar',
  component: NexusAvatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  subcomponents: { NexusAvatarImage, NexusAvatarFallback } as any, // Cast to avoid TS issues with subcomponents typing in SB
} satisfies Meta<typeof NexusAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
      <NexusAvatar {...args}>
          <NexusAvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <NexusAvatarFallback>CN</NexusAvatarFallback>
      </NexusAvatar>
  )
};

export const Fallback: Story = {
    render: (args) => (
        <NexusAvatar {...args}>
            <NexusAvatarImage src="" alt="Broken" />
            <NexusAvatarFallback>GP</NexusAvatarFallback>
        </NexusAvatar>
    )
  };
