// =====================================================
// SISTEMA IMRE - INCENTIVADOR MÍNIMO DO RELATO ESPONTÂNEO
// Nôa Esperanza - Dr. Ricardo Valença
// =====================================================

import { renalClassificationSystem, AvaliacaoRenal } from './renal-classification';

export interface BlocoIMRE {
  id: number;
  ordem: number;
  etapa: string;
  texto: string;
  variavel: string;
  tipo: 'sistema' | 'pergunta' | 'loop';
  ativo: boolean;
}

// 28 BLOCOS IMRE CANÔNICOS
export const blocosIMRE: BlocoIMRE[] = [
  { id: 1, ordem: 1, etapa: 'abertura', texto: 'Olá! Eu sou Nôa Esperanza. Por favor, apresente-se também e vamos iniciar a sua avaliação inicial para consultas com Dr. Ricardo Valença.', variavel: 'abertura', tipo: 'sistema', ativo: true },
  { id: 2, ordem: 2, etapa: 'motivo_detalhado', texto: 'O que trouxe você à nossa avaliação hoje?', variavel: 'motivo_detalhado', tipo: 'pergunta', ativo: true },
  { id: 3, ordem: 3, etapa: 'motivo_detalhado_extra', texto: 'O que mais?', variavel: 'motivo_extra', tipo: 'loop', ativo: true },
  { id: 4, ordem: 4, etapa: 'queixa_principal', texto: 'Qual dessas questões mais o(a) incomoda?', variavel: 'queixa_principal', tipo: 'pergunta', ativo: true },
  { id: 5, ordem: 5, etapa: 'hda_inicio', texto: 'Quando isso começou?', variavel: 'hda_inicio', tipo: 'pergunta', ativo: true },
  { id: 6, ordem: 6, etapa: 'hda_evolucao', texto: 'Como isso evoluiu desde então?', variavel: 'hda_evolucao', tipo: 'pergunta', ativo: true },
  { id: 7, ordem: 7, etapa: 'hda_caracteristicas', texto: 'Como é essa sensação/dor/sintoma?', variavel: 'hda_caracteristicas', tipo: 'pergunta', ativo: true },
  { id: 8, ordem: 8, etapa: 'hda_fatores', texto: 'O que piora ou melhora?', variavel: 'hda_fatores', tipo: 'pergunta', ativo: true },
  { id: 9, ordem: 9, etapa: 'hda_impacto', texto: 'Como isso afeta seu dia a dia?', variavel: 'hda_impacto', tipo: 'pergunta', ativo: true },
  { id: 10, ordem: 10, etapa: 'tratamentos_anteriores', texto: 'O que você já tentou para isso?', variavel: 'tratamentos_anteriores', tipo: 'pergunta', ativo: true },
  { id: 11, ordem: 11, etapa: 'historico_saude', texto: 'Quais as questões de saúde que você já viveu? Vamos ordenar do mais antigo para o mais recente.', variavel: 'historico_saude', tipo: 'pergunta', ativo: true },
  { id: 12, ordem: 12, etapa: 'historico_extra', texto: 'O que mais na sua história de saúde?', variavel: 'historico_extra', tipo: 'loop', ativo: true },
  { id: 13, ordem: 13, etapa: 'medicamentos', texto: 'Que medicamentos você usa atualmente?', variavel: 'medicamentos', tipo: 'pergunta', ativo: true },
  { id: 14, ordem: 14, etapa: 'medicamentos_extra', texto: 'Algum outro medicamento?', variavel: 'medicamentos_extra', tipo: 'loop', ativo: true },
  { id: 15, ordem: 15, etapa: 'alergias', texto: 'Você tem alergias a medicamentos, alimentos ou outras substâncias?', variavel: 'alergias', tipo: 'pergunta', ativo: true },
  { id: 16, ordem: 16, etapa: 'cirurgias', texto: 'Já fez alguma cirurgia?', variavel: 'cirurgias', tipo: 'pergunta', ativo: true },
  { id: 17, ordem: 17, etapa: 'historico_familiar', texto: 'Alguém na sua família tem ou teve problemas de saúde importantes?', variavel: 'historico_familiar', tipo: 'pergunta', ativo: true },
  { id: 18, ordem: 18, etapa: 'habitos_vida', texto: 'Fale um pouco sobre seus hábitos: alimentação, sono, exercícios, trabalho.', variavel: 'habitos_vida', tipo: 'pergunta', ativo: true },
  { id: 19, ordem: 19, etapa: 'contexto_social', texto: 'Como está sua vida social e familiar neste momento?', variavel: 'contexto_social', tipo: 'pergunta', ativo: true },
  { id: 20, ordem: 20, etapa: 'contexto_emocional', texto: 'Como anda seu estado emocional?', variavel: 'contexto_emocional', tipo: 'pergunta', ativo: true },
  { id: 21, ordem: 21, etapa: 'expectativas', texto: 'O que você espera dessa consulta?', variavel: 'expectativas', tipo: 'pergunta', ativo: true },
  { id: 22, ordem: 22, etapa: 'revisao_narrativa', texto: 'Vamos revisar sua história rapidamente para garantir que não perdemos nenhum detalhe importante.', variavel: 'revisao', tipo: 'sistema', ativo: true },
  { id: 23, ordem: 23, etapa: 'complemento', texto: 'Há algo mais que gostaria de me contar?', variavel: 'complemento', tipo: 'pergunta', ativo: true },
  { id: 24, ordem: 24, etapa: 'dados_contato', texto: 'Por favor, confirme seus dados de contato: nome completo, telefone e e-mail.', variavel: 'dados_contato', tipo: 'pergunta', ativo: true },
  { id: 25, ordem: 25, etapa: 'finalizacao', texto: 'Obrigada pela confiança em compartilhar sua história. Vou organizar tudo e preparar para o Dr. Ricardo Valença.', variavel: 'finalizacao', tipo: 'sistema', ativo: true },
  { id: 26, ordem: 26, etapa: 'agendamento', texto: 'Gostaria de agendar sua consulta agora?', variavel: 'agendamento', tipo: 'pergunta', ativo: true },
  { id: 27, ordem: 27, etapa: 'confirmacao', texto: 'Consulta agendada! Você receberá uma confirmação por e-mail e WhatsApp.', variavel: 'confirmacao', tipo: 'sistema', ativo: true },
  { id: 28, ordem: 28, etapa: 'despedida', texto: 'Até breve! Estou aqui sempre que precisar. Com escuta, Nôa Esperanza.', variavel: 'despedida', tipo: 'sistema', ativo: true },
  
  // BLOCOS ESPECÍFICOS PARA AVALIAÇÃO RENAL
  { id: 29, ordem: 29, etapa: 'renal_creatinina', texto: 'Para uma avaliação completa da função renal, preciso saber seu valor de creatinina mais recente. Você tem esse exame?', variavel: 'creatinina', tipo: 'pergunta', ativo: true },
  { id: 30, ordem: 30, etapa: 'renal_ureia', texto: 'E o valor da ureia?', variavel: 'ureia', tipo: 'pergunta', ativo: true },
  { id: 31, ordem: 31, etapa: 'renal_proteinuria', texto: 'Você tem exame de urina com proteinúria? Qual o valor?', variavel: 'proteinuria', tipo: 'pergunta', ativo: true },
  { id: 32, ordem: 32, etapa: 'renal_hematuria', texto: 'Houve presença de sangue na urina?', variavel: 'hematuria', tipo: 'pergunta', ativo: true },
  { id: 33, ordem: 33, etapa: 'renal_pressao', texto: 'Qual sua pressão arterial atual?', variavel: 'pressao_arterial', tipo: 'pergunta', ativo: true },
  { id: 34, ordem: 34, etapa: 'renal_diabetes', texto: 'Você tem diabetes?', variavel: 'diabetes', tipo: 'pergunta', ativo: true },
  { id: 35, ordem: 35, etapa: 'renal_hipertensao', texto: 'Você tem hipertensão arterial?', variavel: 'hipertensao', tipo: 'pergunta', ativo: true },
  { id: 36, ordem: 36, etapa: 'renal_classificacao', texto: 'Com base nos seus exames, vou classificar a função renal e dar recomendações específicas para cannabis medicinal.', variavel: 'classificacao_renal', tipo: 'sistema', ativo: true }
];

