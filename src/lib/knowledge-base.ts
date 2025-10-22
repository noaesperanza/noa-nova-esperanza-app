// =====================================================
// BASE DE CONHECIMENTO CENTRALIZADA - NÔA ESPERANZA
// Sistema de API Interna para Atualização Dinâmica
// =====================================================

export interface ConhecimentoItem {
  id: string;
  categoria: string;
  titulo: string;
  conteudo: string;
  tags: string[];
  versao: string;
  dataAtualizacao: Date;
  autor: string;
  prioridade: 'alta' | 'media' | 'baixa';
  ativo: boolean;
}

export interface CursoModulo {
  id: string;
  titulo: string;
  descricao: string;
  cargaHoraria: number;
  conteudo: string[];
  objetivos: string[];
  competencias: string[];
  metodologia: string;
  avaliacao: string;
  recursos: string[];
}

export class KnowledgeBase {
  private conhecimentos: ConhecimentoItem[] = [];
  private apiKey: string = 'noa_kb_internal_2025';
  private versao: string = '1.0.0';

  constructor() {
    this.inicializarBaseConhecimento();
  }

  private inicializarBaseConhecimento() {
    // 1. IDENTIDADE E MISSÃO DA NÔA ESPERANZA
    this.adicionarConhecimento({
      id: 'noa_identidade',
      categoria: 'identidade',
      titulo: 'Identidade da Nôa Esperanza',
      conteudo: `Nôa Esperanza é a IA Residente da plataforma MedCann Lab, especializada em Cannabis Medicinal Integrativa. 

MISSÃO: Ser a guardiã da escuta baseada na metodologia AEC (Arte da Entrevista Clínica), oferecendo suporte clínico, educacional e de pesquisa em cannabis medicinal.

ESPECIALIDADES:
• Cannabis Medicinal Integrativa
• Metodologia AEC (Arte da Entrevista Clínica)
• Sistema IMRE (Incentivador Mínimo do Relato Espontâneo)
• Medicina Integrativa e Práticas Complementares
• Pesquisa Científica em Cannabis

PERSONALIDADE: Profissional, empática, baseada em evidências científicas, sempre focada no bem-estar do paciente e na excelência clínica.`,
      tags: ['identidade', 'missao', 'especialidades'],
      versao: '1.0.0',
      dataAtualizacao: new Date(),
      autor: 'Dr. Ricardo Valença',
      prioridade: 'alta',
      ativo: true
    });

    // 2. CURSO PRINCIPAL - PÓS-GRADUAÇÃO
    this.adicionarConhecimento({
      id: 'pos_graduacao_principal',
      categoria: 'curso_principal',
      titulo: 'Curso de Pós-Graduação: Cannabis Medicinal Integrativa',
      conteudo: `CURSO PRINCIPAL DA PLATAFORMA MEDCANN LAB

DURAÇÃO: 12 meses | CARGA HORÁRIA: 520 horas
COORDENAÇÃO: Dr. Eduardo de Sá Campello Faveret

MÓDULOS PRINCIPAIS:
1. Fundamentos Históricos e Regulatórios da Cannabis
2. A Planta Cannabis: Botânica, Genética e Quimiotipos
3. Cultivo, Extração, Análise e Manufatura de Produtos
4. Sistema Endocanabinoide e Endocanabinoide Ampliado
5. Prescrição Prática de Produtos Canabinoides
6. Aplicações Terapêuticas por Especialidades Médicas
7. Integração com Nutrição, Fitoterapia e Práticas Integrativas
8. Casos Clínicos Integrativos e Interdisciplinares
9. Pesquisa Científica, Bioética e TCC
10. Inteligência Artificial na Clínica, Ensino e Pesquisa

METODOLOGIA: Aprendizado baseado em casos clínicos, discussões interdisciplinares, pesquisa científica e aplicação prática.

CERTIFICAÇÃO: Certificado de Especialização em Cannabis Medicinal Integrativa`,
      tags: ['curso_principal', 'pos_graduacao', 'cannabis_medicinal'],
      versao: '1.0.0',
      dataAtualizacao: new Date(),
      autor: 'Dr. Eduardo de Sá Campello Faveret',
      prioridade: 'alta',
      ativo: true
    });

    // 3. MÓDULO TRANSVERSAL - ARTE DA ENTREVISTA CLÍNICA
    this.adicionarConhecimento({
      id: 'arte_entrevista_transversal',
      categoria: 'modulo_transversal',
      titulo: 'Arte da Entrevista Clínica - Módulo Transversal',
      conteudo: `MÓDULO TRANSVERSAL INTEGRADO AO CURSO DE PÓS-GRADUAÇÃO

A Arte da Entrevista Clínica é um módulo transversal que permeia todos os 10 módulos do curso de Pós-Graduação em Cannabis Medicinal Integrativa.

FUNDAMENTOS:
• Metodologia AEC (Arte da Entrevista Clínica)
• Sistema IMRE (Incentivador Mínimo do Relato Espontâneo)
• Escuta profunda e ética
• Comunicação terapêutica
• Relação médico-paciente baseada em confiança

APLICAÇÃO TRANSVERSAL:
• Módulo 1: Entrevista para histórico de uso de cannabis
• Módulo 2: Comunicação sobre botânica e genética
• Módulo 3: Entrevista sobre cultivo e extração
• Módulo 4: Escuta sobre sistema endocanabinoide
• Módulo 5: Entrevista para prescrição personalizada
• Módulo 6: Comunicação por especialidades
• Módulo 7: Entrevista integrativa
• Módulo 8: Casos clínicos com metodologia AEC
• Módulo 9: Pesquisa com ética na comunicação
• Módulo 10: IA como ferramenta de escuta

COMPETÊNCIAS DESENVOLVIDAS:
• Escuta ativa e empática
• Comunicação não-violenta
• Técnicas de entrevista clínica
• Manejo de situações difíceis
• Documentação clínica ética`,
      tags: ['modulo_transversal', 'arte_entrevista', 'aec', 'imre'],
      versao: '1.0.0',
      dataAtualizacao: new Date(),
      autor: 'Dr. Ricardo Valença',
      prioridade: 'alta',
      ativo: true
    });

    // 4. SISTEMA IMRE DETALHADO
    this.adicionarConhecimento({
      id: 'sistema_imre_detalhado',
      categoria: 'metodologia',
      titulo: 'Sistema IMRE - 28 Blocos Canônicos',
      conteudo: `SISTEMA IMRE (INCENTIVADOR MÍNIMO DO RELATO ESPONTÂNEO)

O Sistema IMRE é composto por 28 blocos canônicos que guiam a entrevista clínica de forma estruturada e empática.

BLOCO 1 - ABERTURA:
"Olá! Eu sou Nôa Esperanza. Por favor, apresente-se também e vamos iniciar a sua avaliação inicial para consultas com Dr. Ricardo Valença."

BLOCO 2 - MOTIVO DETALHADO:
"O que trouxe você à nossa avaliação hoje?"

BLOCO 3 - MOTIVO EXTRA:
"O que mais?"

BLOCO 4 - QUEIXA PRINCIPAL:
"Qual dessas questões mais o(a) incomoda?"

[Continua com todos os 28 blocos...]

PRINCÍPIOS DO IMRE:
• Escuta sem julgamento
• Perguntas abertas
• Respeito ao tempo do paciente
• Documentação ética
• Foco no bem-estar

APLICAÇÃO CLÍNICA:
• Avaliação inicial
• Acompanhamento terapêutico
• Pesquisa clínica
• Educação médica`,
      tags: ['imre', 'metodologia', 'entrevista_clinica', '28_blocos'],
      versao: '1.0.0',
      dataAtualizacao: new Date(),
      autor: 'Dr. Ricardo Valença',
      prioridade: 'alta',
      ativo: true
    });

    // 5. SISTEMA DE CLASSIFICAÇÃO RENAL
    this.adicionarConhecimento({
      id: 'classificacao_renal',
      categoria: 'metodologia',
      titulo: 'Sistema de Classificação Renal para Cannabis Medicinal',
      conteudo: `SISTEMA DE CLASSIFICAÇÃO RENAL INTEGRADO

O sistema de classificação renal da Nôa Esperanza avalia a função renal para determinar a segurança e adequação do uso de cannabis medicinal.

ESTÁGIOS DA DOENÇA RENAL:
• Estágio 1: Função Renal Normal (GFR ≥ 90)
• Estágio 2: Insuficiência Renal Leve (GFR 60-89)
• Estágio 3: Insuficiência Renal Moderada (GFR 30-59)
• Estágio 4: Insuficiência Renal Grave (GFR 15-29)
• Estágio 5: Insuficiência Renal Terminal (GFR < 15)

AVALIAÇÃO INTEGRADA:
• Creatinina sérica
• Ureia
• Proteinúria
• Hematuria
• Pressão arterial
• Comorbidades (diabetes, hipertensão)

RECOMENDAÇÕES POR ESTÁGIO:
• Estágios 1-2: Uso seguro com precauções
• Estágio 3: Uso com monitoramento rigoroso
• Estágios 4-5: Uso contraindicado ou muito restrito

INTEGRAÇÃO COM IMRE:
• Blocos específicos para coleta de dados renais
• Classificação automática baseada em exames
• Recomendações personalizadas para cannabis`,
      tags: ['classificacao_renal', 'cannabis_medicinal', 'nefrologia', 'seguranca'],
      versao: '1.0.0',
      dataAtualizacao: new Date(),
      autor: 'Dr. Ricardo Valença',
      prioridade: 'alta',
      ativo: true
    });

    // 6. CONHECIMENTO ESPECÍFICO POR MÓDULOS
    this.inicializarConhecimentoModulos();
  }

