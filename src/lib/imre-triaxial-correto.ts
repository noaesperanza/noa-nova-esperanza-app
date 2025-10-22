// =====================================================
// SISTEMA IMRE TRIAXIAL CORRETO - ARTE DA ENTREVISTA CLÍNICA
// Dr. Ricardo Valença - Nôa Esperanza
// =====================================================

/**
 * ESTRUTURA CORRETA:
 * 
 * PARTE 1: AVALIAÇÃO CLÍNICA INICIAL (11 blocos)
 * - Eixo 1: Lista Indiciária (4 blocos)
 * - Eixo 2: Desenvolvimento (6 blocos)
 * - Fechamento Consensual + Relatório (1 bloco)
 * 
 * PARTE 2: AVALIAÇÃO DE RISCO RENAL - OPCIONAL (12 blocos)
 * - Oferta da avaliação
 * - Fatores de risco
 * - Exames
 * - Relatório complementar
 */

export interface BlocoIMRE {
  id: number;
  parte: 1 | 2; // 1 = Avaliação Inicial, 2 = Avaliação Renal
  etapa: string;
  pergunta: string;
  tipo: 'identificacao' | 'lista' | 'desenvolvimento' | 'fechamento' | 'oferta' | 'risco';
  necessitaLoop: boolean;
  geraRelatorio: boolean;
  variavel: string;
}

