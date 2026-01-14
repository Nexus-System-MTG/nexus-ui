import type { Meta, StoryObj } from '@storybook/react';
import { NexusList, NexusListItem } from './NexusList';

const meta = {
  title: 'Components/List',
  component: NexusList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NexusList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
      <NexusList {...args} className="w-[200px]">
          <NexusListItem>Dashboard</NexusListItem>
          <NexusListItem>Settings</NexusListItem>
          <NexusListItem>Profile</NexusListItem>
      </NexusList>
  )
};
