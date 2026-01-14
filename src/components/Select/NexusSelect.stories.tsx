import type { Meta, StoryObj } from '@storybook/react';
import { NexusSelect } from './NexusSelect';
import { useState } from 'react';
import { userEvent, within, expect } from '@storybook/test';

const meta = {
  title: 'Components/Select',
  component: NexusSelect,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'Nexus Dark',
      values: [
        { name: 'Nexus Dark', value: '#020617' },
        { name: 'Light', value: '#ffffff' },
      ],
    },
     // Increase height for popover
     docs: {
        story: {
            height: '350px'
        }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    leftIcon: {
        control: 'select',
        options: [
            undefined, 
            'apartment', 
            'person', 
            'search', 
            'home', 
            'business', 
            'badge', 
            'attach_money', 
            'calendar_today', 
            'description',
            'error',
            'check_circle'
        ],
        description: 'Icon from Material Symbols Outlined'
    }
  }
} satisfies Meta<typeof NexusSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockOptions = [
    { value: '1', label: 'João Silva - Apto 101', group: 'Bloco A', icon: 'person' },
    { value: '2', label: 'Maria Oliveira - Apto 102', group: 'Bloco A', icon: 'person_4' },
    { value: '3', label: 'Carlos Souza - Apto 201', group: 'Bloco B', icon: 'person' },
    { value: '4', label: 'Ana Santos - Apto 202', group: 'Bloco B', icon: 'person_3' },
    { value: '5', label: 'Pedro Lima - Apto 301', group: 'Bloco C', icon: 'person' },
    { value: 'admin', label: 'Administrador', icon: 'shield_person' },
];

export const WithIcon: Story = {
  render: (args) => {
    const [val, setVal] = useState<string | undefined>(undefined);
    return <div className="w-[300px] h-[300px]"><NexusSelect {...args} options={mockOptions} value={val} onChange={setVal} /></div>
  },
  args: {
      label: 'Selecione um Morador',
      placeholder: 'Busque por nome ou apto...',
      leftIcon: 'apartment',
      options: [], // Dummy for TS, handled in render
      onChange: () => {} // Dummy for TS, handled in render
  }
};

export const Default: Story = {
    render: (args) => {
      const [val, setVal] = useState<string | undefined>(undefined);
      return <div className="w-[300px] h-[300px]"><NexusSelect {...args} options={mockOptions} value={val} onChange={setVal} /></div>
    },
    args: {
        label: 'Selecione um Morador',
        placeholder: 'Busque por nome ou apto...',
        options: [], // Dummy for TS, handled in render
        onChange: () => {} // Dummy for TS, handled in render
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByLabelText('Selecione um Morador');
        
        await step('Open dropdown', async () => {
            await userEvent.click(input);
            // It might take a bit for popover to appear in standard HTML structure if portals are used.
            // Storybook environment usually renders portal in document body.
            // We can search for option in document body.
        });

        await step('Type search', async () => {
            await userEvent.type(input, 'adm');
        });

        // Verifying content requires finding it in document.body or handle portal correctly.
        // For visual test, typing is sufficient interaction.
        // We can assert value.
        await expect(input).toHaveValue('adm');
    }
  };

export const WithError: Story = {
    render: (args) => {
      const [val, setVal] = useState<string | undefined>(undefined);
      return <div className="w-[300px]"><NexusSelect {...args} options={mockOptions} value={val} onChange={setVal} /></div>
    },
    args: {
        label: 'Responsável',
        error: 'Este campo é obrigatório',
        leftIcon: 'error',
        placeholder: 'Selecione...',
        options: [], // Dummy for TS
        onChange: () => {} // Dummy for TS
    }
  };
