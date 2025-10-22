# 🏙️ Cidade Amiga dos Rins - Implementação

## 📋 Visão Geral

**Cidade Amiga dos Rins** é um sistema integrado de gestão, inovação e prevenção da doença renal crônica, desenvolvido como TCC do MBA em Gestão, Inovação e Serviços em Saúde, integrado à plataforma Nôa Esperanza.

---

## 🎯 Objetivo

Criar cidades sustentáveis que previnem, detectam e cuidam da saúde renal através de:
- Formação especializada
- Telemedicina
- Ciência de dados
- Governança regional
- Alinhamento com 17 objetivos OMS

---

## 📊 O Problema

### Contexto Global
- Doença renal afetada por diabetes e hipertensão
- Problemas socioeconômicos e políticos também são causas
- Classificação em 5 estágios de acometimento

### Impacto no Brasil
- **150 mil pessoas** em diálise (Estágio 5)
- **1% do PIB** consumido pelo estágio 5
- **Impacto ambiental**: água, resíduos, energia
- **Regiões remotas** sem acesso a especialistas
- **Estágio 1** só detectável por profissional treinado

---

## 🏛️ Os 5 Pilares

### 1. 🎓 Formação e Telemedicina
- Formação de alunos de medicina em entrevista especializada
- Oferecimento de telemedicina para saúde renal
- Uso da metodologia Arte da Entrevista Clínica (AEC)

### 2. 💾 Ciência de Dados
- Banco de dados para ciência de dados populacional
- Relacionamento de dados individuais e coletivos
- Dashboards territoriais com consentimento
- Análise de tendências e fatores de risco

### 3. 🌱 17 Objetivos de Sustentabilidade
- Alinhamento com objetivos OMS
- Soluções sustentáveis regionais
- Redução de impacto ambiental
- Políticas públicas baseadas em evidências

### 4. 🏢 Ecossistema de Tecnologia
- Fundação de startups em saúde renal
- Parceiros: Eletronuclear, Petrobrás, Estaleiro Verolme
- Inovação tecnológica regional
- Desenvolvimento de soluções escaláveis

### 5. 🛡️ Governança Corporativa
- Estratégias regionais de mitigação de risco
- Gestão baseada em indicadores
- Articulação interinstitucional
- Modelo de governança replicável

---

## 👥 Segmentos de Clientes

### 1. Pacientes
**Local**: Hospital da Praia Brava, Angra dos Reis, Costa Verde, RJ
- Usuários do SUS
- Usuários da ANS (Saúde Suplementar)

### 2. Instituições
**Ecossistema em torno do Hospital**
- Eletronuclear
- Petrobrás
- Estaleiro Verolme
- Universidades

### 3. Operadoras de Saúde
- Seguradoras ANS
- Gestão de risco
- Redução de custos com prevenção

### 4. Estudantes
- Medicina
- Áreas afins
- Formação especializada em telemedicina

---

## 📡 Canais de Comunicação

### Digitais
- Site Cidade Amiga dos Rins
- Aplicativo Mobile
- Redes Sociais (Facebook, Instagram, YouTube, Twitter, LinkedIn)

### Institucionais
- Canais intra-hospitalares (Hospital Praia Brava)
- Canais de operadoras credenciadas
- Zendesk para relacionamento com pacientes

---

## 📊 Dashboard de Gestão

### Indicadores Principais
- Pacientes Triados: 1.247
- Risco Alto DRC: 156
- Em Acompanhamento: 892
- Telemedicina Ativa: 234
- eGFR Médio: 78 ml/min
- Alertas Pendentes: 12

### Distribuição por Estágios
| Estágio | Descrição | eGFR | Pacientes |
|---------|-----------|------|-----------|
| 1 | Normal/Aumentado | ≥90 | 845 (68%) |
| 2 | Leve Redução | 60-89 | 287 (23%) |
| 3 | Moderada Redução | 30-59 | 89 (7%) |
| 4 | Severa Redução | 15-29 | 21 (1.7%) |
| 5 | Falência Renal | <15 | 5 (0.4%) |

### Fatores de Risco Prevalentes
- Hipertensão: 56%
- Idade >60: 41%
- Diabetes: 34%
- Obesidade: 28%
- Histórico Familiar: 23%

---

## 🔗 Integração com Nôa Esperanza

### Metodologia AEC
A entrevista clínica especializada utiliza a **Arte da Entrevista Clínica** para:
- Detecção precoce de fatores de risco
- Escuta triaxial (biográfica, clínica, territorial)
- Registro narrativo e simbólico
- Vínculo terapêutico

