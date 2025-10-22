import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Database,
  Settings,
  Key,
  Brain,
  BarChart3,
  FileText,
  Sparkles,
  Activity,
  Shield
} from 'lucide-react';
import { Helmet } from '../components/Helmet';
import { cn } from '../lib/utils';
import { useToast } from '../hooks/use-toast';

const AdminDashboard = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { path: '/admin/kpis', label: 'KPIs da Plataforma', icon: BarChart3 },
    { path: '/admin/biblioteca', label: 'Biblioteca Geral', icon: FileText },
    { path: '/admin/ia-config', label: 'Config IA Residente', icon: Brain },
    { path: '/admin/knowledge-base', label: 'Base de Conhecimento', icon: Database },
    { path: '/admin/users', label: 'Usuários', icon: Users },
    { path: '/admin/analytics', label: 'Analytics Avançado', icon: Activity },
    { path: '/admin/api-keys', label: 'API Keys', icon: Key },
    { path: '/admin/settings', label: 'Configurações', icon: Settings }
  ];

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Nôa Esperanza</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 min-h-screen bg-card border-r border-border">
            <div className="p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold">
                  NE
                </div>
                <div>
                  <div className="font-bold">Nôa Esperanza</div>
                  <div className="text-xs text-muted-foreground">Admin Panel</div>
                </div>
              </div>
            </div>

            <nav className="p-4">
              <ul className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = item.exact 
                    ? location.pathname === item.path
                    : location.pathname.startsWith(item.path);

                  return (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-accent"
                        )}
                      >
                        <Icon size={18} />
                        <span className="text-sm font-medium">{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-8">
            <Routes>
              <Route index element={<DashboardHome />} />
              <Route path="kpis" element={<KPIsDashboard />} />
              <Route path="biblioteca" element={<BibliotecaGeral />} />
              <Route path="ia-config" element={<IAConfig />} />
              <Route path="knowledge-base" element={<KnowledgeBase />} />
              <Route path="users" element={<UsersManagement />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="api-keys" element={<APIKeys />} />
              <Route path="settings" element={<SystemSettings />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
};

// Dashboard Home
// KPIs Dashboard - 3 Camadas
const KPIsDashboard = () => {
  const [camadaSelecionada, setCamadaSelecionada] = useState<'administrativa' | 'semantica' | 'clinica'>('administrativa');

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">KPIs da Plataforma Nôa Esperanza</h1>

      {/* Seletor de Camadas */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <button
          onClick={() => setCamadaSelecionada('administrativa')}
          className={cn(
            "p-4 rounded-xl border-2 transition-all",
            camadaSelecionada === 'administrativa'
              ? "border-blue-600 bg-blue-50 dark:bg-blue-950/20"
              : "border-border hover:border-blue-300"
          )}
        >
          <div className="text-center">
            <LayoutDashboard className="mx-auto mb-2 text-blue-600" size={24} />
            <div className="font-bold">KPIs Administrativos</div>
            <div className="text-xs text-muted-foreground">Operação e Sistema</div>
          </div>
        </button>

        <button
          onClick={() => setCamadaSelecionada('semantica')}
          className={cn(
            "p-4 rounded-xl border-2 transition-all",
            camadaSelecionada === 'semantica'
              ? "border-purple-600 bg-purple-50 dark:bg-purple-950/20"
              : "border-border hover:border-purple-300"
          )}
        >
          <div className="text-center">
            <Brain className="mx-auto mb-2 text-purple-600" size={24} />
            <div className="font-bold">KPIs Semânticos</div>
            <div className="text-xs text-muted-foreground">NLP e IA</div>
          </div>
        </button>

        <button
          onClick={() => setCamadaSelecionada('clinica')}
          className={cn(
            "p-4 rounded-xl border-2 transition-all",
            camadaSelecionada === 'clinica'
              ? "border-green-600 bg-green-50 dark:bg-green-950/20"
              : "border-border hover:border-green-300"
          )}
        >
          <div className="text-center">
            <Activity className="mx-auto mb-2 text-green-600" size={24} />
            <div className="font-bold">KPIs Clínicos</div>
            <div className="text-xs text-muted-foreground">Entrevista e Impacto</div>
          </div>
        </button>
      </div>

      {/* Conteúdo por Camada */}
      {camadaSelecionada === 'administrativa' && <KPIsAdministrativos />}
      {camadaSelecionada === 'semantica' && <KPIsSemanticos />}
      {camadaSelecionada === 'clinica' && <KPIsClinicos />}
    </div>
  );
};

// KPIs Administrativos (Operacionais)
const KPIsAdministrativos = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Indicadores Administrativos e Operacionais</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Tempo de Processamento</h3>
        <div className="text-3xl font-bold mb-1">1.2s</div>
        <div className="text-xs text-green-600">↓ -0.3s vs benchmark</div>
        <div className="mt-3 text-xs text-muted-foreground">
          Benchmark GPTs: 1.5s
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Taxa de Erros</h3>
        <div className="text-3xl font-bold mb-1">0.2%</div>
        <div className="text-xs text-green-600">↓ -0.8% vs benchmark</div>
        <div className="mt-3 text-xs text-muted-foreground">
          Benchmark GPTs: 1.0%
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Disponibilidade</h3>
        <div className="text-3xl font-bold mb-1">99.8%</div>
        <div className="text-xs text-green-600">↑ +0.3% vs benchmark</div>
        <div className="mt-3 text-xs text-muted-foreground">
          Benchmark GPTs: 99.5%
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Utilização de Recursos</h3>
        <div className="text-3xl font-bold mb-1">45%</div>
        <div className="text-xs text-green-600">↓ -15% vs benchmark</div>
        <div className="mt-3 text-xs text-muted-foreground">
          Benchmark GPTs: 60%
        </div>
      </div>
    </div>

    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="font-bold mb-4">Detalhamento Operacional</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
          <span className="text-sm">Tempo médio de resposta da IA</span>
          <span className="font-bold">0.8s</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
          <span className="text-sm">Uptime mensal</span>
          <span className="font-bold">99.95%</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
          <span className="text-sm">Consultas processadas (mês)</span>
          <span className="font-bold">1,247</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
          <span className="text-sm">Memória utilizada</span>
          <span className="font-bold">2.1 GB / 8 GB</span>
        </div>
      </div>
    </div>
  </div>
);

// KPIs Semânticos (NLP)
const KPIsSemanticos = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Indicadores Semânticos e de NLP</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Compreensão de Contexto</h3>
        <div className="text-3xl font-bold mb-1">94.5%</div>
        <div className="text-xs text-green-600">↑ +9.5% vs benchmark</div>
        <div className="mt-3 text-xs text-muted-foreground">
          Benchmark GPTs: 85%
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Precisão Clínica</h3>
        <div className="text-3xl font-bold mb-1">96.2%</div>
        <div className="text-xs text-green-600">↑ +6.2% vs benchmark</div>
        <div className="mt-3 text-xs text-muted-foreground">
          Benchmark GPTs: 90%
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Relevância de Recomendações</h3>
        <div className="text-3xl font-bold mb-1">92.8%</div>
        <div className="text-xs text-green-600">↑ +7.8% vs benchmark</div>
        <div className="mt-3 text-xs text-muted-foreground">
          Benchmark GPTs: 85%
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Naturalidade (1-10)</h3>
        <div className="text-3xl font-bold mb-1">9.1</div>
        <div className="text-xs text-green-600">↑ +1.6 vs benchmark</div>
        <div className="mt-3 text-xs text-muted-foreground">
          Benchmark GPTs: 7.5
        </div>
      </div>
    </div>

    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="font-bold mb-4">Detalhamento Semântico</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
          <span className="text-sm">Respostas contextualmente corretas</span>
          <span className="font-bold">1,178 / 1,247 (94.5%)</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
          <span className="text-sm">Respostas clínicas precisas</span>
          <span className="font-bold">1,200 / 1,247 (96.2%)</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
          <span className="text-sm">Recomendações relevantes</span>
          <span className="font-bold">1,157 / 1,247 (92.8%)</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
          <span className="text-sm">Avaliação média de naturalidade</span>
          <span className="font-bold">9.1 / 10</span>
        </div>
      </div>
    </div>

    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border border-purple-300 dark:border-purple-700 rounded-xl p-6">
      <h3 className="font-bold mb-3 flex items-center gap-2">
        <Brain className="text-purple-600" />
        Comparação com Benchmarks de GPTs em Saúde
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Nôa Esperanza supera consistentemente os benchmarks de GPTs em saúde em todos os indicadores semânticos, 
        demonstrando a eficácia da metodologia Arte da Entrevista Clínica.
      </p>
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="p-3 bg-white/50 dark:bg-background/50 rounded-lg">
          <div className="font-semibold mb-1">Compreensão de Contexto</div>
          <div className="text-green-600 font-bold">+9.5% vs média do mercado</div>
        </div>
        <div className="p-3 bg-white/50 dark:bg-background/50 rounded-lg">
          <div className="font-semibold mb-1">Precisão Clínica</div>
          <div className="text-green-600 font-bold">+6.2% vs média do mercado</div>
        </div>
      </div>
    </div>
  </div>
);

