// =====================================================
// SERVIÇO DE INTEGRAÇÃO GPT-4.1 COM REASONING
// Nôa Esperanza - Multimodal AI Assistant
// =====================================================

interface GPT4Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface GPT4Response {
  resposta: string;
  reasoning?: string;
  confianca: number;
  fontes?: string[];
}

export class GPT4Service {
  private apiKey: string;
  private baseURL: string = 'https://api.openai.com/v1/chat/completions';
  private model: string = 'gpt-4-turbo'; // Será GPT-4.1 quando disponível

  constructor() {
    // API Key deve ser configurada nas variáveis de ambiente
    // ou obtida de forma segura do backend
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || '';
  }

  /**
   * Processar mensagem com GPT-4.1 + Reasoning
   */
  async processarMensagem(
    mensagem: string,
    contexto: 'paciente' | 'profissional' | 'aluno' | 'geral',
    historico: GPT4Message[] = []
  ): Promise<GPT4Response> {
    
    // Construir mensagem de sistema baseada no contexto
    const systemMessage = this.construirSystemMessage(contexto);

    // Mensagens para o modelo
    const messages: GPT4Message[] = [
      { role: 'system', content: systemMessage },
      ...historico,
      { role: 'user', content: mensagem }
    ];

    try {
      // Em produção, fazer chamada real à API
      // Por enquanto, simulamos a resposta
      const resposta = await this.simularChamadaAPI(messages, contexto);
      
      return resposta;
    } catch (error) {
      console.error('Erro ao processar mensagem:', error);
      return {
        resposta: 'Desculpe, tive um problema ao processar sua mensagem. Pode tentar novamente?',
        confianca: 0,
      };
    }
  }

  /**
   * Construir mensagem de sistema baseada no contexto do usuário
   */
  private construirSystemMessage(contexto: string): string {
    const baseIdentity = `Você é Nôa Esperanza, uma IA Residente especializada em cannabis medicinal e nefrologia, 
baseada na metodologia Arte da Entrevista Clínica do Dr. Ricardo Valença.

Sua comunicação é:
- Acolhedora e empática
- Baseada em evidências científicas
- LGPD Compliant
- Usa "Bons ventos soprem" como saudação
- Escuta profunda, não impositiva

Você tem acesso a:
- Base de Conhecimento (como você se comporta)
- Biblioteca Geral (240+ artigos científicos, protocolos KDIGO, The Global Burden of Kidney Disease)
- Sistema IMRE Triaxial (37 blocos de avaliação clínica)`;

    const contextMessages = {
      paciente: `${baseIdentity}

CONTEXTO ATUAL: Você está conversando com um PACIENTE.
- Seja especialmente acolhedora e clara
- Use linguagem acessível, evite termos técnicos excessivos
- Foque em escuta e acolhimento
- Pode iniciar avaliação clínica IMRE quando apropriado
- Priorize segurança e bem-estar do paciente`,

      profissional: `${baseIdentity}

CONTEXTO ATUAL: Você está conversando com um PROFISSIONAL DE SAÚDE.
- Use linguagem técnica apropriada
- Referencie guidelines e protocolos
- Discuta casos clínicos com profundidade
- Sugira protocolos de prescrição baseados em AEC
- Apoie decisões clínicas com evidências`,

      aluno: `${baseIdentity}

CONTEXTO ATUAL: Você está conversando com um ALUNO.
- Seja didática e explicativa
- Ensine a metodologia AEC passo a passo
- Use exemplos práticos
- Estimule pensamento crítico
- Referencie módulos do curso quando relevante`,

      geral: baseIdentity
    };

    return contextMessages[contexto as keyof typeof contextMessages] || contextMessages.geral;
  }

  /**
   * Simular chamada à API (substituir por chamada real em produção)
   */
  private async simularChamadaAPI(
    messages: GPT4Message[], 
    contexto: string
  ): Promise<GPT4Response> {
    // Simular delay de processamento
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simular reasoning do GPT-4.1
    const reasoning = `Analisando a mensagem do ${contexto}. Considerando:
1. Base de Conhecimento sobre metodologia AEC
2. Documentos da Biblioteca (KDIGO, Global Burden)
3. Contexto específico do ${contexto}
4. Histórico da conversa
Conclusão: Resposta empática e baseada em evidências.`;

    // Simular resposta contextual
    const ultimaMensagem = messages[messages.length - 1].content.toLowerCase();
    
    let resposta = '🌬️ Bons ventos soprem. ';
    
    if (ultimaMensagem.includes('dor') || ultimaMensagem.includes('sintoma')) {
      resposta += 'Compreendo que você está com sintomas. Vamos explorar isso com calma. ';
      if (contexto === 'paciente') {
        resposta += 'Gostaria de fazer uma avaliação clínica inicial comigo?';
      }
    } else if (ultimaMensagem.includes('cannabis') || ultimaMensagem.includes('medicinal')) {
      resposta += 'Sobre cannabis medicinal, baseio minhas orientações em evidências científicas e na metodologia AEC. ';
      if (contexto === 'profissional') {
        resposta += 'Posso te ajudar com protocolos de prescrição específicos?';
      }
    } else if (ultimaMensagem.includes('rim') || ultimaMensagem.includes('renal')) {
      resposta += 'A saúde renal é fundamental. Com base nas diretrizes KDIGO e no Global Burden of Kidney Disease, ';
      resposta += 'podemos avaliar fatores de risco e função renal de forma integrada.';
    } else {
      resposta += 'Estou aqui para apoiá-lo(a). Como posso ajudar hoje?';
    }

    return {
      resposta,
      reasoning,
      confianca: 0.95,
      fontes: ['Base de Conhecimento', 'Biblioteca Geral', 'KDIGO Guidelines']
    };
  }

  /**
   * Processar áudio/vídeo multimodal
   * Em produção, enviaria para GPT-4.1 Vision + Audio
   */
  async processarMultimodal(
    audio?: Blob,
    video?: Blob,
    texto?: string
  ): Promise<GPT4Response> {
    // Implementar integração real com GPT-4.1 multimodal
    console.log('Processando entrada multimodal:', { audio, video, texto });
    
    return {
      resposta: 'Análise multimodal em desenvolvimento...',
      confianca: 0.8
    };
  }
}

export const gpt4Service = new GPT4Service();

