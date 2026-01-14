import type { Meta, StoryObj } from '@storybook/react';
import { NexusForm } from './NexusForm';
import { NexusInput } from '../Input/NexusInput';

const meta: Meta<typeof NexusForm> = {
  title: 'Forms/NexusForm',
  component: NexusForm,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NexusForm>;

export const Default: Story = {
  render: () => (
      <NexusForm 
        onSubmit={async () => {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000))
            alert("Salvo com sucesso!")
        }}
        submitLabel="Criar Conta"
        className="max-w-md border p-6 rounded-lg shadow-sm"
      >
          <NexusInput label="Nome" placeholder="Seu nome" required />
          <NexusInput label="Email" type="email" placeholder="seu@email.com" required />
      </NexusForm>
  )
};

export const WithError: Story = {
    render: () => (
        <NexusForm 
          onSubmit={async () => {
              await new Promise(resolve => setTimeout(resolve, 1000))
              throw new Error("Email já está em uso!")
          }}
          className="max-w-md border p-6 rounded-lg"
        >
            <NexusInput label="Email" defaultValue="erro@teste.com" />
        </NexusForm>
    )
  };
