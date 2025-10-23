// =====================================================
// BASE DE DADOS SEMÂNTICA - PACIENTE LONGITUDINAL
// Sistema de Armazenamento e Contexto da IA Residente
// =====================================================

export interface DadosBasicos {
  id: string;
  nome: string;
  idade: number;
  genero: 'masculino' | 'feminino' | 'outro';
  contato: string;
  dataCadastro: Date;
  ultimaAtualizacao: Date;
}

export interface AberturaExponencial {
  identificacao: string;
  motivoConsulta: string;
  queixas: string[];
  queixaPrincipal: string;
  expectativas: string;
  contextoEmocional: string;
  timestamp: Date;
}

export interface DesenvolvimentoIndiciario {
  historiaDoencaAtual: {
    inicio: string;
    evolucao: string;
    caracteristicas: string;
    fatoresModuladores: string;
    impactoFuncional: string;
    tratamentosAnteriores: string[];
  };
  historiaPatologica: {
    doencasPrevias: string[];
    cirurgias: string[];
    hospitalizacoes: string[];
  };
  historiaFamiliar: {
    doencasFamiliares: string[];
    padroesHereditarios: string[];
  };
  alergias: {
    medicamentos: string[];
    alimentos: string[];
    outras: string[];
  };
  habitosVida: {
    alimentacao: string;
    sono: string;
    exercicios: string;
    trabalho: string;
    contextoSocial: string;
  };
  medicações: {
    atuais: string[];
    anteriores: string[];
    suplementos: string[];
  };
  timestamp: Date;
}

export interface FechamentoConsensual {
  revisaoNarrativa: string;
  complementacoes: string[];
  examesSolicitados: string[];
  proximosPassos: string;
  observacoes: string;
  timestamp: Date;
}

export interface ContextoLongitudinal {
  evolucaoSintomas: { data: Date; sintoma: string; intensidade: number }[];
  evolucaoMedicamentos: { data: Date; medicamento: string; dosagem: string }[];
  evolucaoExames: { data: Date; exame: string; resultado: string }[];
  consultasProfissionais: { data: Date; profissional: string; observacoes: string }[];
  interacoesIA: { data: Date; pergunta: string; resposta: string; contexto: string }[];
}

export interface PacienteSemantico {
  dadosBasicos: DadosBasicos;
  aberturaExponencial: AberturaExponencial;
  desenvolvimentoIndiciario: DesenvolvimentoIndiciario;
  fechamentoConsensual: FechamentoConsensual;
  contextoLongitudinal: ContextoLongitudinal;
  permissoesCompartilhamento: PermissoesCompartilhamento;
  ativo: boolean;
}

export interface PermissoesCompartilhamento {
  dadosBasicos: boolean; // sempre true
  sintomas: boolean;
  medicamentos: boolean;
  exames: boolean;
  consultas: boolean;
  evolucao: boolean;
  pesquisa: boolean; // anonimizado
  validade: Date;
}

export class PacienteDatabase {
  private dbName = 'NoaEsperanzaDB';
  private dbVersion = 1;
  private db: IDBDatabase | null = null;