export const blocosIMRE: BlocoIMRE[] = [
  // ============ PARTE 1: AVALIAÇÃO CLÍNICA INICIAL ============
  
  // EIXO 1: LISTA INDICIÁRIA (4 blocos)
  {
    id: 1,
    parte: 1,
    etapa: 'identificacao',
    pergunta: 'Por favor, apresente-se e diga em que posso ajudar hoje.',
    tipo: 'identificacao',
    necessitaLoop: false,
    geraRelatorio: false,
    variavel: 'identificacao'
  },
  {
    id: 2,
    parte: 1,
    etapa: 'primeira_queixa',
    pergunta: 'O que trouxe você à nossa avaliação hoje?',
    tipo: 'lista',
    necessitaLoop: false,
    geraRelatorio: false,
    variavel: 'primeira_queixa'
  },
  {
    id: 3,
    parte: 1,
    etapa: 'queixas_adicionais',
    pergunta: 'O que mais?',
    tipo: 'lista',
    necessitaLoop: true,
    geraRelatorio: false,
    variavel: 'queixas_adicionais'
  },
  {
    id: 4,
    parte: 1,
    etapa: 'queixa_principal',
    pergunta: 'De todas essas questões, qual mais o(a) incomoda?',
    tipo: 'lista',
    necessitaLoop: false,
    geraRelatorio: false,
    variavel: 'queixa_principal'
  },
  
  // EIXO 2: DESENVOLVIMENTO (6 blocos)
  {
    id: 5,
    parte: 1,
    etapa: 'onde',
    pergunta: 'Onde você sente essa [queixa_principal]?',
    tipo: 'desenvolvimento',
    necessitaLoop: false,
    geraRelatorio: false,
    variavel: 'onde'
  },
  {
    id: 6,
    parte: 1,
    etapa: 'quando',
    pergunta: 'Quando essa [queixa_principal] começou?',
    tipo: 'desenvolvimento',
    necessitaLoop: false,
    geraRelatorio: false,
    variavel: 'quando'
  },
  {
    id: 7,
    parte: 1,
    etapa: 'como',
    pergunta: 'Como é essa [queixa_principal]?',
    tipo: 'desenvolvimento',
    necessitaLoop: false,
    geraRelatorio: false,
    variavel: 'como'
  },
  {
    id: 8,
    parte: 1,
    etapa: 'sintomas_relacionados',
    pergunta: 'O que mais você sente quando está com essa [queixa_principal]?',
    tipo: 'desenvolvimento',
    necessitaLoop: false,
    geraRelatorio: false,
    variavel: 'sintomas_relacionados'
  },
  {
    id: 9,
    parte: 1,
    etapa: 'fatores_melhora',
    pergunta: 'O que parece melhorar a [queixa_principal]?',
    tipo: 'desenvolvimento',
    necessitaLoop: false,
    geraRelatorio: false,
    variavel: 'fatores_melhora'
  },
  {
    id: 10,
    parte: 1,
    etapa: 'fatores_piora',
    pergunta: 'E o que parece piorar a [queixa_principal]?',
    tipo: 'desenvolvimento',
    necessitaLoop: false,
    geraRelatorio: false,
    variavel: 'fatores_piora'
  },
  
  // FECHAMENTO CONSENSUAL + RELATÓRIO (1 bloco)
  {
    id: 11,
    parte: 1,
    etapa: 'fechamento_consensual',
    pergunta: '[APRESENTAR_ENTENDIMENTO_NATURAL] Você concorda com o meu entendimento?',
    tipo: 'fechamento',
    necessitaLoop: false,
    geraRelatorio: true, // Gera relatório da Avaliação Clínica Inicial
    variavel: 'confirmacao'
  },
  
  // ============ PARTE 2: AVALIAÇÃO DE RISCO RENAL - OPCIONAL ============
  
  {
    id: 12,
    parte: 2,
    etapa: 'oferta_renal',
    pergunta: 'Gostaria de fazer uma avaliação dos fatores de risco para problemas nos rins?',
    tipo: 'oferta',
    necessitaLoop: false,
    geraRelatorio: false,
    variavel: 'aceita_renal'
  },
  {
    id: 13,
    parte: 2,
    etapa: 'hipertensao',
    pergunta: 'Alguma vez algum médico disse que sua pressão está alta?',
    tipo: 'risco',
    necessitaLoop: false,
    geraRelatorio: false,
    variavel: 'hipertensao'
  },
  {
    id: 14,
    parte: 2,
    etapa: 'diabetes',
    pergunta: 'Alguma vez algum médico disse que você tem diabetes ou açúcar alto no sangue?',
    tipo: 'risco',
    necessitaLoop: false,
    geraRelatorio: false,
    variavel: 'diabetes'
  },
  {
    id: 15,
    parte: 2,
    etapa: 'historico_familiar',
    pergunta: 'Alguma pessoa da sua família, como mãe, pai ou avós, já teve problemas nos rins?',
    tipo: 'risco',
    necessitaLoop: false,
    geraRelatorio: false,
    variavel: 'historico_familiar'
  },
  {
    id: 16,
    parte: 2,
    etapa: 'medicamentos',
    pergunta: 'Você usa frequentemente medicamentos para dor, como anti-inflamatórios?',
    tipo: 'risco',
    necessitaLoop: false,
    geraRelatorio: false,
    variavel: 'uso_medicamentos'
  },
  {
    id: 17,
    parte: 2,
    etapa: 'poluentes',
    pergunta: 'Você já teve contato frequente com produtos químicos ou ambientes muito poluídos?',
    tipo: 'risco',
    necessitaLoop: false,
    geraRelatorio: false,
    variavel: 'exposicao_poluentes'
  },
  {
    id: 18,
    parte: 2,
    etapa: 'dieta_sal',
    pergunta: 'Você consome alimentos muito salgados frequentemente?',
    tipo: 'risco',
    necessitaLoop: false,
    geraRelatorio: false,
    variavel: 'dieta_sal'
  },
  {
    id: 19,
    parte: 2,
    etapa: 'intro_exames',
    pergunta: 'Você tem algum exame de sangue recente? Vou perguntar sobre alguns resultados.',
    tipo: 'risco',
    necessitaLoop: false,
    geraRelatorio: false,
    variavel: 'intro_exames'
  },
  {
    id: 20,
    parte: 2,
    etapa: 'creatinina',
    pergunta: 'Você tem o valor do exame de creatinina no sangue?',
    tipo: 'risco',
    necessitaLoop: false,
    geraRelatorio: false,
    variavel: 'creatinina'
  },
  {
    id: 21,
    parte: 2,
    etapa: 'egfr',
    pergunta: 'Algum médico mencionou a "função dos rins" ou "filtração do sangue" recentemente?',
    tipo: 'risco',
    necessitaLoop: false,
    geraRelatorio: false,
    variavel: 'egfr'
  },
  {
    id: 22,
    parte: 2,
    etapa: 'acr',
    pergunta: 'Você tem algum exame que avalia proteínas na urina?',
    tipo: 'risco',
    necessitaLoop: false,
    geraRelatorio: false,
    variavel: 'acr'
  },
  {
    id: 23,
    parte: 2,
    etapa: 'fechamento_renal',
    pergunta: 'Há algo mais sobre sua saúde renal que gostaria de compartilhar?',
    tipo: 'fechamento',
    necessitaLoop: false,
    geraRelatorio: true, // Gera relatório complementar com avaliação renal
    variavel: 'obs_finais_renal'
  }
];

