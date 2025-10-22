import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Activity,
  MessageSquare,
  FileText,
  Share2,
  User,
  Shield,
  ArrowLeft,
  Sparkles,
  Heart,
  TrendingUp,
  Award,
  Clock
} from 'lucide-react';
import { Helmet } from '../components/Helmet';
import { cn } from '../lib/utils';
import { AvatarNoaMultimodal } from '../components/AvatarNoaMultimodal';

const AreaPaciente = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/paciente', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { path: '/paciente/agenda', label: 'Agenda', icon: Calendar },
    { path: '/paciente/kpis', label: 'Meus KPIs', icon: Activity },
    { path: '/paciente/avaliacao', label: 'Avaliação Clínica', icon: Heart },
    { path: '/paciente/chat', label: 'Chat com Nôa', icon: MessageSquare },
    { path: '/paciente/relatorios', label: 'Relatórios', icon: FileText },
    { path: '/paciente/compartilhamento', label: 'Compartilhamento', icon: Share2 }
  ];

  return (
    <>
      <Helmet>
        <title>Área do Paciente | Nôa Esperanza</title>
        <meta name="description" content="Área exclusiva para pacientes da plataforma Nôa Esperanza." />
      </Helmet>
      
      <div className="flex min-h-screen bg-background">
        {/* Sidebar */}
        <aside className="w-64 bg-card border-r border-border p-6 flex flex-col">
          <div className="mb-8">
            <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
              <ArrowLeft size={16} />
              Voltar
            </Link>
            <h1 className="text-xl font-bold mb-1">Dashboard do Paciente</h1>
            <p className="text-sm text-muted-foreground">Programa de Cuidado Renal</p>
          </div>

          <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold">
                RV
              </div>
              <div>
                <div className="font-bold">Dr. Ricardo Valença</div>
                <div className="text-xs text-muted-foreground">Paciente</div>
              </div>
            </div>
          </div>

          <nav className="space-y-2 flex-1">
            {menuItems.map((item) => {
              const isActive = item.exact
                ? location.pathname === item.path
                : location.pathname.startsWith(item.path);
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 pt-4 border-t border-border">
            <div className="text-xs text-muted-foreground space-y-2">
              <div className="flex items-center gap-2">
                <Shield size={14} className="text-green-500" />
                <span>Dados protegidos por Blockchain</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} />
                <span>Última sincronização: Agora</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <Routes>
            <Route index element={<DashboardPaciente />} />
            <Route path="agenda" element={<AgendaPaciente />} />
            <Route path="kpis" element={<KPIsPaciente />} />
            <Route path="avaliacao" element={<AvaliacaoClinica />} />
            <Route path="chat" element={<ChatNoa />} />
            <Route path="relatorios" element={<RelatoriosPaciente />} />
            <Route path="compartilhamento" element={<CompartilhamentoDados />} />
          </Routes>
        </main>
      </div>
    </>
  );
};

// Dashboard Principal
const DashboardPaciente = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Meu Dashboard de Saúde</h1>
      
      {/* Alerta para Avaliação Inicial */}
      <div className="bg-gradient-to-br from-primary/10 to-purple-500/10 border-2 border-primary/30 rounded-xl p-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
            <Sparkles className="text-white" size={24} />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-2">Bem-vindo à Nôa Esperanza!</h2>
            <p className="text-muted-foreground mb-4">
              Para começar sua jornada de cuidado personalizado, recomendamos realizar uma 
              avaliação clínica inicial. Este processo leva cerca de 10-15 minutos e ajudará 
              nossos profissionais a entender melhor seu quadro de saúde.
            </p>
            <Link
              to="/paciente/avaliacao"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
            >
              <Heart size={20} />
              Iniciar Avaliação Clínica
            </Link>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Score Clínico</h3>
            <TrendingUp className="text-primary" size={20} />
          </div>
          <div className="text-3xl font-bold mb-1">85/100</div>
          <div className="text-xs text-green-600">↑ +5 desde última avaliação</div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Adesão ao Tratamento</h3>
            <Award className="text-primary" size={20} />
          </div>
          <div className="text-3xl font-bold mb-1">92%</div>
          <div className="text-xs text-green-600">Excelente!</div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Melhoria dos Sintomas</h3>
            <Activity className="text-primary" size={20} />
          </div>
          <div className="text-3xl font-bold mb-1">78%</div>
          <div className="text-xs text-muted-foreground">Desde início do tratamento</div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Qualidade de Vida</h3>
            <Heart className="text-primary" size={20} />
          </div>
          <div className="text-3xl font-bold mb-1">88/100</div>
          <div className="text-xs text-green-600">↑ +12 este mês</div>
        </div>
      </div>

      {/* Próximas Consultas */}
      <div className="bg-card border border-border rounded-xl p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Próximas Consultas</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="text-primary" size={24} />
              </div>
              <div>
                <div className="font-bold">Dr. Ricardo Silva</div>
                <div className="text-sm text-muted-foreground">Nefrologia</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold">14/12/2024</div>
              <div className="text-sm text-muted-foreground">10:00</div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="text-primary" size={24} />
              </div>
              <div>
                <div className="font-bold">Dra. Ana Costa</div>
                <div className="text-sm text-muted-foreground">Nutrição</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold">19/12/2024</div>
              <div className="text-sm text-muted-foreground">14:30</div>
            </div>
          </div>
        </div>
        <Link
          to="/paciente/agenda"
          className="mt-4 inline-flex items-center gap-2 text-sm text-primary hover:underline"
        >
          Ver agenda completa
        </Link>
      </div>

      {/* Últimos Relatórios */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Últimos Relatórios</h2>
        <div className="text-center py-8 text-muted-foreground">
          <FileText size={48} className="mx-auto mb-3 opacity-30" />
          <p>Nenhum relatório disponível</p>
          <Link
            to="/paciente/avaliacao"
            className="mt-4 inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            Fazer Avaliação
          </Link>
        </div>
      </div>
    </div>
  );
};

