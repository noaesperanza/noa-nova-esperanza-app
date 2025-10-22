// =====================================================
// SISTEMA IMRE V2 - INCENTIVADOR MÍNIMO DO RELATO ESPONTÂNEO
// Suspensão do Decoder + Controle do Recommender
// Nôa Esperanza - Dr. Ricardo Valença
// =====================================================

/**
 * CONCEITO FUNDAMENTAL:
 * 
 * O IMRE não é um questionário. É um sistema de SUSPENSÃO DO DECODER
 * que permite ao paciente NARRAR LIVREMENTE sua história.
 * 
 * - Decoder: Parte da IA que "interpreta" e "completa" respostas
 * - Suspender Decoder: Permite relato espontâneo sem interrupções
 * - Recommender: Sugere próximas perguntas
 * - Controlar Recommender: Usa incentivadores mínimos em vez de perguntas diretas
 */

export interface EtapaIMRE {
  id: string;
  ordem: number;
  incentivador: string;
  tipo: 'abertura' | 'minimo' | 'escuta' | 'confirmacao' | 'fechamento';
  permitirNarrativaLivre: boolean;
  suspenderDecoder: boolean;
}

// ETAPAS BASEADAS NO CONCEITO ORIGINAL
export const etapasIMRE: EtapaIMRE[] = [
  {
    id: 'abertura',
    ordem: 1,
    incentivador: 'O que trouxe você aqui hoje?',
    tipo: 'abertura',
    permitirNarrativaLivre: true,
    suspenderDecoder: true
  },
  {
    id: 'detalhamento',
    ordem: 2,
    incentivador: 'Pode me contar mais sobre isso?',
    tipo: 'minimo',
    permitirNarrativaLivre: true,
    suspenderDecoder: true
  },
  {
    id: 'contexto',
    ordem: 3,
    incentivador: 'Como isso tem afetado sua vida?',
    tipo: 'escuta',
    permitirNarrativaLivre: true,
    suspenderDecoder: true
  },
  {
    id: 'expectativas',
    ordem: 4,
    incentivador: 'O que você espera do nosso trabalho?',
    tipo: 'escuta',
    permitirNarrativaLivre: true,
    suspenderDecoder: true
  },
  {
    id: 'confirmacao',
    ordem: 5,
    incentivador: 'Você concorda com o meu entendimento?',
    tipo: 'confirmacao',
    permitirNarrativaLivre: false,
    suspenderDecoder: false
  }
];

export interface EstadoIMREV2 {
  etapaAtual: number;
  narrativas: Map<string, string[]>;
  narrativaCompleta: string;
  modoEscuta: boolean;
  decoderSuspenso: boolean;
  iniciada: boolean;
  finalizada: boolean;
}

export class IMREEngineV2 {
  private estado: EstadoIMREV2;

  constructor() {
    this.estado = {
      etapaAtual: 0,
      narrativas: new Map(),
      narrativaCompleta: '',
      modoEscuta: true,
      decoderSuspenso: true,
      iniciada: false,
      finalizada: false
    };
  }

  iniciarAvaliacao(): string {
    this.estado.iniciada = true;
    this.estado.modoEscuta = true;
    this.estado.decoderSuspenso = true;
    this.estado.etapaAtual = 0;
    
    return this.getIncentivadorAtual();
  }

  getIncentivadorAtual(): string {
    if (this.estado.etapaAtual >= etapasIMRE.length) {
      return 'Avaliação concluída!';
    }
    
    const etapa = etapasIMRE[this.estado.etapaAtual];
    return etapa.incentivador;
  }

