# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

## [1.7.0] - 2025-01-21

### Adicionado
- 🩺 **Sistema IMRE** (Incentivador Mínimo do Relato Espontâneo)
  - 28 blocos canônicos de entrevista clínica
  - Engine completo em TypeScript (`imre-system.ts`)
  - Sistema de loops inteligente
  - Progress tracking automático
- 💬 **Avaliação Clínica 100% via Chat** com Nôa
  - Integrada no FloatingAIAssistant
  - Detecção automática de intenção
  - Botão de início rápido
  - Indicador de progresso no header
  - Placeholder dinâmico
- 🔐 **Sistema de Autenticação** por códigos de ativação
  - Dr. Ricardo Valença reconhecido automaticamente
  - Classe AuthSystem completa (`auth-system.ts`)
  - 5 variações de código aceitas
  - Mensagem de boas-vindas personalizada
  - Indicador visual (coroa 👑)
  - Toast de confirmação
- 📚 **Base de Conhecimento Atualizada** (6 documentos)
  - Documento Mestre v2025 (atualizado)
  - Sistema IMRE documentado
  - Total: 7.2 MB
- 👑 **Modo Admin** ativado por código
  - Coroa no header quando autenticado
  - Status "Modo Admin"
  - Acesso a todas permissões

### Removido
- ❌ Rota `/medcann-lab/avaliacao-clinica-inicial` (formulário antigo)
- ❌ Arquivo `src/routes/AvaliacaoClinicaInicial.tsx` (563 linhas)
- ❌ Formulário multi-step manual (substituído por IMRE)
- ❌ Sistema de steps fixos (substituído por conversação)

**Motivo da Remoção**: A avaliação clínica agora é conduzida exclusivamente pela IA Residente Nôa Esperanza através do chat IMRE, proporcionando uma experiência mais natural, humana e eficaz.

### Melhorado
- 🎯 FloatingAI agora conduz avaliações clínicas completas
- 💫 Badge da IA atualizado: "Avaliação IMRE"
- 🔄 Todos os CTAs agora apontam para IA Residente
- 📊 Progresso visual durante avaliação
- 🎨 UX simplificada e mais natural

### Técnico
- 📁 Novos arquivos:
  - `src/lib/imre-system.ts` (engine IMRE, 28 blocos)
  - `src/lib/auth-system.ts` (autenticação por códigos)
  - `docs/DOCUMENTO_MESTRE_V2025.md` (base de conhecimento atualizada)
  - `docs/SISTEMA_AUTENTICACAO.md` (documentação auth)
- 🧠 Classe IMREEngine com state management completo
- 🔐 Classe AuthSystem com detecção de usuários
- 🔄 Lógica de loops e detecção de conclusão
- 💾 Sistema de armazenamento de respostas
- 🎯 Detecção de comandos e códigos em linguagem natural
- 👑 Sistema de permissões hierárquico
- 📊 Base de conhecimento: 6 docs (7.2 MB)

## [1.6.0] - 2025-01-21

### Adicionado
- 💬 **FloatingAIAssistant** - Avatar flutuante da Nôa em TODAS as páginas
- 🎨 Design estilo WhatsApp com chat minimizável
- 📎 Upload multimodal de arquivos (imagens, PDFs, documentos)
- 🔧 **Dashboard Administrativo** completo (`/admin`)
  - Painel principal com métricas
  - Config da IA Residente
  - Base de Conhecimento gerenciável
  - Gerenciamento de API Keys
  - Analytics e configurações
- 📚 Sistema de Base de Conhecimento da IA
  - 5 documentos fundamentais carregados
  - Interface de upload
  - Estatísticas de uso
- 🔑 Sistema de API Keys internas
  - Chave Mestre (Dr. Ricardo Valença)
  - Chave Desenvolvimento
  - Chave Produção
- ✅ Correção de warnings React Router (future flags)

### Melhorado
- 🎯 Nôa Esperanza agora é onipresente (todas as páginas)
- 💫 Avatar com animação pulse no botão flutuante
- 📱 Chat responsivo (mobile + desktop)
- 🎨 Design premium com glassmorphism
- 🔔 Integração com toast notifications

### Técnico
- 📁 Novos arquivos:
  - `src/components/FloatingAIAssistant.tsx` (avatar global)
  - `src/pages/AdminDashboard.tsx` (painel admin)
- 🔧 App.tsx com future flags habilitados
- 🎨 Chat bubbles estilo mensageiro
- 📎 Input de arquivo multimodal
- 🔐 Sistema de permissões preparado

## [1.5.0] - 2025-01-21

