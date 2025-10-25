// =====================================================
// SISTEMA DE CLASSIFICAÇÃO RENAL - NÔA ESPERANZA
// Classificação de estágio da doença renal para cannabis medicinal
// =====================================================

export interface EstagioRenal {
  estagio: number;
  nome: string;
  descricao: string;
  gfr: {
    min: number;
    max: number;
    unidade: string;
  };
  caracteristicas: string[];
  recomendacoesCannabis: {
    segura: boolean;
    precaucoes: string[];
    produtosRecomendados: string[];
    produtosEvitar: string[];
    dosagem: string;
    monitoramento: string[];
  };
  contraindicacoes: string[];
  alertas: string[];
}

export interface AvaliacaoRenal {
  gfr: number;
  creatinina: number;
  ureia: number;
  proteinuria: number;
  hematuria: boolean;
  pressaoArterial: {
    sistolica: number;
    diastolica: number;
  };
  diabetes: boolean;
  hipertensao: boolean;
  idade: number;
  peso: number;
  altura: number;
  sexo: 'M' | 'F';
}

export class RenalClassificationSystem {
  private estagios: EstagioRenal[] = [];

  constructor() {
    this.inicializarEstagios();
  }

  private inicializarEstagios() {
    this.estagios = [
      {
        estagio: 1,
        nome: "Função Renal Normal",
        descricao: "GFR normal ou aumentado com evidência de dano renal",
        gfr: { min: 90, max: 999, unidade: "mL/min/1.73m²" },
        caracteristicas: [
          "GFR ≥ 90 mL/min/1.73m²",
          "Evidência de dano renal (proteinúria, hematuria, alterações estruturais)",
          "Função renal preservada"
        ],
        recomendacoesCannabis: {
          segura: true,
          precaucoes: [
            "Monitorar função renal a cada 6 meses",
            "Evitar produtos com alto teor de THC",
            "Preferir produtos com CBD dominante"
          ],
          produtosRecomendados: [
            "Óleos de CBD (isolado ou broad spectrum)",
            "Cremes tópicos com canabinoides",
            "Produtos com baixo THC (< 0.3%)"
          ],
          produtosEvitar: [
            "Produtos com alto THC",
            "Fumar cannabis (risco de nefrotoxicidade por fumaça)",
            "Dosagens muito altas de THC"
          ],
          dosagem: "Iniciar com doses baixas (5-10mg CBD/dia)",
          monitoramento: [
            "Creatinina e GFR a cada 6 meses",
            "Pressão arterial mensal",
            "Função hepática trimestral"
          ]
        },
        contraindicacoes: [],
        alertas: [
          "Pacientes com histórico de nefrotoxicidade",
          "Uso concomitante com nefrotóxicos"
        ]
      },
      {
        estagio: 2,
        nome: "Insuficiência Renal Leve",
        descricao: "GFR ligeiramente diminuído com evidência de dano renal",
        gfr: { min: 60, max: 89, unidade: "mL/min/1.73m²" },
        caracteristicas: [
          "GFR 60-89 mL/min/1.73m²",
          "Dano renal com função ligeiramente diminuída",
          "Risco aumentado de progressão"
        ],
        recomendacoesCannabis: {
          segura: true,
          precaucoes: [
            "Monitoramento mais frequente (3-4 meses)",
            "Evitar produtos com THC > 1%",
            "Ajustar dosagem conforme função renal"
          ],
          produtosRecomendados: [
            "Óleos de CBD isolado",
            "Cremes tópicos",
            "Produtos broad spectrum com baixo THC"
          ],
          produtosEvitar: [
            "Produtos com THC > 1%",
            "Fumar cannabis",
            "Dosagens altas de THC"
          ],
          dosagem: "Doses baixas a moderadas (5-15mg CBD/dia)",
          monitoramento: [
            "Creatinina e GFR a cada 3-4 meses",
            "Pressão arterial quinzenal",
            "Função hepática bimestral"
          ]
        },
        contraindicacoes: [
          "Uso concomitante com nefrotóxicos potentes"
        ],
        alertas: [
          "Monitorar progressão da doença",
          "Ajustar medicações conforme função renal"
        ]
      },
      {
        estagio: 3,
        nome: "Insuficiência Renal Moderada",
        descricao: "GFR moderadamente diminuído",
        gfr: { min: 30, max: 59, unidade: "mL/min/1.73m²" },
        caracteristicas: [
          "GFR 30-59 mL/min/1.73m²",
          "Função renal moderadamente comprometida",
          "Maior risco de complicações"
        ],
        recomendacoesCannabis: {
          segura: true,
          precaucoes: [
            "Monitoramento rigoroso (2-3 meses)",
            "Evitar THC completamente",
            "Dosagem muito conservadora"
          ],
          produtosRecomendados: [
            "CBD isolado apenas",
            "Cremes tópicos com CBD",
            "Produtos sem THC"
          ],
          produtosEvitar: [
            "Qualquer produto com THC",
            "Fumar cannabis",
            "Produtos full spectrum"
          ],
          dosagem: "Doses muito baixas (2-5mg CBD/dia)",
          monitoramento: [
            "Creatinina e GFR a cada 2-3 meses",
            "Pressão arterial semanal",
            "Função hepática mensal"
          ]
        },
        contraindicacoes: [
          "Uso concomitante com nefrotóxicos",
          "Produtos com THC"
        ],
        alertas: [
          "Alto risco de progressão",
          "Necessário acompanhamento nefrológico"
        ]
      },
      {
        estagio: 4,
        nome: "Insuficiência Renal Grave",
        descricao: "GFR severamente diminuído",
        gfr: { min: 15, max: 29, unidade: "mL/min/1.73m²" },
        caracteristicas: [
          "GFR 15-29 mL/min/1.73m²",
          "Função renal severamente comprometida",
          "Preparação para diálise"
        ],
        recomendacoesCannabis: {
          segura: false,
          precaucoes: [
            "Uso apenas com supervisão nefrológica",
            "Monitoramento semanal",
            "Evitar todos os produtos com THC"
          ],
          produtosRecomendados: [
            "CBD isolado em doses mínimas",
            "Apenas cremes tópicos"
          ],
          produtosEvitar: [
            "Todos os produtos com THC",
            "Fumar cannabis",
            "Produtos orais com alta biodisponibilidade"
          ],
          dosagem: "Doses mínimas (1-2mg CBD/dia) apenas tópico",
          monitoramento: [
            "Creatinina e GFR mensal",
            "Pressão arterial diária",
            "Função hepática quinzenal"
          ]
        },
        contraindicacoes: [
          "Uso sem supervisão nefrológica",
          "Produtos com THC",
          "Dosagens altas"
        ],
        alertas: [
          "Alto risco de complicações",
          "Necessário acompanhamento intensivo"
        ]
      },
      {
        estagio: 5,
        nome: "Insuficiência Renal Terminal",
        descricao: "Falência renal ou diálise",
        gfr: { min: 0, max: 14, unidade: "mL/min/1.73m²" },
        caracteristicas: [
          "GFR < 15 mL/min/1.73m²",
          "Falência renal",
          "Diálise ou transplante necessário"
        ],
        recomendacoesCannabis: {
          segura: false,
          precaucoes: [
            "Uso contraindicado na maioria dos casos",
            "Apenas com supervisão nefrológica especializada",
            "Monitoramento diário"
          ],
          produtosRecomendados: [
            "Apenas cremes tópicos com CBD isolado"
          ],
          produtosEvitar: [
            "Todos os produtos orais",
            "Produtos com THC",
            "Fumar cannabis"
          ],
          dosagem: "Contraindicado ou doses mínimas tópicas",
          monitoramento: [
            "Monitoramento diário",
            "Acompanhamento nefrológico intensivo"
          ]
        },
        contraindicacoes: [
          "Uso sem supervisão especializada",
          "Produtos orais",
          "Produtos com THC"
        ],
        alertas: [
          "Alto risco de complicações graves",
          "Necessário acompanhamento intensivo"
        ]
      }
    ];
  }

