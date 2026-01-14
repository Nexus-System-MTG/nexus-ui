import type { Meta, StoryObj } from '@storybook/react';
import { z } from 'zod';
import { NexusForm } from './NexusForm';
import { NexusInput } from '../Input/NexusInput';

const meta: Meta<typeof NexusForm> = {
  title: 'Forms/NexusForm',
  component: NexusForm,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NexusForm>;

const userSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
});

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

export const WithValidation: Story = {
    render: () => (
        <NexusForm 
          schema={userSchema}
          onSubmit={async (data) => {
              await new Promise(resolve => setTimeout(resolve, 1000))
              alert(`Dados válidos: ${JSON.stringify(data, null, 2)}`)
          }}
          className="max-w-md border p-6 rounded-lg"
        >
          {({ register, formState: { errors } }) => (
            <>
              <NexusInput 
                label="Nome" 
                placeholder="Seu nome" 
                {...register("name")}
                error={errors.name?.message as string}
              />
              <NexusInput 
                label="Email" 
                placeholder="seu@email.com" 
                {...register("email")}
                error={errors.email?.message as string}
              />
            </>
          )}
        </NexusForm>
    )
  };
