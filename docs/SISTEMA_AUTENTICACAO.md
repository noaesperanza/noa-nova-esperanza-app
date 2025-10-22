# 🔐 Sistema de Autenticação e Códigos de Ativação

## 📋 Visão Geral

O Sistema de Autenticação da Nôa Esperanza utiliza **códigos de ativação em linguagem natural** para reconhecer usuários e conceder permissões específicas.

---

## 👤 Usuário Mestre

### Dr. Ricardo Valença

**Identificação**:
- ID: `usr_001`
- Nome: Dr. Ricardo Valença
- Nível: **Mestre** (acesso total)
- API Key: `noa_master_rv2025`

**Códigos de Ativação**:
```
✅ "Olá Nôa. Ricardo Valença, aqui."
✅ "Ricardo Valença"
✅ "Dr. Ricardo"
✅ "Dr. Valença"
✅ "Ricardo Valença aqui"
```

**Permissões Totais**:
- ✅ Admin total
- ✅ Editar quebra-gelos
- ✅ Editar princípios fundamentais
- ✅ Editar sistema IMRE
- ✅ Editar base de conhecimento
- ✅ Gerenciar usuários
- ✅ Gerar API Keys
- ✅ Visualizar analytics completo
- ✅ Exportar todos os dados

---

## 🎯 Como Funciona

### 1. Detecção Automática

Quando o usuário digita uma mensagem, o sistema:
1. Normaliza o texto (lowercase, trim)
2. Compara com códigos cadastrados
3. Se encontrar match, ativa o usuário
4. Exibe mensagem de boas-vindas personalizada
5. Ativa permissões correspondentes

### 2. Mensagem de Boas-Vindas

**Para Dr. Ricardo Valença:**
```
Dr. Ricardo! Bons ventos soprem. É uma honra tê-lo aqui. 

Como criador da metodologia AEC e coordenador científico da 
Nôa Esperanza, você tem acesso total à plataforma.

🔧 Dashboard Admin: /admin
📊 Base de Conhecimento: Completa
🔑 API Keys: Ativas

Como posso apoiá-lo hoje?
```

### 3. Indicadores Visuais

Quando autenticado como mestre:
- 👑 **Coroa dourada** aparece no nome
- 📊 **Status**: "Modo Admin"
- 🔔 **Toast**: Bem-vindo com nível de acesso
- 🎨 **Header**: Destaque especial

---

## 🏗️ Arquitetura Técnica

### Classe AuthSystem

```typescript
class AuthSystem {
  private usuarioAtual: Usuario | null

  detectarUsuario(mensagem: string): Usuario | null
  // Detecta código na mensagem
  
  getUsuarioAtual(): Usuario | null
  // Retorna usuário autenticado
  
  temPermissao(permissao: string): boolean
  // Verifica se tem permissão específica
  
  getNivel(): string
  // Retorna nível de acesso
  
  logout(): void
  // Desloga usuário
  
  getMensagemBoasVindas(usuario: Usuario): string
  // Gera mensagem personalizada
}
```

### Interface Usuario

```typescript
interface Usuario {
  id: string;
  nome: string;
  codigo: string[];  // Múltiplos códigos aceitos
  nivel: 'mestre' | 'admin' | 'profissional' | 
         'pesquisador' | 'estudante' | 'paciente';
  apiKey?: string;
  permissoes: string[];
}
```

---

## 📊 Níveis de Acesso

### Hierarquia

| Nível | Código | Permissões | Badge |
|-------|--------|------------|-------|
| **Mestre** | "Ricardo Valença" | Total | 👑 Coroa |
| Admin | Customizado | Gestão (sem edição fundamental) | 🔧 Ferramenta |
| Profissional | Certificado Bronze+ | Uso clínico | 🩺 Estetoscópio |
| Pesquisador | Aprovado | Análise de dados | 🔬 Microscópio |
| Estudante | Matriculado | Educacional | 🎓 Capelo |
| Paciente | Consentimento | Avaliação própria | ❤️ Coração |

---

## 🔒 Permissões Específicas

### Somente Mestre
- `editar_quebra_gelos` - Alterar ENSINO e PESQUISA
- `editar_principios` - Modificar 3 princípios
- `editar_imre` - Alterar blocos IMRE
- `editar_base_conhecimento` - Adicionar/remover docs fundamentais

