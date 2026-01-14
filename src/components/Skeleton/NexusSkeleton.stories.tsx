import type { Meta, StoryObj } from '@storybook/react';
import { NexusSkeleton } from './NexusSkeleton';

const meta = {
  title: 'Feedback/NexusSkeleton',
  component: NexusSkeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NexusSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "w-[100px] h-[20px] rounded-full"
  },
};

export const CardLoading: Story = {
  render: () => (
      <div className="flex flex-col space-y-3 w-[300px]">
          <NexusSkeleton className="h-[125px] w-full rounded-xl" />
          <div className="space-y-2">
            <NexusSkeleton className="h-4 w-[250px]" />
            <NexusSkeleton className="h-4 w-[200px]" />
          </div>
      </div>
  )
};

export const TableLoading: Story = {
    render: () => (
        <div className="space-y-4 w-[600px]">
             <div className="flex items-center justify-between">
                <NexusSkeleton className="h-10 w-[200px]" />
                <div className="flex gap-2">
                    <NexusSkeleton className="h-10 w-[80px]" />
                    <NexusSkeleton className="h-10 w-[80px]" />
                </div>
             </div>
             <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                    <NexusSkeleton key={i} className="h-12 w-full" />
                ))}
             </div>
        </div>
    )
  };
