// =====================================================
// SISTEMA IMRE TRIAXIAL - ARTE DA ENTREVISTA CLÍNICA
// Dr. Ricardo Valença - Nôa Esperanza
// =====================================================

/**
 * ESTRUTURA TRIAXIAL DO IMRE:
 * 
 * EIXO 1: ABERTURA E IDENTIFICAÇÃO DA LISTA INDICIÁRIA
 * - Identificação do paciente
 * - "O que trouxe você à nossa avaliação hoje?"
 * - "O que mais?" (até não haver mais queixas)
 * - "De todas essas questões, qual mais o(a) incomoda?"
 * 
 * EIXO 2: DESENVOLVIMENTO INDICIÁRIO
 * - Desenvolvimento da queixa principal
 * - O que? Onde? Quando? Como?
 * - Sintomas relacionados
 * - Fatores de alívio e agravamento
 * 
 * EIXO 3: AVALIAÇÃO DE RISCO (DRC ou outros)
 * - Fatores de risco específicos
 * - Resultados laboratoriais
 * - Fechamento consensual
 * - Geração do relatório
 */

export interface BlocoTriaxial {
  id: number;
  eixo: 1 | 2 | 3;
  etapa: string;
  pergunta: string;
  tipo: 'identificacao' | 'lista_indiciaria' | 'desenvolvimento' | 'risco' | 'fechamento';
  necessitaLoop: boolean;
  variavel: string;
}

