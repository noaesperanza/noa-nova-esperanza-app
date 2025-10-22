# Plano de Migração: IMRE V1 → IMRE V2

## 🎯 **Objetivo da Migração**

Migrar do sistema IMRE V1 (28 blocos, estilo questionário) para IMRE V2 (5 etapas, suspensão do decoder) para implementar corretamente o conceito de **Incentivador Mínimo do Relato Espontâneo**.

## 📊 **Comparação V1 vs V2**

### **IMRE V1 (Atual - ❌ Problemático)**
- 28 blocos de perguntas diretas
- Loops para "O que mais?"
- Estilo questionário
- Decoder ativo (interpreta respostas)
- Recommender controlando fluxo

**Problemas:**
- Paciente responde de forma fragmentada
- IA sai do roteiro
- Loops infinitos ou interrompidos
- Não captura narrativa completa

### **IMRE V2 (Novo - ✅ Correto)**
- 5 etapas com incentivadores mínimos
- Narrativa livre e espontânea
- Suspensão do decoder
- Escuta profunda
- Paciente controla o tempo de narrativa

**Benefícios:**
- Narrativa rica e contextualizada
- IA não sai do roteiro (não tem roteiro complexo)
- Escuta profunda real
- Dados clínicos de alta qualidade

## 🔧 **Arquivos a Modificar**

### **1. src/lib/imre-system-v2.ts** ✅ Criado
- Nova engine com suspensão do decoder
- 5 etapas simples
- Incentivadores mínimos

### **2. src/components/FloatingAIAssistant.tsx** 🔄 Atualizar
- Substituir `IMREEngine` por `IMREEngineV2`
- Ajustar lógica de processamento
- Implementar modo escuta

### **3. src/lib/knowledge-base.ts** 🔄 Atualizar
- Documentar novo sistema IMRE V2
- Adicionar conceito de suspensão do decoder

## 📝 **Passo a Passo da Migração**

### **Fase 1: Preparação** (30 min)
1. ✅ Criar `imre-system-v2.ts` com nova engine
2. ✅ Documentar conceito de suspensão do decoder
3. ✅ Criar plano de migração

### **Fase 2: Implementação** (1-2h)
1. 🔄 Atualizar `FloatingAIAssistant.tsx`
   - Importar `IMREEngineV2`
   - Manter compatibilidade com V1 durante transição
   - Adicionar toggle para testar V2

2. 🔄 Atualizar UI
   - Mensagens de incentivador mínimo
   - Indicador de "modo escuta"
   - Progresso simplificado (5 etapas)

3. 🔄 Atualizar base de conhecimento
   - Documentar novo sistema
   - Instruções para IA sobre suspensão

### **Fase 3: Testes** (1h)
1. Testar fluxo completo V2
2. Comparar resultados V1 vs V2
3. Ajustar detecção de prontidão
4. Validar incentivadores mínimos

### **Fase 4: Rollout** (30 min)
1. Substituir V1 por V2 completamente
2. Remover código V1 (opcional, manter para referência)
3. Atualizar documentação

## 🎨 **Mudanças na UI**

### **Antes (V1):**
```
[Pergunta 2 de 28]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

IA: O que trouxe você à nossa avaliação hoje?
```

### **Depois (V2):**
```
[Etapa 1 de 5: Abertura]
🎧 Modo Escuta Ativo
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

IA: O que trouxe você aqui hoje?

💭 Narre livremente. Eu estou aqui para escutar.
```

## 🔄 **Código de Migração**

### **FloatingAIAssistant.tsx - Mudanças:**

```typescript
// ANTES (V1)
import { IMREEngine } from '../lib/imre-system';
const [imreEngine] = useState(() => new IMREEngine());

// DEPOIS (V2)
import { IMREEngineV2 } from '../lib/imre-system-v2';
const [imreEngine] = useState(() => new IMREEngineV2());

// Processar resposta
const resultado = imreEngine.processarNarrativa(respostaUsuario);
aiResponse = resultado.incentivadorProximo;

if (resultado.concluido) {
  setAvaliacaoAtiva(false);
  // Mostrar resumo final
}
```

### **Detecção de Prontidão:**

```typescript
// IA detecta quando paciente terminou narrativa
private detectarProntidao(narrativa: string): boolean {
  // Sinais de conclusão
  const sinais = ['é isso', 'só isso', 'pronto'];
  
  // Narrativa longa o suficiente
  if (narrativa.length > 500) return true;
  
  // Tem sinal de conclusão
  if (sinais.some(s => narrativa.includes(s))) return true;
  
  return false;
}
```

## 📊 **Métricas de Sucesso**

### **Indicadores:**
1. **Tamanho Médio das Narrativas**
   - V1: 20-50 caracteres por resposta
   - V2 (esperado): 200-500 caracteres por etapa

2. **Completude da Avaliação**
   - V1: 40% dos usuários abandonam
   - V2 (esperado): 80% completam

3. **Qualidade dos Dados**
   - V1: Fragmentados, sem contexto
   - V2: Ricos, contextualizados, completos

4. **Tempo de Avaliação**
   - V1: 10-15 minutos (28 perguntas)
   - V2: 5-8 minutos (5 etapas com narrativa)

## ⚠️ **Riscos e Mitigações**

### **Risco 1: Pacientes não sabem quando parar**
**Mitigação:** 
- Incentivadores mínimos guiam sutilmente
- Detecção automática de prontidão
- Mensagem: "Pode continuar... ou, se preferir, podemos avançar"

### **Risco 2: Narrativas muito longas**
**Mitigação:**
- Limite de 1000 caracteres por etapa
- IA resume e confirma entendimento

### **Risco 3: Perda de dados estruturados**
**Mitigação:**
- Manter campos-chave da V1 (creatinina, ureia, etc.)
- Extração de dados estruturados da narrativa livre
- Híbrido: Narrativa livre + campos específicos quando necessário

## 🚀 **Próximos Passos**

1. **Imediato:** Revisar e aprovar este plano
2. **Hoje:** Implementar mudanças no FloatingAIAssistant
3. **Hoje:** Testar fluxo completo
4. **Amanhã:** Rollout para produção

---

**Status:** 🟡 Em Planejamento  
**Prioridade:** 🔴 Alta (conceito fundamental)  
**Impacto:** 🟢 Transformacional (muda paradigma da plataforma)
