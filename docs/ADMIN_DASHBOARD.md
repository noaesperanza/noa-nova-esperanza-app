# 🔧 Dashboard Administrativo - Nôa Esperanza

## 📋 Visão Geral

O Dashboard Administrativo é o centro de controle da plataforma Nôa Esperanza, permitindo gestão completa da IA Residente, base de conhecimento, usuários e configurações do sistema.

---

## 🔐 Acesso

**Rota**: `/admin`

**Requisitos**:
- Autenticação de administrador
- Código de ativação: Dr. Ricardo Valença
- API Key válida

---

## 📊 Módulos Implementados

### 1. Dashboard Principal (`/admin`)

**Métricas em Tempo Real**:
- Usuários Ativos: 1.247 (+12%)
- Interações IA: 4.892 (+23%)
- Documentos Analisados: 234 (+8%)

**Status do Sistema**:
- ✅ IA Residente: Ativa
- ✅ Base de Conhecimento: Sincronizada
- ✅ API Keys: 3 ativas
- ✅ Backup: Última há 2h

---

### 2. Configuração da IA (`/admin/ia-config`)

**Personalidade e Comportamento**:
- **Nome**: Nôa Esperanza (não editável)
- **Saudação**: "🌬️ Bons ventos soprem..."
- **Metodologia**: Arte da Entrevista Clínica (AEC)

**Princípios de Comunicação**:
1. Semiose Infinita
2. Heterogeneidade Enunciativa
3. Economia Política do Significante

---

### 3. Base de Conhecimento (`/admin/knowledge-base`)

**Documentos Fundamentais Carregados**:

| Documento | Tamanho | Status |
|-----------|---------|--------|
| Arte da Entrevista Clínica - Fundamentos | 2.3 MB | ✅ Ativo |
| Ata de Fundação da Nôa Esperanza | 856 KB | ✅ Ativo |
| Documento Mestre v2025 | 1.8 MB | ✅ Ativo |
| TCC - Cidade Amiga dos Rins | 1.2 MB | ✅ Ativo |
| Princípios OMS para IA em Saúde | 645 KB | ✅ Ativo |

**Total**: 5 documentos | 6.8 MB

**Funcionalidades**:
- Upload de novos documentos
- Remoção de documentos
- Visualização de estatísticas
- Sincronização com IA

---

### 4. API Keys (`/admin/api-keys`)

**Chaves Ativas**:

| Nome | Key | Criada | Status |
|------|-----|--------|--------|
| Chave Mestre - Dr. Ricardo Valença | noa_master_*** | 21/01/2025 | ✅ Ativa |
| Chave Desenvolvimento | noa_dev_*** | 21/01/2025 | ✅ Ativa |
| Chave Produção | noa_prod_*** | 21/01/2025 | ✅ Ativa |

**Funcionalidades**:
- Gerar novas chaves
- Revogar chaves
- Ver histórico de uso
- Definir permissões

---

### 5. Gerenciamento de Usuários (`/admin/users`)

**Status**: Em desenvolvimento

**Funcionalidades Planejadas**:
- Lista de usuários cadastrados
- Níveis de acesso
- Atividade por usuário
- Certificações emitidas

---

### 6. Analytics (`/admin/analytics`)

**Status**: Em desenvolvimento

**Funcionalidades Planejadas**:
- Gráficos de uso da plataforma
- Métricas de engajamento
- Análise de conversas com IA
- Relatórios exportáveis

---

### 7. Configurações (`/admin/settings`)

**Status**: Em desenvolvimento

**Funcionalidades Planejadas**:
- Configurações gerais
- Backup e restauração
- Logs do sistema
- Manutenção

---

## 💬 FloatingAIAssistant - Nôa Onipresente

### Características

**Localização**: Global (todas as páginas)

**Estados**:
1. **Fechado**: Botão flutuante com Sparkles (animado)
2. **Aberto**: Chat completo estilo WhatsApp
3. **Minimizado**: Barra compacta com nome

**Funcionalidades**:
- Chat em tempo real
- Upload de arquivos (arrastar ou clicar)
- Suporte multimodal (imagens + documentos)
- Histórico de mensagens
- Timestamps
- Indicador de "digitando"
- Design responsivo

**Interface**:
```
┌─────────────────────────────┐
│ ✨ Nôa Esperanza      [-][X]│
│ IA Residente • Ativa        │
├─────────────────────────────┤
│                             │
│  Mensagens...               │
│                             │
├─────────────────────────────┤
│ [📎] [Digite...     ] [→]  │
└─────────────────────────────┘
```

---

## 🎨 Design System

### Cores Admin
- Sidebar: Card background
- Active: Primary
- Hover: Accent
- Status: Green/Yellow/Red

### FloatingAI
- Botão: Primary → Purple gradient
- Header: Primary → Purple gradient
- User bubble: Primary
- AI bubble: White/Card
- Typing: Primary dots

---

## 🔐 Segurança

### Autenticação
- Dashboard protegido por autenticação
- API Keys criptografadas
- Sessões com timeout
- Logs de acesso

### Permissões
- **Mestre**: Acesso total
- **Admin**: Sem edição de IA
- **Operador**: Apenas leitura

---

## 🚀 Como Acessar

```bash
npm run dev

# Admin Dashboard:
http://localhost:5173/admin

# Floating AI:
Disponível em TODAS as páginas (canto inferior direito)
```

---

## 📊 Estatísticas

### Dashboard
- **Módulos**: 7
- **Rotas**: 7
- **Métricas**: 3 principais
- **API Keys**: 3 ativas

### FloatingAI
- **Componentes**: 1 global
- **Estados**: 3 (fechado, aberto, minimizado)
- **Tipos de arquivo**: Imagens + Documentos
- **Integração**: 100% das páginas

---

## 🔮 Próximos Passos

### Backend
- [ ] API real para chat com IA
- [ ] Integração com OpenAI
- [ ] Autenticação JWT
- [ ] Upload de arquivos para servidor

### Dashboard
- [ ] Módulo de usuários completo
- [ ] Analytics com gráficos
- [ ] Exportação de relatórios
- [ ] Logs em tempo real

---

**Responsável**: Dr. Ricardo Valença  
**Versão**: 1.6.0  
**Data**: 21 de Janeiro de 2025