// ESTRUTURA COMPLETA DO IMRE TRIAXIAL
export const blocosTriaxiais: BlocoTriaxial[] = [
  // ========== EIXO 1: ABERTURA E LISTA INDICIÁRIA ==========
  {
    id: 1,
    eixo: 1,
    etapa: 'identificacao',
    pergunta: 'Por favor, apresente-se e diga em que posso ajudar hoje.',
    tipo: 'identificacao',
    necessitaLoop: false,
    variavel: 'identificacao'
  },
  {
    id: 2,
    eixo: 1,
    etapa: 'queixas_inicial',
    pergunta: 'O que trouxe você à nossa avaliação hoje?',
    tipo: 'lista_indiciaria',
    necessitaLoop: false,
    variavel: 'primeira_queixa'
  },
  {
    id: 3,
    eixo: 1,
    etapa: 'queixas_adicional',
    pergunta: 'O que mais?',
    tipo: 'lista_indiciaria',
    necessitaLoop: true, // Repete até paciente dizer que não tem mais
    variavel: 'queixas_adicionais'
  },
  {
    id: 4,
    eixo: 1,
    etapa: 'queixa_principal',
    pergunta: 'De todas essas questões, qual mais o(a) incomoda?',
    tipo: 'lista_indiciaria',
    necessitaLoop: false,
    variavel: 'queixa_principal'
  },

  // ========== EIXO 2: DESENVOLVIMENTO INDICIÁRIO ==========
  // O "QUÊ" já foi respondido no Eixo 1 (Lista Indiciária)
  // Começamos direto com ONDE
  {
    id: 5,
    eixo: 2,
    etapa: 'onde',
    pergunta: 'Onde você sente essa [queixa_principal]?',
    tipo: 'desenvolvimento',
    necessitaLoop: false,
    variavel: 'onde'
  },
  {
    id: 6,
    eixo: 2,
    etapa: 'quando',
    pergunta: 'Quando essa [queixa_principal] começou?',
    tipo: 'desenvolvimento',
    necessitaLoop: false,
    variavel: 'quando'
  },
  {
    id: 7,
    eixo: 2,
    etapa: 'como',
    pergunta: 'Como é essa [queixa_principal]?',
    tipo: 'desenvolvimento',
    necessitaLoop: false,
    variavel: 'como'
  },
  {
    id: 8,
    eixo: 2,
    etapa: 'sintomas_relacionados',
    pergunta: 'O que mais você sente quando está com essa [queixa_principal]?',
    tipo: 'desenvolvimento',
    necessitaLoop: false,
    variavel: 'sintomas_relacionados'
  },
  {
    id: 9,
    eixo: 2,
    etapa: 'fatores_melhora',
    pergunta: 'O que parece melhorar a [queixa_principal]?',
    tipo: 'desenvolvimento',
    necessitaLoop: false,
    variavel: 'fatores_melhora'
  },
  {
    id: 10,
    eixo: 2,
    etapa: 'fatores_piora',
    pergunta: 'E o que parece piorar a [queixa_principal]?',
    tipo: 'desenvolvimento',
    necessitaLoop: false,
    variavel: 'fatores_piora'
  },
  
  // ========== HISTÓRIA PATOLÓGICA PREGRESSA ==========
  {
    id: 11,
    eixo: 2,
    etapa: 'historia_patologica',
    pergunta: 'E sobre o restante da sua vida até aqui, desde seu nascimento, quais as questões de saúde que você já viveu? Vamos ordenar do mais antigo para o mais recente; O que veio primeiro?',
    tipo: 'desenvolvimento',
    necessitaLoop: false,
    variavel: 'historia_patologica_primeiro'
  },
  {
    id: 12,
    eixo: 2,
    etapa: 'historia_patologica_loop',
    pergunta: 'O que mais?',
    tipo: 'desenvolvimento',
    necessitaLoop: true,
    variavel: 'historia_patologica_adicional'
  },
  
  // ========== HISTÓRIA FAMILIAR ==========
  {
    id: 13,
    eixo: 2,
    etapa: 'historia_familiar_materna',
    pergunta: 'E na sua família? Começando pela parte de sua mãe, quais as questões de saúde dela e desse lado da família?',
    tipo: 'desenvolvimento',
    necessitaLoop: false,
    variavel: 'familia_materna_primeira'
  },
  {
    id: 14,
    eixo: 2,
    etapa: 'historia_familiar_materna_loop',
    pergunta: 'O que mais?',
    tipo: 'desenvolvimento',
    necessitaLoop: true,
    variavel: 'familia_materna_adicional'
  },
  {
    id: 15,
    eixo: 2,
    etapa: 'historia_familiar_paterna',
    pergunta: 'E por parte de seu pai?',
    tipo: 'desenvolvimento',
    necessitaLoop: false,
    variavel: 'familia_paterna_primeira'
  },
  {
    id: 16,
    eixo: 2,
    etapa: 'historia_familiar_paterna_loop',
    pergunta: 'O que mais?',
    tipo: 'desenvolvimento',
    necessitaLoop: true,
    variavel: 'familia_paterna_adicional'
  },
  
  // ========== HÁBITOS DE VIDA ==========
  {
    id: 17,
    eixo: 2,
    etapa: 'habitos_vida',
    pergunta: 'Além dos hábitos de vida que já verificamos em nossa conversa, que outros hábitos você acha importante mencionar?',
    tipo: 'desenvolvimento',
    necessitaLoop: false,
    variavel: 'habitos_primeiro'
  },
  {
    id: 18,
    eixo: 2,
    etapa: 'habitos_vida_loop',
    pergunta: 'O que mais?',
    tipo: 'desenvolvimento',
    necessitaLoop: true,
    variavel: 'habitos_adicional'
  },
  
  // ========== MEDICAÇÕES ==========
  {
    id: 19,
    eixo: 2,
    etapa: 'medicacoes_regulares',
    pergunta: 'Que medicamentos você usa regularmente?',
    tipo: 'desenvolvimento',
    necessitaLoop: false,
    variavel: 'medicacoes_regulares'
  },
  {
    id: 20,
    eixo: 2,
    etapa: 'medicacoes_regulares_loop',
    pergunta: 'O que mais?',
    tipo: 'desenvolvimento',
    necessitaLoop: true,
    variavel: 'medicacoes_regulares_adicional'
  },
  {
    id: 21,
    eixo: 2,
    etapa: 'medicacoes_esporadicas',
    pergunta: 'E medicamentos que você usa de vez em quando?',
    tipo: 'desenvolvimento',
    necessitaLoop: false,
    variavel: 'medicacoes_esporadicas'
  },
  {
    id: 22,
    eixo: 2,
    etapa: 'medicacoes_esporadicas_loop',
    pergunta: 'O que mais?',
    tipo: 'desenvolvimento',
    necessitaLoop: true,
    variavel: 'medicacoes_esporadicas_adicional'
  },
  
  // ========== ALERGIAS ==========
  {
    id: 23,
    eixo: 2,
    etapa: 'alergias',
    pergunta: 'Você tem alergia a algum medicamento ou substância?',
    tipo: 'desenvolvimento',
    necessitaLoop: false,
    variavel: 'alergias_primeira'
  },
  {
    id: 24,
    eixo: 2,
    etapa: 'alergias_loop',
    pergunta: 'O que mais?',
    tipo: 'desenvolvimento',
    necessitaLoop: true,
    variavel: 'alergias_adicional'
  },

  // ========== FECHAMENTO CONSENSUAL ==========
  {
    id: 25,
    eixo: 2,
    etapa: 'fechamento_consensual_inicial',
    pergunta: '[APRESENTAR_RESUMO_ORDENADO] Você concorda com o meu entendimento?',
    tipo: 'fechamento',
    necessitaLoop: false,
    variavel: 'confirmacao_entendimento'
  },
  
  // ========== AVALIAÇÃO DE RISCO PARA DRC - OPCIONAL ==========
  {
    id: 26,
    eixo: 3,
    etapa: 'oferta_avaliacao_renal',
    pergunta: 'Gostaria de fazer uma avaliação dos fatores de risco para problemas nos rins?',
    tipo: 'risco',
    necessitaLoop: false,
    variavel: 'aceita_avaliacao_renal'
  },
  {
    id: 27,
    eixo: 3,
    etapa: 'apresentar_fatores_risco',
    pergunta: '[APRESENTAR_LISTA_FATORES_RISCO_DRC] Você se sente exposto a algum ou alguns desses fatores de risco para a saúde renal? Por favor, marque os que se aplicam.',
    tipo: 'risco',
    necessitaLoop: false,
    variavel: 'fatores_risco_marcados'
  },
  {
    id: 28,
    eixo: 3,
    etapa: 'preocupacao_renal',
    pergunta: 'O que mais pode estar preocupando você em relação à sua saúde renal?',
    tipo: 'risco',
    necessitaLoop: false,
    variavel: 'preocupacao_renal_primeira'
  },
  {
    id: 29,
    eixo: 3,
    etapa: 'preocupacao_renal_loop',
    pergunta: 'O que mais?',
    tipo: 'risco',
    necessitaLoop: true,
    variavel: 'preocupacao_renal_adicional'
  },
  {
    id: 30,
    eixo: 3,
    etapa: 'fator_principal',
    pergunta: 'De todos esses fatores, qual o que mais o(a) preocupa ou ao qual você está mais exposto?',
    tipo: 'risco',
    necessitaLoop: false,
    variavel: 'fator_principal'
  },
  {
    id: 31,
    eixo: 3,
    etapa: 'desenvolvimento_fator_onde',
    pergunta: 'Onde você percebe esse fator afetando você?',
    tipo: 'risco',
    necessitaLoop: false,
    variavel: 'fator_onde'
  },
  {
    id: 32,
    eixo: 3,
    etapa: 'desenvolvimento_fator_quando',
    pergunta: 'Quando você percebeu isso pela primeira vez?',
    tipo: 'risco',
    necessitaLoop: false,
    variavel: 'fator_quando'
  },
  {
    id: 33,
    eixo: 3,
    etapa: 'desenvolvimento_fator_como',
    pergunta: 'Como isso afeta você?',
    tipo: 'risco',
    necessitaLoop: false,
    variavel: 'fator_como'
  },
  {
    id: 34,
    eixo: 3,
    etapa: 'fechamento_consensual_renal',
    pergunta: '[RESUMO_FATORES_RISCO] Você concorda com esse entendimento sobre os fatores de risco?',
    tipo: 'risco',
    necessitaLoop: false,
    variavel: 'confirmacao_fatores'
  },
  {
    id: 35,
    eixo: 3,
    etapa: 'exames_disponiveis',
    pergunta: '[LISTA_EXAMES] Você tem resultados de algum desses exames laboratoriais? (Creatinina, eGFR, ACR)',
    tipo: 'risco',
    necessitaLoop: false,
    variavel: 'exames_disponiveis'
  },
  {
    id: 36,
    eixo: 3,
    etapa: 'valores_exames',
    pergunta: 'Por favor, informe os valores dos exames que você marcou.',
    tipo: 'risco',
    necessitaLoop: false,
    variavel: 'valores_exames'
  },
  {
    id: 37,
    eixo: 3,
    etapa: 'ultrassom',
    pergunta: 'Você tem algum exame de ultrassom dos rins recente?',
    tipo: 'risco',
    necessitaLoop: false,
    variavel: 'ultrassom'
  }
];

