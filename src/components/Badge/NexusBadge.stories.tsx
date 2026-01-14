import type { Meta, StoryObj } from '@storybook/react';
import { NexusBadge } from './NexusBadge';
import { Button } from '../Button/Button';

const meta = {
  title: 'Components/Badge',
  component: NexusBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NexusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
      children: <span className="material-symbols-outlined text-4xl p-2 bg-slate-800 rounded text-white">mail</span>,
      content: 4,
  }
};

export const Dot: Story = {
    args: {
        children: <span className="material-symbols-outlined text-4xl p-2 bg-slate-800 rounded text-white">notifications</span>,
        variant: 'destructive',
        size: 'dot'
    }
}

export const MaxValue: Story = {
    args: {
        children: <span className="material-symbols-outlined text-4xl p-2 bg-slate-800 rounded text-white">mail</span>,
        content: 150,
        max: 99
    }
}

export const OnButton: Story = {
    render: () => (
        <div className="flex gap-8">
            <NexusBadge content={12} variant="default">
                <Button variant="glass">Inbox</Button>
            </NexusBadge>
            <NexusBadge content="!" variant="destructive">
                <Button variant="outline" iconOnly><span className="material-symbols-outlined">warning</span></Button>
            </NexusBadge>
        </div>
    )
}