export interface AvaliacaoState {
  blocoAtual: number;
  respostas: Record<string, string[]>;
  emLoop: boolean;
  loopAtual: string | null;
  iniciada: boolean;
  finalizada: boolean;
}

export class IMREEngine {
  private state: AvaliacaoState;

  constructor() {
    this.state = {
      blocoAtual: 0,
      respostas: {},
      emLoop: false,
      loopAtual: null,
      iniciada: false,
      finalizada: false
    };
  }

  iniciarAvaliacao(): string {
    this.state.iniciada = true;
    this.state.blocoAtual = 0;
    return blocosIMRE[0].texto;
  }

  processarResposta(resposta: string): { proximaPergunta: string; concluido: boolean } {
    const blocoAtual = blocosIMRE[this.state.blocoAtual];

    // Se estamos em loop, verificar se deve continuar
    if (this.state.emLoop && this.state.loopAtual) {
      const respostaLower = resposta.toLowerCase().trim();
      
      // Padrões EXATOS de saída do loop (respostas que indicam fim)
      const padroesExatos = [
        'não',
        'nao',
        'nada',
        'nada mais',
        'só isso',
        'so isso',
        'somente isso',
        'apenas isso',
        'só',
        'so',
        'é tudo',
        'e tudo',
        'tudo',
        'n',
        'não tem mais',
        'nao tem mais',
        'sem mais',
        'acabou',
        'fim',
        'pronto',
        'nenhum',
        'nenhuma',
        'negativo',
        'não tenho',
        'nao tenho',
        'não há',
        'nao ha'
      ];
      
      // Verificar se a resposta é EXATAMENTE um padrão negativo
      // Ou se contém palavras-chave muito específicas de negação
      const ehPadraoExato = padroesExatos.includes(respostaLower);
      const contemNegacaoClaraInicio = 
        respostaLower.startsWith('não') || 
        respostaLower.startsWith('nao') ||
        respostaLower.startsWith('nada') ||
        respostaLower.startsWith('só') ||
        respostaLower.startsWith('so ') ||
        respostaLower.startsWith('apenas');
      
      const sairDoLoop = ehPadraoExato || contemNegacaoClaraInicio;
      
      if (sairDoLoop) {
        // Sair do loop e avançar para o próximo bloco
        this.state.emLoop = false;
        this.state.loopAtual = null;
        this.state.blocoAtual++;
        
        // Verificar se terminou
        if (this.state.blocoAtual >= blocosIMRE.length) {
          this.state.finalizada = true;
          return {
            proximaPergunta: 'Avaliação concluída! Todos os dados foram registrados com segurança.',
            concluido: true
          };
        }
        
        // Obter o próximo bloco
        const proximoBloco = blocosIMRE[this.state.blocoAtual];
        
        // Se o próximo bloco é um loop, ativar estado de loop
        if (proximoBloco.tipo === 'loop') {
          this.state.emLoop = true;
          this.state.loopAtual = proximoBloco.variavel || '';
        }
        
        // Retornar a próxima pergunta
        return {
          proximaPergunta: proximoBloco.texto,
          concluido: false
        };
      } else {
        // Continuar no loop, armazenar resposta
        if (!this.state.respostas[this.state.loopAtual]) {
          this.state.respostas[this.state.loopAtual] = [];
        }
        this.state.respostas[this.state.loopAtual].push(resposta);
        
        // Repetir a mesma pergunta
        return {
          proximaPergunta: blocoAtual.texto,
          concluido: false
        };
      }
    } else {
      // Não está em loop, armazenar resposta normal
      if (blocoAtual.variavel) {
        if (!this.state.respostas[blocoAtual.variavel]) {
          this.state.respostas[blocoAtual.variavel] = [];
        }
        this.state.respostas[blocoAtual.variavel].push(resposta);
      }
      this.state.blocoAtual++;
    }

    // Verificar se terminou
    if (this.state.blocoAtual >= blocosIMRE.length) {
      this.state.finalizada = true;
      return {
        proximaPergunta: 'Avaliação concluída! Todos os dados foram registrados com segurança.',
        concluido: true
      };
    }

    const proximoBloco = blocosIMRE[this.state.blocoAtual];

    // Verificar se é avaliação renal
    if (proximoBloco.etapa === 'renal_classificacao') {
      const avaliacaoRenal = this.extrairDadosRenais();
      const classificacao = renalClassificationSystem.obterRecomendacoesCannabis(avaliacaoRenal);
      
      return {
        proximaPergunta: this.gerarRelatorioRenal(classificacao),
        concluido: false
      };
    }

    // Se o próximo bloco é um loop, ativar estado de loop
    if (proximoBloco.tipo === 'loop') {
      this.state.emLoop = true;
      this.state.loopAtual = proximoBloco.variavel || '';
    }

    return {
      proximaPergunta: proximoBloco.texto,
      concluido: false
    };
  }