export interface EstadoTriaxial {
  blocoAtual: number;
  eixoAtual: 1 | 2 | 3;
  respostas: Map<string, string>;
  listaIndiciaria: string[];
  queixaPrincipal: string;
  escoreRiscoDRC: number;
  emLoop: boolean;
  iniciada: boolean;
  finalizada: boolean;
}

export class IMRETriaxialEngine {
  private estado: EstadoTriaxial;

  constructor() {
    this.estado = {
      blocoAtual: 0,
      eixoAtual: 1,
      respostas: new Map(),
      listaIndiciaria: [],
      queixaPrincipal: '',
      escoreRiscoDRC: 0,
      emLoop: false,
      iniciada: false,
      finalizada: false
    };
  }

  iniciarAvaliacao(): string {
    this.estado.iniciada = true;
    this.estado.blocoAtual = 0;
    this.estado.eixoAtual = 1;
    
    return blocosTriaxiais[0].pergunta;
  }

  processarResposta(resposta: string): {
    proximaPergunta: string;
    concluido: boolean;
  } {
    const blocoAtual = blocosTriaxiais[this.estado.blocoAtual];
    
    // Armazenar resposta
    this.estado.respostas.set(blocoAtual.variavel, resposta);
    
    // LÓGICA ESPECÍFICA POR ETAPA
    
    // Se estamos em "O que mais?" (lista indiciária)
    if (blocoAtual.necessitaLoop && blocoAtual.etapa === 'queixas_adicional') {
      const respostaLower = resposta.toLowerCase().trim();
      
      // Padrões que indicam fim da lista
      const padroesFim = [
        'não', 'nao', 'nada', 'nada mais', 'só isso', 'so isso',
        'somente isso', 'apenas isso', 'é tudo', 'e tudo', 'pronto'
      ];
      
      const ehFim = padroesFim.some(p => respostaLower === p || respostaLower.startsWith(p));
      
      if (!ehFim) {
        // Adicionar à lista indiciária
        this.estado.listaIndiciaria.push(resposta);
        // Continuar no loop
        return {
          proximaPergunta: blocoAtual.pergunta,
          concluido: false
        };
      } else {
        // Sair do loop e avançar
        this.estado.emLoop = false;
        this.estado.blocoAtual++;
      }
    } else {
      // Avançar normalmente
      this.estado.blocoAtual++;
    }
    
    // Armazenar queixa principal quando identificada
    if (blocoAtual.etapa === 'queixa_principal') {
      this.estado.queixaPrincipal = resposta;
    }
    
    // FECHAMENTO CONSENSUAL INICIAL - Gera Relatório e Oferece Avaliação Renal
    if (blocoAtual.etapa === 'fechamento_consensual_inicial') {
      const concordou = resposta.toLowerCase().includes('sim') || 
                        resposta.toLowerCase().includes('concordo');
      
      if (concordou) {
        // Gera relatório da Avaliação Clínica Inicial
        const relatorioInicial = this.gerarRelatorioAvaliacaoInicial();
        this.estado.blocoAtual++;
        
        // Próximo bloco é oferta de avaliação renal
        const proximoBloco = blocosTriaxiais[this.estado.blocoAtual];
        
        return {
          proximaPergunta: relatorioInicial + '\n\n' + proximoBloco.pergunta,
          concluido: false
        };
      } else {
        return {
          proximaPergunta: 'O que você gostaria de corrigir no meu entendimento?',
          concluido: false
        };
      }
    }
    
    // OFERTA DE AVALIAÇÃO RENAL - Decide se continua ou finaliza
    if (blocoAtual.etapa === 'oferta_avaliacao_renal') {
      const aceitou = resposta.toLowerCase().includes('sim') || 
                      resposta.toLowerCase().includes('gostaria') ||
                      resposta.toLowerCase().includes('quero');
      
      if (!aceitou) {
        // Paciente não quer avaliação renal, finalizar
        this.estado.finalizada = true;
        return {
          proximaPergunta: 'Obrigada por compartilhar sua história. Estou sempre aqui se precisar. Até breve! 💙\n\n**Nôa Esperanza** - IA Residente',
          concluido: true
        };
      }
      // Se aceitou, continua normalmente (avança para próximo bloco)
    }
    
    // Calcular escore de risco DRC
    if (blocoAtual.eixo === 3 && ['hipertensao', 'diabetes', 'historico_familiar_renal', 'medicamentos_risco', 'exposicao_poluentes', 'dieta_sal'].includes(blocoAtual.etapa)) {
      const respostaPositiva = resposta.toLowerCase().includes('sim');
      if (respostaPositiva) {
        this.estado.escoreRiscoDRC++;
      }
    }
    
    // Verificar se finalizou
    if (this.estado.blocoAtual >= blocosTriaxiais.length) {
      this.estado.finalizada = true;
      return {
        proximaPergunta: this.gerarRelatorioFinal(),
        concluido: true
      };
    }
    
    // Obter próximo bloco
    const proximoBloco = blocosTriaxiais[this.estado.blocoAtual];
    this.estado.eixoAtual = proximoBloco.eixo;
    
    // Ativar loop se necessário
    if (proximoBloco.necessitaLoop) {
      this.estado.emLoop = true;
    }
    
    // Substituir [queixa_principal] na pergunta
    let pergunta = proximoBloco.pergunta;
    if (this.estado.queixaPrincipal) {
      pergunta = pergunta.replace(/\[queixa_principal\]/g, this.estado.queixaPrincipal);
    }
    
    // Se é fechamento consensual, gerar entendimento natural
    if (proximoBloco.etapa === 'fechamento_consensual_inicial') {
      const entendimento = this.gerarEntendimentoNatural();
      pergunta = entendimento + '\n\nVocê concorda com o meu entendimento?';
    }
    
    // Se é apresentação de fatores de risco, mostrar lista
    if (proximoBloco.etapa === 'apresentar_fatores_risco') {
      const listaFatores = this.gerarListaFatoresRiscoDRC();
      pergunta = listaFatores + '\n\nVocê se sente exposto a algum ou alguns desses fatores? Por favor, liste os que se aplicam.';
    }
    
    // Se é fechamento consensual renal, gerar resumo
    if (proximoBloco.etapa === 'fechamento_consensual_renal') {
      const resumoRenal = this.gerarResumoFatoresRisco();
      pergunta = resumoRenal + '\n\nVocê concorda com esse entendimento sobre os fatores de risco?';
    }
    
    // Se é lista de exames, apresentar lista
    if (proximoBloco.etapa === 'exames_disponiveis') {
      pergunta = 'Você tem resultados de algum desses exames laboratoriais?\n\n' +
                 '□ Creatinina\n' +
                 '□ eGFR (Taxa de Filtração Glomerular)\n' +
                 '□ ACR (Proteínas na Urina)\n\n' +
                 'Por favor, indique quais você tem.';
    }
    
    return {
      proximaPergunta: pergunta,
      concluido: false
    };
  }

