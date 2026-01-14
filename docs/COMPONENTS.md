# Componentes Gerais - Nexus UI

Documentação dos componentes fundamentais da biblioteca Nexus UI.

## Índice

- [Button](#button)
- [Input](#input)
- [Select](#select)
- [DatePicker](#datepicker)
- [Dialog](#dialog)
- [Checkbox](#checkbox)
- [Alert](#alert)

---

## Alert

Componente para exibir mensagens de feedback (sucesso, erro, aviso, info) com suporte a auto-fechamento.

### Importação

```tsx
import { NexusAlert } from 'nexus-ui';
```

### Exemplo

```tsx
// Alerta simples (Info)
<NexusAlert onDismiss={() => console.log('closed')}>
  Atualização disponível.
</NexusAlert>

// Alerta de Erro com Auto-Dismiss desativado
<NexusAlert 
   variant="error" 
   title="Erro no Servidor" 
   autoDismiss={false}
   onClose={() => setOpen(false)}
>
   Não foi possível salvar os dados.
</NexusAlert>
```

### Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `variant` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Estilo visual do alerta. |
| `title` | `string` | `undefined` | Título em negrito. |
| `icon` | `string` | `undefined` | Nome do ícone Material Symbols (sobrescreve o padrão). |
| `onClose` | `() => void` | `undefined` | Função chamada ao fechar (manual ou auto). Obrigatória para auto-dismiss. |
| `autoDismiss` | `boolean` | `true` | Se deve fechar automaticamente após o tempo definido. |
| `duration` | `number` | `5000` | Tempo em ms para auto-fechamento. |

---

## Button
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

---

## FileUpload

Área de arrastar e soltar visualmente rica para upload de arquivos. Use em conjunto com `NexusFilePreview`.

### Importação

```tsx
import { NexusFileUpload, NexusFilePreview } from 'nexus-ui';
```

### Exemplo

```tsx
const [files, setFiles] = React.useState<File[]>([]);

<NexusFileUpload 
  onFilesSelected={(newFiles) => setFiles(prev => [...prev, ...newFiles])}
  multiple
  accept={['image/*', 'video/*']}
/>

{/* Lista de Preview */}
<div className="mt-4 gap-2 flex flex-col">
  {files.map((file, i) => (
      <NexusFilePreview 
         key={i} 
         file={file} 
         onRemove={() => handleRemove(i)} 
      />
  ))}
</div>
```

---

## Form

Componente wrapper inteligente para formulários. Ele integra `react-hook-form` e `zod` para validação de esquemas, gerencia estados de loading automaticamente e exibe erros de forma padronizada.

### Importação

```tsx
import { NexusForm } from 'nexus-ui';
import { z } from 'zod';
import { useFormContext } from 'react-hook-form'; // Opcional, para acesso avançado
```

### Exemplo Simples (Sem Validação)

```tsx
<NexusForm 
  onSubmit={async (data) => {
      await api.createUser(data);
  }}
  submitLabel="Salvar"
>
    <NexusInput label="Nome" name="nome" required />
</NexusForm>
```

### Exemplo com Validação Zod

```tsx
const schema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha muito curta"),
});

<NexusForm 
  schema={schema}
  onSubmit={async (data) => {
      // 'data' é tipado corretamente inferido do schema
      await login(data);
  }}
  className="max-w-sm"
>
    {({ register, formState: { errors } }) => (
        <>
            <NexusInput 
                label="Email" 
                {...register("email")} 
                error={errors.email?.message as string} 
            />
            <NexusInput 
                type="password" 
                label="Senha" 
                {...register("password")} 
                error={errors.password?.message as string} 
            />
        </>
    )}
</NexusForm>
```

### Propriedades

| Propriedade | Tipo | Descrição |
| --- | --- | --- |
| `onSubmit` | `SubmitHandler<T>` | Função chamada no sucesso do submit. Recebe os dados validados. |
| `schema` | `ZodSchema<T>` | Schema Zod para validação. |
| `defaultValues` | `DefaultValues<T>` | Valores iniciais do formulário. |
| `children` | `ReactNode \| ((methods) => ReactNode)` | Conteúdo do form. Pode ser uma função para acessar `register` e `errors` facilmente. |
| `loadingLabel` | `string` | Texto do botão enquanto carrega. |
| `submitLabel` | `string` | Texto padrão do botão. |
| `error` | `string` | Erro global forçado. |
| `successMessage` | `string` | Mensagem de sucesso global. |

