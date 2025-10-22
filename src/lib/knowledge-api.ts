// =====================================================
// API INTERNA PARA ATUALIZAÇÃO DA BASE DE CONHECIMENTO
// Sistema de Gerenciamento Dinâmico - Nôa Esperanza
// =====================================================

import { knowledgeBase, ConhecimentoItem } from './knowledge-base';

export interface APIResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

export interface UpdateRequest {
  id: string;
  updates: Partial<ConhecimentoItem>;
  apiKey: string;
}

export interface SearchRequest {
  term: string;
  category?: string;
  apiKey: string;
}

export class KnowledgeAPI {
  private apiKey: string = 'noa_kb_internal_2025';
  private adminKey: string = 'noa_master_rv2025';

  // Verificar autenticação
  private verificarAutenticacao(key: string, nivel: 'read' | 'write' | 'admin' = 'read'): boolean {
    if (nivel === 'admin') {
      return key === this.adminKey;
    }
    if (nivel === 'write') {
      return key === this.apiKey || key === this.adminKey;
    }
    return key === this.apiKey || key === this.adminKey;
  }

  // Adicionar novo conhecimento
  adicionarConhecimento(item: Omit<ConhecimentoItem, 'dataAtualizacao'>, apiKey: string): APIResponse {
    try {
      if (!this.verificarAutenticacao(apiKey, 'write')) {
        return {
          success: false,
          message: 'Acesso negado',
          error: 'API Key inválida para escrita'
        };
      }

      knowledgeBase.adicionarConhecimento(item);
      
      return {
        success: true,
        message: 'Conhecimento adicionado com sucesso',
        data: { id: item.id, titulo: item.titulo }
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erro ao adicionar conhecimento',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      };
    }
  }

  // Atualizar conhecimento existente
  atualizarConhecimento(request: UpdateRequest): APIResponse {
    try {
      if (!this.verificarAutenticacao(request.apiKey, 'write')) {
        return {
          success: false,
          message: 'Acesso negado',
          error: 'API Key inválida para escrita'
        };
      }

      knowledgeBase.atualizarConhecimento(request.id, request.updates, request.apiKey);
      
      return {
        success: true,
        message: 'Conhecimento atualizado com sucesso',
        data: { id: request.id }
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erro ao atualizar conhecimento',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      };
    }
  }

  // Buscar conhecimento
  buscarConhecimento(request: SearchRequest): APIResponse {
    try {
      if (!this.verificarAutenticacao(request.apiKey, 'read')) {
        return {
          success: false,
          message: 'Acesso negado',
          error: 'API Key inválida para leitura'
        };
      }

      const resultados = knowledgeBase.buscarConhecimento(request.term, request.category);
      
      return {
        success: true,
        message: `${resultados.length} resultados encontrados`,
        data: resultados
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erro ao buscar conhecimento',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      };
    }
  }

  // Obter conhecimento por categoria
  obterPorCategoria(categoria: string, apiKey: string): APIResponse {
    try {
      if (!this.verificarAutenticacao(apiKey, 'read')) {
        return {
          success: false,
          message: 'Acesso negado',
          error: 'API Key inválida para leitura'
        };
      }

      const resultados = knowledgeBase.obterConhecimentoPorCategoria(categoria);
      
      return {
        success: true,
        message: `${resultados.length} itens encontrados na categoria ${categoria}`,
        data: resultados
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erro ao obter conhecimento por categoria',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      };
    }
  }

  // Obter todos os conhecimentos
  obterTodos(apiKey: string): APIResponse {
    try {
      if (!this.verificarAutenticacao(apiKey, 'read')) {
        return {
          success: false,
          message: 'Acesso negado',
          error: 'API Key inválida para leitura'
        };
      }

      const conhecimentos = knowledgeBase.obterTodosConhecimentos();
      
      return {
        success: true,
        message: `${conhecimentos.length} itens de conhecimento disponíveis`,
        data: conhecimentos
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erro ao obter todos os conhecimentos',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      };
    }
  }

  // Obter estatísticas
  obterEstatisticas(apiKey: string): APIResponse {
    try {
      if (!this.verificarAutenticacao(apiKey, 'read')) {
        return {
          success: false,
          message: 'Acesso negado',
          error: 'API Key inválida para leitura'
        };
      }

      const estatisticas = knowledgeBase.obterEstatisticas();
      
      return {
        success: true,
        message: 'Estatísticas obtidas com sucesso',
        data: estatisticas
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erro ao obter estatísticas',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      };
    }
  }

  // Obter resposta inteligente para IA
  obterRespostaIA(pergunta: string, apiKey: string): APIResponse {
    try {
      if (!this.verificarAutenticacao(apiKey, 'read')) {
        return {
          success: false,
          message: 'Acesso negado',
          error: 'API Key inválida para leitura'
        };
      }

      const resposta = knowledgeBase.obterRespostaInteligente(pergunta);
      
      return {
        success: true,
        message: 'Resposta gerada com sucesso',
        data: { resposta, pergunta }
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erro ao gerar resposta',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      };
    }
  }

  // Gerenciar conhecimento (apenas admin)
  gerenciarConhecimento(acao: 'ativar' | 'desativar' | 'deletar', id: string, apiKey: string): APIResponse {
    try {
      if (!this.verificarAutenticacao(apiKey, 'admin')) {
        return {
          success: false,
          message: 'Acesso negado',
          error: 'Apenas administradores podem gerenciar conhecimento'
        };
      }

      const updates: Partial<ConhecimentoItem> = {};
      
      switch (acao) {
        case 'ativar':
          updates.ativo = true;
          break;
        case 'desativar':
          updates.ativo = false;
          break;
        case 'deletar':
          // Em uma implementação real, você removeria o item
          updates.ativo = false;
          break;
      }

      knowledgeBase.atualizarConhecimento(id, updates, apiKey);
      
      return {
        success: true,
        message: `Conhecimento ${acao} com sucesso`,
        data: { id, acao }
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erro ao gerenciar conhecimento',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      };
    }
  }

  // Backup da base de conhecimento
  backupCompleto(apiKey: string): APIResponse {
    try {
      if (!this.verificarAutenticacao(apiKey, 'admin')) {
        return {
          success: false,
          message: 'Acesso negado',
          error: 'Apenas administradores podem fazer backup'
        };
      }

      const backup = {
        timestamp: new Date().toISOString(),
        versao: '1.0.0',
        conhecimentos: knowledgeBase.obterTodosConhecimentos(),
        estatisticas: knowledgeBase.obterEstatisticas()
      };
      
      return {
        success: true,
        message: 'Backup criado com sucesso',
        data: backup
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erro ao criar backup',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      };
    }
  }
}

// Instância global da API
export const knowledgeAPI = new KnowledgeAPI();