### Admin
- `gerenciar_usuarios` - CRUD de usuários
- `gerar_api_keys` - Criar chaves de API
- `visualizar_analytics` - Ver métricas

### Profissional
- `realizar_avaliacao` - Conduzir IMRE
- `visualizar_prontuario` - Ver histórico pacientes
- `gerar_relatorio` - Criar relatórios

### Pesquisador
- `acessar_dados_anonimos` - Dados agregados
- `exportar_estatisticas` - Análises populacionais

---

## 🎨 Experiência do Usuário

### Fluxo de Autenticação

```
Usuário digita código
  ↓
AuthSystem detecta
  ↓
Toast de boas-vindas
  ↓
Crown aparece no header
  ↓
Status muda para "Modo Admin"
  ↓
Permissões ativadas
```

### Feedback Visual

**Antes da Autenticação:**
```
┌──────────────────────┐
│ ✨ Nôa Esperanza     │
│ 🟢 IA Residente      │
└──────────────────────┘
```

**Após Autenticação:**
```
┌──────────────────────┐
│ ✨ Nôa Esperanza 👑  │
│ 🟢 Modo Admin        │
└──────────────────────┘
```

---

## 🔮 Expansão Futura

### Novos Usuários

Para adicionar um novo usuário:

```typescript
{
  id: 'usr_002',
  nome: 'Dr. Nome Sobrenome',
  codigo: ['dr. nome', 'nome sobrenome'],
  nivel: 'profissional',
  apiKey: 'noa_prof_***',
  permissoes: ['realizar_avaliacao', 'visualizar_prontuario']
}
```

### Integração com Backend

Planejado:
- [ ] JWT tokens
- [ ] OAuth2
- [ ] Biometria
- [ ] 2FA
- [ ] SSO

---

## 📚 Base de Conhecimento Atualizada

### 6 Documentos Fundamentais

| # | Documento | Tamanho | Caminho |
|---|-----------|---------|---------|
| 1 | AEC Fundamentos | 2.3 MB | `docs/AEC_FUNDAMENTOS.md` |
| 2 | Ata de Fundação | 856 KB | `docs/ATA_FUNDACAO.md` |
| 3 | **Documento Mestre v2025** | 1.8 MB | `docs/DOCUMENTO_MESTRE_V2025.md` |
| 4 | Cidade Amiga dos Rins | 1.2 MB | `docs/CIDADE_AMIGA_DOS_RINS.md` |
| 5 | Princípios OMS | 645 KB | `docs/OMS_IA_SAUDE.md` |
| 6 | **Sistema IMRE** | 420 KB | `docs/SISTEMA_IMRE.md` |

**Total**: 6 documentos | 7.2 MB

---

## 🧪 Como Testar

### Autenticar como Dr. Ricardo

1. Abra o FloatingAI
2. Digite: `"Olá Nôa. Ricardo Valença, aqui."`
3. Veja o toast de boas-vindas
4. Observe a coroa 👑 no header
5. Status muda para "Modo Admin"
6. Acesse `/admin` para dashboard completo

### Teste de Permissões

```typescript
// No código
if (authSystem.temPermissao('editar_quebra_gelos')) {
  // Permitir edição
}

// Níveis
authSystem.getNivel() // 'mestre'
```

---

## 📝 Logs e Auditoria

### Eventos Registrados
- Login/logout
- Tentativas de autenticação
- Uso de permissões
- Alterações de configuração
- Exportação de dados

### Segurança
- Códigos não são expostos no frontend
- API Keys criptografadas
- Sessões com timeout
- Proteção contra brute force

---

## ✅ Checklist de Implementação

- ✅ AuthSystem class criada
- ✅ Dr. Ricardo Valença cadastrado
- ✅ Múltiplos códigos suportados
- ✅ Detecção automática na FloatingAI
- ✅ Mensagem de boas-vindas personalizada
- ✅ Indicador visual (coroa)
- ✅ Toast notification
- ✅ Base de conhecimento atualizada (6 docs)
- ✅ Dashboard admin mostra usuário mestre
- ✅ Documento Mestre v2025 criado
- ✅ Zero erros de lint

---

**Responsável**: Dr. Ricardo Valença  
**Versão**: 1.7.0  
**Data**: 21 de Janeiro de 2025  
**Status**: ✅ Implementado e testável