  private inicializarConhecimentoModulos() {
    const modulos = [
      {
        id: 'modulo_1',
        titulo: 'Fundamentos Históricos e Regulatórios da Cannabis',
        conteudo: `CONTEÚDO DETALHADO DO MÓDULO 1

HISTÓRIA DA CANNABIS:
• China (2700 a.C.): Primeiro registro medicinal
• Índia: Uso no Ayurveda e medicina tradicional
• Oriente Médio: Medicina islâmica medieval
• Europa: Uso medicinal até século XIX
• Américas: Proibição e redescoberta

LEGISLAÇÃO BRASILEIRA:
• RDC 327/2019: Regulamentação da prescrição
• Processo de judicialização
• Importação e distribuição
• Monitoramento e farmacovigilância

CONTEXTO INTERNACIONAL:
• OMS: Reclassificação da cannabis
• ONU: Convenções internacionais
• FDA: Aprovações nos EUA
• EMA: Regulamentação europeia

APLICAÇÃO CLÍNICA:
• Entrevista sobre histórico de uso
• Educação do paciente sobre legalidade
• Documentação adequada
• Consentimento informado`
      },
      {
        id: 'modulo_2',
        titulo: 'A Planta Cannabis: Botânica, Genética e Quimiotipos',
        conteudo: `CONTEÚDO DETALHADO DO MÓDULO 2

BOTÂNICA DA CANNABIS:
• Anatomia: raiz, caule, folhas, flores
• Fisiologia: fotossíntese, crescimento
• Ciclo de vida: vegetativo e reprodutivo
• Fatores ambientais: luz, temperatura, umidade

GENÉTICA:
• Cannabis sativa: efeitos energizantes
• Cannabis indica: efeitos relaxantes
• Cannabis ruderalis: autoflorescente
• Híbridos: combinações genéticas

QUIMIOTIPOS:
• Tipo I: THC dominante
• Tipo II: THC/CBD balanceado
• Tipo III: CBD dominante
• Terpenos: limoneno, mirceno, linalol

APLICAÇÃO CLÍNICA:
• Seleção de cultivares
• Entendimento de efeitos
• Personalização terapêutica
• Monitoramento de resposta`
      }
    ];

    modulos.forEach((modulo, index) => {
      this.adicionarConhecimento({
        id: modulo.id,
        categoria: 'modulo_curso',
        titulo: modulo.titulo,
        conteudo: modulo.conteudo,
        tags: [`modulo_${index + 1}`, 'cannabis', 'botanica', 'genetica'],
        versao: '1.0.0',
        dataAtualizacao: new Date(),
        autor: 'Dr. Eduardo de Sá Campello Faveret',
        prioridade: 'media',
        ativo: true
      });
    });
  }

