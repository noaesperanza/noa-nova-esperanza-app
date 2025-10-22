# Nôa Esperanza - MedCanLab Platform com Avatar Multimodal e Sistema IMRE Triaxial para Cannabis Medicinal

Plataforma de inteligência artificial clínica que integra entrevista humanizada, governança ética e impacto assistencial.

## 🚀 Tecnologias

- **React 18** - Biblioteca JavaScript para interfaces
- **TypeScript** - Superset tipado do JavaScript
- **Vite** - Build tool moderna e rápida
- **React Router 6** - Roteamento declarativo
- **Tailwind CSS** - Framework CSS utility-first
- **Lucide React** - Ícones modernos e elegantes
- **Class Variance Authority** - Gerenciamento de classes CSS
- **Tailwind Merge & CLSX** - Utilities para classes CSS

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build de produção
npm run preview
```

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes UI base (Toast, etc)
│   ├── Header.tsx      # Header global
│   ├── Helmet.tsx      # Meta tags dinâmicas
│   ├── AvatarNoaMultimodal.tsx  # Avatar IA multimodal
│   └── MedCannLabSections.tsx  # Componentes específicos
├── hooks/              # Hooks customizados
│   ├── useIsClient.ts  # Hook para SSR
│   └── use-toast.ts    # Sistema de notificações
├── lib/                # Utilitários
│   ├── utils.ts        # Funções auxiliares
│   ├── imre-system-triaxial.ts  # Sistema IMRE completo
│   ├── knowledge-base.ts        # Base de conhecimento IA
│   └── gpt4-service.ts         # Serviço GPT-4
├── pages/              # Páginas da aplicação
│   ├── Home.tsx        # Landing page
│   ├── MedCannLab.tsx  # Página de pesquisa cannabis medicinal
│   ├── AreaPaciente.tsx    # Área do paciente
│   ├── AreaProfissional.tsx # Área do profissional
│   ├── AreaAluno.tsx        # Área do aluno
│   ├── AdminDashboard.tsx   # Dashboard administrativo
│   └── Login.tsx           # Login/Cadastro
├── App.tsx             # Configuração de rotas
├── App.css             # Estilos customizados
├── index.css           # Estilos globais + Tailwind
└── main.tsx            # Ponto de entrada
```

## 🎨 Características

- ✅ Design moderno e responsivo
- ✅ Sistema de roteamento com React Router
- ✅ Toast notifications integrado
- ✅ Tailwind CSS para estilização rápida
- ✅ Dark mode suportado
- ✅ Animações suaves e transições
- ✅ Acessibilidade (WCAG)
- ✅ Performance otimizada
- ✅ SEO-friendly com Helmet
- ✅ TypeScript para type-safety
- ✅ Componentes modulares e reutilizáveis

## 📱 Páginas

### Home (/)
Landing page simbólica "Bons ventos soprem" com:
1. **Entrada Poética** - "Bons ventos soprem" - convite à escuta
2. **Dois Portais** - ENSINO 🧩 e PESQUISA 🔬
3. **Manifesto** - Três princípios da comunicação pós-moderna
4. **Funcionalidades** - Recursos detalhados
5. **Processo** - Como funciona passo a passo
6. **Depoimentos** - Feedback de parceiros
7. **FAQ** - Perguntas frequentes
8. **Contato** - Formulário e informações

### MedCann Lab (/medcann-lab)
Plataforma de pesquisa em cannabis medicinal com:
- Sidebar de recursos científicos
- Cards de metodologia AEC
- Call to action para demonstração
- Integração neuro-nefro-canabinoide

### Áreas de Usuários

#### Área do Paciente (/paciente)
- Dashboard com KPIs de saúde
- Avaliação Clínica IMRE integrada
- Compartilhamento de Dados (Blockchain)
- Relatórios protegidos
- Agenda de consultas
- Chat com Nôa

#### Área do Profissional (/profissional)
- Dashboard profissional
- Gestão de pacientes
- Acesso a relatórios compartilhados
- Prescrições de cannabis
- Recursos clínicos (Protocolos, AEC, Biblioteca)
- Chat com Nôa

#### Área do Aluno (/aluno)
- Dashboard de aprendizado
- Pós-Graduação Cannabis (destaque)
- KPIs de progresso
- Certificados
- Biblioteca científica
- Chat com Nôa

#### Admin Dashboard (/admin)
Painel administrativo completo para gestão da plataforma:

**Funcionalidades**
- 📊 Dashboard principal com métricas em tempo real
- 📈 KPIs de 3 camadas (Administrativos, Semânticos, Clínicos)
- 📚 Biblioteca Geral com upload de documentos
- 🧠 Base de Conhecimento (configuração da IA)
- 🔑 Gerenciamento de API Keys (3 chaves ativas)
- 👥 Gerenciamento de usuários
- 📈 Analytics e relatórios
- ⚙️ Configurações do sistema

## 🎯 Funcionalidades

### Sistema IMRE Triaxial Completo ✨
Sistema de entrevista clínica com **37 blocos** estruturados:

**PARTE 1: Avaliação Clínica Inicial (25 blocos)**
- Lista Indiciária (4 blocos)
- Desenvolvimento da Queixa (6 blocos)
- História Patológica (2 blocos)
- História Familiar (4 blocos)
- Hábitos de Vida (2 blocos)
- Medicações (4 blocos)
- Alergias (2 blocos)
- Fechamento Consensual (1 bloco)

**PARTE 2: Avaliação de Risco DRC (12 blocos)**
- Oferta da avaliação
- Lista de Fatores de Risco (checkboxes)
- Desenvolvimento Triaxial do Fator
- Fechamento Consensual Renal
- Exames laboratoriais
- Cálculo de eGFR
- Análise morfológica

### Avatar Multimodal Nôa Esperanza 🤖
Avatar flutuante da IA Residente em **TODAS as páginas**:
- 💬 Chat estilo WhatsApp
- 🎤 Reconhecimento de voz
- 🔊 Síntese de voz feminina (35 anos)
- 📹 Acesso à webcam
- 🎭 Animações de lip-sync
- 📱 100% Responsivo
- 🌬️ Saudação: "Bons ventos soprem"
- 🎯 Metodologia AEC integrada
- 🧠 IA contextual e inteligente

### Sistema de Login com NFT "Escute-se" 🔗
- Seleção de tipo de usuário (Paciente, Profissional, Aluno)
- Apresentação do NFT Social
- Integração com blockchain Polygon
- Link para NFT fundador na Zora
- Redirecionamento automático

### Privacidade com Blockchain 🔒
- Dados protegidos por blockchain
- Compartilhamento somente com autorização
- Controle total sobre privacidade
- LGPD Compliant

## 🌐 Browser Support

- Chrome (últimas 2 versões)
- Firefox (últimas 2 versões)
- Safari (últimas 2 versões)
- Edge (últimas 2 versões)

## 🚀 Deploy

O projeto está pronto para deploy em plataformas como:
- Vercel
- Netlify
- GitHub Pages
- AWS Amplify

```bash
npm run build
# Os arquivos de produção estarão na pasta 'dist/'
```

## 📄 Licença

© 2025 Noa Esperanza. Todos os direitos reservados.