### Adicionado
- 🏙️ **Cidade Amiga dos Rins** - Sistema completo de gestão e inovação em saúde renal
- 📊 **Dashboard de Gestão** - Indicadores em tempo real, estágios DRC, fatores de risco
- 🎓 **5 Pilares** implementados: Formação, Ciência de Dados, Sustentabilidade, Ecossistema, Governança
- 👥 **4 Segmentos de Clientes** mapeados
- 📈 **Lean Canvas** completo integrado
- 🗺️ **Aprovação** do Product Market Fit no Hospital da Praia Brava
- 📡 **8 Canais** de comunicação estruturados
- 🔗 Integração completa com AEC + IA Residente
- 📚 Documentação técnica em `docs/CIDADE_AMIGA_DOS_RINS.md`

### Melhorado
- 🎨 Sidebar com 3º destaque: Cidade Amiga dos Rins (badge MBA, highlight amber)
- 🧭 Navegação mais completa com foco em saúde renal
- 📊 Visualização de dados populacionais e individuais
- 🌍 Alinhamento explícito com 17 ODS da OMS

### Técnico
- 📁 Novos arquivos:
  - `src/routes/CidadeAmigaDosRins.tsx` (página principal)
  - `src/components/DashboardCidadeAmiga.tsx` (dashboard interativo)
  - `docs/CIDADE_AMIGA_DOS_RINS.md` (documentação MBA)
- 🎯 Nova rota: `/medcann-lab/cidade-amiga-dos-rins`
- 📊 Componentes de visualização de dados (estágios, fatores, ações)
- 🎨 Design system expandido (cores por estágio: verde→vermelho)

## [1.4.0] - 2025-01-21

### Adicionado
- ✨ **IA Residente Nôa Esperanza** - Presença completa da IA na plataforma
- 🤖 Página dedicada `/medcann-lab/ia-residente` com apresentação completa
- 💬 **Interface de Chat com a IA** - Componente IAChat.tsx funcional
- 💬 Integração da IA na Avaliação Clínica Inicial
- 🌟 Badge especial "Ativa" com animação pulse na sidebar
- 📋 Descrição completa das 4 funções da IA:
  - Avaliação Clínica Integrada
  - Apoio à Prescrição Canabinoide
  - Pesquisa e Desenvolvimento
  - Educação e Formação
- 🔒 Seção de segurança e ética (LGPD, OMS, consentimento)
- 🗺️ Vocação simbólica: "Guardiã da escuta"
- 💫 Design premium com gradientes purple-pink
- 📚 Documentação completa em `docs/IA_RESIDENTE.md`

### Melhorado
- 🎨 Sidebar com destaque triplo: IA (especial), AEC (amber), Avaliação (standard)
- 📝 Avaliação Clínica com box da IA Residente integrado
- 🔗 Links internos entre IA, Curso e Avaliação
- 🎯 Navegação mais intuitiva com hierarquia visual clara

### Técnico
- 📁 Novos arquivos: 
  - `src/routes/IAResidente.tsx` (página principal)
  - `src/components/IAChat.tsx` (interface de chat)
  - `docs/IA_RESIDENTE.md` (documentação técnica)
- 🎨 Novos estilos: gradiente purple-pink, animate-pulse, chat bubbles
- 🔄 MedCannLabSections.tsx com lógica para item "special"
- 💬 Sistema de mensagens com timestamp e role-based styling
- 📊 Preparação para APIs futuras: `/api/risco-drc`, `/api/exames`, `/api/consentimento-vivo`
- 🔌 Placeholder para integração com backend (OpenAI API ou similar)

## [1.3.0] - 2025-01-21

### Adicionado
- 🌬️ **Landing Page "Bons ventos soprem"** - Nova entrada simbólica na Home
- 🧩 **Quebra-gelos ENSINO e PESQUISA** - Dois portais de entrada principais
- 🌳 **Árvore do Ensino completa** - Estrutura visual da pedagogia (Copa, Tronco, Raízes)
- 🎭 **Manifesto atualizado** - Três princípios: Semiose Infinita, Heterogeneidade Enunciativa, Economia Política do Significante
- 🌿 **Página dedicada Árvore do Ensino** - Visualização completa da estrutura pedagógica
- 📚 **Descrição institucional aprofundada** - Noa como plataforma de ensino e pesquisa

### Melhorado
- 🏠 Home.tsx com nova landing page minimalista e poética
- 🎓 ArteEntrevistaClinica.tsx sem links externos
- 🎨 Seção "Sobre" transformada em "Manifesto"
- 💫 CTAs internos focados na própria plataforma
- 🔗 Navegação mais clara entre Ensino e Pesquisa