  /**
   * Processa a narrativa do paciente
   * 
   * IMPORTANTE: Aqui suspendemos o decoder para permitir
   * que o paciente narre livremente, sem interrupções ou
   * interpretações automáticas da IA.
   */
  processarNarrativa(narrativa: string): {
    incentivadorProximo: string;
    continuarEscuta: boolean;
    concluido: boolean;
  } {
    const etapaAtual = etapasIMRE[this.estado.etapaAtual];
    
    // Armazenar narrativa
    if (!this.estado.narrativas.has(etapaAtual.id)) {
      this.estado.narrativas.set(etapaAtual.id, []);
    }
    this.estado.narrativas.get(etapaAtual.id)!.push(narrativa);
    
    // Construir narrativa completa
    this.estado.narrativaCompleta += `\n[${etapaAtual.id}]: ${narrativa}`;
    
    // Detectar se paciente está pronto para próxima etapa
    const prontoParaProxima = this.detectarProntidao(narrativa, etapaAtual);
    
    if (prontoParaProxima) {
      // Avançar para próxima etapa
      this.estado.etapaAtual++;
      
      if (this.estado.etapaAtual >= etapasIMRE.length) {
        this.estado.finalizada = true;
        this.estado.modoEscuta = false;
        this.estado.decoderSuspenso = false;
        
        return {
          incentivadorProximo: this.gerarResumoFinal(),
          continuarEscuta: false,
          concluido: true
        };
      }
      
      const proximaEtapa = etapasIMRE[this.estado.etapaAtual];
      this.estado.decoderSuspenso = proximaEtapa.suspenderDecoder;
      
      return {
        incentivadorProximo: proximaEtapa.incentivador,
        continuarEscuta: proximaEtapa.permitirNarrativaLivre,
        concluido: false
      };
    }
    
    // Continuar escutando na mesma etapa
    return {
      incentivadorProximo: this.getIncentivadorContinuacao(etapaAtual),
      continuarEscuta: true,
      concluido: false
    };
  }

  /**
   * Detecta se o paciente está pronto para a próxima etapa
   * baseado em sinais na narrativa
   */
  private detectarProntidao(narrativa: string, etapa: EtapaIMRE): boolean {
    const narrativaLower = narrativa.toLowerCase().trim();
    
    // Sinais de que o paciente concluiu a narrativa
    const sinaisConclusao = [
      'é isso',
      'só isso',
      'acho que é isso',
      'basicamente isso',
      'resumindo',
      'no geral',
      'pronto',
      'terminei'
    ];
    
    const temSinalConclusao = sinaisConclusao.some(sinal => 
      narrativaLower.includes(sinal)
    );
    
    // Se narrativa é muito curta (< 20 caracteres), não está pronto
    if (narrativa.length < 20) {
      return false;
    }
    
    // Se tem sinal de conclusão E narrativa tem conteúdo, está pronto
    if (temSinalConclusao && narrativa.length > 50) {
      return true;
    }
    
    // Se narrativa é muito longa (> 500 caracteres), avançar
    if (narrativa.length > 500) {
      return true;
    }
    
    return false;
  }

  /**
   * Retorna incentivador de continuação (mínimo)
   */
  private getIncentivadorContinuacao(etapa: EtapaIMRE): string {
    const incentivadoresMinimos = [
      'Continue...',
      'Estou te ouvindo...',
      'Pode continuar...',
      'Me conte mais...',
      'E então?'
    ];
    
    // Alterna entre incentivadores para naturalidade
    const index = this.estado.narrativas.get(etapa.id)!.length % incentivadoresMinimos.length;
    return incentivadoresMinimos[index];
  }

  /**
   * Gera resumo final da avaliação
   */
  private gerarResumoFinal(): string {
    let resumo = '📋 **RESUMO DA AVALIAÇÃO CLÍNICA**\n\n';
    
    etapasIMRE.forEach(etapa => {
      const narrativas = this.estado.narrativas.get(etapa.id);
      if (narrativas && narrativas.length > 0) {
        resumo += `**${etapa.incentivador}**\n`;
        resumo += narrativas.join(' ') + '\n\n';
      }
    });
    
    resumo += '\n✅ Avaliação concluída! Obrigada por compartilhar sua história.';
    
    return resumo;
  }

  getProgresso(): { etapa: number; total: number; percentual: number } {
    return {
      etapa: this.estado.etapaAtual + 1,
      total: etapasIMRE.length,
      percentual: Math.round(((this.estado.etapaAtual + 1) / etapasIMRE.length) * 100)
    };
  }

  getNarrativaCompleta(): string {
    return this.estado.narrativaCompleta;
  }

  getEstado(): EstadoIMREV2 {
    return { ...this.estado };
  }

  isModoEscuta(): boolean {
    return this.estado.modoEscuta;
  }

  isDecoderSuspenso(): boolean {
    return this.estado.decoderSuspenso;
  }
}