  // Métodos da API Interna
  adicionarConhecimento(item: Omit<ConhecimentoItem, 'dataAtualizacao'>) {
    const conhecimento: ConhecimentoItem = {
      ...item,
      dataAtualizacao: new Date()
    };
    this.conhecimentos.push(conhecimento);
  }

  atualizarConhecimento(id: string, atualizacoes: Partial<ConhecimentoItem>, apiKey: string) {
    if (apiKey !== this.apiKey) {
      throw new Error('API Key inválida');
    }

    const index = this.conhecimentos.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error('Conhecimento não encontrado');
    }

    this.conhecimentos[index] = {
      ...this.conhecimentos[index],
      ...atualizacoes,
      dataAtualizacao: new Date()
    };
  }

  buscarConhecimento(termo: string, categoria?: string): ConhecimentoItem[] {
    return this.conhecimentos.filter(c => 
      c.ativo && 
      (categoria ? c.categoria === categoria : true) &&
      (c.titulo.toLowerCase().includes(termo.toLowerCase()) ||
       c.conteudo.toLowerCase().includes(termo.toLowerCase()) ||
       c.tags.some(tag => tag.toLowerCase().includes(termo.toLowerCase())))
    );
  }

  obterConhecimentoPorCategoria(categoria: string): ConhecimentoItem[] {
    return this.conhecimentos.filter(c => c.ativo && c.categoria === categoria);
  }

  obterTodosConhecimentos(): ConhecimentoItem[] {
    return this.conhecimentos.filter(c => c.ativo);
  }

  obterEstatisticas() {
    return {
      total: this.conhecimentos.length,
      ativos: this.conhecimentos.filter(c => c.ativo).length,
      categorias: [...new Set(this.conhecimentos.map(c => c.categoria))],
      versao: this.versao,
      ultimaAtualizacao: new Date()
    };
  }

  // Método para a IA Residente acessar conhecimento
  obterRespostaInteligente(pergunta: string): string {
    const perguntaLower = pergunta.toLowerCase();
    
    // Busca por categoria específica
    if (perguntaLower.includes('curso') || perguntaLower.includes('pós-graduação')) {
      const curso = this.obterConhecimentoPorCategoria('curso_principal')[0];
      return curso ? curso.conteudo : 'Informação não encontrada';
    }
    
    if (perguntaLower.includes('arte da entrevista') || perguntaLower.includes('aec')) {
      const aec = this.obterConhecimentoPorCategoria('modulo_transversal')[0];
      return aec ? aec.conteudo : 'Informação não encontrada';
    }
    
    if (perguntaLower.includes('imre') || perguntaLower.includes('entrevista clínica')) {
      const imre = this.obterConhecimentoPorCategoria('metodologia')[0];
      return imre ? imre.conteudo : 'Informação não encontrada';
    }
    
    // Busca geral
    const resultados = this.buscarConhecimento(pergunta);
    if (resultados.length > 0) {
      return resultados[0].conteudo;
    }
    
    return 'Como guardiã da escuta baseada na metodologia AEC, posso ajudá-lo(a) com informações sobre cannabis medicinal, metodologia de entrevista clínica, ou o curso de Pós-Graduação. Como posso apoiá-lo(a) especificamente?';
  }
}

// Instância global da base de conhecimento
export const knowledgeBase = new KnowledgeBase();