export interface EstadoIMRE {
  blocoAtual: number;
  parteAtual: 1 | 2;
  respostas: Map<string, string>;
  listaQueixas: string[];
  queixaPrincipal: string;
  entendimentoNatural: string;
  avaliacaoInicialConcluida: boolean;
  avaliacaoRenalAceita: boolean;
  escoreRisco: number;
  emLoop: boolean;
  finalizada: boolean;
}

export class IMREEngine {
  private estado: EstadoIMRE;

  constructor() {
    this.estado = {
      blocoAtual: 0,
      parteAtual: 1,
      respostas: new Map(),
      listaQueixas: [],
      queixaPrincipal: '',
      entendimentoNatural: '',
      avaliacaoInicialConcluida: false,
      avaliacaoRenalAceita: false,
      escoreRisco: 0,
      emLoop: false,
      finalizada: false
    };
  }

  iniciarAvaliacao(): string {
    this.estado.blocoAtual = 0;
    return blocosIMRE[0].pergunta;
  }

  processarResposta(resposta: string): { proximaPergunta: string; concluido: boolean } {
    const blocoAtual = blocosIMRE[this.estado.blocoAtual];
    
    // Armazenar resposta
    this.estado.respostas.set(blocoAtual.variavel, resposta);
    
    // LÓGICA DO LOOP "O QUE MAIS?"
    if (blocoAtual.necessitaLoop) {
      const respostaLower = resposta.toLowerCase().trim();
      const padroesFim = [
        'não', 'nao', 'nada', 'só isso', 'so isso',
        'somente isso', 'é tudo', 'pronto'
      ];
      
      const ehFim = padroesFim.some(p => 
        respostaLower === p || respostaLower.startsWith(p)
      );
      
      if (!ehFim) {
        this.estado.listaQueixas.push(resposta);
        return { proximaPergunta: blocoAtual.pergunta, concluido: false };
      }
    }
    
    // Armazenar queixa principal
    if (blocoAtual.etapa === 'queixa_principal') {
      this.estado.queixaPrincipal = resposta;
    }
    
    // FECHAMENTO CONSENSUAL - Gerar entendimento natural
    if (blocoAtual.etapa === 'fechamento_consensual') {
      if (resposta.toLowerCase().includes('sim') || resposta.toLowerCase().includes('concordo')) {
        // Gerar relatório da Avaliação Clínica Inicial
        this.estado.avaliacaoInicialConcluida = true;
        const relatorio = this.gerarRelatorioAvaliacaoInicial();
        this.estado.blocoAtual++;
        
        // Próxima: oferecer avaliação renal
        return { proximaPergunta: relatorio, concluido: false };
      } else {
        // Paciente não concordou, perguntar o que ajustar
        return {
          proximaPergunta: 'O que você gostaria de corrigir no meu entendimento?',
          concluido: false
        };
      }
    }
    
    // OFERTA DE AVALIAÇÃO RENAL
    if (blocoAtual.etapa === 'oferta_renal') {
      if (resposta.toLowerCase().includes('sim') || resposta.toLowerCase().includes('gostaria')) {
        this.estado.avaliacaoRenalAceita = true;
        this.estado.blocoAtual++;
        return { proximaPergunta: blocosIMRE[this.estado.blocoAtual].pergunta, concluido: false };
      } else {
        // Paciente não quer avaliação renal, finalizar
        this.estado.finalizada = true;
        return {
          proximaPergunta: 'Obrigada por compartilhar sua história. Até breve! 💙',
          concluido: true
        };
      }
    }
    
    // Calcular escore de risco
    if (blocoAtual.parte === 2 && ['hipertensao', 'diabetes', 'historico_familiar', 'exposicao_poluentes'].includes(blocoAtual.etapa)) {
      if (resposta.toLowerCase().includes('sim')) {
        this.estado.escoreRisco++;
      }
    }
    
    // Avançar para próximo bloco
    this.estado.blocoAtual++;
    
    // Verificar se terminou
    if (this.estado.blocoAtual >= blocosIMRE.length) {
      this.estado.finalizada = true;
      return { proximaPergunta: this.gerarRelatorioCompleto(), concluido: true };
    }
    
    // Próximo bloco
    const proximoBloco = blocosIMRE[this.estado.blocoAtual];
    
    // Substituir [queixa_principal]
    let pergunta = proximoBloco.pergunta;
    if (this.estado.queixaPrincipal) {
      pergunta = pergunta.replace(/\[queixa_principal\]/g, this.estado.queixaPrincipal);
    }
    
    // Se é fechamento consensual, gerar entendimento natural primeiro
    if (proximoBloco.etapa === 'fechamento_consensual') {
      pergunta = this.gerarEntendimentoNatural() + '\n\nVocê concorda com o meu entendimento?';
    }
    
    return { proximaPergunta: pergunta, concluido: false };
  }