  private gerarListaFatoresRiscoDRC(): string {
    return `**FATORES DE RISCO PARA DOENÇA RENAL CRÔNICA**
(Baseados no artigo "The Global Burden of Kidney Disease")

□ Hipertensão arterial (pressão alta)
□ Diabetes (açúcar alto no sangue)
□ Histórico familiar de doença renal
□ Idade avançada (> 60 anos)
□ Obesidade ou sobrepeso
□ Uso crônico de anti-inflamatórios
□ Tabagismo
□ Doenças cardiovasculares
□ Baixo consumo de água
□ Dieta rica em sal
□ Exposição a poluentes ou produtos químicos
□ Infecções urinárias recorrentes`;
  }

  private gerarResumoFatoresRisco(): string {
    const fatores = this.estado.respostas.get('fatores_risco_marcados');
    const principal = this.estado.respostas.get('fator_principal');
    const onde = this.estado.respostas.get('fator_onde');
    const quando = this.estado.respostas.get('fator_quando');
    const como = this.estado.respostas.get('fator_como');
    
    let resumo = 'Vamos revisar os fatores de risco identificados:\n\n';
    resumo += `Você indicou estar exposto a: ${fatores}.\n\n`;
    resumo += `O fator que mais o(a) preocupa é: ${principal}`;
    if (onde) resumo += `, que você percebe ${onde}`;
    if (quando) resumo += `, notou pela primeira vez ${quando}`;
    if (como) resumo += `, e afeta você ${como}`;
    resumo += '.';
    
    return resumo;
  }