// Agenda
const AgendaPaciente = () => (
  <div>
    <h1 className="text-3xl font-bold mb-6">Minha Agenda</h1>
    <div className="bg-card border border-border rounded-xl p-6">
      <p className="text-muted-foreground">Módulo de agenda em desenvolvimento...</p>
    </div>
  </div>
);

// KPIs
const KPIsPaciente = () => (
  <div>
    <h1 className="text-3xl font-bold mb-6">Meus Indicadores de Saúde</h1>
    <div className="bg-card border border-border rounded-xl p-6">
      <p className="text-muted-foreground">Módulo de KPIs em desenvolvimento...</p>
    </div>
  </div>
);

// Avaliação Clínica
const AvaliacaoClinica = () => (
  <div>
    <h1 className="text-3xl font-bold mb-6">Avaliação Clínica Inicial</h1>
    <div className="bg-gradient-to-br from-primary/5 to-purple-500/5 border border-primary/20 rounded-xl p-6 mb-6">
      <p className="text-muted-foreground mb-4">
        <strong>Método Arte da Entrevista Clínica (IMRE Triaxial)</strong>
      </p>
      <p className="text-sm text-muted-foreground">
        A Nôa vai te guiar através de uma avaliação clínica completa e humanizada. 
        Use os recursos multimodais abaixo para interagir: voz, vídeo ou texto.
      </p>
    </div>
    <div className="bg-card border border-border rounded-xl p-8">
      <AvatarNoaMultimodal context="paciente" />
    </div>
  </div>
);

// Chat
const ChatNoa = () => (
  <div>
    <h1 className="text-3xl font-bold mb-6">Chat com Nôa Esperanza</h1>
    <div className="bg-gradient-to-br from-primary/5 to-purple-500/5 border border-primary/20 rounded-xl p-6 mb-6">
      <p className="text-muted-foreground mb-2">
        <strong>Sua IA Residente em Cannabis Medicinal & Nefrologia</strong>
      </p>
      <p className="text-sm text-muted-foreground">
        Converse com a Nôa usando voz, vídeo ou texto. Ela tem acesso à base de conhecimento e biblioteca científica.
      </p>
    </div>
    <div className="bg-card border border-border rounded-xl p-8">
      <AvatarNoaMultimodal context="paciente" />
    </div>
  </div>
);

// Relatórios
const RelatoriosPaciente = () => (
  <div>
    <h1 className="text-3xl font-bold mb-6">Meus Relatórios</h1>
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="text-center py-8 text-muted-foreground">
        <FileText size={48} className="mx-auto mb-3 opacity-30" />
        <p className="mb-2">Nenhum relatório disponível</p>
        <p className="text-sm mb-4">
          Complete sua avaliação clínica inicial para gerar seu primeiro relatório.
        </p>
        <Link
          to="/paciente/avaliacao"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
        >
          <Heart size={20} />
          Fazer Avaliação
        </Link>
      </div>
    </div>
  </div>
);

// Compartilhamento de Dados
const CompartilhamentoDados = () => (
  <div>
    <h1 className="text-3xl font-bold mb-6">Compartilhamento de Dados</h1>
    
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-2 border-purple-300 dark:border-purple-700 rounded-xl p-6 mb-6">
      <div className="flex items-start gap-4">
        <Shield className="text-purple-600 dark:text-purple-400" size={32} />
        <div>
          <h2 className="text-xl font-bold mb-2">Seus Dados São Protegidos por Blockchain</h2>
          <p className="text-muted-foreground mb-4">
            Conforme nossa Política de Privacidade, seus dados são protegidos por tecnologia blockchain. 
            Você tem controle total sobre quem pode acessar suas informações de saúde.
          </p>
          <p className="text-sm text-purple-600 dark:text-purple-400 font-semibold">
            🔒 Somente você pode autorizar o compartilhamento de seus dados.
          </p>
        </div>
      </div>
    </div>

    <div className="bg-card border border-border rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4">Compartilhar com Profissional</h2>
      <p className="text-muted-foreground mb-6">
        Autorize profissionais de saúde a acessarem seus relatórios e dados clínicos.
      </p>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <div>
            <div className="font-bold">Dr. Ricardo Valença</div>
            <div className="text-sm text-muted-foreground">Nefrologia • Cannabis Medicinal</div>
          </div>
          <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
            <Share2 size={16} className="inline mr-2" />
            Compartilhar
          </button>
        </div>

        <div className="p-4 border-2 border-dashed border-border rounded-lg text-center text-muted-foreground">
          <p className="mb-2">Adicionar outro profissional</p>
          <button className="text-sm text-primary hover:underline">
            + Buscar profissional
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default AreaPaciente;

