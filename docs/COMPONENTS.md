# Componentes Gerais - Nexus UI

Documentação dos componentes fundamentais da biblioteca Nexus UI.

## Índice

- [Button](#button)
- [Input](#input)
- [Select](#select)
- [DatePicker](#datepicker)
- [Dialog](#dialog)
- [Checkbox](#checkbox)

---

## Button

Botão interativo com múltiplas variantes e tamanhos.

### Importação

```tsx
import { Button } from 'nexus-ui';
```

### Exemplo

```tsx
<Button variant="primary" onClick={() => alert('Clicked!')}>
  Clique aqui
</Button>
```

### Propriedades

| Propriedade | Tipo | Padrão | Descrição |
|Data | --- | --- | --- |
| `variant` | `'primary' \| 'secondary' \| 'destructive' \| 'outline' \| 'ghost' \| 'link'` | `'primary'` | Estilo visual do botão. |
| `size` | `'sm' \| 'md' \| 'lg' \| 'icon'` | `'md'` | Tamanho do botão. |
| `isLoading` | `boolean` | `false` | Mostra um spinner de carregamento. |
| `leftIcon` | `ReactNode` | `undefined` | Ícone à esquerda do texto. |
| `rightIcon` | `ReactNode` | `undefined` | Ícone à direita do texto. |

---

## Input

Campo de entrada de texto com suporte a máscaras e ícones.

### Importação

```tsx
import { NexusInput } from 'nexus-ui';
```

### Exemplo

```tsx
<NexusInput 
  label="Nome Completo" 
  placeholder="Digite seu nome" 
  leftIcon="person" 
/>

<NexusInput 
  label="CPF" 
  mask="cpf" 
  placeholder="000.000.000-00" 
/>
```

### Propriedades

| Propriedade | Tipo | Descrição |
| --- | --- | --- |
| `label` | `string` | Rótulo flutuante associado ao input (acessível). |
| `mask` | `'cpf' \| 'currency' \| 'phone'` | Máscara de formatação automática. |
| `leftIcon` | `string` | Nome do ícone Material Symbols (ex: 'search'). |
| `rightIcon` | `string` | Nome do ícone Material Symbols. |
| `error` | `string` | Mensagem de erro para validação. |
| `isPassword` | `boolean` | Se verdadeiro, adiciona alternância de visibilidade de senha. |

---

## Select

Componente de seleção robusto com busca e acessibilidade.

### Importação

```tsx
import { NexusSelect } from 'nexus-ui';
```

### Exemplo

```tsx
const options = [
  { label: 'Opção 1', value: '1' },
  { label: 'Opção 2', value: '2' },
];

<NexusSelect 
  options={options} 
  value="1" 
  onChange={(val) => console.log(val)} 
  label="Selecione uma opção"
/>
```

### Propriedades

| Propriedade | Tipo | Descrição |
| --- | --- | --- |
| `options` | `{ label: string, value: string }[]` | Lista de opções. |
| `value` | `string` | Valor selecionado. |
| `onChange` | `(value: string) => void` | Callback de mudança. |
| `label` | `string` | Rótulo do campo. |
| `placeholder` | `string` | Texto de ajuda. |
| `searchable` | `boolean` | Habilita busca nas opções (padrão true). |

---

## DatePicker

Seletor de data moderno com suporte a layouts customizados.

### Importação

```tsx
import { NexusDatePicker } from 'nexus-ui';
```

### Exemplo

```tsx
const [date, setDate] = React.useState<Date>();

<NexusDatePicker 
  date={date} 
  setDate={setDate} 
  label="Data de Nascimento"
/>
```

### Propriedades

| Propriedade | Tipo | Descrição |
| --- | --- | --- |
| `date` | `Date` | Data selecionada. |
| `setDate` | `(date: Date) => void` | Função para atualizar a data. |
| `label` | `string` | Rótulo do campo. |

---

## Dialog

Modal para diálogos e alertas.

### Importação

```tsx
import { 
  NexusDialog, 
  NexusDialogContent, 
  NexusDialogHeader, 
  NexusDialogTitle, 
  NexusDialogFooter 
} from 'nexus-ui';
```

### Exemplo

```tsx
<NexusDialog>
  <NexusDialogTrigger asChild>
    <Button>Abrir Modal</Button>
  </NexusDialogTrigger>
  <NexusDialogContent>
    <NexusDialogHeader>
      <NexusDialogTitle>Título do Modal</NexusDialogTitle>
    </NexusDialogHeader>
    <p>Conteúdo do modal...</p>
    <NexusDialogFooter>
      <Button variant="ghost">Cancelar</Button>
      <Button>Confirmar</Button>
    </NexusDialogFooter>
  </NexusDialogContent>
</NexusDialog>
```

---

## Checkbox

Caixa de seleção estilizada.

### Importação

```tsx
import { NexusCheckbox } from 'nexus-ui';
```

### Exemplo

```tsx
<div className="flex items-center gap-2">
  <NexusCheckbox id="terms" />
  <label htmlFor="terms">Aceito os termos</label>
</div>
```