  async inicializar(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Store para pacientes
        if (!db.objectStoreNames.contains('pacientes')) {
          const store = db.createObjectStore('pacientes', { keyPath: 'dadosBasicos.id' });
          store.createIndex('nome', 'dadosBasicos.nome', { unique: false });
          store.createIndex('dataCadastro', 'dadosBasicos.dataCadastro', { unique: false });
        }
        
        // Store para interações IA
        if (!db.objectStoreNames.contains('interacoesIA')) {
          const store = db.createObjectStore('interacoesIA', { keyPath: 'id', autoIncrement: true });
          store.createIndex('pacienteId', 'pacienteId', { unique: false });
          store.createIndex('data', 'data', { unique: false });
        }
      };
    });
  }

  async salvarPaciente(paciente: PacienteSemantico): Promise<void> {
    if (!this.db) throw new Error('Database não inicializada');
    
    const transaction = this.db.transaction(['pacientes'], 'readwrite');
    const store = transaction.objectStore('pacientes');
    
    return new Promise((resolve, reject) => {
      const request = store.put(paciente);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async obterPaciente(id: string): Promise<PacienteSemantico | null> {
    if (!this.db) throw new Error('Database não inicializada');
    
    const transaction = this.db.transaction(['pacientes'], 'readonly');
    const store = transaction.objectStore('pacientes');
    
    return new Promise((resolve, reject) => {
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  async listarPacientes(): Promise<PacienteSemantico[]> {
    if (!this.db) throw new Error('Database não inicializada');
    
    const transaction = this.db.transaction(['pacientes'], 'readonly');
    const store = transaction.objectStore('pacientes');
    
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  async salvarInteracaoIA(
    pacienteId: string, 
    pergunta: string, 
    resposta: string, 
    contexto: string
  ): Promise<void> {
    if (!this.db) throw new Error('Database não inicializada');
    
    const interacao = {
      id: Date.now().toString(),
      pacienteId,
      data: new Date(),
      pergunta,
      resposta,
      contexto
    };
    
    const transaction = this.db.transaction(['interacoesIA'], 'readwrite');
    const store = transaction.objectStore('interacoesIA');
    
    return new Promise((resolve, reject) => {
      const request = store.add(interacao);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async obterInteracoesIA(pacienteId: string): Promise<any[]> {
    if (!this.db) throw new Error('Database não inicializada');
    
    const transaction = this.db.transaction(['interacoesIA'], 'readonly');
    const store = transaction.objectStore('interacoesIA');
    const index = store.index('pacienteId');
    
    return new Promise((resolve, reject) => {
      const request = index.getAll(pacienteId);
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  // Construir contexto para IA
  async construirContextoIA(pacienteId: string): Promise<string> {
    const paciente = await this.obterPaciente(pacienteId);
    if (!paciente) return '';

    const contexto = {
      // Dados básicos (sempre disponíveis)
      identificacao: {
        nome: paciente.dadosBasicos.nome,
        idade: paciente.dadosBasicos.idade,
        genero: paciente.dadosBasicos.genero
      },
      
      // Abertura exponencial
      abertura: paciente.permissoesCompartilhamento.sintomas ? {
        motivoConsulta: paciente.aberturaExponencial.motivoConsulta,
        queixas: paciente.aberturaExponencial.queixas,
        queixaPrincipal: paciente.aberturaExponencial.queixaPrincipal,
        expectativas: paciente.aberturaExponencial.expectativas
      } : null,
      
      // Desenvolvimento indiciário
      desenvolvimento: paciente.permissoesCompartilhamento.sintomas ? {
        historiaDoenca: paciente.desenvolvimentoIndiciario.historiaDoencaAtual,
        medicamentos: paciente.permissoesCompartilhamento.medicamentos ? 
          paciente.desenvolvimentoIndiciario.medicações : null,
        alergias: paciente.desenvolvimentoIndiciario.alergias,
        habitos: paciente.desenvolvimentoIndiciario.habitosVida
      } : null,
      
      // Evolução longitudinal
      evolucao: paciente.permissoesCompartilhamento.evolucao ? {
        sintomas: paciente.contextoLongitudinal.evolucaoSintomas,
        medicamentos: paciente.contextoLongitudinal.evolucaoMedicamentos,
        consultas: paciente.contextoLongitudinal.consultasProfissionais
      } : null
    };

    return this.formatarContexto(contexto);
  }

  private formatarContexto(contexto: any): string {
    let contextoFormatado = 'CONTEXTO DO PACIENTE:\n\n';
    
    // Identificação
    contextoFormatado += `IDENTIFICAÇÃO: ${contexto.identificacao.nome}, ${contexto.identificacao.idade} anos, ${contexto.identificacao.genero}\n\n`;
    
    // Abertura
    if (contexto.abertura) {
      contextoFormatado += `MOTIVO DA CONSULTA: ${contexto.abertura.motivoConsulta}\n`;
      contextoFormatado += `QUEIXAS: ${contexto.abertura.queixas.join(', ')}\n`;
      contextoFormatado += `QUEIXA PRINCIPAL: ${contexto.abertura.queixaPrincipal}\n`;
      contextoFormatado += `EXPECTATIVAS: ${contexto.abertura.expectativas}\n\n`;
    }
    
    // Desenvolvimento
    if (contexto.desenvolvimento) {
      contextoFormatado += `HISTÓRIA DA DOENÇA: ${contexto.desenvolvimento.historiaDoenca.inicio}\n`;
      contextoFormatado += `EVOLUÇÃO: ${contexto.desenvolvimento.historiaDoenca.evolucao}\n`;
      contextoFormatado += `CARACTERÍSTICAS: ${contexto.desenvolvimento.historiaDoenca.caracteristicas}\n`;
      
      if (contexto.desenvolvimento.medicamentos) {
        contextoFormatado += `MEDICAMENTOS: ${contexto.desenvolvimento.medicamentos.atuais.join(', ')}\n`;
      }
      
      contextoFormatado += `ALERGIAS: ${contexto.desenvolvimento.alergias.medicamentos.join(', ')}\n`;
      contextoFormatado += `HÁBITOS: ${contexto.desenvolvimento.habitos.alimentacao}\n\n`;
    }
    
    // Evolução
    if (contexto.evolucao) {
      contextoFormatado += `EVOLUÇÃO DOS SINTOMAS: ${contexto.evolucao.sintomas.map(s => `${s.sintoma} (${s.intensidade}/10)`).join(', ')}\n`;
      contextoFormatado += `EVOLUÇÃO MEDICAMENTOS: ${contexto.evolucao.medicamentos.map(m => `${m.medicamento} (${m.dosagem})`).join(', ')}\n`;
    }
    
    return contextoFormatado;
  }
}

// Instância global
export const pacienteDatabase = new PacienteDatabase();
