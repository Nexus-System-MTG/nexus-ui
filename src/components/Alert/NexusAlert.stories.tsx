import type { Meta, StoryObj } from '@storybook/react';
import { NexusAlert } from './NexusAlert';

const meta = {
  title: 'Feedback/NexusAlert',
  component: NexusAlert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
        control: 'select',
        options: ['success', 'info', 'warning', 'error'],
    },
  },
} satisfies Meta<typeof NexusAlert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Did you know?',
    children: 'You can customize the layout of the sidebar easily via the settings menu.',
  },
  render: (args) => <div className="w-[500px]"><NexusAlert {...args} /></div>
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Payment Successful',
    children: 'Your transaction has been processed successfully.',
  },
  render: (args) => <div className="w-[500px]"><NexusAlert {...args} /></div>
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Storage Full',
    children: 'You are running out of storage space. Please upgrade your plan.',
  },
  render: (args) => <div className="w-[500px]"><NexusAlert {...args} /></div>
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Connection Failed',
    children: 'Could not connect to the server. Please check your internet connection and try again.',
  },
  render: (args) => <div className="w-[500px]"><NexusAlert {...args} /></div>
};

export const WithCloseAction: Story = {
  args: {
    variant: 'info',
    title: 'Closable Alert',
    children: 'Click the X icon on the right to close this alert.',
    onClose: () => alert('Closed!'),
  },
  render: (args) => <div className="w-[500px]"><NexusAlert {...args} /></div>
};
