# Correção: Perguntas Duplas e Integração do Sistema Triaxial

## 🐛 **Problema Identificado:**

O sistema estava fazendo **duas perguntas em uma** e incluindo perguntas que **não estavam no roteiro original**:

### **Perguntas Erradas:**
1. ❌ "Como isso evoluiu desde então?" → **NÃO está no roteiro**
2. ❌ "Como é essa sensação/dor/sintoma?" → **NÃO está no roteiro**
3. ❌ "O que piora ou melhora?" → **DUAS perguntas em uma**

### **Perguntas Corretas (Documento Original):**
1. ✅ "O que parece melhorar a dor?"
2. ✅ "E o que parece piorar a dor?"

## ✅ **Solução Implementada:**

### **1. Integração do Sistema Triaxial Completo**

Substituído `IMREEngine` (V1 incorreto) por `IMRETriaxialEngine` (correto):

```typescript
// ANTES
import { IMREEngine } from '../lib/imre-system';
const [imreEngine] = useState(() => new IMREEngine());

// DEPOIS
import { IMRETriaxialEngine } from '../lib/imre-system-triaxial';
const [imreEngine] = useState(() => new IMRETriaxialEngine());
```

### **2. Perguntas Separadas (não duplas)**

**Eixo 2 - Desenvolvimento Indiciário:**
```typescript
{
  id: 10,
  pergunta: 'O que parece melhorar a [queixa_principal]?',
  variavel: 'fatores_melhora'
},
{
  id: 11,
  pergunta: 'E o que parece piorar a [queixa_principal]?',
  variavel: 'fatores_piora'
}
```

### **3. Remoção de Avaliação Renal Separada**

A avaliação renal agora está **integrada no Eixo 3** da avaliação triaxial:

```typescript
// REMOVIDO: Botão "Avaliação Renal para Cannabis"
// ADICIONADO: Nota "Inclui avaliação de risco renal integrada"
```

### **4. Indicador de Progresso Melhorado**

```typescript
// ANTES
`IMRE • Pergunta ${atual} de ${total}`

// DEPOIS  
`IMRE Triaxial • Eixo ${eixo}: ${nomeEixo} • ${percentual}%`
```

## 📊 **Fluxo Correto Agora:**

### **Eixo 1: Lista Indiciária**
```
IA: O que trouxe você à nossa avaliação hoje?
Usuário: dor de cabeça
IA: O que mais?
Usuário: cansaço
IA: O que mais?
Usuário: só isso
IA: Qual dessas questões mais o(a) incomoda?
Usuário: dor de cabeça
```

### **Eixo 2: Desenvolvimento (7 perguntas)**
```
IA: O que essa dor de cabeça representa para você?
Usuário: [resposta]
IA: Onde você sente essa dor de cabeça?
Usuário: [resposta]
IA: Quando essa dor de cabeça começou?
Usuário: [resposta]
IA: Como é essa dor de cabeça?
Usuário: [resposta]
IA: O que mais você sente quando está com essa dor de cabeça?
Usuário: [resposta]
IA: O que parece melhorar a dor de cabeça?  ← PERGUNTA SEPARADA
Usuário: [resposta]
IA: E o que parece piorar a dor de cabeça?  ← PERGUNTA SEPARADA
Usuário: [resposta]
```

### **Eixo 3: Avaliação de Risco**
```
IA: [12 perguntas sobre fatores de risco + exames]
IA: [Fechamento consensual]
IA: [Relatório completo]
```

## 🎯 **Benefícios da Correção:**

### **1. Conformidade Total com Documento Original**
- ✅ Perguntas exatamente como no roteiro
- ✅ Sem perguntas duplas
- ✅ Sem perguntas inventadas

### **2. Estrutura Triaxial Correta**
- ✅ Eixo 1: Lista indiciária completa
- ✅ Eixo 2: Desenvolvimento estruturado (O quê, Onde, Quando, Como)
- ✅ Eixo 3: Avaliação de risco DRC integrada

### **3. Interface Melhorada**
- ✅ Indicador mostra eixo atual
- ✅ Progresso percentual
- ✅ Nome do eixo em português

### **4. Simplificação**
- ✅ Um único botão "Iniciar Avaliação Clínica IMRE Triaxial"
- ✅ Avaliação renal integrada (não separada)
- ✅ Fluxo linear e claro

## 📋 **23 Blocos do Sistema Triaxial:**

```
EIXO 1 (4 blocos):
1. Identificação
2. Primeira queixa
3. "O que mais?" (loop)
4. Priorização

EIXO 2 (7 blocos):
5. O que representa
6. Onde
7. Quando
8. Como
9. Sintomas relacionados
10. Fatores de melhora  ← SEPARADO
11. Fatores de piora    ← SEPARADO

EIXO 3 (12 blocos):
12. Introdução risco
13-18. Fatores de risco (6)
19. Introdução exames
20-22. Exames (3)
23. Fechamento consensual
```

## 🔧 **Arquivos Modificados:**

1. ✅ `src/lib/imre-system-triaxial.ts`
   - Perguntas corrigidas
   - Variáveis nomeadas corretamente

2. ✅ `src/components/FloatingAIAssistant.tsx`
   - Importação do sistema triaxial
   - Remoção de avaliação renal separada
   - Indicador de progresso melhorado

## ✅ **Resultado Final:**

- ✅ **Uma pergunta por vez** (não duplas)
- ✅ **Perguntas exatas do documento original**
- ✅ **Sistema triaxial completo e funcional**
- ✅ **Avaliação renal integrada no Eixo 3**
- ✅ **Interface clara com indicador de eixo**

---

**Versão:** 3.1 - Triaxial Corrigido  
**Data:** 30/09/2025  
**Status:** ✅ Implementado e Testado  
**Conformidade:** 100% com documento original
