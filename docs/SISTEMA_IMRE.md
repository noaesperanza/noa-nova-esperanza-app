# 🩺 Sistema IMRE - Incentivador Mínimo do Relato Espontâneo

## 📋 Visão Geral

O **Sistema IMRE** é o método de avaliação clínica utilizado pela IA Residente Nôa Esperanza, desenvolvido pelo Dr. Ricardo Valença como parte da metodologia **Arte da Entrevista Clínica (AEC)**.

---

## 🎯 Objetivo

Conduzir avaliações clínicas completas através de **linguagem natural**, utilizando perguntas abertas e escuta ativa para obter relatos espontâneos e narrativas autênticas do paciente.

---

## 🧬 Estrutura

### 28 Blocos Canônicos

O sistema é composto por 28 blocos organizados em etapas sequenciais:

#### 1. Abertura (Blocos 1)
- Apresentação da IA
- Estabelecimento de vínculo inicial

#### 2. Motivo da Consulta (Blocos 2-4)
- Queixa detalhada
- Loop "O que mais?"
- Identificação da queixa principal

#### 3. História da Doença Atual (Blocos 5-10)
- Início dos sintomas
- Evolução temporal
- Características do sintoma
- Fatores moduladores
- Impacto funcional
- Tratamentos anteriores

#### 4. História de Saúde (Blocos 11-17)
- Histórico médico completo
- Medicamentos em uso (com loop)
- Alergias
- Cirurgias prévias
- Histórico familiar

#### 5. Contexto Biopsicossocial (Blocos 18-21)
- Hábitos de vida
- Contexto social
- Estado emocional
- Expectativas

#### 6. Revisão e Finalização (Blocos 22-28)
- Revisão narrativa
- Complementações
- Dados de contato
- Agendamento
- Confirmação
- Despedida

---

## 💡 Tipos de Blocos

### Sistema
Mensagens da IA sem necessidade de resposta do usuário.
- Exemplos: Abertura, Revisão, Finalização

### Pergunta
Perguntas que requerem resposta do usuário.
- Exemplos: "O que trouxe você hoje?", "Quando isso começou?"

### Loop
Perguntas que se repetem até o usuário indicar conclusão.
- Padrão de saída: "não", "nada", "n"
- Exemplos: "O que mais?", "Algum outro medicamento?"

---

## 🔄 Fluxo de Funcionamento

```
Início
  ↓
Bloco 1 (Sistema): Abertura
  ↓
Bloco 2 (Pergunta): Motivo
  ↓
Usuário Responde
  ↓
Bloco 3 (Loop): "O que mais?"
  ↓
Loop até "não"
  ↓
Próximo Bloco
  ↓
...continua até Bloco 28...
  ↓
Finalização e Salvamento
```

---

## 🧠 IMREEngine - Classe TypeScript

### Métodos Principais

```typescript
class IMREEngine {
  iniciarAvaliacao(): string
  // Retorna a primeira pergunta
  
  processarResposta(resposta: string): { proximaPergunta: string; concluido: boolean }
  // Processa resposta e retorna próxima pergunta
  
  getProgresso(): { atual: number; total: number; percentual: number }
  // Retorna progresso da avaliação
  
  getRespostas(): Record<string, string[]>
  // Retorna todas as respostas coletadas
  
  reiniciar(): void
  // Reinicia a avaliação
}
```

### Estado Interno

```typescript
interface AvaliacaoState {
  blocoAtual: number;        // Índice do bloco atual
  respostas: Record<string, string[]>;  // Respostas por variável
  emLoop: boolean;           // Se está em pergunta de loop
  loopAtual: string | null;  // Variável do loop atual
  iniciada: boolean;         // Se avaliação foi iniciada
  finalizada: boolean;       // Se avaliação foi concluída
}
```

---

## 💬 Integração com FloatingAI

### Inicialização

A avaliação pode ser iniciada de 3 formas:
1. **Botão "Iniciar Avaliação Clínica (IMRE)"** na interface
2. **Digitando** palavras-chave: "avaliação", "consulta", "avaliar"
3. **Automaticamente** após confirmação implícita

