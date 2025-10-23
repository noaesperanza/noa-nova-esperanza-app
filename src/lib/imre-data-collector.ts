// =====================================================
// COLETOR DE DADOS IMRE - REGISTRO AUTOMÁTICO
// Sistema de Captura e Estruturação de Dados IMRE
// =====================================================

import { PacienteSemantico, AberturaExponencial, DesenvolvimentoIndiciario, FechamentoConsensual } from './patient-database';
import { IMRETriaxialEngine } from './imre-system-triaxial';

export interface DadosIMREColetados {
  abertura: AberturaExponencial;
  desenvolvimento: DesenvolvimentoIndiciario;
  fechamento: FechamentoConsensual;
  timestamp: Date;
}

export class IMREDataCollector {
  private dadosColetados: Partial<DadosIMREColetados> = {};
  private sistemaIMRE: IMRETriaxialEngine;

  constructor() {
    this.sistemaIMRE = new IMRETriaxialEngine();
  }

  // Iniciar coleta de dados
  iniciarColeta(): void {
    this.dadosColetados = {
      abertura: {
        identificacao: '',
        motivoConsulta: '',
        queixas: [],
        queixaPrincipal: '',
        expectativas: '',
        contextoEmocional: '',
        timestamp: new Date()
      },
      desenvolvimento: {
        historiaDoencaAtual: {
          inicio: '',
          evolucao: '',
          caracteristicas: '',
          fatoresModuladores: '',
          impactoFuncional: '',
          tratamentosAnteriores: []
        },
        historiaPatologica: {
          doencasPrevias: [],
          cirurgias: [],
          hospitalizacoes: []
        },
        historiaFamiliar: {
          doencasFamiliares: [],
          padroesHereditarios: []
        },
        alergias: {
          medicamentos: [],
          alimentos: [],
          outras: []
        },
        habitosVida: {
          alimentacao: '',
          sono: '',
          exercicios: '',
          trabalho: '',
          contextoSocial: ''
        },
        medicações: {
          atuais: [],
          anteriores: [],
          suplementos: []
        },
        timestamp: new Date()
      },
      fechamento: {
        revisaoNarrativa: '',
        complementacoes: [],
        examesSolicitados: [],
        proximosPassos: '',
        observacoes: '',
        timestamp: new Date()
      },
      timestamp: new Date()
    };
  }

  // Processar resposta do IMRE e extrair dados
  processarRespostaIMRE(blocoId: number, resposta: string): void {
    const bloco = this.sistemaIMRE.obterBloco(blocoId);
    if (!bloco) return;

    // Mapear resposta para estrutura semântica
    switch (bloco.etapa) {
      case 'identificacao':
        this.dadosColetados.abertura!.identificacao = resposta;
        break;
      
      case 'motivo_detalhado':
        this.dadosColetados.abertura!.motivoConsulta = resposta;
        break;
      
      case 'motivo_detalhado_extra':
        this.dadosColetados.abertura!.queixas.push(resposta);
        break;
      
      case 'queixa_principal':
        this.dadosColetados.abertura!.queixaPrincipal = resposta;
        break;
      
      case 'hda_inicio':
        this.dadosColetados.desenvolvimento!.historiaDoencaAtual.inicio = resposta;
        break;
      
      case 'hda_evolucao':
        this.dadosColetados.desenvolvimento!.historiaDoencaAtual.evolucao = resposta;
        break;
      
      case 'hda_caracteristicas':
        this.dadosColetados.desenvolvimento!.historiaDoencaAtual.caracteristicas = resposta;
        break;
      
      case 'hda_fatores':
        this.dadosColetados.desenvolvimento!.historiaDoencaAtual.fatoresModuladores = resposta;
        break;
      
      case 'hda_impacto':
        this.dadosColetados.desenvolvimento!.historiaDoencaAtual.impactoFuncional = resposta;
        break;
      
      case 'tratamentos_anteriores':
        this.dadosColetados.desenvolvimento!.historiaDoencaAtual.tratamentosAnteriores.push(resposta);
        break;
      
      case 'historico_saude':
        this.dadosColetados.desenvolvimento!.historiaPatologica.doencasPrevias.push(resposta);
        break;
      
      case 'medicamentos':
        this.dadosColetados.desenvolvimento!.medicações.atuais.push(resposta);
        break;
      
      case 'medicamentos_extra':
        this.dadosColetados.desenvolvimento!.medicações.atuais.push(resposta);
        break;
      
      case 'alergias':
        this.dadosColetados.desenvolvimento!.alergias.medicamentos.push(resposta);
        break;
      
      case 'cirurgias':
        this.dadosColetados.desenvolvimento!.historiaPatologica.cirurgias.push(resposta);
        break;
      
      case 'historico_familiar':
        this.dadosColetados.desenvolvimento!.historiaFamiliar.doencasFamiliares.push(resposta);
        break;
      
      case 'habitos_vida':
        this.dadosColetados.desenvolvimento!.habitosVida.alimentacao = resposta;
        break;
      
      case 'contexto_social':
        this.dadosColetados.desenvolvimento!.habitosVida.contextoSocial = resposta;
        break;
      
      case 'contexto_emocional':
        this.dadosColetados.abertura!.contextoEmocional = resposta;
        break;
      
      case 'expectativas':
        this.dadosColetados.abertura!.expectativas = resposta;
        break;
      
      case 'revisao_narrativa':
        this.dadosColetados.fechamento!.revisaoNarrativa = resposta;
        break;
      
      case 'complemento':
        this.dadosColetados.fechamento!.complementacoes.push(resposta);
        break;
      
      case 'exames_solicitados':
        this.dadosColetados.fechamento!.examesSolicitados.push(resposta);
        break;
      
      case 'proximos_passos':
        this.dadosColetados.fechamento!.proximosPassos = resposta;
        break;
      
      case 'observacoes':
        this.dadosColetados.fechamento!.observacoes = resposta;
        break;
    }
  }