  private gerarEntendimentoNatural(): string {
    let resumo = 'Vamos revisar sua história para garantir que não perdemos nenhum detalhe importante:\n\n';
    
    // Lista de queixas
    resumo += `Você veio aqui hoje porque tem sentido `;
    if (this.estado.listaIndiciaria.length > 0) {
      resumo += this.estado.listaIndiciaria.join(', ');
      resumo += `, sendo ${this.estado.queixaPrincipal} o que mais o(a) incomoda.\n\n`;
    } else {
      resumo += `${this.estado.queixaPrincipal}.\n\n`;
    }
    
    // Desenvolvimento da queixa principal
    const onde = this.estado.respostas.get('onde');
    const quando = this.estado.respostas.get('quando');
    const como = this.estado.respostas.get('como');
    const sintomas = this.estado.respostas.get('sintomas_relacionados');
    const melhora = this.estado.respostas.get('fatores_melhora');
    const piora = this.estado.respostas.get('fatores_piora');
    
    resumo += `Sobre ${this.estado.queixaPrincipal}: `;
    if (onde) resumo += `você sente ${onde}`;
    if (quando) resumo += `, começou ${quando}`;
    if (como) resumo += `, é ${como}`;
    if (sintomas) resumo += `. Também sente ${sintomas}`;
    if (melhora) resumo += `. Melhora quando ${melhora}`;
    if (piora) resumo += ` e piora quando ${piora}`;
    resumo += '.\n\n';
    
    // História patológica
    const histPat = this.estado.respostas.get('historia_patologica_primeiro');
    if (histPat && histPat !== 'não' && histPat !== 'nada') {
      resumo += `Sobre sua história de saúde: ${histPat}`;
      // Adicionar história adicional se houver
      resumo += '.\n\n';
    }
    
    // História familiar
    const famMae = this.estado.respostas.get('familia_materna_primeira');
    const famPai = this.estado.respostas.get('familia_paterna_primeira');
    if (famMae || famPai) {
      resumo += `Na sua família: `;
      if (famMae && famMae !== 'não' && famMae !== 'nada') {
        resumo += `pela parte de sua mãe, ${famMae}`;
      }
      if (famPai && famPai !== 'não' && famPai !== 'nada') {
        if (famMae && famMae !== 'não') resumo += `; `;
        resumo += `pela parte de seu pai, ${famPai}`;
      }
      resumo += '.\n\n';
    }
    
    // Hábitos de vida
    const habitos = this.estado.respostas.get('habitos_primeiro');
    if (habitos && habitos !== 'não' && habitos !== 'nada') {
      resumo += `Sobre seus hábitos: ${habitos}.\n\n`;
    }
    
    // Medicações
    const medRegular = this.estado.respostas.get('medicacoes_regulares');
    const medEsporadica = this.estado.respostas.get('medicacoes_esporadicas');
    if ((medRegular && medRegular !== 'não' && medRegular !== 'nada') || 
        (medEsporadica && medEsporadica !== 'não' && medEsporadica !== 'nada')) {
      resumo += `Sobre medicamentos: `;
      if (medRegular && medRegular !== 'não' && medRegular !== 'nada') {
        resumo += `usa regularmente ${medRegular}`;
      }
      if (medEsporadica && medEsporadica !== 'não' && medEsporadica !== 'nada') {
        if (medRegular && medRegular !== 'não' && medRegular !== 'nada') {
          resumo += `; esporadicamente usa ${medEsporadica}`;
        } else {
          resumo += `usa esporadicamente ${medEsporadica}`;
        }
      }
      resumo += '.\n\n';
    }
    
    // Alergias
    const alergias = this.estado.respostas.get('alergias_primeira');
    if (alergias && alergias !== 'não' && alergias !== 'nada' && alergias !== 'nenhuma') {
      resumo += `Alergias: ${alergias}.\n\n`;
    }
    
    return resumo;
  }