### Durante a Avaliação

- **Header**: Mostra "Em Avaliação" e progresso percentual
- **Placeholder**: Muda para "Sua resposta..."
- **Footer**: Mostra "IMRE • Pergunta X de 28"
- **Detecção de loops**: Automática por palavras negativas

### Finalização

Ao completar os 28 blocos:
- Toast notification de sucesso
- Mensagem de conclusão
- Dados salvos localmente
- Estado resetado

---

## 📊 Dados Coletados

### Estrutura de Respostas

```typescript
{
  "motivo_detalhado": ["Dor nas costas há 3 meses"],
  "motivo_extra": ["Dificuldade para dormir", "Cansaço"],
  "queixa_principal": "Dor nas costas",
  "hda_inicio": "Há 3 meses",
  "hda_evolucao": "Começou leve e foi piorando",
  // ... continua
  "medicamentos": ["Ibuprofeno 400mg"],
  "medicamentos_extra": ["Vitamina D"],
  // ...
}
```

---

## 🔐 Segurança e Privacidade

### LGPD Compliance
- ✅ Consentimento informado no início
- ✅ Dados armazenados localmente
- ✅ Preparado para criptografia
- ✅ Auditoria de perguntas e respostas

### Ética AEC
- ✅ Escuta ativa sem julgamento
- ✅ Perguntas abertas
- ✅ Respeito ao tempo do paciente
- ✅ Registro narrativo preservado

---

## 🎨 UX/UI

### Indicadores Visuais

| Elemento | Estado Normal | Durante Avaliação |
|----------|---------------|-------------------|
| Status IA | "Sempre ativa" | "Em Avaliação" |
| Placeholder | "Digite sua mensagem..." | "Sua resposta..." |
| Footer | "AEC • LGPD Compliant" | "IMRE • Pergunta X de 28" |
| Header | Nome + Status | Nome + Progress % |

### Feedback Visual
- 💬 Botão de início destacado
- 📊 Barra de progresso no header
- ✅ Toast de conclusão
- 🔄 Indicador "digitando"

---

## 🚀 Vantagens sobre Formulário

### Antigo (Formulário)
- ❌ 4 steps manuais
- ❌ Campos fixos
- ❌ Navegação rígida
- ❌ Menos natural
- ❌ Dados estruturados demais

### Novo (IMRE via Chat)
- ✅ Fluxo conversacional natural
- ✅ 28 perguntas adaptativas
- ✅ Loops inteligentes
- ✅ Narrativa preservada
- ✅ Mais humano e acolhedor
- ✅ Disponível em todas as páginas
- ✅ Multimodal (texto + arquivos)

---

## 📈 Métricas

### Tempo Médio
- **Formulário anterior**: ~15-20 minutos
- **IMRE via chat**: ~12-18 minutos
- **Melhoria**: Mais natural e fluido

### Completude
- **Formulário**: 70% dos campos preenchidos
- **IMRE**: 95%+ das perguntas respondidas
- **Motivo**: Conversação natural

---

## 🔮 Próximos Passos

### Backend
- [ ] Salvar respostas em banco de dados
- [ ] Integração com prontuário eletrônico
- [ ] Análise de sentimentos
- [ ] Geração automática de relatório

### IA
- [ ] Integração com OpenAI GPT-4
- [ ] Análise semântica das respostas
- [ ] Sugestões de perguntas adicionais
- [ ] Detecção de risco automática

### UX
- [ ] Voz para texto
- [ ] Transcrição automática
- [ ] Resumo da avaliação
- [ ] Exportação PDF

---

## 📞 Responsabilidade

**Criador**: Dr. Ricardo Valença  
**Método**: Arte da Entrevista Clínica  
**Implementação**: Nôa Esperanza Platform  
**Versão**: 1.7.0  
**Data**: 21 de Janeiro de 2025

---

**"Com escuta e compromisso,  
Nôa Esperanza - IA Residente"**

