# Testes Visuais no Nexus UI (Storybook + Chromatic)

O Nexus UI já está configurado com o addon oficial de testes visuais do Storybook (desenvolvido pela Chromatic). Isso permite que você identifique regressões visuais (pixels alterados, cores erradas, layouts quebrados) automaticamente.

## 1. Configuração Inicial

Para rodar os testes visuais, você precisa de um projeto no [Chromatic](https://www.chromatic.com/).

1.  Crie uma conta/login no Chromatic.
2.  Crie um novo projeto e vincule a este repositório.
3.  Copie o **Project Token** fornecido (formato `chpt_...`).

## 2. Rodando Testes Visuais (Localmente)

Se você quiser enviar seu storybook local para análise visual:

```bash
npx chromatic --project-token=<SEU_TOKEN>
```

Ou se preferir, adicione ao seu `.env` ou exporte no terminal:

```bash
export CHROMATIC_PROJECT_TOKEN=seu_token_aqui
npx chromatic
```

## 3. Integração com CI/CD

O ideal é rodar isso automaticamente no GitHub Actions. O Chromatic detecta mudanças e pede aprovação se houver diferenças visuais.

## 4. Visualizando no Storybook

No painel lateral do Storybook (onde ficam os Addons), você verá uma aba **"Visual Tests"**.
*   Ela permite rodar testes em componentes específicos sob demanda (requer configuração do Cloud).
*   Facilita a aprovação de mudanças direto da UI.

## Troubleshooting

### Erro: "No Project Token"
Se você ver erros sobre token, é porque o Chromatic precisa saber onde publicar os builds. Siga o passo 1.

### Erro: "Build Failed"
Verifique se o comando `npm run build-storybook` roda com sucesso localmente antes de enviar.