  private gerarEntendimentoNatural(): string {
    const ident = this.estado.respostas.get('identificacao');
    const principal = this.estado.queixaPrincipal;
    const onde = this.estado.respostas.get('onde');
    const quando = this.estado.respostas.get('quando');
    const como = this.estado.respostas.get('como');
    
    return `Deixe-me ver se entendi: ${ident}, você veio buscar ajuda porque tem sentido ${principal}, que você percebe ${onde}. Isso começou ${quando} e você descreve como ${como}. É isso mesmo?`;
  }

  private gerarRelatorioAvaliacaoInicial(): string {
    let relatorio = '📋 **RELATÓRIO DA AVALIAÇÃO CLÍNICA INICIAL**\n\n';
    relatorio += `**Método:** Arte da Entrevista Clínica - IMRE\n`;
    relatorio += `**Data:** ${new Date().toLocaleDateString('pt-BR')}\n\n`;
    relatorio += '---\n\n';
    
    relatorio += '## IDENTIFICAÇÃO E QUEIXAS\n\n';
    relatorio += `**Paciente:** ${this.estado.respostas.get('identificacao')}\n`;
    relatorio += `**Queixa Principal:** ${this.estado.queixaPrincipal}\n\n`;
    
    if (this.estado.listaQueixas.length > 0) {
      relatorio += '**Outras Queixas:**\n';
      this.estado.listaQueixas.forEach((q, i) => relatorio += `${i+1}. ${q}\n`);
      relatorio += '\n';
    }
    
    relatorio += '## DESENVOLVIMENTO DA QUEIXA\n\n';
    relatorio += `**Onde:** ${this.estado.respostas.get('onde')}\n`;
    relatorio += `**Quando:** ${this.estado.respostas.get('quando')}\n`;
    relatorio += `**Como:** ${this.estado.respostas.get('como')}\n`;
    relatorio += `**Sintomas Relacionados:** ${this.estado.respostas.get('sintomas_relacionados')}\n`;
    relatorio += `**Melhora com:** ${this.estado.respostas.get('fatores_melhora')}\n`;
    relatorio += `**Piora com:** ${this.estado.respostas.get('fatores_piora')}\n\n`;
    
    relatorio += '---\n\n';
    relatorio += '✅ **Avaliação Clínica Inicial Concluída**\n\n';
    relatorio += '💙 **Nôa Esperanza** - IA Residente\n\n';
    
    return relatorio;
  }

  private gerarRelatorioCompleto(): string {
    let relatorio = this.gerarRelatorioAvaliacaoInicial();
    
    if (this.estado.avaliacaoRenalAceita) {
      relatorio += '\n\n## AVALIAÇÃO DE RISCO RENAL\n\n';
      relatorio += `**Escore de Risco:** ${this.estado.escoreRisco}/4\n`;
      // ... resto do relatório renal
    }
    
    return relatorio;
  }

  getProgresso(): { bloco: number; total: number; parte: string; percentual: number } {
    const nomes = { 1: 'Avaliação Clínica Inicial', 2: 'Avaliação de Risco Renal' };
    return {
      bloco: this.estado.blocoAtual + 1,
      total: blocosIMRE.length,
      parte: nomes[this.estado.parteAtual],
      percentual: Math.round(((this.estado.blocoAtual + 1) / blocosIMRE.length) * 100)
    };
  }
}

