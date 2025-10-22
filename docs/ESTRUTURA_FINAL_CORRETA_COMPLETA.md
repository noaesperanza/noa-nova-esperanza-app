# Estrutura Final Correta - IMRE Completo

## 📋 **TOTAL: 30 BLOCOS**

### **PARTE 1: AVALIAÇÃO CLÍNICA INICIAL (19 blocos)**

#### **1. LISTA INDICIÁRIA (4 blocos)**
```
1. Identificação
2. "O que trouxe você?"
3. "O que mais?" (loop)
4. "Qual mais incomoda?"
```

#### **2. DESENVOLVIMENTO DA QUEIXA PRINCIPAL (6 blocos)**
```
5. Onde?
6. Quando?
7. Como?
8. Sintomas relacionados?
9. O que melhora?
10. O que piora?
```

#### **3. HISTÓRIA PATOLÓGICA PREGRESSA (2 blocos)**
```
11. "Quais questões de saúde você já viveu? O que veio primeiro?"
12. "O que mais?" (loop)
```

#### **4. HISTÓRIA FAMILIAR (4 blocos)**
```
13. "Pela parte de sua mãe, quais questões de saúde?"
14. "O que mais?" (loop materna)
15. "E por parte de seu pai?"
16. "O que mais?" (loop paterna)
```

#### **5. HÁBITOS DE VIDA (2 blocos)**
```
17. "Que outros hábitos você acha importante mencionar?"
18. "O que mais?" (loop)
```

#### **6. FECHAMENTO CONSENSUAL (1 bloco)**
```
19. [APRESENTAR RESUMO ORDENADO]
    "Vamos revisar sua história..."
    "Você concorda com o meu entendimento?"
    
    SE SIM → Gera Relatório da Avaliação Clínica Inicial
    SE NÃO → "O que gostaria de corrigir?"
```

### **PARTE 2: AVALIAÇÃO DE RISCO RENAL - OPCIONAL (11 blocos)**

```
20. "Gostaria de fazer avaliação renal?"
    SE NÃO → Finaliza
    SE SIM → Continua

21. Hipertensão?
22. Diabetes?
23. Histórico Familiar Renal?
24. Medicamentos?
25. Poluentes?
26. Dieta (sal)?
27. "Tem exames?"
28. Creatinina?
29. eGFR?
30. ACR (proteínas na urina)?

Ao final → Gera Relatório Complementar com Escore de Risco
```

---

## 📊 **FLUXO COMPLETO:**

```
[LISTA INDICIÁRIA]
1-4. Coleta todas as queixas

[DESENVOLVIMENTO]
5-10. Desenvolve queixa principal

[HISTÓRIA]
11-12. História patológica
13-16. História familiar (mãe + pai)
17-18. Hábitos de vida

[FECHAMENTO]
19. Apresenta resumo ordenado:
    "Vamos revisar: você apresentou [lista ordenada],
    sendo [queixa principal] o que mais incomoda.
    Sobre ela, você me disse que [desenvolvimento].
    Sua história de saúde inclui [história patológica].
    Na família, [história familiar]. Sobre hábitos, [hábitos].
    Você concorda?"
    
    SE SIM:
    📋 RELATÓRIO DA AVALIAÇÃO CLÍNICA INICIAL
    [relatório completo]
    ✅ Avaliação Concluída
    
    IA: "Gostaria de fazer avaliação renal?"
    
    SE SIM → Blocos 20-30
    SE NÃO → "Obrigada! Até breve! 💙"
```

---

## ✅ **DIFERENÇAS DA VERSÃO ANTERIOR:**

### **ADICIONADO:**
- História Patológica Pregressa (2 blocos)
- História Familiar Materna (2 blocos)
- História Familiar Paterna (2 blocos)
- Hábitos de Vida (2 blocos)
- **Total adicionado: 8 blocos**

### **TOTAL:**
- **ANTES:** 22 blocos
- **DEPOIS:** 30 blocos

---

## 📝 **RESUMO ORDENADO (Bloco 19):**

O resumo deve ser apresentado de forma **natural e ordenada**:

```
"Vamos revisar para garantir que não perdemos nenhum detalhe:

Você veio aqui hoje porque tem sentido [queixa 1], [queixa 2], 
[queixa 3], sendo [queixa principal] o que mais o(a) incomoda.

Sobre [queixa principal], você me disse que sente [onde], começou 
[quando], é [como], e também sente [sintomas]. Melhora quando [melhora] 
e piora quando [piora].

Sobre sua história de saúde, você mencionou [história patológica ordenada].

Na sua família, pela parte de sua mãe: [história materna].
Pela parte de seu pai: [história paterna].

Sobre seus hábitos, você mencionou: [hábitos].

Você concorda com esse entendimento? Há algo que gostaria de corrigir 
ou acrescentar?"
```

---

**Versão:** 5.0 - Completa e Correta  
**Total de Blocos:** 30  
**Partes:** 2 (Avaliação Inicial + Avaliação Renal Opcional)  
**Baseado em:** Documento Consolidado - Arte da Entrevista Clínica