  getEstado(): AvaliacaoState {
    return { ...this.state };
  }

  // Extrair dados renais das respostas
  private extrairDadosRenais(): AvaliacaoRenal {
    const respostas = this.state.respostas;
    
    // Extrair valores numéricos das respostas
    const creatinina = this.extrairValorNumerico(respostas.creatinina?.[0] || '');
    const ureia = this.extrairValorNumerico(respostas.ureia?.[0] || '');
    const proteinuria = this.extrairValorNumerico(respostas.proteinuria?.[0] || '');
    const hematuria = respostas.hematuria?.[0]?.toLowerCase().includes('sim') || false;
    
    // Extrair pressão arterial
    const pressaoTexto = respostas.pressao_arterial?.[0] || '';
    const pressao = this.extrairPressaoArterial(pressaoTexto);
    
    // Extrair dados demográficos (assumindo valores padrão se não disponíveis)
    const idade = this.extrairValorNumerico(respostas.idade?.[0] || '') || 50;
    const peso = this.extrairValorNumerico(respostas.peso?.[0] || '') || 70;
    const altura = this.extrairValorNumerico(respostas.altura?.[0] || '') || 170;
    const sexo = respostas.sexo?.[0]?.toLowerCase().includes('f') ? 'F' : 'M';
    
    return {
      gfr: 0, // Será calculado pelo sistema
      creatinina,
      ureia,
      proteinuria,
      hematuria,
      pressaoArterial: pressao,
      diabetes: respostas.diabetes?.[0]?.toLowerCase().includes('sim') || false,
      hipertensao: respostas.hipertensao?.[0]?.toLowerCase().includes('sim') || false,
      idade,
      peso,
      altura,
      sexo
    };
  }