  // Finalizar coleta e retornar dados estruturados
  finalizarColeta(): DadosIMREColetados {
    this.dadosColetados.timestamp = new Date();
    return this.dadosColetados as DadosIMREColetados;
  }

  // Obter dados parciais para contexto da IA
  obterDadosParciais(): Partial<DadosIMREColetados> {
    return this.dadosColetados;
  }

  // Verificar se coleta está completa
  verificarCompletude(): { completa: boolean; camposFaltantes: string[] } {
    const camposFaltantes: string[] = [];
    
    // Verificar abertura
    if (!this.dadosColetados.abertura?.identificacao) camposFaltantes.push('identificacao');
    if (!this.dadosColetados.abertura?.motivoConsulta) camposFaltantes.push('motivoConsulta');
    if (!this.dadosColetados.abertura?.queixaPrincipal) camposFaltantes.push('queixaPrincipal');
    
    // Verificar desenvolvimento
    if (!this.dadosColetados.desenvolvimento?.historiaDoencaAtual.inicio) camposFaltantes.push('hda_inicio');
    if (!this.dadosColetados.desenvolvimento?.historiaDoencaAtual.evolucao) camposFaltantes.push('hda_evolucao');
    if (!this.dadosColetados.desenvolvimento?.historiaDoencaAtual.caracteristicas) camposFaltantes.push('hda_caracteristicas');
    
    // Verificar fechamento
    if (!this.dadosColetados.fechamento?.revisaoNarrativa) camposFaltantes.push('revisaoNarrativa');
    if (!this.dadosColetados.fechamento?.proximosPassos) camposFaltantes.push('proximosPassos');
    
    return {
      completa: camposFaltantes.length === 0,
      camposFaltantes
    };
  }

  // Gerar relatório estruturado
  gerarRelatorio(): string {
    const dados = this.dadosColetados;
    if (!dados.abertura || !dados.desenvolvimento || !dados.fechamento) {
      return 'Dados incompletos para gerar relatório';
    }

    let relatorio = 'RELATÓRIO IMRE ESTRUTURADO\n';
    relatorio += '='.repeat(50) + '\n\n';
    
    // Abertura
    relatorio += 'ABERTURA EXPONENCIAL:\n';
    relatorio += `Identificação: ${dados.abertura.identificacao}\n`;
    relatorio += `Motivo da Consulta: ${dados.abertura.motivoConsulta}\n`;
    relatorio += `Queixas: ${dados.abertura.queixas.join(', ')}\n`;
    relatorio += `Queixa Principal: ${dados.abertura.queixaPrincipal}\n`;
    relatorio += `Expectativas: ${dados.abertura.expectativas}\n`;
    relatorio += `Contexto Emocional: ${dados.abertura.contextoEmocional}\n\n`;
    
    // Desenvolvimento
    relatorio += 'DESENVOLVIMENTO INDICIÁRIO:\n';
    relatorio += `História da Doença:\n`;
    relatorio += `  - Início: ${dados.desenvolvimento.historiaDoencaAtual.inicio}\n`;
    relatorio += `  - Evolução: ${dados.desenvolvimento.historiaDoencaAtual.evolucao}\n`;
    relatorio += `  - Características: ${dados.desenvolvimento.historiaDoencaAtual.caracteristicas}\n`;
    relatorio += `  - Fatores Moduladores: ${dados.desenvolvimento.historiaDoencaAtual.fatoresModuladores}\n`;
    relatorio += `  - Impacto Funcional: ${dados.desenvolvimento.historiaDoencaAtual.impactoFuncional}\n`;
    relatorio += `  - Tratamentos Anteriores: ${dados.desenvolvimento.historiaDoencaAtual.tratamentosAnteriores.join(', ')}\n\n`;
    
    relatorio += `Medicamentos Atuais: ${dados.desenvolvimento.medicações.atuais.join(', ')}\n`;
    relatorio += `Alergias: ${dados.desenvolvimento.alergias.medicamentos.join(', ')}\n`;
    relatorio += `Hábitos de Vida: ${dados.desenvolvimento.habitosVida.alimentacao}\n`;
    relatorio += `Contexto Social: ${dados.desenvolvimento.habitosVida.contextoSocial}\n\n`;
    
    // Fechamento
    relatorio += 'FECHAMENTO CONSENSUAL:\n';
    relatorio += `Revisão Narrativa: ${dados.fechamento.revisaoNarrativa}\n`;
    relatorio += `Complementações: ${dados.fechamento.complementacoes.join(', ')}\n`;
    relatorio += `Exames Solicitados: ${dados.fechamento.examesSolicitados.join(', ')}\n`;
    relatorio += `Próximos Passos: ${dados.fechamento.proximosPassos}\n`;
    relatorio += `Observações: ${dados.fechamento.observacoes}\n`;
    
    return relatorio;
  }
}

// Instância global
export const imreDataCollector = new IMREDataCollector();
