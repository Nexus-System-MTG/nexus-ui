import type { Meta, StoryObj } from '@storybook/react';
import {
  NexusDialog,
  NexusDialogContent,
  NexusDialogDescription,
  NexusDialogHeader,
  NexusDialogTitle,
  NexusDialogTrigger,
  NexusDialogFooter,
  NexusDialogClose,
  NexusDialogBody
} from './NexusDialog';
import { Button } from '../Button/Button';
import { NexusInput } from '../Input/NexusInput';

const meta = {
  title: 'Feedback/NexusDialog',
  component: NexusDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NexusDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <NexusDialog>
      <NexusDialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </NexusDialogTrigger>
      <NexusDialogContent>
        <NexusDialogHeader>
          <NexusDialogTitle>Edit Profile</NexusDialogTitle>
          <NexusDialogDescription>
            Make changes to your profile here. Click save when you're done.
          </NexusDialogDescription>
        </NexusDialogHeader>
        <NexusDialogBody>
            <div className="grid gap-4">
            <NexusInput label="Name" defaultValue="Pedro Duarte" />
            <NexusInput label="Username" defaultValue="@peduarte" />
            </div>
        </NexusDialogBody>
        <NexusDialogFooter>
          <NexusDialogClose asChild>
              <Button variant="ghost">Cancel</Button>
          </NexusDialogClose>
          <Button type="submit">Save changes</Button>
        </NexusDialogFooter>
      </NexusDialogContent>
    </NexusDialog>
  ),
};

export const DestructiveAction: Story = {
    render: () => (
      <NexusDialog>
        <NexusDialogTrigger asChild>
          <Button variant="destructive">Delete Account</Button>
        </NexusDialogTrigger>
        <NexusDialogContent>
          <NexusDialogHeader>
            <NexusDialogTitle>Are you absolutely sure?</NexusDialogTitle>
            <NexusDialogDescription>
              This action cannot be undone. This will permanently delete your account and remove your data from our servers.
            </NexusDialogDescription>
          </NexusDialogHeader>
          <NexusDialogFooter>
            <NexusDialogClose asChild>
                <Button variant="outline">Cancel</Button>
            </NexusDialogClose>
            <Button variant="destructive">Delete Account</Button>
          </NexusDialogFooter>
        </NexusDialogContent>
      </NexusDialog>
    ),
  };
