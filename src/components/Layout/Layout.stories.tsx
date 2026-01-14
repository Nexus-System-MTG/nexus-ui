import type { Meta, StoryObj } from '@storybook/react';
import { NexusBox } from './NexusBox';
import { NexusContainer } from './NexusContainer';
import { NexusGrid } from './NexusGrid';

const meta = {
  title: 'Layout/Foundation',
  component: NexusBox, // Defaulting to Box for metadata
  tags: ['autodocs'],
} satisfies Meta<typeof NexusBox>;

export default meta;

export const BoxExample: StoryObj<typeof NexusBox> = {
  render: () => (
    <NexusBox className="p-4 bg-primary text-primary-foreground rounded-lg shadow-md">
      This is a NexusBox component. It acts as a wrapper div where you can easily apply Tailwind classes.
    </NexusBox>
  )
};

export const ContainerExample: StoryObj<typeof NexusContainer> = {
  render: () => (
    <div className="space-y-4 bg-muted/20 py-8">
        <NexusContainer maxWidth="sm" className="bg-background p-4 border rounded">
            Container (maxWidth="sm")
        </NexusContainer>
        <NexusContainer maxWidth="md" className="bg-background p-4 border rounded">
            Container (maxWidth="md")
        </NexusContainer>
        <NexusContainer maxWidth="lg" className="bg-background p-4 border rounded">
            Container (maxWidth="lg")
        </NexusContainer>
    </div>
  )
};

export const GridSystem: StoryObj<typeof NexusGrid> = {
    render: () => (
      <div className="w-full">
         <h3 className="mb-2 font-semibold">Basic Grid (12 cols)</h3>
         <NexusGrid container spacing={4} className="mb-8">
            <NexusGrid xs={12} md={8} className="bg-blue-100 p-4 rounded text-blue-900 border border-blue-200">
                xs=12 md=8
            </NexusGrid>
            <NexusGrid xs={12} md={4} className="bg-blue-100 p-4 rounded text-blue-900 border border-blue-200">
                xs=12 md=4
            </NexusGrid>
            
            <NexusGrid xs={12} md={4} className="bg-green-100 p-4 rounded text-green-900 border border-green-200">
                xs=12 md=4
            </NexusGrid>
            <NexusGrid xs={12} md={4} className="bg-green-100 p-4 rounded text-green-900 border border-green-200">
                xs=12 md=4
            </NexusGrid>
            <NexusGrid xs={12} md={4} className="bg-green-100 p-4 rounded text-green-900 border border-green-200">
                xs=12 md=4
            </NexusGrid>
         </NexusGrid>

         <h3 className="mb-2 font-semibold">Responsive Stacking</h3>
         <NexusGrid container spacing={2}>
            {Array.from({ length: 6 }).map((_, i) => (
                <NexusGrid key={i} xs={12} sm={6} md={4} lg={2} className="bg-muted p-4 rounded text-center border">
                    Item {i + 1}
                </NexusGrid>
            ))}
         </NexusGrid>
      </div>
    )
  };