  // Calcular GFR usando fórmula CKD-EPI
  calcularGFR(avaliacao: AvaliacaoRenal): number {
    const { creatinina, idade, sexo, raca = 'não-afrodescendente' } = avaliacao as any;
    
    // Fórmula CKD-EPI simplificada
    let gfr: number;
    
    if (sexo === 'F') {
      if (creatinina <= 0.7) {
        gfr = 144 * Math.pow(creatinina / 0.7, -0.329) * Math.pow(0.993, idade);
      } else {
        gfr = 144 * Math.pow(creatinina / 0.7, -1.209) * Math.pow(0.993, idade);
      }
    } else {
      if (creatinina <= 0.9) {
        gfr = 141 * Math.pow(creatinina / 0.9, -0.411) * Math.pow(0.993, idade);
      } else {
        gfr = 141 * Math.pow(creatinina / 0.9, -1.209) * Math.pow(0.993, idade);
      }
    }
    
    // Ajuste para raça (se aplicável)
    if (raca === 'afrodescendente') {
      gfr *= 1.159;
    }
    
    return Math.round(gfr);
  }

  // Classificar estágio da doença renal
  classificarEstagio(avaliacao: AvaliacaoRenal): EstagioRenal {
    const gfr = this.calcularGFR(avaliacao);
    
    for (const estagio of this.estagios) {
      if (gfr >= estagio.gfr.min && gfr <= estagio.gfr.max) {
        return estagio;
      }
    }
    
    // Se não encontrar, retornar estágio 5 (mais grave)
    return this.estagios[4];
  }

  // Obter recomendações específicas para cannabis
  obterRecomendacoesCannabis(avaliacao: AvaliacaoRenal): {
    estagio: EstagioRenal;
    recomendacoes: any;
    alertas: string[];
    contraindicacoes: string[];
  } {
    const estagio = this.classificarEstagio(avaliacao);
    
    return {
      estagio,
      recomendacoes: estagio.recomendacoesCannabis,
      alertas: estagio.alertas,
      contraindicacoes: estagio.contraindicacoes
    };
  }

  // Verificar se uso de cannabis é seguro
  verificarSeguranca(avaliacao: AvaliacaoRenal): {
    seguro: boolean;
    motivo: string;
    precaucoes: string[];
  } {
    const recomendacoes = this.obterRecomendacoesCannabis(avaliacao);
    
    return {
      seguro: recomendacoes.recomendacoes.segura,
      motivo: recomendacoes.recomendacoes.segura 
        ? "Uso de cannabis pode ser considerado com precauções"
        : "Uso de cannabis não recomendado devido ao estágio avançado da doença renal",
      precaucoes: recomendacoes.recomendacoes.precaucoes
    };
  }

  // Obter todos os estágios
  obterTodosEstagios(): EstagioRenal[] {
    return this.estagios;
  }

  // Obter estágio específico
  obterEstagio(numero: number): EstagioRenal | null {
    return this.estagios.find(e => e.estagio === numero) || null;
  }
}

// Instância global do sistema
export const renalClassificationSystem = new RenalClassificationSystem();
