import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Activity,
  MessageSquare,
  BookOpen,
  Award,
  ArrowLeft,
  User,
  Heart,
  Brain,
  Stethoscope
} from 'lucide-react';
import { Helmet } from '../components/Helmet';
import { cn } from '../lib/utils';
import { AvatarNoaMultimodal } from '../components/AvatarNoaMultimodal';

const AreaProfissional = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/profissional', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { path: '/profissional/pacientes', label: 'Meus Pacientes', icon: Users },
    { path: '/profissional/agenda', label: 'Agenda', icon: Calendar },
    { path: '/profissional/relatorios', label: 'Relatórios', icon: FileText },
    { path: '/profissional/prescricoes', label: 'Prescrições', icon: Activity },
    { path: '/profissional/chat', label: 'Chat com Nôa', icon: MessageSquare },
    { path: '/profissional/recursos', label: 'Recursos Clínicos', icon: BookOpen }
  ];

  return (
    <>
      <Helmet>
        <title>Área do Profissional | Nôa Esperanza</title>
        <meta name="description" content="Área exclusiva para profissionais de saúde da plataforma Nôa Esperanza." />
      </Helmet>
      
      <div className="flex min-h-screen bg-background">
        {/* Sidebar */}
        <aside className="w-64 bg-card border-r border-border p-6 flex flex-col">
          <div className="mb-8">
            <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
              <ArrowLeft size={16} />
              Voltar
            </Link>
            <h1 className="text-xl font-bold mb-1">Área do Profissional</h1>
            <p className="text-sm text-muted-foreground">Cannabis & Nefrologia</p>
          </div>

          <div className="mb-6 p-4 bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold">
                RV
              </div>
              <div>
                <div className="font-bold">Dr. Ricardo Valença</div>
                <div className="text-xs text-muted-foreground">Nefrologista</div>
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
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <Routes>
            <Route index element={<DashboardProfissional />} />
            <Route path="pacientes" element={<PacientesList />} />
            <Route path="agenda" element={<AgendaProfissional />} />
            <Route path="relatorios" element={<RelatoriosProfissional />} />
            <Route path="prescricoes" element={<PrescricoesProfissional />} />
            <Route path="chat" element={<ChatNoa />} />
            <Route path="recursos" element={<RecursosClinicos />} />
          </Routes>
        </main>
      </div>
    </>
  );
};

// Dashboard Principal
const DashboardProfissional = () => (
  <div>
    <h1 className="text-3xl font-bold mb-6">Dashboard Profissional</h1>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Pacientes Ativos</h3>
        <div className="text-3xl font-bold mb-1">24</div>
        <div className="text-xs text-green-600">↑ +3 este mês</div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Consultas Hoje</h3>
        <div className="text-3xl font-bold mb-1">5</div>
        <div className="text-xs text-muted-foreground">3 presenciais, 2 online</div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Avaliações Pendentes</h3>
        <div className="text-3xl font-bold mb-1">8</div>
        <div className="text-xs text-primary">Revisar relatórios</div>
      </div>
    </div>

    <div className="bg-card border border-border rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4">Pacientes Recentes</h2>
      <p className="text-muted-foreground">Lista de pacientes em desenvolvimento...</p>
    </div>
  </div>
);

// Lista de Pacientes
const PacientesList = () => (
  <div>
    <h1 className="text-3xl font-bold mb-6">Meus Pacientes</h1>
    <div className="bg-card border border-border rounded-xl p-6">
      <p className="text-muted-foreground">
        Módulo de gerenciamento de pacientes em desenvolvimento...
      </p>
    </div>
  </div>
);

// Agenda
const AgendaProfissional = () => (
  <div>
    <h1 className="text-3xl font-bold mb-6">Agenda de Consultas</h1>
    <div className="bg-card border border-border rounded-xl p-6">
      <p className="text-muted-foreground">Módulo de agenda em desenvolvimento...</p>
    </div>
  </div>
);

// Relatórios
const RelatoriosProfissional = () => (
  <div>
    <h1 className="text-3xl font-bold mb-6">Relatórios dos Pacientes</h1>
    <div className="bg-card border border-border rounded-xl p-6">
      <p className="text-muted-foreground">
        Módulo de relatórios em desenvolvimento...
      </p>
    </div>
  </div>
);

// Prescrições
const PrescricoesProfissional = () => (
  <div>
    <h1 className="text-3xl font-bold mb-6">Prescrições de Cannabis</h1>
    <div className="bg-card border border-border rounded-xl p-6">
      <p className="text-muted-foreground">
        Módulo de prescrições em desenvolvimento...
      </p>
    </div>
  </div>
);

// Chat
const ChatNoa = () => (
  <div>
    <h1 className="text-3xl font-bold mb-6">Consultoria Clínica com Nôa</h1>
    <div className="bg-gradient-to-br from-primary/5 to-purple-500/5 border border-primary/20 rounded-xl p-6 mb-6">
      <p className="text-muted-foreground mb-2">
        <strong>IA Residente Especializada para Profissionais de Saúde</strong>
      </p>
      <p className="text-sm text-muted-foreground">
        Suporte técnico com linguagem médica, guidelines KDIGO, protocolos de prescrição de cannabis medicinal, 
        e casos clínicos baseados na metodologia AEC. Use voz, vídeo ou texto.
      </p>
    </div>
    <div className="bg-card border border-border rounded-xl p-8">
      <AvatarNoaMultimodal context="profissional" />
    </div>
  </div>
);

// Recursos Clínicos
const RecursosClinicos = () => (
  <div>
    <h1 className="text-3xl font-bold mb-6">Recursos Clínicos</h1>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="text-primary" size={24} />
          <h3 className="font-bold text-lg">Protocolos Cannabis</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Protocolos atualizados de prescrição canabinoide por especialidade.
        </p>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all">
        <div className="flex items-center gap-3 mb-4">
          <Heart className="text-primary" size={24} />
          <h3 className="font-bold text-lg">Avaliação Renal</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Ferramentas para avaliação de função renal e prescrição segura.
        </p>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all">
        <div className="flex items-center gap-3 mb-4">
          <Stethoscope className="text-primary" size={24} />
          <h3 className="font-bold text-lg">Arte da Entrevista Clínica</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Metodologia AEC para entrevistas humanizadas e completas.
        </p>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="text-primary" size={24} />
          <h3 className="font-bold text-lg">Biblioteca Científica</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          240+ artigos sobre cannabis medicinal e nefrologia.
        </p>
      </div>
    </div>
  </div>
);

export default AreaProfissional;

