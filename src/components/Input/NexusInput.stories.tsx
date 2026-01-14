import type { Meta, StoryObj } from '@storybook/react';
import { NexusInput } from './NexusInput';
import { userEvent, within, expect } from '@storybook/test';

const meta = {
  title: 'Components/Input',
  component: NexusInput,
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
    mask: {
        control: 'select',
        options: [undefined, 'cpf', 'cnpj', 'cep', 'phone', 'currency', 'date'],
        description: 'Input mask type'
    },
    leftIcon: { control: 'text' },
    rightIcon: { control: 'text' },
    label: { control: 'text' },
    error: { control: 'text' },
  }
} satisfies Meta<typeof NexusInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Digite algo...',
    label: 'Nome Completo',
  },
};

export const WithIcons: Story = {
  args: {
    placeholder: 'buscar...',
    leftIcon: 'search',
    label: 'Pesquisa',
  },
};

export const MaskedCPF: Story = {
  args: {
    mask: 'cpf',
    placeholder: '000.000.000-00',
    label: 'CPF',
    leftIcon: 'badge'
  },
};

export const MaskedCurrency: Story = {
  args: {
    mask: 'currency',
    placeholder: 'R$ 0,00',
    label: 'Valor',
    leftIcon: 'attach_money'
  },
};

export const Password: Story = {
  args: {
    isPassword: true,
    label: 'Senha',
    placeholder: '******',
    leftIcon: 'lock'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('Senha');
    const toggleBtn = canvas.getByRole('button');

    await expect(input).toHaveAttribute('type', 'password');
    
    await userEvent.click(toggleBtn);
    await expect(input).toHaveAttribute('type', 'text');

    await userEvent.click(toggleBtn);
    await expect(input).toHaveAttribute('type', 'password');
  }
};

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'email@exemplo.com',
    error: 'Email inválido',
    leftIcon: 'mail'
  },
};
