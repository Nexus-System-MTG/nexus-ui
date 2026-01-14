import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'Nexus Dark',
      values: [
        { name: 'Nexus Dark', value: '#020617' },
        { name: 'Light', value: '#ffffff' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: { 
      control: 'select', 
      options: ['primary', 'glass', 'outline', 'ghost'],
      description: 'Visual style of the button'
    },
    size: { 
      control: 'select', 
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button'
    },
    leftIcon: { 
      control: 'text',
      description: 'Material Symbol name for left icon'
    },
    rightIcon: { 
      control: 'text',
      description: 'Material Symbol name for right icon'
    },
    isLoading: { 
      control: 'boolean',
      description: 'Loading state'
    },
    iconOnly: { 
      control: 'boolean',
      description: 'Displays as a perfect circle'
    },
    children: {
      control: 'text',
      description: 'Button content'
    },
    asChild: { table: { disable: true } },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Glass: Story = {
  args: {
    variant: 'glass',
    children: 'Glass Button',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
};


export const WithIcons: Story = {
  args: {
    variant: 'primary',
    leftIcon: 'add',
    rightIcon: 'arrow_forward',
    children: 'Add Item',
  },
};

export const Loading: Story = {
  args: {
    variant: 'primary',
    isLoading: true,
    children: 'Click me',
  },
};

export const IconOnly: Story = {
  args: {
    variant: 'glass',
    iconOnly: true,
    children: <span className="material-symbols-outlined">settings</span>,
  },
  argTypes: {
    children: { control: false }
  }
};
