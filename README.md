# Nexus UI 🚀

Uma biblioteca de componentes React moderna, bonita e altamente customizável, construída com Tailwind CSS e Radix UI. Focada em acessibilidade, semântica e uma experiência de desenvolvimento premium.

## 📦 Instalação

```bash
npm install nexus-ui
# ou
yarn add nexus-ui
# ou
pnpm add nexus-ui
```

Certifique-se de ter as dependências de pares instaladas:

```bash
npm install react react-dom styled-components
```

## 🎨 Temas e Customização

O Nexus UI possui um sistema de temas robusto inspirado no design da Apple e Google. Para começar, envolva sua aplicação com o `NexusThemeProvider`:

```tsx
import { NexusThemeProvider, NexusThemeToggle } from 'nexus-ui';
import 'nexus-ui/dist/style.css'; // Importe os estilos globais

function App() {
  return (
    <NexusThemeProvider defaultTheme="system" storageKey="nexus-ui-theme">
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <header className="p-4 flex justify-between items-center bg-card shadow-sm">
          <h1>Meu App</h1>
          <NexusThemeToggle />
        </header>
        <main className="p-8">
            {/* Seus componentes aqui */}
        </main>
      </div>
    </NexusThemeProvider>
  );
}
```

### Variáveis CSS

Você pode customizar as cores sobrescrevendo as variáveis CSS no seu arquivo global:

```css
:root {
  --primary: 210 100% 50%;
  --primary-foreground: 0 0% 100%;
  /* ... outras variáveis */
}
```

## 🧩 Componentes

A biblioteca oferece uma vasta gama de componentes. Abaixo estão os links para a documentação detalhada:

- **[Tabela Avançada (NexusTable)](./docs/TABLE.md)**: Documentação completa sobre o componente de tabela, incluindo filtros, ordenação, visualização em cards e ações em massa.
- **[Componentes Gerais](./docs/COMPONENTS.md)**: Botões, Inputs, Selects, DatePicker, Modais e mais.

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor, leia nosso guia de contribuição.

## 📄 Licença

MIT
