import type { Meta, StoryObj } from '@storybook/react';
import { NexusDivider } from './NexusDivider';

const meta = {
  title: 'Components/Divider',
  component: NexusDivider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NexusDivider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
      <div className="w-[300px] text-white">
          <p>Above</p>
          <NexusDivider className="my-2" />
          <p>Below</p>
      </div>
  )
};

export const Vertical: Story = {
    render: () => (
        <div className="flex h-5 items-center space-x-4 text-white">
            <div>Blog</div>
            <NexusDivider orientation="vertical" />
            <div>Docs</div>
            <NexusDivider orientation="vertical" />
            <div>Source</div>
        </div>
    )
  };