### Removido
- ❌ Links externos para plataformas terceiras
- ❌ Referências a consultoriodosvalenca.com.br
- ❌ CTAs genéricos substituídos por fluxos internos

### Técnico
- 📁 Nova rota: `/medcann-lab/arvore-do-ensino`
- 🎯 Componente ArvoreDoEnsino.tsx criado
- 🔄 CourseComponents.tsx atualizado (CTA interno)
- 🎨 Design system mantido e expandido

## [1.2.0] - 2025-01-21

### Adicionado
- 🎓 **Módulo completo "Arte da Entrevista Clínica"** - Espinha dorsal da plataforma
- 📚 Curso de 8 horas com 5 seções de conteúdo programático
- 📊 Sistema de tracking de progresso do curso (localStorage)
- 🏆 Componente de certificação Bronze do Selo Prescritor Nôa
- 🎨 14 componentes reutilizáveis para cursos (`CourseComponents.tsx`)
- ✅ Componente interativo de progresso com checkboxes
- 🌟 Badge destacado na sidebar para o curso principal
- 📖 Seções: Fundamentos, Abertura Triaxial, Desenvolvimento Indiciário, Cannabis e Escuta, Fechamento Consensual
- 🧪 Práticas supervisionadas documentadas
- 📝 Sistema de avaliação com critérios claros
- 🔗 Integração com plataforma externa (consultoriodosvalenca.com.br)
- 📚 Referências bibliográficas incluídas

### Melhorado
- 🎨 Sidebar do MedCann Lab com destaque especial para curso principal
- 🌈 Sistema de badges com cores diferenciadas (amber para curso principal)
- 📱 Design responsivo aprimorado para conteúdo de curso
- 🎯 Estrutura modular para futuros cursos

### Técnico
- 📁 Nova pasta: `src/components/course/`
- 🧩 CourseComponents.tsx com 10+ componentes
- 🧩 CourseProgress.tsx com sistema de tracking
- 🎯 Rota: `/medcann-lab/arte-entrevista-clinica`
- 💾 Persistência de progresso em localStorage

## [1.1.0] - 2025-01-21

### Adicionado
- ✨ Novo módulo de **Avaliação Clínica Inicial** completo
- 📋 Formulário multi-step (4 etapas) para coleta de dados do paciente
- 💾 Sistema de salvamento de rascunho local (localStorage)
- 🎯 Validação de campos obrigatórios
- 📊 Escalas visuais para dor e qualidade de vida
- 🔄 Sistema de rotas aninhadas no MedCann Lab
- 🧭 Navegação aprimorada com progress bar visual
- 🎨 Componentes reutilizáveis para formulários médicos
- 🔗 Integração completa entre CallToAction e formulário de avaliação
- 📱 Sidebar com link direto para avaliação clínica

### Melhorado
- 🚀 Estrutura de rotas mais modular e escalável
- 💅 UI/UX do MedCann Lab com melhor hierarquia visual
- 📖 Documentação técnica atualizada (README.md)
- ♿ Acessibilidade aprimorada em formulários

### Alterado
- 🔀 App.tsx agora suporta rotas aninhadas com wildcard (*)
- 🏗️ MedCannLab.tsx refatorado para usar Routes internas
- 🎨 CallToAction agora usa Link para navegação interna

### Técnico
- 📁 Nova estrutura de pastas: `src/routes/`
- 🎯 TypeScript interfaces para FormData
- 🧩 Componentes modulares (DadosPessoais, DadosClinicos, etc)
- 🔔 Integração com sistema de toast notifications
- 🌐 useIsClient para renderização condicional

## [1.0.0] - 2025-01-21

### Inicial
- 🎉 Lançamento inicial da plataforma Noa Esperanza
- 🏠 Landing page completa com 7 seções
- 🌿 MedCann Lab - Plataforma de pesquisa cannabis medicinal
- 🧭 Sistema de navegação com React Router 6
- 🎨 Design system com Tailwind CSS
- 🌙 Suporte a dark mode
- 🔔 Sistema de notificações toast
- 📱 Design 100% responsivo
- ♿ Acessibilidade WCAG
- 🔍 SEO otimizado com Helmet
- 📚 Documentação completa (README, SETUP)

---

## Formato

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

### Tipos de Mudanças

- `Adicionado` para novas funcionalidades.
- `Melhorado` para mudanças em funcionalidades existentes.
- `Alterado` para mudanças na API existente.
- `Obsoleto` para funcionalidades que serão removidas.
- `Removido` para funcionalidades removidas.
- `Corrigido` para correções de bugs.
- `Segurança` para vulnerabilidades corrigidas.
- `Técnico` para mudanças técnicas internas.