  // Extrair valor numérico de uma string
  private extrairValorNumerico(texto: string): number {
    const match = texto.match(/(\d+[.,]?\d*)/);
    return match ? parseFloat(match[1].replace(',', '.')) : 0;
  }

  // Extrair pressão arterial
  private extrairPressaoArterial(texto: string): { sistolica: number; diastolica: number } {
    const match = texto.match(/(\d+)\s*\/\s*(\d+)/);
    if (match) {
      return {
        sistolica: parseInt(match[1]),
        diastolica: parseInt(match[2])
      };
    }
    return { sistolica: 120, diastolica: 80 }; // Valores padrão
  }

  // Gerar relatório renal
  private gerarRelatorioRenal(classificacao: any): string {
    const { estagio, recomendacoes, alertas, contraindicacoes } = classificacao;
    
    let relatorio = `\n🔬 **AVALIAÇÃO RENAL COMPLETA**\n\n`;
    relatorio += `**Estágio da Doença Renal: ${estagio.estagio} - ${estagio.nome}**\n`;
    relatorio += `GFR: ${estagio.gfr.min}-${estagio.gfr.max} ${estagio.gfr.unidade}\n\n`;
    
    relatorio += `**Recomendações para Cannabis Medicinal:**\n`;
    relatorio += `• Uso ${recomendacoes.segura ? 'SEGURO' : 'NÃO RECOMENDADO'}\n`;
    relatorio += `• Dosagem: ${recomendacoes.dosagem}\n\n`;
    
    if (recomendacoes.produtosRecomendados.length > 0) {
      relatorio += `**Produtos Recomendados:**\n`;
      recomendacoes.produtosRecomendados.forEach(produto => {
        relatorio += `• ${produto}\n`;
      });
      relatorio += `\n`;
    }
    
    if (recomendacoes.produtosEvitar.length > 0) {
      relatorio += `**Produtos a Evitar:**\n`;
      recomendacoes.produtosEvitar.forEach(produto => {
        relatorio += `• ${produto}\n`;
      });
      relatorio += `\n`;
    }
    
    if (recomendacoes.precaucoes.length > 0) {
      relatorio += `**Precauções Importantes:**\n`;
      recomendacoes.precaucoes.forEach(precaucao => {
        relatorio += `• ${precaucao}\n`;
      });
      relatorio += `\n`;
    }
    
    if (alertas.length > 0) {
      relatorio += `⚠️ **Alertas:**\n`;
      alertas.forEach(alerta => {
        relatorio += `• ${alerta}\n`;
      });
      relatorio += `\n`;
    }
    
    if (contraindicacoes.length > 0) {
      relatorio += `🚫 **Contraindicações:**\n`;
      contraindicacoes.forEach(contra => {
        relatorio += `• ${contra}\n`;
      });
      relatorio += `\n`;
    }
    
    relatorio += `**Monitoramento Necessário:**\n`;
    recomendacoes.monitoramento.forEach(item => {
      relatorio += `• ${item}\n`;
    });
    
    return relatorio;
  }

  getProgresso(): { atual: number; total: number; percentual: number } {
    return {
      atual: this.state.blocoAtual + 1,
      total: blocosIMRE.length,
      percentual: Math.round(((this.state.blocoAtual + 1) / blocosIMRE.length) * 100)
    };
  }

  getRespostas(): Record<string, string[]> {
    return { ...this.state.respostas };
  }

  reiniciar(): void {
    this.state = {
      blocoAtual: 0,
      respostas: {},
      emLoop: false,
      loopAtual: null,
      iniciada: false,
      finalizada: false
    };
  }
}

