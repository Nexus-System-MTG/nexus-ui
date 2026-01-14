import type { Meta, StoryObj } from '@storybook/react';
import {
  NexusCard,
  NexusCardContent,
  NexusCardDescription,
  NexusCardFooter,
  NexusCardHeader,
  NexusCardTitle,
} from './Card/NexusCard';
import { NexusPaper } from './Paper/NexusPaper';
import { NexusAppBar } from './AppBar/NexusAppBar';
import { Button } from './Button/Button';
import { NexusInput } from './Input/NexusInput';

const meta = {
  title: 'Surfaces/Components',
  tags: ['autodocs'],
} satisfies Meta<typeof NexusCard>;

export default meta;

/* --- Nexus Card Stories --- */
export const CardExample: StoryObj<typeof NexusCard> = {
  render: () => (
    <NexusCard className="w-[350px]">
      <NexusCardHeader>
        <NexusCardTitle>Create project</NexusCardTitle>
        <NexusCardDescription>Deploy your new project in one-click.</NexusCardDescription>
      </NexusCardHeader>
      <NexusCardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <NexusInput label="Name" placeholder="Name of your project" />
            <NexusInput label="Framework" placeholder="Select..." />
          </div>
        </form>
      </NexusCardContent>
      <NexusCardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </NexusCardFooter>
    </NexusCard>
  )
};

/* --- Nexus Paper Stories --- */
export const PaperExample: StoryObj<typeof NexusPaper> = {
    render: () => (
      <div className="p-8 bg-muted/20 flex flex-wrap gap-8 items-center justify-center">
         <NexusPaper elevation={1} className="p-8 w-32 h-32 flex items-center justify-center">Elevation 1</NexusPaper>
         <NexusPaper elevation={3} className="p-8 w-32 h-32 flex items-center justify-center">Elevation 3</NexusPaper>
         <NexusPaper elevation={5} className="p-8 w-32 h-32 flex items-center justify-center">Elevation 5</NexusPaper>
         <NexusPaper square elevation={3} className="p-8 w-32 h-32 flex items-center justify-center">Square</NexusPaper>
      </div>
    )
};

/* --- Nexus App Bar Stories --- */
export const AppBarExample: StoryObj<typeof NexusAppBar> = {
    render: () => (
       <div className="relative h-[200px] w-full bg-muted/10 border overflow-hidden">
            <NexusAppBar position="absolute" color="primary" className="p-4 flex-row items-center justify-between">
                <div className="font-bold text-lg">Nexus UI</div>
                <div className="flex gap-4 text-sm font-medium">
                    <a href="#" className="opacity-90 hover:opacity-100">Dashboard</a>
                    <a href="#" className="opacity-90 hover:opacity-100">Settings</a>
                    <a href="#" className="opacity-90 hover:opacity-100">Profile</a>
                </div>
            </NexusAppBar>
            <div className="pt-20 px-8">
                <h1 className="text-2xl font-bold">Page Content</h1>
                <p className="text-muted-foreground">The App Bar sits at the top.</p>
            </div>
       </div>
    )
};

export const AppBarWithMobileMenu: StoryObj<typeof NexusAppBar> = {
    render: () => (
       <div className="relative h-[400px] w-full bg-muted/10 border overflow-hidden">
            <NexusAppBar 
                position="absolute" 
                color="primary" 
                mobileMenuContent={
                    <div className="py-4 space-y-4">
                        <div className="font-bold text-lg px-4 mb-4 border-b pb-4">Nexus UI</div>
                        <nav className="flex flex-col space-y-1 px-2">
                             <a href="#" className="block px-3 py-2 rounded-md hover:bg-muted text-foreground font-medium">Dashboard</a>
                             <a href="#" className="block px-3 py-2 rounded-md hover:bg-muted text-foreground font-medium">Settings</a>
                             <a href="#" className="block px-3 py-2 rounded-md hover:bg-muted text-foreground font-medium">Profile</a>
                        </nav>
                    </div>
                }
            >
                <div className="flex items-center justify-between w-full">
                    <div className="font-bold text-lg">Nexus UI</div>
                    <div className="hidden md:flex gap-4 text-sm font-medium">
                        <a href="#" className="opacity-90 hover:opacity-100">Dashboard</a>
                        <a href="#" className="opacity-90 hover:opacity-100">Settings</a>
                        <a href="#" className="opacity-90 hover:opacity-100">Profile</a>
                    </div>
                </div>
            </NexusAppBar>
            <div className="pt-20 px-8">
                <h1 className="text-2xl font-bold">Responsive App Bar</h1>
                <p className="text-muted-foreground mt-2">Resize the viewport to see the hamburger menu appear (mobile only).</p>
            </div>
       </div>
    )
};
