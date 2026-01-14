import type { Meta, StoryObj } from '@storybook/react';
import { NexusSidebar } from './NexusSidebar';

const meta: Meta<typeof NexusSidebar> = {
  title: 'Layout/NexusSidebar',
  component: NexusSidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NexusSidebar>;

const logo = (
    <div className="flex items-center gap-2 font-bold text-xl text-white">
        <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-lg">grid_view</span>
        </div>
        <span>Nexus UI</span>
    </div>
);

const defaultSections = [
    {
        id: 'access',
        title: 'Acessos',
        items: [
            { id: 'groups', label: 'Grupos de Acesso', icon: 'group' },
            { id: 'users', label: 'Usuários', icon: 'person_outline', isActive: true },
        ]
    },
    {
        id: 'management',
        title: 'Gestão',
        items: [
            { id: 'stores', label: 'Lojas', icon: 'storefront' },
            { id: 'clients', label: 'Clientes', icon: 'groups' },
        ]
    },
    {
        id: 'fidelity',
        title: 'Fidelidade',
        collapsible: true, // Test Accordion
        items: [
            { id: 'rewards', label: 'Itens de Recompensa', icon: 'stars' },
            { id: 'points', label: 'Histórico de Pontos', icon: 'history' },
        ]
    },
    {
        id: 'system',
        title: 'Sistema',
        items: [
            { id: 'settings', label: 'Configurações', icon: 'settings' },
        ]
    }
];

const logoCollapsed = (
    <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
        <span className="material-symbols-outlined text-white text-lg">grid_view</span>
    </div>
);

export const Default: Story = {
  args: {
    logo: logo,
    logoCollapsed: logoCollapsed,
    sections: defaultSections,
    activeItem: 'users'
  },
  render: (args) => (
      <div className="flex bg-background min-h-screen">
          <NexusSidebar {...args} />
          <div className="flex-1 p-8">
              <h1 className="text-3xl font-bold mb-4">Conteúdo Principal</h1>
              <p className="text-muted-foreground">O conteúdo da aplicação vai aqui.</p>
          </div>
      </div>
  )
};

export const Collapsed: Story = {
    args: {
      logo: logo,
      logoCollapsed: logoCollapsed,
      sections: defaultSections,
      collapsed: true,
      activeItem: 'users'
    },
    render: (args) => (
        <div className="flex bg-background min-h-screen">
            <NexusSidebar {...args} />
            <div className="flex-1 p-8">
                <h1 className="text-3xl font-bold mb-4">Sidebar Colapsada</h1>
            </div>
        </div>
    )
  };
