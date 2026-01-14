import type { Meta, StoryObj } from '@storybook/react';
import { NexusTypography } from './NexusTypography';

const meta = {
  title: 'Components/Typography',
  component: NexusTypography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NexusTypography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Headings: Story = {
  render: () => (
      <div className="flex flex-col gap-4">
          <NexusTypography variant="h1">Heading 1</NexusTypography>
          <NexusTypography variant="h2">Heading 2</NexusTypography>
          <NexusTypography variant="h3">Heading 3</NexusTypography>
          <NexusTypography variant="h4">Heading 4</NexusTypography>
          <NexusTypography variant="p">Standard paragraph text for content.</NexusTypography>
          <NexusTypography variant="muted">Muted text</NexusTypography>
      </div>
  )
};
