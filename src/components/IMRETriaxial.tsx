import React, { useState, useEffect } from 'react'
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  Circle, 
  Brain,
  Heart,
  Activity,
  FileText,
  Clock,
  Target,
  Users,
  Shield,
  Zap
} from 'lucide-react'
import { cn } from '../lib/utils'
import { supabase, imreService, IMREAssessment } from '../lib/supabase'

interface IMRETriaxialProps {
  userId: string
  patientId?: string
  onComplete?: (assessment: IMREAssessment) => void
  onProgress?: (current: number, total: number) => void
}

// Definição dos 37 blocos do IMRE Triaxial
const IMRE_BLOCKS = [
  // BLOCO 1: IDENTIFICAÇÃO E CONTEXTO
  {
    id: 1,
    title: "Identificação e Contexto",
    icon: <Users className="w-6 h-6" />,
    description: "Dados pessoais e contexto da consulta",
    fields: [
      { name: "nome", label: "Nome completo", type: "text", required: true },
      { name: "idade", label: "Idade", type: "number", required: true },
      { name: "genero", label: "Gênero", type: "select", options: ["Masculino", "Feminino", "Não-binário", "Outro"], required: true },
      { name: "profissao", label: "Profissão", type: "text", required: false },
      { name: "estado_civil", label: "Estado civil", type: "select", options: ["Solteiro(a)", "Casado(a)", "Divorciado(a)", "Viúvo(a)", "União estável"], required: false },
      { name: "escolaridade", label: "Escolaridade", type: "select", options: ["Fundamental", "Médio", "Superior", "Pós-graduação"], required: false },
      { name: "motivo_consulta", label: "Motivo da consulta", type: "textarea", required: true },
      { name: "expectativas", label: "Expectativas", type: "textarea", required: false }
    ]
  },

  // BLOCO 2: HISTÓRIA MÉDICA PRÉVIA
  {
    id: 2,
    title: "História Médica Prévia",
    icon: <FileText className="w-6 h-6" />,
    description: "Doenças, cirurgias e tratamentos anteriores",
    fields: [
      { name: "doencas_anteriores", label: "Doenças anteriores", type: "textarea", required: false },
      { name: "cirurgias", label: "Cirurgias realizadas", type: "textarea", required: false },
      { name: "hospitalizacoes", label: "Hospitalizações", type: "textarea", required: false },
      { name: "acidentes", label: "Acidentes ou traumas", type: "textarea", required: false },
      { name: "medicamentos_atuais", label: "Medicamentos em uso", type: "textarea", required: false },
      { name: "alergias", label: "Alergias conhecidas", type: "textarea", required: false },
      { name: "vacinas", label: "Situação vacinal", type: "textarea", required: false }
    ]
  },

  // BLOCO 3: HISTÓRIA FAMILIAR
  {
    id: 3,
    title: "História Familiar",
    icon: <Users className="w-6 h-6" />,
    description: "Doenças hereditárias e histórico familiar",
    fields: [
      { name: "doencas_familiares", label: "Doenças na família", type: "textarea", required: false },
      { name: "cancer_familiar", label: "Histórico de câncer", type: "textarea", required: false },
      { name: "doencas_cardiovasculares", label: "Doenças cardiovasculares", type: "textarea", required: false },
      { name: "diabetes_familiar", label: "Diabetes na família", type: "textarea", required: false },
      { name: "doencas_psiquiatricas", label: "Doenças psiquiátricas", type: "textarea", required: false },
      { name: "outras_doencas", label: "Outras doenças hereditárias", type: "textarea", required: false }
    ]
  },

  // BLOCO 4: SINTOMAS ATUAIS
  {
    id: 4,
    title: "Sintomas Atuais",
    icon: <Activity className="w-6 h-6" />,
    description: "Descrição detalhada dos sintomas presentes",
    fields: [
      { name: "sintoma_principal", label: "Sintoma principal", type: "textarea", required: true },
      { name: "sintomas_secundarios", label: "Sintomas secundários", type: "textarea", required: false },
      { name: "inicio_sintomas", label: "Quando começaram", type: "text", required: true },
      { name: "intensidade", label: "Intensidade (1-10)", type: "number", min: 1, max: 10, required: true },
      { name: "fatores_melhoram", label: "O que melhora", type: "textarea", required: false },
      { name: "fatores_pioram", label: "O que piora", type: "textarea", required: false },
      { name: "sintomas_associados", label: "Sintomas associados", type: "textarea", required: false }
    ]
  },

  // BLOCO 5: SISTEMA CARDIOVASCULAR
  {
    id: 5,
    title: "Sistema Cardiovascular",
    icon: <Heart className="w-6 h-6" />,
    description: "Avaliação do coração e sistema circulatório",
    fields: [
      { name: "dor_peito", label: "Dor no peito", type: "select", options: ["Não", "Sim - esporádica", "Sim - frequente", "Sim - constante"], required: true },
      { name: "falta_ar", label: "Falta de ar", type: "select", options: ["Não", "Sim - aos esforços", "Sim - em repouso", "Sim - constante"], required: true },
      { name: "palpitacoes", label: "Palpitações", type: "select", options: ["Não", "Sim - esporádica", "Sim - frequente"], required: true },
      { name: "tontura", label: "Tontura", type: "select", options: ["Não", "Sim - esporádica", "Sim - frequente"], required: true },
      { name: "desmaio", label: "Desmaios", type: "select", options: ["Não", "Sim - recente", "Sim - antigo"], required: true },
      { name: "inchaço_pernas", label: "Inchaço nas pernas", type: "select", options: ["Não", "Sim - leve", "Sim - moderado", "Sim - severo"], required: true },
      { name: "pressao_arterial", label: "Pressão arterial conhecida", type: "text", required: false }
    ]
  },

  // BLOCO 6: SISTEMA RESPIRATÓRIO
  {
    id: 6,
    title: "Sistema Respiratório",
    icon: <Activity className="w-6 h-6" />,
    description: "Avaliação dos pulmões e vias aéreas",
    fields: [
      { name: "tosse", label: "Tosse", type: "select", options: ["Não", "Sim - seca", "Sim - com catarro", "Sim - com sangue"], required: true },
      { name: "falta_ar_esforco", label: "Falta de ar aos esforços", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "chiado_peito", label: "Chiado no peito", type: "select", options: ["Não", "Sim - esporádico", "Sim - frequente"], required: true },
      { name: "dor_respirar", label: "Dor ao respirar", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "ronco", label: "Ronco", type: "select", options: ["Não", "Sim - leve", "Sim - moderado", "Sim - severo"], required: true },
      { name: "apneia", label: "Apneia do sono", type: "select", options: ["Não", "Sim - suspeita", "Sim - confirmada"], required: true }
    ]
  },

  // BLOCO 7: SISTEMA DIGESTIVO
  {
    id: 7,
    title: "Sistema Digestivo",
    icon: <Activity className="w-6 h-6" />,
    description: "Avaliação do trato gastrointestinal",
    fields: [
      { name: "dor_abdominal", label: "Dor abdominal", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "nausea", label: "Náusea", type: "select", options: ["Não", "Sim - esporádica", "Sim - frequente"], required: true },
      { name: "vomito", label: "Vômito", type: "select", options: ["Não", "Sim - esporádico", "Sim - frequente"], required: true },
      { name: "azia", label: "Azia", type: "select", options: ["Não", "Sim - esporádica", "Sim - frequente"], required: true },
      { name: "refluxo", label: "Refluxo", type: "select", options: ["Não", "Sim - esporádico", "Sim - frequente"], required: true },
      { name: "diarreia", label: "Diarreia", type: "select", options: ["Não", "Sim - esporádica", "Sim - frequente"], required: true },
      { name: "constipacao", label: "Constipação", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "sangue_fezes", label: "Sangue nas fezes", type: "select", options: ["Não", "Sim - recente", "Sim - antigo"], required: true }
    ]
  },

  // BLOCO 8: SISTEMA NEUROLÓGICO
  {
    id: 8,
    title: "Sistema Neurológico",
    icon: <Brain className="w-6 h-6" />,
    description: "Avaliação do sistema nervoso",
    fields: [
      { name: "dor_cabeca", label: "Dor de cabeça", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "tontura", label: "Tontura", type: "select", options: ["Não", "Sim - esporádica", "Sim - frequente"], required: true },
      { name: "desmaio", label: "Desmaios", type: "select", options: ["Não", "Sim - recente", "Sim - antigo"], required: true },
      { name: "convulsoes", label: "Convulsões", type: "select", options: ["Não", "Sim - recente", "Sim - antigo"], required: true },
      { name: "dormencia", label: "Dormência", type: "select", options: ["Não", "Sim - esporádica", "Sim - frequente"], required: true },
      { name: "fraqueza", label: "Fraqueza muscular", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "tremor", label: "Tremor", type: "select", options: ["Não", "Sim - leve", "Sim - moderado", "Sim - severo"], required: true },
      { name: "problemas_memoria", label: "Problemas de memória", type: "select", options: ["Não", "Sim - leve", "Sim - moderado", "Sim - severo"], required: true }
    ]
  },

  // BLOCO 9: SISTEMA UROGENITAL
  {
    id: 9,
    title: "Sistema Urogenital",
    icon: <Activity className="w-6 h-6" />,
    description: "Avaliação do sistema urinário e reprodutivo",
    fields: [
      { name: "frequencia_urina", label: "Frequência urinária", type: "select", options: ["Normal", "Aumentada", "Diminuída"], required: true },
      { name: "dor_urinar", label: "Dor ao urinar", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "sangue_urina", label: "Sangue na urina", type: "select", options: ["Não", "Sim - recente", "Sim - antigo"], required: true },
      { name: "incontinencia", label: "Incontinência urinária", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "problemas_sexuais", label: "Problemas sexuais", type: "select", options: ["Não", "Sim - leve", "Sim - moderado", "Sim - severo"], required: true },
      { name: "menstruacao", label: "Ciclo menstrual (mulheres)", type: "select", options: ["Regular", "Irregular", "Ausente", "Não se aplica"], required: false }
    ]
  },

  // BLOCO 10: SISTEMA MUSCULOESQUELÉTICO
  {
    id: 10,
    title: "Sistema Musculoesquelético",
    icon: <Activity className="w-6 h-6" />,
    description: "Avaliação de músculos, ossos e articulações",
    fields: [
      { name: "dor_muscular", label: "Dor muscular", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "dor_articular", label: "Dor articular", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "rigidez", label: "Rigidez articular", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "inchaço_articular", label: "Inchaço articular", type: "select", options: ["Não", "Sim - leve", "Sim - moderado", "Sim - severo"], required: true },
      { name: "fraqueza_muscular", label: "Fraqueza muscular", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "caimbras", label: "Cãimbras", type: "select", options: ["Não", "Sim - esporádicas", "Sim - frequentes"], required: true },
      { name: "limitação_movimento", label: "Limitação de movimento", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true }
    ]
  },

  // BLOCO 11: SISTEMA ENDÓCRINO
  {
    id: 11,
    title: "Sistema Endócrino",
    icon: <Activity className="w-6 h-6" />,
    description: "Avaliação de hormônios e metabolismo",
    fields: [
      { name: "diabetes", label: "Diabetes", type: "select", options: ["Não", "Sim - tipo 1", "Sim - tipo 2", "Sim - gestacional"], required: true },
      { name: "glicose", label: "Glicose conhecida", type: "text", required: false },
      { name: "sede_excessiva", label: "Sede excessiva", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "fome_excessiva", label: "Fome excessiva", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "perda_peso", label: "Perda de peso", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "ganho_peso", label: "Ganho de peso", type: "select", options: ["Não", "Sim - leve", "Sim - moderado", "Sim - severo"], required: true },
      { name: "cansaco", label: "Cansaço", type: "select", options: ["Não", "Sim - leve", "Sim - moderado", "Sim - severo"], required: true },
      { name: "problemas_tireoide", label: "Problemas de tireoide", type: "select", options: ["Não", "Sim - hipotireoidismo", "Sim - hipertireoidismo"], required: true }
    ]
  },

  // BLOCO 12: SISTEMA DERMATOLÓGICO
  {
    id: 12,
    title: "Sistema Dermatológico",
    icon: <Activity className="w-6 h-6" />,
    description: "Avaliação da pele e anexos",
    fields: [
      { name: "erupcoes", label: "Erupções cutâneas", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "coceira", label: "Coceira", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "manchas_pele", label: "Manchas na pele", type: "select", options: ["Não", "Sim - recentes", "Sim - antigas"], required: true },
      { name: "feridas", label: "Feridas que não cicatrizam", type: "select", options: ["Não", "Sim - recentes", "Sim - antigas"], required: true },
      { name: "queda_cabelo", label: "Queda de cabelo", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "unhas_fragil", label: "Unhas frágeis", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "exposicao_sol", label: "Exposição ao sol", type: "select", options: ["Baixa", "Moderada", "Alta"], required: true }
    ]
  },

  // BLOCO 13: SISTEMA HEMATOLÓGICO
  {
    id: 13,
    title: "Sistema Hematológico",
    icon: <Activity className="w-6 h-6" />,
    description: "Avaliação do sangue e sistema linfático",
    fields: [
      { name: "sangramento", label: "Sangramento", type: "select", options: ["Não", "Sim - leve", "Sim - moderado", "Sim - severo"], required: true },
      { name: "hematomas", label: "Hematomas", type: "select", options: ["Não", "Sim - esporádicos", "Sim - frequentes"], required: true },
      { name: "gengiva_sangra", label: "Gengiva sangra", type: "select", options: ["Não", "Sim - esporádico", "Sim - frequente"], required: true },
      { name: "anemia", label: "Anemia", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "glandulas_inchadas", label: "Glândulas inchadas", type: "select", options: ["Não", "Sim - recente", "Sim - antigo"], required: true },
      { name: "fadiga", label: "Fadiga", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "palidez", label: "Palidez", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true }
    ]
  },

  // BLOCO 14: SISTEMA IMUNOLÓGICO
  {
    id: 14,
    title: "Sistema Imunológico",
    icon: <Shield className="w-6 h-6" />,
    description: "Avaliação da imunidade e defesas",
    fields: [
      { name: "infeccoes_frequentes", label: "Infecções frequentes", type: "select", options: ["Não", "Sim - leves", "Sim - moderadas", "Sim - severas"], required: true },
      { name: "cicatrizacao_lenta", label: "Cicatrização lenta", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "alergias", label: "Alergias", type: "select", options: ["Não", "Sim - leves", "Sim - moderadas", "Sim - severas"], required: true },
      { name: "doencas_autoimunes", label: "Doenças autoimunes", type: "select", options: ["Não", "Sim - suspeita", "Sim - confirmada"], required: true },
      { name: "imunossupressao", label: "Imunossupressão", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "vacinas_atualizadas", label: "Vacinas atualizadas", type: "select", options: ["Sim", "Não", "Parcialmente"], required: true }
    ]
  },

  // BLOCO 15: SISTEMA PSIQUIÁTRICO
  {
    id: 15,
    title: "Sistema Psiquiátrico",
    icon: <Brain className="w-6 h-6" />,
    description: "Avaliação da saúde mental",
    fields: [
      { name: "humor", label: "Humor", type: "select", options: ["Bom", "Regular", "Ruim", "Muito ruim"], required: true },
      { name: "ansiedade", label: "Ansiedade", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "depressao", label: "Depressão", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "estresse", label: "Estresse", type: "select", options: ["Não", "Sim - leve", "Sim - moderado", "Sim - severo"], required: true },
      { name: "insonia", label: "Insônia", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "pensamentos_suicidas", label: "Pensamentos suicidas", type: "select", options: ["Não", "Sim - recente", "Sim - antigo"], required: true },
      { name: "substancia_abuso", label: "Abuso de substâncias", type: "select", options: ["Não", "Sim - álcool", "Sim - drogas", "Sim - ambos"], required: true },
      { name: "suporte_social", label: "Suporte social", type: "select", options: ["Bom", "Regular", "Ruim", "Ausente"], required: true }
    ]
  },

  // BLOCO 16: SISTEMA SENSORIAL
  {
    id: 16,
    title: "Sistema Sensorial",
    icon: <Activity className="w-6 h-6" />,
    description: "Avaliação dos sentidos",
    fields: [
      { name: "visao", label: "Visão", type: "select", options: ["Normal", "Leve dificuldade", "Moderada dificuldade", "Severa dificuldade"], required: true },
      { name: "audicao", label: "Audição", type: "select", options: ["Normal", "Leve dificuldade", "Moderada dificuldade", "Severa dificuldade"], required: true },
      { name: "olfato", label: "Olfato", type: "select", options: ["Normal", "Leve dificuldade", "Moderada dificuldade", "Severa dificuldade"], required: true },
      { name: "paladar", label: "Paladar", type: "select", options: ["Normal", "Leve dificuldade", "Moderada dificuldade", "Severa dificuldade"], required: true },
      { name: "tato", label: "Tato", type: "select", options: ["Normal", "Leve dificuldade", "Moderada dificuldade", "Severa dificuldade"], required: true },
      { name: "equilibrio", label: "Equilíbrio", type: "select", options: ["Normal", "Leve dificuldade", "Moderada dificuldade", "Severa dificuldade"], required: true }
    ]
  },

  // BLOCO 17: SISTEMA LINFÁTICO
  {
    id: 17,
    title: "Sistema Linfático",
    icon: <Activity className="w-6 h-6" />,
    description: "Avaliação do sistema linfático",
    fields: [
      { name: "linfonodos_aumentados", label: "Linfonodos aumentados", type: "select", options: ["Não", "Sim - recente", "Sim - antigo"], required: true },
      { name: "inchaço_linfatico", label: "Inchaço linfático", type: "select", options: ["Não", "Sim - leve", "Sim - moderado", "Sim - severo"], required: true },
      { name: "febre", label: "Febre", type: "select", options: ["Não", "Sim - baixa", "Sim - moderada", "Sim - alta"], required: true },
      { name: "sudorese", label: "Sudorese", type: "select", options: ["Normal", "Aumentada", "Diminuída"], required: true },
      { name: "calafrios", label: "Calafrios", type: "select", options: ["Não", "Sim - esporádicos", "Sim - frequentes"], required: true },
      { name: "mal_estar", label: "Mal-estar geral", type: "select", options: ["Não", "Sim - leve", "Sim - moderado", "Sim - severo"], required: true }
    ]
  },

  // BLOCO 18: SISTEMA REPRODUTIVO
  {
    id: 18,
    title: "Sistema Reprodutivo",
    icon: <Activity className="w-6 h-6" />,
    description: "Avaliação do sistema reprodutivo",
    fields: [
      { name: "menstruacao_regular", label: "Menstruação regular (mulheres)", type: "select", options: ["Sim", "Não", "Não se aplica"], required: false },
      { name: "dismenorreia", label: "Dismenorreia", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa", "Não se aplica"], required: false },
      { name: "menopausa", label: "Menopausa", type: "select", options: ["Não", "Sim - recente", "Sim - antiga", "Não se aplica"], required: false },
      { name: "libido", label: "Libido", type: "select", options: ["Normal", "Aumentada", "Diminuída"], required: true },
      { name: "disfuncao_eretil", label: "Disfunção erétil (homens)", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa", "Não se aplica"], required: false },
      { name: "infertilidade", label: "Problemas de fertilidade", type: "select", options: ["Não", "Sim - suspeita", "Sim - confirmada"], required: true }
    ]
  },

  // BLOCO 19: SISTEMA ENDÓCRINO REPRODUTIVO
  {
    id: 19,
    title: "Sistema Endócrino Reprodutivo",
    icon: <Activity className="w-6 h-6" />,
    description: "Avaliação hormonal reprodutiva",
    fields: [
      { name: "hormonios_reprodutivos", label: "Problemas hormonais reprodutivos", type: "select", options: ["Não", "Sim - leve", "Sim - moderado", "Sim - severo"], required: true },
      { name: "pcos", label: "Síndrome dos ovários policísticos", type: "select", options: ["Não", "Sim - suspeita", "Sim - confirmada", "Não se aplica"], required: false },
      { name: "endometriose", label: "Endometriose", type: "select", options: ["Não", "Sim - suspeita", "Sim - confirmada", "Não se aplica"], required: false },
      { name: "miomas", label: "Miomas", type: "select", options: ["Não", "Sim - suspeita", "Sim - confirmados", "Não se aplica"], required: false },
      { name: "prostata", label: "Problemas de próstata (homens)", type: "select", options: ["Não", "Sim - leve", "Sim - moderado", "Sim - severo", "Não se aplica"], required: false }
    ]
  },

  // BLOCO 20: SISTEMA GASTROINTESTINAL AVANÇADO
  {
    id: 20,
    title: "Sistema Gastrointestinal Avançado",
    icon: <Activity className="w-6 h-6" />,
    description: "Avaliação avançada do trato digestivo",
    fields: [
      { name: "sindrome_irritavel", label: "Síndrome do intestino irritável", type: "select", options: ["Não", "Sim - suspeita", "Sim - confirmada"], required: true },
      { name: "doenca_crohn", label: "Doença de Crohn", type: "select", options: ["Não", "Sim - suspeita", "Sim - confirmada"], required: true },
      { name: "colite_ulcerativa", label: "Colite ulcerativa", type: "select", options: ["Não", "Sim - suspeita", "Sim - confirmada"], required: true },
      { name: "celiaca", label: "Doença celíaca", type: "select", options: ["Não", "Sim - suspeita", "Sim - confirmada"], required: true },
      { name: "intolerancia_lactose", label: "Intolerância à lactose", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "refluxo_gastroesofagico", label: "Refluxo gastroesofágico", type: "select", options: ["Não", "Sim - leve", "Sim - moderado", "Sim - severo"], required: true }
    ]
  },

  // BLOCO 21: SISTEMA CARDIOVASCULAR AVANÇADO
  {
    id: 21,
    title: "Sistema Cardiovascular Avançado",
    icon: <Heart className="w-6 h-6" />,
    description: "Avaliação avançada do sistema cardiovascular",
    fields: [
      { name: "hipertensao", label: "Hipertensão", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "arritmia", label: "Arritmia", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "insuficiencia_cardiaca", label: "Insuficiência cardíaca", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "angina", label: "Angina", type: "select", options: ["Não", "Sim - estável", "Sim - instável"], required: true },
      { name: "infarto", label: "Infarto do miocárdio", type: "select", options: ["Não", "Sim - recente", "Sim - antigo"], required: true },
      { name: "acidente_vascular", label: "Acidente vascular cerebral", type: "select", options: ["Não", "Sim - recente", "Sim - antigo"], required: true }
    ]
  },

  // BLOCO 22: SISTEMA RESPIRATÓRIO AVANÇADO
  {
    id: 22,
    title: "Sistema Respiratório Avançado",
    icon: <Activity className="w-6 h-6" />,
    description: "Avaliação avançada do sistema respiratório",
    fields: [
      { name: "asma", label: "Asma", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "dpoc", label: "DPOC", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "enfisema", label: "Enfisema", type: "select", options: ["Não", "Sim - leve", "Sim - moderado", "Sim - severo"], required: true },
      { name: "bronquite_cronica", label: "Bronquite crônica", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "fibrose_pulmonar", label: "Fibrose pulmonar", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "apneia_sono", label: "Apneia do sono", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true }
    ]
  },

  // BLOCO 23: SISTEMA NEUROLÓGICO AVANÇADO
  {
    id: 23,
    title: "Sistema Neurológico Avançado",
    icon: <Brain className="w-6 h-6" />,
    description: "Avaliação avançada do sistema nervoso",
    fields: [
      { name: "epilepsia", label: "Epilepsia", type: "select", options: ["Não", "Sim - controlada", "Sim - não controlada"], required: true },
      { name: "parkinson", label: "Parkinson", type: "select", options: ["Não", "Sim - suspeita", "Sim - confirmada"], required: true },
      { name: "alzheimer", label: "Alzheimer", type: "select", options: ["Não", "Sim - suspeita", "Sim - confirmada"], required: true },
      { name: "esclerose_multipla", label: "Esclerose múltipla", type: "select", options: ["Não", "Sim - suspeita", "Sim - confirmada"], required: true },
      { name: "migranea", label: "Enxaqueca", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "neuralgia", label: "Neuralgia", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true }
    ]
  },

  // BLOCO 24: SISTEMA ENDÓCRINO AVANÇADO
  {
    id: 24,
    title: "Sistema Endócrino Avançado",
    icon: <Activity className="w-6 h-6" />,
    description: "Avaliação avançada do sistema endócrino",
    fields: [
      { name: "diabetes_tipo1", label: "Diabetes tipo 1", type: "select", options: ["Não", "Sim - controlada", "Sim - não controlada"], required: true },
      { name: "diabetes_tipo2", label: "Diabetes tipo 2", type: "select", options: ["Não", "Sim - controlada", "Sim - não controlada"], required: true },
      { name: "hipertireoidismo", label: "Hipertireoidismo", type: "select", options: ["Não", "Sim - leve", "Sim - moderado", "Sim - severo"], required: true },
      { name: "hipotireoidismo", label: "Hipotireoidismo", type: "select", options: ["Não", "Sim - leve", "Sim - moderado", "Sim - severo"], required: true },
      { name: "sindrome_cushing", label: "Síndrome de Cushing", type: "select", options: ["Não", "Sim - suspeita", "Sim - confirmada"], required: true },
      { name: "doenca_addison", label: "Doença de Addison", type: "select", options: ["Não", "Sim - suspeita", "Sim - confirmada"], required: true }
    ]
  },

  // BLOCO 25: SISTEMA IMUNOLÓGICO AVANÇADO
  {
    id: 25,
    title: "Sistema Imunológico Avançado",
    icon: <Shield className="w-6 h-6" />,
    description: "Avaliação avançada do sistema imunológico",
    fields: [
      { name: "lupus", label: "Lúpus", type: "select", options: ["Não", "Sim - suspeita", "Sim - confirmado"], required: true },
      { name: "artrite_reumatoide", label: "Artrite reumatoide", type: "select", options: ["Não", "Sim - suspeita", "Sim - confirmada"], required: true },
      { name: "esclerose_sistemica", label: "Esclerose sistêmica", type: "select", options: ["Não", "Sim - suspeita", "Sim - confirmada"], required: true },
      { name: "sindrome_sjogren", label: "Síndrome de Sjögren", type: "select", options: ["Não", "Sim - suspeita", "Sim - confirmada"], required: true },
      { name: "vasculite", label: "Vasculite", type: "select", options: ["Não", "Sim - suspeita", "Sim - confirmada"], required: true },
      { name: "imunodeficiencia", label: "Imunodeficiência", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true }
    ]
  },

  // BLOCO 26: SISTEMA ONCOLÓGICO
  {
    id: 26,
    title: "Sistema Oncológico",
    icon: <Activity className="w-6 h-6" />,
    description: "Avaliação oncológica e histórico de câncer",
    fields: [
      { name: "cancer_atual", label: "Câncer atual", type: "select", options: ["Não", "Sim - em tratamento", "Sim - em remissão"], required: true },
      { name: "cancer_anterior", label: "Câncer anterior", type: "select", options: ["Não", "Sim - curado", "Sim - em acompanhamento"], required: true },
      { name: "tipo_cancer", label: "Tipo de câncer", type: "text", required: false },
      { name: "estagio_cancer", label: "Estágio do câncer", type: "select", options: ["Não se aplica", "Estágio 1", "Estágio 2", "Estágio 3", "Estágio 4"], required: false },
      { name: "tratamento_oncologico", label: "Tratamento oncológico", type: "select", options: ["Não", "Quimioterapia", "Radioterapia", "Cirurgia", "Imunoterapia", "Combinado"], required: false },
      { name: "metastase", label: "Metástase", type: "select", options: ["Não", "Sim - local", "Sim - distante"], required: false }
    ]
  },

  // BLOCO 27: SISTEMA HEMATOLÓGICO AVANÇADO
  {
    id: 27,
    title: "Sistema Hematológico Avançado",
    icon: <Activity className="w-6 h-6" />,
    description: "Avaliação avançada do sistema hematológico",
    fields: [
      { name: "anemia_ferropriva", label: "Anemia ferropriva", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "anemia_megaloblastica", label: "Anemia megaloblástica", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "anemia_hemolitica", label: "Anemia hemolítica", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "leucemia", label: "Leucemia", type: "select", options: ["Não", "Sim - suspeita", "Sim - confirmada"], required: true },
      { name: "linfoma", label: "Linfoma", type: "select", options: ["Não", "Sim - suspeita", "Sim - confirmado"], required: true },
      { name: "mieloma", label: "Mieloma múltiplo", type: "select", options: ["Não", "Sim - suspeita", "Sim - confirmado"], required: true }
    ]
  },

  // BLOCO 28: SISTEMA RENAL
  {
    id: 28,
    title: "Sistema Renal",
    icon: <Activity className="w-6 h-6" />,
    description: "Avaliação do sistema renal",
    fields: [
      { name: "insuficiencia_renal", label: "Insuficiência renal", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "dialise", label: "Diálise", type: "select", options: ["Não", "Sim - hemodiálise", "Sim - diálise peritoneal"], required: true },
      { name: "transplante_renal", label: "Transplante renal", type: "select", options: ["Não", "Sim - recente", "Sim - antigo"], required: true },
      { name: "pedras_rim", label: "Pedras no rim", type: "select", options: ["Não", "Sim - recente", "Sim - antigo"], required: true },
      { name: "infeccao_urinaria", label: "Infecção urinária", type: "select", options: ["Não", "Sim - recente", "Sim - recorrente"], required: true },
      { name: "incontinencia_urina", label: "Incontinência urinária", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true }
    ]
  },

  // BLOCO 29: SISTEMA HEPÁTICO
  {
    id: 29,
    title: "Sistema Hepático",
    icon: <Activity className="w-6 h-6" />,
    description: "Avaliação do sistema hepático",
    fields: [
      { name: "hepatite", label: "Hepatite", type: "select", options: ["Não", "Sim - A", "Sim - B", "Sim - C", "Sim - outras"], required: true },
      { name: "cirrose", label: "Cirrose", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "esteatose", label: "Esteatose hepática", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "ictericia", label: "Icterícia", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "ascite", label: "Ascite", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "varizes_esofagicas", label: "Varizes esofágicas", type: "select", options: ["Não", "Sim - suspeita", "Sim - confirmadas"], required: true }
    ]
  },

  // BLOCO 30: SISTEMA MUSCULOESQUELÉTICO AVANÇADO
  {
    id: 30,
    title: "Sistema Musculoesquelético Avançado",
    icon: <Activity className="w-6 h-6" />,
    description: "Avaliação avançada do sistema musculoesquelético",
    fields: [
      { name: "artrose", label: "Artrose", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "artrite_reumatoide", label: "Artrite reumatoide", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "fibromialgia", label: "Fibromialgia", type: "select", options: ["Não", "Sim - suspeita", "Sim - confirmada"], required: true },
      { name: "lupus_eritematoso", label: "Lúpus eritematoso", type: "select", options: ["Não", "Sim - suspeita", "Sim - confirmado"], required: true },
      { name: "gota", label: "Gota", type: "select", options: ["Não", "Sim - suspeita", "Sim - confirmada"], required: true },
      { name: "osteoporose", label: "Osteoporose", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true }
    ]
  },

  // BLOCO 31: SISTEMA DERMATOLÓGICO AVANÇADO
  {
    id: 31,
    title: "Sistema Dermatológico Avançado",
    icon: <Activity className="w-6 h-6" />,
    description: "Avaliação avançada do sistema dermatológico",
    fields: [
      { name: "psoriase", label: "Psoríase", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "eczema", label: "Eczema", type: "select", options: ["Não", "Sim - leve", "Sim - moderado", "Sim - severo"], required: true },
      { name: "dermatite_atopica", label: "Dermatite atópica", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "vitiligo", label: "Vitiligo", type: "select", options: ["Não", "Sim - leve", "Sim - moderado", "Sim - severo"], required: true },
      { name: "lupus_cutaneo", label: "Lúpus cutâneo", type: "select", options: ["Não", "Sim - suspeita", "Sim - confirmado"], required: true },
      { name: "melanoma", label: "Melanoma", type: "select", options: ["Não", "Sim - suspeita", "Sim - confirmado"], required: true }
    ]
  },

  // BLOCO 32: SISTEMA PSIQUIÁTRICO AVANÇADO
  {
    id: 32,
    title: "Sistema Psiquiátrico Avançado",
    icon: <Brain className="w-6 h-6" />,
    description: "Avaliação avançada do sistema psiquiátrico",
    fields: [
      { name: "transtorno_ansiedade", label: "Transtorno de ansiedade", type: "select", options: ["Não", "Sim - leve", "Sim - moderado", "Sim - severo"], required: true },
      { name: "transtorno_bipolar", label: "Transtorno bipolar", type: "select", options: ["Não", "Sim - suspeita", "Sim - confirmado"], required: true },
      { name: "esquizofrenia", label: "Esquizofrenia", type: "select", options: ["Não", "Sim - suspeita", "Sim - confirmada"], required: true },
      { name: "toc", label: "TOC", type: "select", options: ["Não", "Sim - leve", "Sim - moderado", "Sim - severo"], required: true },
      { name: "ptsd", label: "TEPT", type: "select", options: ["Não", "Sim - leve", "Sim - moderado", "Sim - severo"], required: true },
      { name: "transtorno_alimentar", label: "Transtorno alimentar", type: "select", options: ["Não", "Sim - leve", "Sim - moderado", "Sim - severo"], required: true }
    ]
  },

  // BLOCO 33: SISTEMA SENSORIAL AVANÇADO
  {
    id: 33,
    title: "Sistema Sensorial Avançado",
    icon: <Activity className="w-6 h-6" />,
    description: "Avaliação avançada do sistema sensorial",
    fields: [
      { name: "glaucoma", label: "Glaucoma", type: "select", options: ["Não", "Sim - suspeita", "Sim - confirmado"], required: true },
      { name: "catarata", label: "Catarata", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "degeneracao_macular", label: "Degeneração macular", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "retinopatia", label: "Retinopatia", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "perda_audicao", label: "Perda de audição", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "tinnitus", label: "Tinnitus", type: "select", options: ["Não", "Sim - leve", "Sim - moderado", "Sim - severo"], required: true }
    ]
  },

  // BLOCO 34: SISTEMA LINFÁTICO AVANÇADO
  {
    id: 34,
    title: "Sistema Linfático Avançado",
    icon: <Activity className="w-6 h-6" />,
    description: "Avaliação avançada do sistema linfático",
    fields: [
      { name: "linfedema", label: "Linfedema", type: "select", options: ["Não", "Sim - leve", "Sim - moderado", "Sim - severo"], required: true },
      { name: "linfoma_hodgkin", label: "Linfoma de Hodgkin", type: "select", options: ["Não", "Sim - suspeita", "Sim - confirmado"], required: true },
      { name: "linfoma_nao_hodgkin", label: "Linfoma não-Hodgkin", type: "select", options: ["Não", "Sim - suspeita", "Sim - confirmado"], required: true },
      { name: "sindrome_metabolica", label: "Síndrome metabólica", type: "select", options: ["Não", "Sim - suspeita", "Sim - confirmada"], required: true },
      { name: "obesidade", label: "Obesidade", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "sindrome_apneia", label: "Síndrome da apneia do sono", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true }
    ]
  },

  // BLOCO 35: SISTEMA REPRODUTIVO AVANÇADO
  {
    id: 35,
    title: "Sistema Reprodutivo Avançado",
    icon: <Activity className="w-6 h-6" />,
    description: "Avaliação avançada do sistema reprodutivo",
    fields: [
      { name: "infertilidade_masculina", label: "Infertilidade masculina", type: "select", options: ["Não", "Sim - suspeita", "Sim - confirmada", "Não se aplica"], required: false },
      { name: "infertilidade_feminina", label: "Infertilidade feminina", type: "select", options: ["Não", "Sim - suspeita", "Sim - confirmada", "Não se aplica"], required: false },
      { name: "menopausa_precoce", label: "Menopausa precoce", type: "select", options: ["Não", "Sim - suspeita", "Sim - confirmada", "Não se aplica"], required: false },
      { name: "sindrome_ovario_policistico", label: "Síndrome dos ovários policísticos", type: "select", options: ["Não", "Sim - suspeita", "Sim - confirmada", "Não se aplica"], required: false },
      { name: "endometriose", label: "Endometriose", type: "select", options: ["Não", "Sim - suspeita", "Sim - confirmada", "Não se aplica"], required: false },
      { name: "miomas_uterinos", label: "Miomas uterinos", type: "select", options: ["Não", "Sim - suspeita", "Sim - confirmados", "Não se aplica"], required: false }
    ]
  },

  // BLOCO 36: SISTEMA ENDÓCRINO REPRODUTIVO AVANÇADO
  {
    id: 36,
    title: "Sistema Endócrino Reprodutivo Avançado",
    icon: <Activity className="w-6 h-6" />,
    description: "Avaliação avançada do sistema endócrino reprodutivo",
    fields: [
      { name: "hiperprolactinemia", label: "Hiperprolactinemia", type: "select", options: ["Não", "Sim - leve", "Sim - moderada", "Sim - severa"], required: true },
      { name: "hipogonadismo", label: "Hipogonadismo", type: "select", options: ["Não", "Sim - leve", "Sim - moderado", "Sim - severo"], required: true },
      { name: "sindrome_turner", label: "Síndrome de Turner", type: "select", options: ["Não", "Sim - suspeita", "Sim - confirmada", "Não se aplica"], required: false },
      { name: "sindrome_klinefelter", label: "Síndrome de Klinefelter", type: "select", options: ["Não", "Sim - suspeita", "Sim - confirmada", "Não se aplica"], required: false },
      { name: "hermafroditismo", label: "Hermafroditismo", type: "select", options: ["Não", "Sim - suspeita", "Sim - confirmado"], required: true },
      { name: "transtorno_identidade_genero", label: "Transtorno de identidade de gênero", type: "select", options: ["Não", "Sim - suspeita", "Sim - confirmado"], required: true }
    ]
  },

  // BLOCO 37: SISTEMA INTEGRATIVO E CANNABIS MEDICINAL
  {
    id: 37,
    title: "Sistema Integrativo e Cannabis Medicinal",
    icon: <Zap className="w-6 h-6" />,
    description: "Avaliação integrativa e uso de cannabis medicinal",
    fields: [
      { name: "cannabis_medicinal", label: "Uso de cannabis medicinal", type: "select", options: ["Não", "Sim - CBD", "Sim - THC", "Sim - ambos"], required: true },
      { name: "tipo_cannabis", label: "Tipo de cannabis", type: "select", options: ["Não se aplica", "Óleo", "Cápsulas", "Cremes", "Inalação", "Outros"], required: false },
      { name: "dosagem_cannabis", label: "Dosagem de cannabis", type: "text", required: false },
      { name: "frequencia_cannabis", label: "Frequência de uso", type: "select", options: ["Não se aplica", "Diário", "Semanal", "Mensal", "Conforme necessário"], required: false },
      { name: "efeitos_cannabis", label: "Efeitos da cannabis", type: "textarea", required: false },
      { name: "efeitos_colaterais", label: "Efeitos colaterais", type: "textarea", required: false },
      { name: "interacoes_medicamentosas", label: "Interações medicamentosas", type: "textarea", required: false },
      { name: "qualidade_vida", label: "Qualidade de vida", type: "select", options: ["Excelente", "Boa", "Regular", "Ruim", "Muito ruim"], required: true },
      { name: "satisfacao_tratamento", label: "Satisfação com o tratamento", type: "select", options: ["Muito satisfeito", "Satisfeito", "Neutro", "Insatisfeito", "Muito insatisfeito"], required: true },
      { name: "recomendaria", label: "Recomendaria o tratamento", type: "select", options: ["Sim", "Não", "Talvez"], required: true }
    ]
  }
]

export const IMRETriaxial: React.FC<IMRETriaxialProps> = ({ 
  userId, 
  patientId, 
  onComplete, 
  onProgress 
}) => {
  const [currentBlock, setCurrentBlock] = useState(1)
  const [assessmentData, setAssessmentData] = useState<Record<string, any>>({})
  const [assessment, setAssessment] = useState<IMREAssessment | null>(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  // Inicializar avaliação
  useEffect(() => {
    const initAssessment = async () => {
      setLoading(true)
      try {
        const { data, error } = await imreService.createAssessment(userId, patientId)
        if (error) throw error
        setAssessment(data)
        setCurrentBlock(data.current_block)
        setAssessmentData(data.data || {})
      } catch (error) {
        console.error('Erro ao inicializar avaliação:', error)
      } finally {
        setLoading(false)
      }
    }

    initAssessment()
  }, [userId, patientId])

  // Salvar progresso
  const saveProgress = async (blockData: any) => {
    if (!assessment) return

    setSaving(true)
    try {
      const updatedData = { ...assessmentData, ...blockData }
      const { data, error } = await imreService.updateAssessment(
        assessment.id, 
        updatedData, 
        currentBlock
      )
      
      if (error) throw error
      
      setAssessmentData(updatedData)
      setAssessment(data)
      
      if (onProgress) {
        onProgress(currentBlock, 37)
      }
    } catch (error) {
      console.error('Erro ao salvar progresso:', error)
    } finally {
      setSaving(false)
    }
  }

  // Navegar para próximo bloco
  const nextBlock = async () => {
    if (currentBlock < 37) {
      await saveProgress({})
      setCurrentBlock(currentBlock + 1)
    } else {
      // Finalizar avaliação
      await saveProgress({})
      if (onComplete && assessment) {
        onComplete(assessment)
      }
    }
  }

  // Navegar para bloco anterior
  const prevBlock = () => {
    if (currentBlock > 1) {
      setCurrentBlock(currentBlock - 1)
    }
  }

  // Renderizar campo do formulário
  const renderField = (field: any) => {
    const value = assessmentData[field.name] || ''

    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => setAssessmentData(prev => ({ ...prev, [field.name]: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={field.placeholder}
            required={field.required}
          />
        )
      
      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => setAssessmentData(prev => ({ ...prev, [field.name]: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            min={field.min}
            max={field.max}
            required={field.required}
          />
        )
      
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => setAssessmentData(prev => ({ ...prev, [field.name]: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required={field.required}
          >
            <option value="">Selecione...</option>
            {field.options?.map((option: string) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        )
      
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => setAssessmentData(prev => ({ ...prev, [field.name]: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            required={field.required}
          />
        )
      
      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <Brain className="w-12 h-12 text-blue-600 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Inicializando avaliação IMRE Triaxial...</p>
        </div>
      </div>
    )
  }

  const currentBlockData = IMRE_BLOCKS.find(block => block.id === currentBlock)
  if (!currentBlockData) return null

  const progress = (currentBlock / 37) * 100

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            {currentBlockData.icon}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {currentBlockData.title}
            </h2>
            <p className="text-gray-600">{currentBlockData.description}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Bloco {currentBlock} de 37</span>
            <span>{Math.round(progress)}% completo</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={(e) => { e.preventDefault(); nextBlock() }} className="space-y-6">
        <div className="grid gap-6">
          {currentBlockData.fields.map((field) => (
            <div key={field.name} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              {renderField(field)}
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-6 border-t">
          <button
            type="button"
            onClick={prevBlock}
            disabled={currentBlock === 1}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all",
              currentBlock === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            )}
          >
            <ChevronLeft size={20} />
            Anterior
          </button>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            {saving && (
              <>
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                Salvando...
              </>
            )}
          </div>

          <button
            type="submit"
            disabled={saving}
            className={cn(
              "flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all",
              saving
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            )}
          >
            {currentBlock === 37 ? (
              <>
                <CheckCircle size={20} />
                Finalizar
              </>
            ) : (
              <>
                Próximo
                <ChevronRight size={20} />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Block Navigation */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Navegação Rápida</h3>
        <div className="grid grid-cols-6 gap-2">
          {IMRE_BLOCKS.map((block) => (
            <button
              key={block.id}
              onClick={() => setCurrentBlock(block.id)}
              className={cn(
                "p-2 rounded-lg text-xs font-medium transition-all",
                currentBlock === block.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              {block.id}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
