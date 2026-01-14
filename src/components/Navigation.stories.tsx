import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { NexusBottomNavigation, NexusBottomNavigationAction } from './BottomNavigation/NexusBottomNavigation';
import {
    NexusBreadcrumb,
    NexusBreadcrumbItem,
    NexusBreadcrumbLink,
    NexusBreadcrumbList,
    NexusBreadcrumbPage,
    NexusBreadcrumbSeparator,
} from './Breadcrumb/NexusBreadcrumb';
import {
    NexusDrawer,
    NexusDrawerContent,
    NexusDrawerDescription,
    NexusDrawerHeader,
    NexusDrawerTitle,
    NexusDrawerTrigger,
    NexusDrawerFooter,
    NexusDrawerClose
} from './Drawer/NexusDrawer';
import { Button } from './Button/Button';
import { NexusInput } from './Input/NexusInput';

const meta = {
  title: 'Navigation/Structure',
  tags: ['autodocs'],
} satisfies Meta<typeof NexusBottomNavigation>;

export default meta;

/* --- Bottom Navigation --- */
export const BottomNavExample = () => {
    const [value, setValue] = useState('recents');
    
    return (
        <div className="relative h-[200px] w-full bg-muted/20 border flex flex-col justify-end overflow-hidden">
             <div className="p-4 text-center w-full">Current Tab: {value}</div>
            <NexusBottomNavigation 
                value={value} 
                onChange={(_event: React.SyntheticEvent, v: any) => setValue(v)} 
                showLabels
                className="absolute"
            >
                <NexusBottomNavigationAction label="Recents" value="recents" icon="schedule" />
                <NexusBottomNavigationAction label="Favorites" value="favorites" icon="favorite" />
                <NexusBottomNavigationAction label="Nearby" value="nearby" icon="location_on" />
            </NexusBottomNavigation>
        </div>
    );
};

/* --- Breadcrumbs --- */
export const BreadcrumbExample: StoryObj<typeof NexusBreadcrumb> = {
    render: () => (
      <NexusBreadcrumb>
        <NexusBreadcrumbList>
          <NexusBreadcrumbItem>
            <NexusBreadcrumbLink href="/">Home</NexusBreadcrumbLink>
          </NexusBreadcrumbItem>
          <NexusBreadcrumbSeparator />
          <NexusBreadcrumbItem>
            <NexusBreadcrumbLink href="/components">Components</NexusBreadcrumbLink>
          </NexusBreadcrumbItem>
          <NexusBreadcrumbSeparator />
          <NexusBreadcrumbItem>
            <NexusBreadcrumbPage>Breadcrumb</NexusBreadcrumbPage>
          </NexusBreadcrumbItem>
        </NexusBreadcrumbList>
      </NexusBreadcrumb>
    )
};

/* --- Drawer (Sheet) --- */
export const DrawerExample: StoryObj<typeof NexusDrawer> = {
    render: () => (
      <NexusDrawer>
        <NexusDrawerTrigger asChild>
          <Button variant="outline">Open Drawer (Right)</Button>
        </NexusDrawerTrigger>
        <NexusDrawerContent side="right">
          <NexusDrawerHeader>
            <NexusDrawerTitle>Edit Profile</NexusDrawerTitle>
            <NexusDrawerDescription>
              Make changes to your profile here. Click save when you're done.
            </NexusDrawerDescription>
          </NexusDrawerHeader>
          <div className="grid gap-4 py-4">
             <NexusInput label="Name" defaultValue="Pedro Duarte" />
             <NexusInput label="Username" defaultValue="@peduarte" />
          </div>
          <NexusDrawerFooter>
            <NexusDrawerClose asChild>
                <Button variant="ghost">Cancel</Button>
            </NexusDrawerClose>
            <Button type="submit">Save changes</Button>
          </NexusDrawerFooter>
        </NexusDrawerContent>
      </NexusDrawer>
    )
};
