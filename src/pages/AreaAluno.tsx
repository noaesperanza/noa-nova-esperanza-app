import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Award,
  MessageSquare,
  FileText,
  TrendingUp,
  ArrowLeft,
  Play,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Helmet } from '../components/Helmet';
import { cn } from '../lib/utils';
import { AvatarNoaMultimodal } from '../components/AvatarNoaMultimodal';

const AreaAluno = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/aluno', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { path: '/aluno/cursos', label: 'Meus Cursos', icon: BookOpen },
    { path: '/aluno/pos-graduacao', label: 'Pós-Graduação', icon: GraduationCap },
    { path: '/aluno/certificados', label: 'Certificados', icon: Award },
    { path: '/aluno/chat', label: 'Chat com Nôa', icon: MessageSquare },
    { path: '/aluno/biblioteca', label: 'Biblioteca', icon: FileText }
  ];

  return (
    <>
      <Helmet>
        <title>Área do Aluno | Nôa Esperanza</title>
        <meta name="description" content="Área exclusiva para alunos da plataforma Nôa Esperanza." />
      </Helmet>
      
      <div className="flex min-h-screen bg-background">
        {/* Sidebar */}
        <aside className="w-64 bg-card border-r border-border p-6 flex flex-col">
          <div className="mb-8">
            <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
              <ArrowLeft size={16} />
              Voltar
            </Link>
            <h1 className="text-xl font-bold mb-1">Área do Aluno</h1>
            <p className="text-sm text-muted-foreground">Formação Cannabis Medicinal</p>
          </div>

          <div className="mb-6 p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-300 dark:border-green-700 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center text-white font-bold">
                RV
              </div>
              <div>
                <div className="font-bold">Ricardo Valença</div>
                <div className="text-xs text-muted-foreground">Aluno</div>
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

          <div className="mt-8 pt-4 border-t border-border text-xs text-muted-foreground">
            <p>&copy; 2025 Nôa Esperanza</p>
            <p>Versão: 7.0</p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <Routes>
            <Route index element={<DashboardAluno />} />
            <Route path="cursos" element={<CursosAluno />} />
            <Route path="pos-graduacao" element={<PosGraduacaoAluno />} />
            <Route path="certificados" element={<CertificadosAluno />} />
            <Route path="chat" element={<ChatNoa />} />
            <Route path="biblioteca" element={<BibliotecaAluno />} />
          </Routes>
        </main>
      </div>
    </>
  );
};

// Dashboard Principal
const DashboardAluno = () => (
  <div>
    <h1 className="text-3xl font-bold mb-6">Meu Dashboard de Aprendizado</h1>
    
    {/* Curso em Destaque */}
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-2 border-green-400 dark:border-green-600 rounded-xl p-6 mb-8">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center flex-shrink-0">
          <GraduationCap className="text-white" size={32} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-green-600 text-white text-xs font-bold">
              PRINCIPAL
            </span>
          </div>
          <h2 className="text-xl font-bold mb-2">Pós-Graduação: Cannabis Medicinal Integrativa</h2>
          <p className="text-muted-foreground mb-4">
            12 meses • 520 horas • Coordenação: Dr. Eduardo Faveret
          </p>
          <div className="flex items-center gap-4 mb-4">
            <div>
              <div className="text-2xl font-bold text-green-600">35%</div>
              <div className="text-xs text-muted-foreground">Progresso</div>
            </div>
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-600 to-emerald-600" style={{width: '35%'}}></div>
            </div>
          </div>
          <Link
            to="/aluno/pos-graduacao"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:opacity-90 transition-opacity"
          >
            <Play size={16} />
            Continuar Aprendizado
          </Link>
        </div>
      </div>
    </div>

    {/* KPIs de Aprendizado */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">Módulos Completos</h3>
          <CheckCircle2 className="text-green-600" size={20} />
        </div>
        <div className="text-3xl font-bold">3/10</div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">Horas de Estudo</h3>
          <Clock className="text-primary" size={20} />
        </div>
        <div className="text-3xl font-bold">45h</div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">Nota Média</h3>
          <Award className="text-primary" size={20} />
        </div>
        <div className="text-3xl font-bold">9.2</div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">Engajamento</h3>
          <TrendingUp className="text-green-600" size={20} />
        </div>
        <div className="text-3xl font-bold">88%</div>
      </div>
    </div>

    {/* Próximas Atividades */}
    <div className="bg-card border border-border rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4">Próximas Atividades</h2>
      <div className="space-y-3">
        <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <BookOpen className="text-primary" size={20} />
          </div>
          <div className="flex-1">
            <div className="font-semibold">Módulo 4: Sistema Endocanabinoide</div>
            <div className="text-sm text-muted-foreground">Prazo: 28/10/2025</div>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <FileText className="text-primary" size={20} />
          </div>
          <div className="flex-1">
            <div className="font-semibold">Caso Clínico: Dor Neuropática</div>
            <div className="text-sm text-muted-foreground">Prazo: 30/10/2025</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Cursos
const CursosAluno = () => (
  <div>
    <h1 className="text-3xl font-bold mb-6">Meus Cursos</h1>
    <div className="bg-card border border-border rounded-xl p-6">
      <p className="text-muted-foreground">Lista de cursos em desenvolvimento...</p>
    </div>
  </div>
);

// Pós-Graduação
const PosGraduacaoAluno = () => (
  <div>
    <h1 className="text-3xl font-bold mb-6">Pós-Graduação Cannabis Medicinal</h1>
    <div className="bg-card border border-border rounded-xl p-6">
      <p className="text-muted-foreground">
        Conteúdo da pós-graduação em desenvolvimento...
      </p>
    </div>
  </div>
);

// Certificados
const CertificadosAluno = () => (
  <div>
    <h1 className="text-3xl font-bold mb-6">Meus Certificados</h1>
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="text-center py-8 text-muted-foreground">
        <Award size={48} className="mx-auto mb-3 opacity-30" />
        <p>Nenhum certificado disponível ainda</p>
        <p className="text-sm mt-2">
          Complete os módulos para ganhar certificados!
        </p>
      </div>
    </div>
  </div>
);

// Chat
const ChatNoa = () => (
  <div>
    <h1 className="text-3xl font-bold mb-6">Tutoria com Nôa Esperanza</h1>
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-2 border-green-400 dark:border-green-600 rounded-xl p-6 mb-6">
      <p className="text-muted-foreground mb-2">
        <strong>Sua Tutora em Cannabis Medicinal & Metodologia AEC</strong>
      </p>
      <p className="text-sm text-muted-foreground">
        A Nôa ensina de forma didática, com exemplos práticos e pensamento crítico. 
        Tire dúvidas sobre os módulos, casos clínicos e metodologia. Use voz, vídeo ou texto.
      </p>
    </div>
    <div className="bg-card border border-border rounded-xl p-8">
      <AvatarNoaMultimodal context="aluno" />
    </div>
  </div>
);

// Biblioteca
const BibliotecaAluno = () => (
  <div>
    <h1 className="text-3xl font-bold mb-6">Biblioteca Científica</h1>
    <div className="bg-card border border-border rounded-xl p-6">
      <p className="text-muted-foreground">240+ artigos científicos disponíveis...</p>
    </div>
  </div>
);

export default AreaAluno;