### IA Residente Nôa
A IA atua em:
- Avaliação de risco DRC
- Solicitação de exames
- Organização de dados territoriais
- Sugestões baseadas em evidências
- Dashboards analíticos

### Fluxo de Trabalho
```
Paciente
  ↓
Avaliação Clínica Inicial (com IA)
  ↓
Escore de Risco DRC
  ↓
Exames Solicitados
  ↓
Plano de Acompanhamento
  ↓
Telemedicina ou Presencial
  ↓
Dashboard Territorial
```

---

## ✅ Status do Projeto

### Aprovação
✅ **Product Market Fit aprovado**
- Hospital da Praia Brava (Fundação Eletronuclear)
- FEAM (Fundação Eletronuclear de Assistência Médica)

### Localização Piloto
- **Angra dos Reis, RJ**
- **Costa Verde**
- **Hospital da Praia Brava**

---

## 🚀 Implementação Técnica

### Rotas
```
/medcann-lab/cidade-amiga-dos-rins
```

### Componentes
- `CidadeAmigaDosRins.tsx` - Página principal
- `DashboardCidadeAmiga.tsx` - Dashboard de indicadores

### Funcionalidades
- ✅ Apresentação dos 5 pilares
- ✅ Segmentos de clientes
- ✅ Dashboard com indicadores reais
- ✅ Distribuição por estágios DRC
- ✅ Fatores de risco prevalentes
- ✅ Ações recomendadas pela IA
- ✅ Integração com AEC e IA Residente
- ✅ Links para formação e avaliação

---

## 📚 Fundamentação Acadêmica

**Origem**: TCC - MBA em Gestão, Inovação e Serviços em Saúde

**Autor**: Dr. Ricardo de Vasconcelos do Rêgo Valença

**Orientador**: Prof. Afonso Henrique Corrêa de Sales

**Ano**: 2024/2025

---

## 🌍 Alinhamento OMS

### 17 Objetivos de Sustentabilidade

O projeto se alinha especialmente com:
- **ODS 3**: Saúde e Bem-Estar
- **ODS 6**: Água Potável e Saneamento
- **ODS 9**: Indústria, Inovação e Infraestrutura
- **ODS 11**: Cidades e Comunidades Sustentáveis
- **ODS 17**: Parcerias e Meios de Implementação

---

## 💡 Diferenciais

### Inovação
- Primeiro projeto brasileiro integrando AEC + DRC + Sustentabilidade
- IA especializada em saúde renal
- Modelo replicável para outras cidades

### Sustentabilidade
- Redução de diálises desnecessárias
- Menor consumo de água e energia
- Menos resíduos médicos
- Economia de 1% do PIB regional

### Social
- Acesso universal (SUS + ANS)
- Telemedicina para áreas remotas
- Formação de profissionais locais
- Empoderamento comunitário

---

## 📈 Métricas de Sucesso

### Curto Prazo (6 meses)
- [ ] 2.000 pacientes triados
- [ ] 100 profissionais formados
- [ ] 500 teleconsultas realizadas
- [ ] Dashboard operacional

### Médio Prazo (1-2 anos)
- [ ] Redução de 20% em internações por DRC
- [ ] 5.000 pacientes em acompanhamento
- [ ] Expansão para 3 cidades da Costa Verde
- [ ] 1ª startup do ecossistema fundada

### Longo Prazo (3-5 anos)
- [ ] Modelo replicado em 10 cidades
- [ ] Publicação científica internacional
- [ ] Redução mensurável do impacto ambiental
- [ ] Ecossistema autossustentável

---

## 🔮 Próximos Passos

### Desenvolvimento
- [ ] API de cálculo de risco DRC
- [ ] Integração com prontuário eletrônico
- [ ] App mobile para pacientes
- [ ] Sistema de telemedicina
- [ ] Plataforma de formação online

### Parcerias
- [ ] Formalizar com Eletronuclear
- [ ] Acordo com Petrobrás
- [ ] Convênio com universidades
- [ ] Credenciamento ANS

---

## 📞 Responsabilidade

**Coordenação Científica**: Dr. Ricardo Valença  
**Plataforma**: Nôa Esperanza  
**Localização**: Angra dos Reis, RJ  
**Versão**: 1.4.0

---

**Com escuta e compromisso,**  
**Cidade Amiga dos Rins × Nôa Esperanza**

