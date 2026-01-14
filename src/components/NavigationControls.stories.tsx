import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button/Button';
import {
  NexusMenu,
  NexusMenuContent,
  NexusMenuItem,
  NexusMenuLabel,
  NexusMenuSeparator,
  NexusMenuTrigger,
  NexusMenuShortcut,
  NexusMenuGroup
} from './Menu/NexusMenu';
import {
  NexusPagination,
  NexusPaginationContent,
  NexusPaginationEllipsis,
  NexusPaginationItem,
  NexusPaginationLink,
  NexusPaginationNext,
  NexusPaginationPrevious,
} from './Pagination/NexusPagination';
import {
  NexusTabs,
  NexusTabsContent,
  NexusTabsList,
  NexusTabsTrigger,
} from './Tabs/NexusTabs';

const meta = {
  title: 'Navigation/Controls',
  tags: ['autodocs'],
} satisfies Meta<typeof NexusMenu>;

export default meta;

/* --- Menu (Dropdown) --- */
export const MenuExample: StoryObj<typeof NexusMenu> = {
  render: () => (
    <NexusMenu>
      <NexusMenuTrigger asChild>
        <Button variant="outline">Open Menu</Button>
      </NexusMenuTrigger>
      <NexusMenuContent className="w-56">
        <NexusMenuLabel>My Account</NexusMenuLabel>
        <NexusMenuSeparator />
        <NexusMenuGroup>
          <NexusMenuItem>
            Profile
            <NexusMenuShortcut>⇧⌘P</NexusMenuShortcut>
          </NexusMenuItem>
          <NexusMenuItem>
            Billing
            <NexusMenuShortcut>⌘B</NexusMenuShortcut>
          </NexusMenuItem>
          <NexusMenuItem>
            Settings
            <NexusMenuShortcut>⌘S</NexusMenuShortcut>
          </NexusMenuItem>
        </NexusMenuGroup>
        <NexusMenuSeparator />
        <NexusMenuItem>Log out</NexusMenuItem>
      </NexusMenuContent>
    </NexusMenu>
  )
};

/* --- Pagination --- */
export const PaginationExample: StoryObj<typeof NexusPagination> = {
    render: () => (
      <NexusPagination>
        <NexusPaginationContent>
          <NexusPaginationItem>
            <NexusPaginationPrevious href="#" />
          </NexusPaginationItem>
          <NexusPaginationItem>
            <NexusPaginationLink href="#">1</NexusPaginationLink>
          </NexusPaginationItem>
          <NexusPaginationItem>
            <NexusPaginationLink href="#" isActive>
              2
            </NexusPaginationLink>
          </NexusPaginationItem>
          <NexusPaginationItem>
            <NexusPaginationLink href="#">3</NexusPaginationLink>
          </NexusPaginationItem>
          <NexusPaginationItem>
            <NexusPaginationEllipsis />
          </NexusPaginationItem>
          <NexusPaginationItem>
            <NexusPaginationNext href="#" />
          </NexusPaginationItem>
        </NexusPaginationContent>
      </NexusPagination>
    )
};

/* --- Tabs --- */
export const TabsExample: StoryObj<typeof NexusTabs> = {
    render: () => (
      <NexusTabs defaultValue="account" className="w-[400px]">
        <NexusTabsList className="grid w-full grid-cols-2">
          <NexusTabsTrigger value="account">Account</NexusTabsTrigger>
          <NexusTabsTrigger value="password">Password</NexusTabsTrigger>
        </NexusTabsList>
        <NexusTabsContent value="account">
            <div className="p-4 border rounded rounded-t-none bg-card">
                <h3 className="text-lg font-medium">Account</h3>
                <p className="text-sm text-muted-foreground">Make changes to your account here.</p>
            </div>
        </NexusTabsContent>
        <NexusTabsContent value="password">
            <div className="p-4 border rounded rounded-t-none bg-card">
                <h3 className="text-lg font-medium">Password</h3>
                <p className="text-sm text-muted-foreground">Change your password here.</p>
            </div>
        </NexusTabsContent>
      </NexusTabs>
    )
};
