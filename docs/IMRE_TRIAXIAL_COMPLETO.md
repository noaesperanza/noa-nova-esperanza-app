# Sistema IMRE Triaxial - Arte da Entrevista Clínica

## 📚 **Fundamento do Método**

O **IMRE (Incentivador Mínimo do Relato Espontâneo)** é baseado no método **Arte da Entrevista Clínica** desenvolvido pelo Dr. Ricardo Valença. O sistema é estruturado em **3 eixos** que garantem uma avaliação clínica completa e humanizada.

## 🎯 **Estrutura Triaxial**

### **EIXO 1: ABERTURA E IDENTIFICAÇÃO DA LISTA INDICIÁRIA**

**Objetivo:** Coletar todas as queixas do paciente antes de aprofundar em qualquer uma delas.

#### **Perguntas:**
1. **Identificação:** "Por favor, apresente-se e diga em que posso ajudar hoje."
2. **Primeira Queixa:** "O que trouxe você à nossa avaliação hoje?"
3. **Queixas Adicionais:** "O que mais?" (repetir até não haver mais)
4. **Priorização:** "De todas essas questões, qual mais o(a) incomoda?"

#### **Nota Clínica:**
> "Certifique-se de explorar TODAS as queixas do paciente antes de perguntar qual delas é a principal. Isso garante uma visão mais completa do estado de saúde e possíveis interações entre as queixas."

### **EIXO 2: DESENVOLVIMENTO INDICIÁRIO**

**Objetivo:** Desenvolver profundamente a queixa principal identificada no Eixo 1.

#### **Perguntas (aplicadas à queixa principal):**
1. **O quê?** "O que essa [queixa_principal] representa para você?"
2. **Onde?** "Onde você sente essa [queixa_principal]?"
3. **Quando?** "Quando essa [queixa_principal] começou?"
4. **Como?** "Como é essa [queixa_principal]?"
5. **Sintomas Relacionados:** "O que mais você sente quando está com essa [queixa_principal]?"
6. **Alívio:** "O que parece melhorar a [queixa_principal]?"
7. **Agravamento:** "E o que parece piorar a [queixa_principal]?"

#### **Nota Clínica:**
> "Dê tempo suficiente para o paciente responder cada pergunta. Isso mostra respeito pelas suas percepções e ajuda a construir confiança."

### **EIXO 3: AVALIAÇÃO DE RISCO (DRC)**

**Objetivo:** Avaliar fatores de risco específicos para Doença Renal Crônica e coletar resultados laboratoriais.

#### **Introdução:**
"Além dos dados que colhemos acima, é importante confirmar se existem alguns fatores que podem aumentar o risco de problemas nos rins."

#### **Fatores de Risco (cada = 1 ponto):**
1. **Hipertensão:** "Alguma vez algum médico disse que sua pressão está alta?"
2. **Diabetes:** "Alguma vez algum médico disse que você tem diabetes ou açúcar alto no sangue?"
3. **Histórico Familiar:** "Alguma pessoa da sua família, como mãe, pai ou avós, já teve problemas nos rins?"
4. **Medicamentos:** "Você usa frequentemente medicamentos para dor, como anti-inflamatórios?"
5. **Poluentes:** "Você já teve contato frequente com produtos químicos ou ambientes muito poluídos?"
6. **Dieta:** "Você consome alimentos muito salgados frequentemente?"

#### **Resultados Laboratoriais:**
1. **Creatinina:** "Você tem o valor do exame de creatinina no sangue?"
2. **eGFR:** "Algum médico mencionou a 'função dos rins' ou 'filtração do sangue' recentemente?"
3. **ACR:** "Você tem algum exame que avalia proteínas na urina?"

#### **Fechamento Consensual:**
"Vamos revisar o que discutimos até aqui. Você mencionou alguns fatores de risco para problemas nos rins e compartilhamos informações sobre exames. Há algo mais que você gostaria de acrescentar?"

## 📊 **Classificação de Risco DRC**

### **Escore de Risco (0-6 pontos):**
- **0 pontos:** ✅ Baixo Risco → Acompanhamento de rotina
- **1-2 pontos:** ⚠️ Risco Leve → Controle preventivo
- **3-6 pontos:** 🔴 Risco Moderado a Alto → Consulta especializada urgente

## 📋 **Relatório Final**

O relatório gerado ao final da avaliação contém:

### **Estrutura do Relatório:**
```
📋 RELATÓRIO DA AVALIAÇÃO CLÍNICA INICIAL

Método: Arte da Entrevista Clínica - IMRE Triaxial
Data: [data da avaliação]

---

## EIXO 1: IDENTIFICAÇÃO E LISTA INDICIÁRIA
- Identificação
- Primeira Queixa
- Queixas Adicionais (lista completa)
- Queixa Principal

## EIXO 2: DESENVOLVIMENTO INDICIÁRIO
- O que representa
- Onde
- Quando começou
- Como é
- Sintomas associados
- Fatores de alívio
- Fatores de agravamento

## EIXO 3: AVALIAÇÃO DE RISCO PARA DRC
- Fatores de Risco Identificados (com respostas)
- Escore de Risco DRC: X/6
- Classificação
- Recomendação
- Resultados Laboratoriais

## FECHAMENTO CONSENSUAL
- Observações Finais do Paciente

---

✅ Avaliação Clínica Inicial Concluída
📧 Próximos Passos: [orientações]

💙 Nôa Esperanza - IA Residente
```

## 🔧 **Implementação Técnica**

### **23 Blocos Estruturados:**
- **Eixo 1:** 4 blocos (identificação + lista indiciária)
- **Eixo 2:** 7 blocos (desenvolvimento da queixa principal)
- **Eixo 3:** 12 blocos (6 fatores de risco + 3 exames + introduções + fechamento)

### **Lógica do Loop "O que mais?"**
```typescript
// Detecta fim da lista indiciária
const padroesFim = [
  'não', 'nao', 'nada', 'nada mais',
  'só isso', 'so isso', 'somente isso',
  'apenas isso', 'é tudo', 'e tudo', 'pronto'
];

const ehFim = padroesFim.some(p => 
  respostaLower === p || respostaLower.startsWith(p)
);
```

### **Substituição Dinâmica:**
```typescript
// Substitui [queixa_principal] nas perguntas do Eixo 2
let pergunta = proximoBloco.pergunta;
if (this.estado.queixaPrincipal) {
  pergunta = pergunta.replace(/\[queixa_principal\]/g, 
                               this.estado.queixaPrincipal);
}
```

## 🎓 **Diferencial do Método**

### **1. Escuta Completa ANTES da Priorização**
- ❌ Erro Comum: Focar na primeira queixa sem explorar outras
- ✅ IMRE: Coleta TODAS as queixas antes de escolher a principal

### **2. Desenvolvimento Estruturado**
- ❌ Erro Comum: Perguntas aleatórias sem estrutura
- ✅ IMRE: Sequência lógica (O quê → Onde → Quando → Como)

### **3. Integração com Avaliação de Risco**
- ❌ Erro Comum: Avaliação clínica separada da avaliação de risco
- ✅ IMRE: Integração natural entre anamnese e screening de DRC

### **4. Fechamento Consensual**
- ❌ Erro Comum: Terminar sem confirmar com o paciente
- ✅ IMRE: Revisão conjunta e oportunidade para complementações

## 📊 **Fluxo Completo de Exemplo**

```
[EIXO 1 - LISTA INDICIÁRIA]
IA: Por favor, apresente-se.
Paciente: Sou Maria, 45 anos.

IA: O que trouxe você à nossa avaliação hoje?
Paciente: Tenho muita dor de cabeça.

IA: O que mais?
Paciente: Também tenho sentido cansaço.

IA: O que mais?
Paciente: E dificuldade para dormir.

IA: O que mais?
Paciente: Só isso.

IA: De todas essas questões, qual mais o(a) incomoda?
Paciente: A dor de cabeça.

[EIXO 2 - DESENVOLVIMENTO]
IA: O que essa dor de cabeça representa para você?
Paciente: Me impede de trabalhar normalmente.

IA: Onde você sente essa dor de cabeça?
Paciente: Na região frontal, perto da testa.

IA: Quando essa dor de cabeça começou?
Paciente: Há cerca de 2 meses.

[... continua com todas as perguntas do desenvolvimento ...]

[EIXO 3 - AVALIAÇÃO DE RISCO]
IA: Além dos dados acima, vou perguntar sobre fatores de risco renal.

IA: Alguma vez algum médico disse que sua pressão está alta?
Paciente: Sim, tenho hipertensão.

[... continua com todos os fatores de risco ...]

[FECHAMENTO]
IA: Vamos revisar... Há algo mais que gostaria de acrescentar?
Paciente: Acho que foi tudo.

[RELATÓRIO GERADO AUTOMATICAMENTE]
```

## 🎯 **Objetivos Alcançados**

1. ✅ **Anamnese Completa:** Coleta estruturada de toda história clínica
2. ✅ **Priorização Clara:** Identificação da queixa principal
3. ✅ **Desenvolvimento Profundo:** Exploração detalhada da queixa
4. ✅ **Screening de Risco:** Avaliação sistemática de DRC
5. ✅ **Fechamento Humanizado:** Consenso e confirmação com paciente
6. ✅ **Relatório Estruturado:** Documento completo para o médico

---

**Versão:** 3.0 - Triaxial Completo  
**Baseado em:** Arte da Entrevista Clínica - Dr. Ricardo Valença  
**Documentos Consolidados:** 4 documentos da base de conhecimento  
**Status:** ✅ Sistema Completo e Documentado