  private gerarRelatorioAvaliacaoInicial(): string {
    let relatorio = '📋 **RELATÓRIO DA AVALIAÇÃO CLÍNICA INICIAL**\n\n';
    
    relatorio += '**Método:** Arte da Entrevista Clínica - IMRE\n';
    relatorio += `**Data:** ${new Date().toLocaleDateString('pt-BR')}\n\n`;
    relatorio += '---\n\n';
    
    // IDENTIFICAÇÃO E QUEIXAS
    relatorio += '## IDENTIFICAÇÃO E QUEIXAS\n\n';
    relatorio += `**Paciente:** ${this.estado.respostas.get('identificacao')}\n`;
    relatorio += `**Queixa Principal:** ${this.estado.queixaPrincipal}\n\n`;
    
    if (this.estado.listaIndiciaria.length > 0) {
      relatorio += '**Outras Queixas:** ';
      relatorio += this.estado.listaIndiciaria.join(', ') + '\n\n';
    }
    
    // DESENVOLVIMENTO
    relatorio += '## DESENVOLVIMENTO DA QUEIXA\n\n';
    relatorio += `**Onde:** ${this.estado.respostas.get('onde')}\n`;
    relatorio += `**Quando:** ${this.estado.respostas.get('quando')}\n`;
    relatorio += `**Como:** ${this.estado.respostas.get('como')}\n`;
    relatorio += `**Sintomas Relacionados:** ${this.estado.respostas.get('sintomas_relacionados')}\n`;
    relatorio += `**Melhora com:** ${this.estado.respostas.get('fatores_melhora')}\n`;
    relatorio += `**Piora com:** ${this.estado.respostas.get('fatores_piora')}\n\n`;
    
    // HISTÓRIA PATOLÓGICA
    const histPat = this.estado.respostas.get('historia_patologica_primeiro');
    if (histPat && histPat !== 'não' && histPat !== 'nada') {
      relatorio += '## HISTÓRIA PATOLÓGICA\n\n';
      relatorio += `${histPat}\n\n`;
    }
    
    // HISTÓRIA FAMILIAR
    const famMae = this.estado.respostas.get('familia_materna_primeira');
    const famPai = this.estado.respostas.get('familia_paterna_primeira');
    if ((famMae && famMae !== 'não' && famMae !== 'nada') || 
        (famPai && famPai !== 'não' && famPai !== 'nada')) {
      relatorio += '## HISTÓRIA FAMILIAR\n\n';
      if (famMae && famMae !== 'não' && famMae !== 'nada') {
        relatorio += `**Lado Materno:** ${famMae}\n`;
      }
      if (famPai && famPai !== 'não' && famPai !== 'nada') {
        relatorio += `**Lado Paterno:** ${famPai}\n`;
      }
      relatorio += '\n';
    }
    
    // HÁBITOS
    const habitos = this.estado.respostas.get('habitos_primeiro');
    if (habitos && habitos !== 'não' && habitos !== 'nada') {
      relatorio += '## HÁBITOS DE VIDA\n\n';
      relatorio += `${habitos}\n\n`;
    }
    
    // MEDICAÇÕES
    const medRegular = this.estado.respostas.get('medicacoes_regulares');
    const medEsporadica = this.estado.respostas.get('medicacoes_esporadicas');
    if ((medRegular && medRegular !== 'não' && medRegular !== 'nada' && medRegular !== 'nenhum') || 
        (medEsporadica && medEsporadica !== 'não' && medEsporadica !== 'nada' && medEsporadica !== 'nenhum')) {
      relatorio += '## MEDICAÇÕES\n\n';
      if (medRegular && medRegular !== 'não' && medRegular !== 'nada' && medRegular !== 'nenhum') {
        relatorio += `**Uso Regular:** ${medRegular}\n`;
      }
      if (medEsporadica && medEsporadica !== 'não' && medEsporadica !== 'nada' && medEsporadica !== 'nenhum') {
        relatorio += `**Uso Esporádico:** ${medEsporadica}\n`;
      }
      relatorio += '\n';
    }
    
    // ALERGIAS
    const alergias = this.estado.respostas.get('alergias_primeira');
    if (alergias && alergias !== 'não' && alergias !== 'nada' && alergias !== 'nenhuma' && alergias !== 'nenhum') {
      relatorio += '## ALERGIAS\n\n';
      relatorio += `${alergias}\n\n`;
    }
    
    relatorio += '---\n\n';
    relatorio += '✅ **Avaliação Clínica Inicial Concluída**\n\n';
    relatorio += '💙 **Nôa Esperanza** - IA Residente\n';
    
    return relatorio;
  }