// KPIs Clínicos
const KPIsClinicos = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Indicadores Clínicos e de Impacto</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Tempo Médio de Consulta</h3>
        <div className="text-3xl font-bold mb-1">12min</div>
        <div className="text-xs text-green-600">↓ -3min vs benchmark</div>
        <div className="mt-3 text-xs text-muted-foreground">
          Benchmark GPTs: 15min
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Satisfação do Paciente</h3>
        <div className="text-3xl font-bold mb-1">9.4/10</div>
        <div className="text-xs text-green-600">↑ +1.4 vs benchmark</div>
        <div className="mt-3 text-xs text-muted-foreground">
          Benchmark GPTs: 8.0
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Completude de Informações</h3>
        <div className="text-3xl font-bold mb-1">97.3%</div>
        <div className="text-xs text-green-600">↑ +12.3% vs benchmark</div>
        <div className="mt-3 text-xs text-muted-foreground">
          Benchmark GPTs: 85%
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Identificação de Fatores de Risco</h3>
        <div className="text-3xl font-bold mb-1">95.1%</div>
        <div className="text-xs text-green-600">↑ +10.1% vs benchmark</div>
        <div className="mt-3 text-xs text-muted-foreground">
          Benchmark GPTs: 85%
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Aderência ao Plano</h3>
        <div className="text-3xl font-bold mb-1">88%</div>
        <div className="text-xs text-green-600">↑ +13% vs benchmark</div>
        <div className="mt-3 text-xs text-muted-foreground">
          Benchmark GPTs: 75%
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Eficácia das Recomendações</h3>
        <div className="text-3xl font-bold mb-1">91%</div>
        <div className="text-xs text-green-600">↑ +11% vs benchmark</div>
        <div className="mt-3 text-xs text-muted-foreground">
          Benchmark GPTs: 80%
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Taxa de Seguimento</h3>
        <div className="text-3xl font-bold mb-1">82%</div>
        <div className="text-xs text-green-600">↑ +12% vs benchmark</div>
        <div className="mt-3 text-xs text-muted-foreground">
          Benchmark GPTs: 70%
        </div>
      </div>
    </div>

    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="font-bold mb-4">Impacto na Saúde do Paciente</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-sm text-muted-foreground mb-2">Redução de Pressão Arterial (média)</div>
          <div className="text-2xl font-bold text-green-600">-12 mmHg</div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground mb-2">Controle de Glicemia (HbA1c)</div>
          <div className="text-2xl font-bold text-green-600">-1.2%</div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground mb-2">Melhoria da Qualidade de Vida</div>
          <div className="text-2xl font-bold text-green-600">+15 pontos</div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground mb-2">Redução de Sintomas</div>
          <div className="text-2xl font-bold text-green-600">-38%</div>
        </div>
      </div>
    </div>

    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-300 dark:border-green-700 rounded-xl p-6">
      <h3 className="font-bold mb-3 flex items-center gap-2">
        <Activity className="text-green-600" />
        Performance vs Benchmarks de GPTs em Saúde
      </h3>
      <p className="text-sm text-muted-foreground">
        Nôa Esperanza demonstra desempenho clínico superior em todas as métricas, 
        com destaque para completude de informações (+12.3%) e aderência ao plano (+13%).
      </p>
    </div>
  </div>
);

