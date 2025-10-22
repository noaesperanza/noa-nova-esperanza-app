# 🚀 Guia de Instalação - Noa Esperanza

Este guia irá ajudá-lo a configurar e executar a aplicação Noa Esperanza em sua máquina local.

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior) - [Download](https://nodejs.org/)
- **npm** (vem com o Node.js) ou **yarn**
- **Git** (opcional, para controle de versão)

## 📦 Passo 1: Instalar Dependências

Abra o terminal na pasta do projeto e execute:

```bash
npm install
```

Este comando irá instalar todas as dependências necessárias:
- React 18
- React Router DOM 6
- TypeScript
- Tailwind CSS
- Lucide React (ícones)
- E outras bibliotecas auxiliares

## ⚙️ Passo 2: Iniciar o Servidor de Desenvolvimento

Após a instalação das dependências, execute:

```bash
npm run dev
```

Você verá uma mensagem similar a:

```
VITE v5.0.8  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h to show help
```

## 🌐 Passo 3: Acessar a Aplicação

Abra seu navegador e acesse:

```
http://localhost:5173/
```

## 📍 Rotas Disponíveis

A aplicação possui as seguintes rotas:

- **/** - Landing page principal (Home)
- **/medcann-lab** - Página de pesquisa em cannabis medicinal

## 🛠️ Scripts Disponíveis

### Desenvolvimento
```bash
npm run dev
```
Inicia o servidor de desenvolvimento com hot-reload.

### Build de Produção
```bash
npm run build
```
Cria uma versão otimizada para produção na pasta `dist/`.

### Preview da Produção
```bash
npm run preview
```
Visualiza localmente a versão de produção.

### Linting
```bash
npm run lint
```
Executa o ESLint para verificar problemas no código.

## 🎨 Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca JavaScript para interfaces
- **TypeScript** - Superset tipado do JavaScript
- **Vite** - Build tool moderna e rápida

### Estilização
- **Tailwind CSS** - Framework CSS utility-first
- **CSS Modules** - Estilos customizados

### Roteamento
- **React Router DOM 6** - Sistema de roteamento declarativo

### UI/UX
- **Lucide React** - Biblioteca de ícones modernos
- **Toast Notifications** - Sistema de notificações customizado

## 📁 Estrutura do Projeto

```
Noa Nova/
├── public/              # Arquivos estáticos
│   └── vite.svg
├── src/
│   ├── components/      # Componentes reutilizáveis
│   │   ├── ui/         # Componentes UI base
│   │   ├── Header.tsx
│   │   ├── Helmet.tsx
│   │   └── MedCannLabSections.tsx
│   ├── hooks/          # Hooks customizados
│   │   ├── use-toast.ts
│   │   └── useIsClient.ts
│   ├── lib/            # Utilitários
│   │   └── utils.ts
│   ├── pages/          # Páginas da aplicação
│   │   ├── Home.tsx
│   │   └── MedCannLab.tsx
│   ├── App.css         # Estilos customizados
│   ├── App.tsx         # Componente principal com rotas
│   ├── index.css       # Estilos globais + Tailwind
│   └── main.tsx        # Ponto de entrada
├── index.html          # HTML base
├── package.json        # Dependências e scripts
├── tsconfig.json       # Configuração TypeScript
├── tailwind.config.js  # Configuração Tailwind
├── postcss.config.js   # Configuração PostCSS
├── vite.config.ts      # Configuração Vite
└── README.md           # Documentação

```

## 🎯 Funcionalidades Implementadas

### ✅ Landing Page (Home)
- Hero section com estatísticas
- Seção sobre os três pilares
- Funcionalidades detalhadas
- Processo de implementação
- Depoimentos de parceiros
- FAQ
- Formulário de contato
- Footer completo
- Menu responsivo

### ✅ MedCann Lab
- Sidebar de recursos científicos
- Cards de metodologia AEC (Avaliação, Estratégia, Controle)
- Call to action
- Design premium com gradientes
- Navegação integrada

### ✅ Sistema de Navegação
- Roteamento com React Router
- Links entre páginas
- Scroll suave para seções
- Menu mobile responsivo

### ✅ Sistema de Notificações
- Toast notifications customizado
- Suporte a múltiplas notificações
- Animações suaves
- Auto-dismiss

### ✅ SEO
- Meta tags dinâmicas
- Helmet para cada página
- Títulos e descrições otimizadas
- Canonical URLs

## 🔧 Personalização

### Cores
Edite o arquivo `tailwind.config.js` para customizar as cores:

```javascript
colors: {
  primary: "hsl(var(--primary))",
  // Adicione suas cores aqui
}
```

### Variáveis CSS
Edite o arquivo `src/index.css` para alterar as variáveis:

```css
:root {
  --primary: 239 84% 67%;
  --premium: 250 95% 76%;
  /* Suas variáveis aqui */
}
```

## 🚀 Deploy

### Vercel (Recomendado)
1. Faça push do código para um repositório Git
2. Conecte o repositório no [Vercel](https://vercel.com)
3. Deploy automático!

### Netlify
1. Execute `npm run build`
2. Faça upload da pasta `dist/` no [Netlify](https://netlify.com)

### Build Manual
```bash
npm run build
# Os arquivos estarão em dist/
```

## ❓ Problemas Comuns

### Porta já em uso
Se a porta 5173 estiver em uso, o Vite irá automaticamente usar outra porta.

### Erro ao instalar dependências
Tente limpar o cache:
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
Verifique se todas as dependências de tipo estão instaladas:
```bash
npm install --save-dev @types/react @types/react-dom
```

## 📞 Suporte

Para mais informações ou suporte, consulte:
- README.md
- Documentação do React: https://react.dev
- Documentação do Vite: https://vitejs.dev
- Documentação do Tailwind: https://tailwindcss.com

---

✨ **Pronto!** Você agora tem uma aplicação completa e funcional rodando! ✨