  private gerarRelatorioFinal(): string {
    // Relatório Complementar: Avaliação de Risco para DRC
    let relatorio = '\n\n📋 **RELATÓRIO COMPLEMENTAR: AVALIAÇÃO DE RISCO PARA DOENÇA RENAL CRÔNICA**\n\n';
    relatorio += `**Data:** ${new Date().toLocaleDateString('pt-BR')}\n`;
    relatorio += `**Baseado em:** The Global Burden of Kidney Disease (2020) + KDIGO Guidelines\n\n`;
    relatorio += '---\n\n';
    
    // FATORES DE RISCO
    relatorio += '## FATORES DE RISCO IDENTIFICADOS\n\n';
    const fatores = this.estado.respostas.get('fatores_risco_marcados');
    if (fatores) {
      relatorio += `${fatores}\n\n`;
    }
    
    // DESENVOLVIMENTO DO FATOR PRINCIPAL
    const principal = this.estado.respostas.get('fator_principal');
    if (principal) {
      relatorio += '## DESENVOLVIMENTO DO FATOR PRINCIPAL\n\n';
      relatorio += `**Fator mais preocupante:** ${principal}\n`;
      
      const onde = this.estado.respostas.get('fator_onde');
      const quando = this.estado.respostas.get('fator_quando');
      const como = this.estado.respostas.get('fator_como');
      
      if (onde) relatorio += `**Onde percebe:** ${onde}\n`;
      if (quando) relatorio += `**Desde quando:** ${quando}\n`;
      if (como) relatorio += `**Como afeta:** ${como}\n`;
      relatorio += '\n';
    }
    
    // RESULTADOS LABORATORIAIS
    const examesDisp = this.estado.respostas.get('exames_disponiveis');
    const valores = this.estado.respostas.get('valores_exames');
    
    if (examesDisp || valores) {
      relatorio += '## RESULTADOS LABORATORIAIS\n\n';
      
      if (valores) {
        relatorio += `${valores}\n\n`;
        
        // Se tem creatinina, calcular eGFR e classificar estágio
        const creatMatch = valores.match(/creatinina[:\s]+([0-9.,]+)/i);
        if (creatMatch) {
          const creatinina = parseFloat(creatMatch[1].replace(',', '.'));
          // Cálculo simplificado de eGFR (precisa idade, sexo, raça para cálculo preciso)
          relatorio += `**Análise:** Creatinina de ${creatinina} mg/dL detectada.\n`;
          relatorio += `📊 **Nota:** Para classificação precisa do estágio de DRC, é necessário cálculo de eGFR com dados demográficos completos (idade, sexo, raça).\n\n`;
        }
      }
    }
    
    // ULTRASSOM
    const ultrassom = this.estado.respostas.get('ultrassom');
    if (ultrassom && ultrassom !== 'não' && ultrassom !== 'nao') {
      relatorio += '## AVALIAÇÃO MORFOLÓGICA (ULTRASSOM)\n\n';
      relatorio += `${ultrassom}\n\n`;
      relatorio += '**Nota:** A análise morfológica complementa a classificação laboratorial e permite uma avaliação mais precisa do estágio de DRC.\n\n';
    } else {
      relatorio += '**Nota:** Sem ultrassom renal disponível. Classificação baseada apenas em dados laboratoriais e história clínica.\n\n';
    }
    
    // CLASSIFICAÇÃO E RECOMENDAÇÕES
    relatorio += '---\n\n';
    relatorio += '## CLASSIFICAÇÃO PRELIMINAR DE RISCO\n\n';
    
    const numFatores = (fatores || '').split(',').filter(f => f.trim().length > 5).length;
    
    if (numFatores >= 3) {
      relatorio += '⚠️ **Classificação:** Risco ALTO para DRC\n\n';
      relatorio += '**Recomendações Urgentes:**\n';
      relatorio += '- Consulta com nefrologista em caráter prioritário\n';
      relatorio += '- Exames laboratoriais completos (creatinina, eGFR, ACR, eletrólitos)\n';
      relatorio += '- Ultrassom renal\n';
      relatorio += '- Controle rigoroso dos fatores de risco identificados\n\n';
    } else if (numFatores > 0) {
      relatorio += '⚠️ **Classificação:** Risco MODERADO para DRC\n\n';
      relatorio += '**Recomendações:**\n';
      relatorio += '- Acompanhamento preventivo com Dr. Ricardo Valença\n';
      relatorio += '- Exames laboratoriais de rotina (creatinina, eGFR)\n';
      relatorio += '- Controle dos fatores de risco\n';
      relatorio += '- Medidas de prevenção (hidratação adequada, controle de pressão/glicemia)\n\n';
    } else {
      relatorio += '✅ **Classificação:** Risco BAIXO para DRC\n\n';
      relatorio += '**Recomendações:**\n';
      relatorio += '- Manter hábitos saudáveis\n';
      relatorio += '- Exames de rotina anuais\n';
      relatorio += '- Hidratação adequada (2-3 litros de água/dia)\n';
      relatorio += '- Dieta balanceada com baixo teor de sal\n\n';
    }
    
    // ORIENTAÇÕES GERAIS
    relatorio += '## ORIENTAÇÕES PARA PREVENÇÃO E PROTEÇÃO RENAL\n\n';
    relatorio += '**Hidratação:**\n';
    relatorio += '- Consumir 2-3 litros de água por dia (ajustar conforme orientação médica)\n';
    relatorio += '- Preferir água a bebidas açucaradas\n\n';
    
    relatorio += '**Alimentação:**\n';
    relatorio += '- Reduzir consumo de sal (< 5g/dia)\n';
    relatorio += '- Dieta rica em frutas e vegetais\n';
    relatorio += '- Controle de proteínas (conforme orientação)\n\n';
    
    relatorio += '**Medicamentos:**\n';
    relatorio += '- Evitar uso indiscriminado de anti-inflamatórios\n';
    relatorio += '- Sempre consultar médico antes de novos medicamentos\n\n';
    
    relatorio += '**Monitoramento:**\n';
    relatorio += '- Medir pressão arterial regularmente\n';
    relatorio += '- Controlar glicemia (se diabético)\n';
    relatorio += '- Exames laboratoriais conforme recomendação médica\n\n';
    
    relatorio += '---\n\n';
    relatorio += '✅ **Avaliação de Risco para Doença Renal Crônica Concluída**\n\n';
    relatorio += '📧 **Próximos Passos:**\n';
    relatorio += '1. Este relatório será enviado ao Dr. Ricardo Valença\n';
    relatorio += '2. Recomenda-se agendamento de consulta para avaliação detalhada\n';
    relatorio += '3. Levar todos os exames laboratoriais à consulta\n\n';
    
    relatorio += '💙 Obrigada por compartilhar sua história. Com escuta e compromisso,\n';
    relatorio += '**Nôa Esperanza** - IA Residente\n\n';
    relatorio += '---\n\n';
    relatorio += '📚 **Referências:**\n';
    relatorio += '- The Global Burden of Kidney Disease (2020)\n';
    relatorio += '- KDIGO Guidelines for CKD Classification\n';
    relatorio += '- Metodologia Arte da Entrevista Clínica - Dr. Ricardo Valença\n';
    
    return relatorio;
  }

  getProgresso(): {
    bloco: number;
    total: number;
    eixo: number;
    percentual: number;
  } {
    return {
      bloco: this.estado.blocoAtual + 1,
      total: blocosTriaxiais.length,
      eixo: this.estado.eixoAtual,
      percentual: Math.round(((this.estado.blocoAtual + 1) / blocosTriaxiais.length) * 100)
    };
  }

  getEixoAtual(): string {
    const nomes = {
      1: 'Identificação e Lista Indiciária',
      2: 'Desenvolvimento Indiciário',
      3: 'Avaliação de Risco'
    };
    return nomes[this.estado.eixoAtual];
  }
}