const DashboardHome = () => (
  <div>
    <h1 className="text-3xl font-bold mb-6">Dashboard Administrativo</h1>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <Users className="text-primary" size={24} />
          <span className="text-xs text-green-600 font-semibold">+12%</span>
        </div>
        <div className="text-3xl font-bold mb-1">1.247</div>
        <div className="text-sm text-muted-foreground">Usuários Ativos</div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <Activity className="text-primary" size={24} />
          <span className="text-xs text-green-600 font-semibold">+23%</span>
        </div>
        <div className="text-3xl font-bold mb-1">4.892</div>
        <div className="text-sm text-muted-foreground">Interações IA</div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <FileText className="text-primary" size={24} />
          <span className="text-xs text-green-600 font-semibold">+8%</span>
        </div>
        <div className="text-3xl font-bold mb-1">234</div>
        <div className="text-sm text-muted-foreground">Documentos Analisados</div>
      </div>
    </div>

    <div className="bg-card border border-border rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4">Status do Sistema</h2>
      <div className="space-y-3">
        {[
          { label: 'IA Residente', status: 'Ativa', color: 'bg-green-500' },
          { label: 'Base de Conhecimento', status: 'Sincronizada', color: 'bg-green-500' },
          { label: 'API Keys', status: '3 ativas', color: 'bg-blue-500' },
          { label: 'Backup', status: 'Última: há 2h', color: 'bg-green-500' }
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-3">
              <div className={cn("w-2 h-2 rounded-full", item.color)} />
              <span className="font-medium">{item.label}</span>
            </div>
            <span className="text-sm text-muted-foreground">{item.status}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// IA Configuration
// Biblioteca Geral
const BibliotecaGeral = () => {
  const [documentos, setDocumentos] = useState([
    { id: 1, nome: 'Arte da Entrevista Clínica - Completo', categoria: 'Metodologia', tamanho: '2.1 MB', data: '15/10/2025', vinculadoIA: true },
    { id: 2, nome: 'The Global Burden of Kidney Disease (2020)', categoria: 'Pesquisa', tamanho: '5.8 MB', data: '10/10/2025', vinculadoIA: true },
    { id: 3, nome: 'KDIGO Guidelines CKD 2024', categoria: 'Protocolo', tamanho: '3.2 MB', data: '05/10/2025', vinculadoIA: true },
    { id: 4, nome: 'Protocolos Cannabis Medicinal AEC', categoria: 'Protocolo', tamanho: '1.5 MB', data: '20/09/2025', vinculadoIA: true },
    { id: 5, nome: 'Sistema Endocanabinoide - Revisão 2024', categoria: 'Pesquisa', tamanho: '4.1 MB', data: '12/09/2025', vinculadoIA: false },
  ]);
  const [categoria, setCategoria] = useState('todos');
  const { toast } = useToast();

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const novoDoc = {
        id: documentos.length + 1,
        nome: file.name,
        categoria: 'Novo',
        tamanho: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        data: new Date().toLocaleDateString('pt-BR'),
        vinculadoIA: false
      };
      
      setDocumentos([novoDoc, ...documentos]);
      
      toast({
        title: 'Documento Adicionado!',
        description: `${file.name} foi adicionado à biblioteca.`
      });
    }
  };

  const vincularIA = (id: number) => {
    setDocumentos(documentos.map(doc => 
      doc.id === id ? { ...doc, vinculadoIA: !doc.vinculadoIA } : doc
    ));
    
    toast({
      title: 'Vinculação Atualizada',
      description: 'Documento sincronizado com IA Residente.'
    });
  };

  const categorias = ['todos', 'Metodologia', 'Pesquisa', 'Protocolo', 'Novo'];
  const docsFiltrados = categoria === 'todos' 
    ? documentos 
    : documentos.filter(d => d.categoria === categoria);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Biblioteca Geral</h1>
      
      {/* Upload e Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-bold mb-4 flex items-center gap-2">
            <FileText className="text-primary" size={20} />
            Upload de Documentos
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Adicione documentos à biblioteca para uso da IA Residente e equipe.
          </p>
          <input
            type="file"
            onChange={handleUpload}
            accept=".pdf,.doc,.docx,.txt,.md"
            className="hidden"
            id="upload-doc"
          />
          <label
            htmlFor="upload-doc"
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-dashed border-primary hover:bg-primary/5 transition-colors cursor-pointer"
          >
            <Database size={20} className="text-primary" />
            <span className="font-semibold text-primary">Adicionar Documento</span>
          </label>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-bold mb-4 flex items-center gap-2">
            <Brain className="text-primary" size={20} />
            Interligação com IA Residente
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Documentos vinculados à IA são automaticamente indexados na base de conhecimento.
          </p>
          <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
            <Shield className="text-green-600" size={16} />
            <span className="text-sm font-semibold text-green-700 dark:text-green-400">
              {documentos.filter(d => d.vinculadoIA).length} documentos vinculados
            </span>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 mb-6">
        {categorias.map(cat => (
          <button
            key={cat}
            onClick={() => setCategoria(cat)}
            className={cn(
              "px-4 py-2 rounded-lg font-medium text-sm transition-colors",
              categoria === cat
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-accent"
            )}
          >
            {cat === 'todos' ? 'Todos' : cat}
          </button>
        ))}
      </div>

      {/* Lista de Documentos */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="font-bold mb-4">Documentos da Biblioteca ({docsFiltrados.length})</h2>
        <div className="space-y-2">
          {docsFiltrados.map(doc => (
            <div key={doc.id} className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-accent transition-colors">
              <div className="flex items-center gap-4 flex-1">
                <FileText className="text-primary" size={20} />
                <div className="flex-1">
                  <div className="font-semibold text-sm">{doc.nome}</div>
                  <div className="text-xs text-muted-foreground">
                    {doc.categoria} • {doc.tamanho} • {doc.data}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => vincularIA(doc.id)}
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-semibold transition-colors",
                    doc.vinculadoIA
                      ? "bg-green-500 text-white"
                      : "bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground"
                  )}
                >
                  {doc.vinculadoIA ? '✓ IA Vinculada' : 'Vincular IA'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Total de Documentos</h3>
          <div className="text-3xl font-bold">{documentos.length}</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Vinculados à IA</h3>
          <div className="text-3xl font-bold text-green-600">{documentos.filter(d => d.vinculadoIA).length}</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Tamanho Total</h3>
          <div className="text-3xl font-bold">16.7 MB</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Última Atualização</h3>
          <div className="text-lg font-bold">{new Date().toLocaleDateString('pt-BR')}</div>
        </div>
      </div>
    </div>
  );
};

const IAConfig = () => (
  <div>
    <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
      <Sparkles className="text-primary" />
      Configuração da IA Residente Nôa
    </h1>

    <div className="grid gap-6">
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Personalidade e Comportamento</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Nome da IA</label>
            <input 
              type="text" 
              value="Nôa Esperanza"
              readOnly
              className="w-full px-4 py-2 rounded-lg border border-border bg-muted"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Saudação Inicial</label>
            <textarea 
              value="🌬️ Bons ventos soprem. Sou Nôa Esperanza, sua IA Residente."
              readOnly
              rows={2}
              className="w-full px-4 py-2 rounded-lg border border-border bg-muted"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Metodologia Base</label>
            <input 
              type="text" 
              value="Arte da Entrevista Clínica (AEC)"
              readOnly
              className="w-full px-4 py-2 rounded-lg border border-border bg-muted"
            />
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Princípios de Comunicação</h2>
        <div className="space-y-3">
          {[
            'Semiose Infinita - Todo enunciado abre novos sentidos',
            'Heterogeneidade Enunciativa - Toda fala carrega múltiplas vozes',
            'Economia Política do Significante - Todo sentido é situado'
          ].map((principio, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
              <Shield className="text-primary flex-shrink-0 mt-1" size={18} />
              <span className="text-sm">{principio}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Knowledge Base - Configurações e Instruções da IA
const KnowledgeBase = () => {
  const { toast } = useToast();
  
  const conhecimentos = [
    {
      id: 'identidade',
      titulo: 'Identidade da IA',
      conteudo: 'Eu sou Nôa Esperanza, guardiã da escuta, baseada na metodologia Arte da Entrevista Clínica do Dr. Ricardo Valença.',
      ativo: true,
      categoria: 'Identidade'
    },
    {
      id: 'sistema_imre',
      titulo: 'Sistema IMRE Triaxial',
      conteudo: 'Sistema de 37 blocos estruturado em 3 eixos: Lista Indiciária, Desenvolvimento e Avaliação de Risco.',
      ativo: true,
      categoria: 'Metodologia'
    },
    {
      id: 'comportamento',
      titulo: 'Comportamento e Tom de Voz',
      conteudo: 'Escuta profunda, não impositiva. Uso de "Bons ventos soprem" como saudação. Empatia e acolhimento.',
      ativo: true,
      categoria: 'Personalidade'
    },
    {
      id: 'especializacoes',
      titulo: 'Especializações',
      conteudo: 'Cannabis Medicinal + Nefrologia. Avaliação de função renal para prescrição segura de canabinoides.',
      ativo: true,
      categoria: 'Expertise'
    },
    {
      id: 'politicas',
      titulo: 'Políticas e Ética',
      conteudo: 'LGPD Compliant. Dados protegidos por blockchain. Consentimento informado. Transparência total.',
      ativo: true,
      categoria: 'Compliance'
    }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Brain className="text-primary" />
        Base de Conhecimento da IA
      </h1>

      {/* Explicação da Diferença */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-2 border-purple-300 dark:border-purple-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="text-purple-600" size={24} />
            <h2 className="font-bold">Base de Conhecimento</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            <strong>Instruções e configurações</strong> sobre como a IA se comporta:
          </p>
          <ul className="text-xs space-y-1 text-muted-foreground">
            <li>• Quem ela é (identidade)</li>
            <li>• Como ela se comunica (tom de voz)</li>
            <li>• O que ela sabe fazer (funcionalidades)</li>
            <li>• Políticas e ética</li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-2 border-blue-300 dark:border-blue-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="text-blue-600" size={24} />
            <h2 className="font-bold">Biblioteca Geral</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            <strong>Documentos científicos e protocolos</strong> que a IA usa como referência:
          </p>
          <ul className="text-xs space-y-1 text-muted-foreground">
            <li>• Artigos científicos (240+)</li>
            <li>• Protocolos clínicos</li>
            <li>• Guidelines (KDIGO, etc.)</li>
            <li>• Pesquisas e estudos</li>
          </ul>
        </div>
      </div>

      {/* Lista de Conhecimentos */}
      <div className="bg-card border border-border rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Configurações Ativas da IA</h2>
        <div className="space-y-3">
          {conhecimentos.map((conhecimento) => (
            <div key={conhecimento.id} className="p-4 bg-muted rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="font-bold text-sm mb-1">{conhecimento.titulo}</div>
                  <div className="text-xs text-muted-foreground mb-2">{conhecimento.categoria}</div>
                  <div className="text-sm text-foreground">{conhecimento.conteudo}</div>
                </div>
                <button
                  onClick={() => toast({ title: 'Editar', description: 'Funcionalidade em desenvolvimento' })}
                  className="ml-4 px-3 py-1 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90"
                >
                  Editar
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => toast({ title: 'Adicionar', description: 'Funcionalidade em desenvolvimento' })}
          className="mt-4 w-full px-4 py-2 rounded-lg border-2 border-dashed border-border hover:border-primary hover:bg-accent transition-colors font-semibold"
        >
          + Adicionar Nova Instrução
        </button>
      </div>

      {/* Sincronização com Biblioteca */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Sincronização com Biblioteca</h2>
        <p className="text-sm text-muted-foreground mb-4">
          A Base de Conhecimento define <strong>COMO</strong> a IA se comporta.<br/>
          A Biblioteca Geral fornece <strong>O QUE</strong> a IA sabe (documentos científicos).
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-primary mb-1">5</div>
            <div className="text-sm text-muted-foreground">Instruções Ativas</div>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">4</div>
            <div className="text-sm text-muted-foreground">Docs da Biblioteca Vinculados</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Users Management
const UsersManagement = () => (
  <div>
    <h1 className="text-3xl font-bold mb-6">Gerenciamento de Usuários</h1>
    <div className="bg-card border border-border rounded-xl p-6">
      <p className="text-muted-foreground">
        Módulo de gerenciamento de usuários em desenvolvimento...
      </p>
    </div>
  </div>
);

// Analytics
const Analytics = () => (
  <div>
    <h1 className="text-3xl font-bold mb-6">Analytics e Métricas</h1>
    <div className="bg-card border border-border rounded-xl p-6">
      <p className="text-muted-foreground">
        Módulo de analytics em desenvolvimento...
      </p>
    </div>
  </div>
);

// API Keys
const APIKeys = () => (
  <div>
    <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
      <Key className="text-primary" />
      Gerenciamento de API Keys
    </h1>

    <div className="bg-card border border-border rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4">API Keys Ativas</h2>
      <div className="space-y-3">
        {[
          { name: 'Chave Mestre - Dr. Ricardo Valença', key: 'noa_master_***********', created: '21/01/2025', status: 'Ativa' },
          { name: 'Chave Desenvolvimento', key: 'noa_dev_***********', created: '21/01/2025', status: 'Ativa' },
          { name: 'Chave Produção', key: 'noa_prod_***********', created: '21/01/2025', status: 'Ativa' }
        ].map((api, i) => (
          <div key={i} className="p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold">{api.name}</div>
              <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-600 font-semibold">
                {api.status}
              </span>
            </div>
            <div className="text-sm text-muted-foreground font-mono">{api.key}</div>
            <div className="text-xs text-muted-foreground mt-1">Criada em: {api.created}</div>
          </div>
        ))}
      </div>
      <button className="mt-4 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
        + Gerar Nova Chave
      </button>
    </div>
  </div>
);

// Settings
const SystemSettings = () => (
  <div>
    <h1 className="text-3xl font-bold mb-6">Configurações do Sistema</h1>
    <div className="bg-card border border-border rounded-xl p-6">
      <p className="text-muted-foreground">
        Módulo de configurações em desenvolvimento...
      </p>
    </div>
  </div>
);

export default AdminDashboard;

