// =====================================================
// SISTEMA DE AUTENTICAÇÃO E CÓDIGOS DE ATIVAÇÃO
// Nôa Esperanza Platform
// =====================================================

export interface Usuario {
  id: string;
  nome: string;
  codigo: string[];
  nivel: 'mestre' | 'admin' | 'profissional' | 'pesquisador' | 'estudante' | 'paciente';
  apiKey?: string;
  permissoes: string[];
}

// Usuários cadastrados
export const usuariosCadastrados: Usuario[] = [
  {
    id: 'usr_001',
    nome: 'Dr. Ricardo Valença',
    codigo: [
      'olá nôa. ricardo valença, aqui',
      'olá nôa ricardo valença aqui',
      'ricardo valença',
      'dr. ricardo',
      'dr. valença',
      'ricardo valença aqui',
      'olá nôa ricardo valença',
      'nôa ricardo valença',
      'ricardo valença nôa'
    ],
    nivel: 'mestre',
    apiKey: 'noa_master_rv2025',
    permissoes: [
      'admin_total',
      'editar_quebra_gelos',
      'editar_principios',
      'editar_imre',
      'editar_base_conhecimento',
      'gerenciar_usuarios',
      'gerar_api_keys',
      'visualizar_analytics',
      'exportar_dados'
    ]
  }
];

export class AuthSystem {
  private usuarioAtual: Usuario | null = null;

  // Método de debug
  debugInfo() {
    return {
      usuariosCadastrados: usuariosCadastrados.length,
      usuarioAtual: this.usuarioAtual,
      codigos: usuariosCadastrados[0]?.codigo
    };
  }

  detectarUsuario(mensagem: string): Usuario | null {
    // Normalização mais robusta
    const mensagemNormalizada = mensagem
      .toLowerCase()
      .trim()
      .replace(/[.,!?;:]/g, '') // Remove pontuação
      .replace(/\s+/g, ' '); // Normaliza espaços
    
    for (const usuario of usuariosCadastrados) {
      for (const codigo of usuario.codigo) {
        const codigoNormalizado = codigo
          .toLowerCase()
          .replace(/[.,!?;:]/g, '')
          .replace(/\s+/g, ' ');
        
        if (mensagemNormalizada.includes(codigoNormalizado)) {
          this.usuarioAtual = usuario;
          return usuario;
        }
      }
    }
    return null;
  }

  getUsuarioAtual(): Usuario | null {
    return this.usuarioAtual;
  }

  temPermissao(permissao: string): boolean {
    if (!this.usuarioAtual) return false;
    return this.usuarioAtual.permissoes.includes(permissao) || 
           this.usuarioAtual.permissoes.includes('admin_total');
  }

  getNivel(): string {
    return this.usuarioAtual?.nivel || 'publico';
  }

  logout(): void {
    this.usuarioAtual = null;
  }

  getMensagemBoasVindas(usuario: Usuario): string {
    switch (usuario.nivel) {
      case 'mestre':
        return `Dr. Ricardo! Bons ventos soprem. É uma honra tê-lo aqui. Como criador da metodologia AEC e coordenador científico da Nôa Esperanza, você tem acesso total à plataforma.\n\n🔧 Dashboard Admin: /admin\n📊 Base de Conhecimento: Completa\n🔑 API Keys: Ativas\n\nComo posso apoiá-lo hoje?`;
      case 'admin':
        return `Olá, ${usuario.nome}! Bem-vindo(a) ao painel administrativo da Nôa Esperanza.`;
      case 'profissional':
        return `Olá, Dr(a). ${usuario.nome}! Pronto(a) para atender com escuta profunda?`;
      case 'pesquisador':
        return `Olá, ${usuario.nome}! Bem-vindo(a) ao portal de pesquisa.`;
      case 'estudante':
        return `Olá, ${usuario.nome}! Vamos aprender juntos com a metodologia AEC.`;
      default:
        return `Olá, ${usuario.nome}! Como posso apoiá-lo(a) hoje?`;
    }
  }
}

