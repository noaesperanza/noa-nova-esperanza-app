# Sistema de Classificação Renal - Nôa Esperanza v1.9.0

## 🔬 **Sistema de Classificação Renal para Cannabis Medicinal**

### **Arquitetura Implementada:**

1. **`src/lib/renal-classification.ts`** - Sistema de classificação renal
2. **Integração com IMRE** - Blocos específicos para avaliação renal
3. **Base de conhecimento atualizada** - Protocolos e recomendações
4. **IA Residente** - Botão específico para avaliação renal

### **Estágios da Doença Renal:**

#### **Estágio 1: Função Renal Normal**
- **GFR**: ≥ 90 mL/min/1.73m²
- **Uso de Cannabis**: ✅ Seguro com precauções
- **Produtos Recomendados**: CBD isolado, cremes tópicos
- **Dosagem**: 5-10mg CBD/dia
- **Monitoramento**: Creatinina a cada 6 meses

#### **Estágio 2: Insuficiência Renal Leve**
- **GFR**: 60-89 mL/min/1.73m²
- **Uso de Cannabis**: ✅ Seguro com monitoramento
- **Produtos Recomendados**: CBD isolado, broad spectrum baixo THC
- **Dosagem**: 5-15mg CBD/dia
- **Monitoramento**: Creatinina a cada 3-4 meses

#### **Estágio 3: Insuficiência Renal Moderada**
- **GFR**: 30-59 mL/min/1.73m²
- **Uso de Cannabis**: ⚠️ Com monitoramento rigoroso
- **Produtos Recomendados**: CBD isolado apenas
- **Dosagem**: 2-5mg CBD/dia
- **Monitoramento**: Creatinina a cada 2-3 meses

#### **Estágio 4: Insuficiência Renal Grave**
- **GFR**: 15-29 mL/min/1.73m²
- **Uso de Cannabis**: ❌ Não recomendado
- **Produtos Recomendados**: Apenas cremes tópicos
- **Dosagem**: 1-2mg CBD/dia (tópico)
- **Monitoramento**: Creatinina mensal

#### **Estágio 5: Insuficiência Renal Terminal**
- **GFR**: < 15 mL/min/1.73m²
- **Uso de Cannabis**: ❌ Contraindicado
- **Produtos Recomendados**: Apenas cremes tópicos com supervisão
- **Dosagem**: Contraindicado
- **Monitoramento**: Diário

### **Integração com Sistema IMRE:**

#### **Novos Blocos IMRE (29-36):**
- **Bloco 29**: Coleta de creatinina
- **Bloco 30**: Coleta de ureia
- **Bloco 31**: Coleta de proteinúria
- **Bloco 32**: Verificação de hematuria
- **Bloco 33**: Coleta de pressão arterial
- **Bloco 34**: Verificação de diabetes
- **Bloco 35**: Verificação de hipertensão
- **Bloco 36**: Classificação e relatório

### **Funcionalidades Implementadas:**

#### **1. Cálculo Automático de GFR**
- Fórmula CKD-EPI
- Ajuste por idade, sexo e raça
- Classificação automática do estágio

#### **2. Recomendações Personalizadas**
- Produtos recomendados por estágio
- Produtos a evitar
- Dosagens específicas
- Precauções importantes

#### **3. Monitoramento Inteligente**
- Frequência de exames por estágio
- Alertas de segurança
- Contraindicações específicas

#### **4. Relatório Completo**
- Classificação do estágio
- Recomendações detalhadas
- Plano de monitoramento
- Alertas e contraindicações

### **Interface da IA Residente:**

#### **Botão de Avaliação Renal**
- Acesso direto à avaliação renal
- Coleta específica de dados renais
- Classificação automática
- Relatório personalizado

#### **Integração com Base de Conhecimento**
- Protocolos atualizados
- Recomendações baseadas em evidências
- Segurança na prescrição

### **Fluxo de Avaliação:**

1. **Início**: Botão "Avaliação Renal para Cannabis"
2. **Coleta**: Dados específicos (creatinina, ureia, etc.)
3. **Cálculo**: GFR automático
4. **Classificação**: Estágio da doença renal
5. **Recomendações**: Produtos e dosagens específicas
6. **Relatório**: Documento completo para o médico

### **Segurança e Precauções:**

#### **Estágios 1-2**: Uso seguro
- Monitoramento padrão
- Produtos com baixo THC
- Dosagens conservadoras

#### **Estágio 3**: Uso com precaução
- Monitoramento rigoroso
- Apenas CBD isolado
- Dosagens muito baixas

#### **Estágios 4-5**: Uso restrito
- Contraindicado na maioria dos casos
- Apenas com supervisão especializada
- Monitoramento intensivo

### **Benefícios da Implementação:**

#### **Para Pacientes:**
- Avaliação personalizada da função renal
- Recomendações específicas e seguras
- Monitoramento adequado

#### **Para Médicos:**
- Classificação automática
- Relatórios detalhados
- Protocolos baseados em evidências

#### **Para a Plataforma:**
- Diferencial competitivo
- Segurança na prescrição
- Integração completa

---

**Versão:** 1.9.0  
**Data:** 30/09/2025  
**Status:** ✅ Implementado e Funcional
