# NexusTable 📊

O componente de tabela mais avançado da Nexus UI. Oferece ordenação, filtro, paginação, visualização responsiva (Card View), detalhes expandíveis, ações em massa e muito mais.

## Importação

```tsx
import { NexusTable } from 'nexus-ui';
```

## Uso Básico

```tsx
const data = [
  { id: 1, name: 'Alice', role: 'Admin', status: 'active', amount: 5000 },
  { id: 2, name: 'Bob', role: 'User', status: 'pending', amount: 2300 },
];

const columns = [
  { key: 'name', label: 'Nome', dataType: 'text' },
  { key: 'role', label: 'Cargo', dataType: 'select' },
  { key: 'status', label: 'Status', dataType: 'status' },
  { key: 'amount', label: 'Valor', dataType: 'currency' },
];

function MinhaTabela() {
  return (
    <NexusTable
      title="Usuários"
      data={data}
      columns={columns}
      tableId="users-table"
    />
  );
}
```

## Propriedades (Props)

| Propriedade | Tipo | Obrigatório | Descrição |
| --- | --- | --- | --- |
| `data` | `T[]` | **Sim** | Array de dados a serem exibidos. |
| `columns` | `NexusColumnDef[]` | **Sim** | Definição das colunas. |
| `tableId` | `string` | Não | ID único para persistência de filtros e layout no LocalStorage. |
| `title` | `string` | Não | Título exibido no topo da tabela. |
| `enableCustomization` | `boolean` | Não | Habilita botão para o usuário personalizar colunas e modos de visualização. |
| `loading` | `boolean` | Não | Exibe estado de carregamento. |
| `loadingType` | `'spinner' \| 'bar'` | Não | Tipo de animação de carregamento. |
| `onSave` | `(data, isNew) => Promise<void>` | Não | Handler para salvar edições (habilita modo CRUD). |
| `onDelete` | `(data) => Promise<void>` | Não | Handler para exclusão individual (habilita menu de ações). |
| `onBulkDelete` | `(rows) => Promise<void>` | Não | Habilita botão de exclusão em massa para linhas selecionadas. |
| `onBulkEdit` | `(rows, col, val) => Promise` | Não | Habilita botão de edição em massa. |
| `renderDetail` | `(row) => ReactNode` | Não | Renderiza conteúdo customizado na visualização de detalhes (Sidebar/Modal). |

## Definição de Colunas (`NexusColumnDef`)

Simplificamos a definição de colunas para casos de uso comuns:

```tsx
export interface NexusColumnDef {
    key: string             // Chave do objeto de dados
    label: string           // Título da coluna
    dataType?: 'text' | 'number' | 'select' | 'multiselect' | 'date' | 'currency' | 'status'
    valueColorMap?: Record<string, string> // Mapa de cores para badges (ex: { 'Pago': 'green' })
    form?: {                // Configuração para formulário de edição automática
        required?: boolean
        type?: 'text' | 'number' | 'date' | 'select'
        options?: { label: string, value: any }[]
    }
}
```

## Ações em Massa (Batch Actions) 🚀

O NexusTable suporta nativamente ações em massa quando você fornece os handlers `onBulkDelete` ou `onBulkEdit`.

- **Exclusão em Massa**: Selecione várias linhas e clique em "Excluir".
- **Edição em Massa**: Selecione linhas, escolha "Editar", selecione a coluna (ex: Status) e o novo valor.

```tsx
<NexusTable
  data={data}
  columns={columns}
  onBulkDelete={async (rows) => {
      await api.deleteUsers(rows.map(r => r.id));
      toast.success(`${rows.length} excluídos!`);
  }}
  onBulkEdit={async (rows, columnId, value) => {
      await api.updateUsers(rows.map(r => r.id), { [columnId]: value });
  }}
/>
```

## Visualização de Detalhes

Ao clicar em uma linha, o `NexusTable` abre uma visualização detalhada. Você pode configurar isso para ser um Modal, Sheet (Gaveta lateral) ou Tela Cheia.

```tsx
<NexusTable
  // ...
  defaultDetailViewMode="sheet" // 'modal' | 'sheet' | 'fullscreen'
  renderDetail={(row) => (
    <div className="p-4 bg-gray-50 rounded">
        <h3>Detalhes Extras</h3>
        <p>{row.bio}</p>
        <MyCustomChart userId={row.id} />
    </div>
  )}
/>
```

## Responsividade (Mobile) 📱

Em telas menores (<768px), a tabela se transforma automaticamente em **Card View** para melhor usabilidade.
