import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  BookOpen, 
  Heart, 
  Droplets, 
  Globe, 
  Video, 
  Users, 
  Target, 
  Award,
  Stethoscope,
  Brain,
  Activity,
  Download,
  Calendar,
  Clock,
  FileText
} from 'lucide-react';
import { Helmet } from '../components/Helmet';
import Header from '../components/Header';

const LabPEC = () => {
  return (
    <>
      <Helmet>
        <title>LabPEC - Laboratório de Performance em Entrevista Clínica | Nôa Esperanza</title>
        <meta
          name="description"
          content="Projetos inovadores que aplicam a metodologia AEC em diferentes contextos, desde pesquisa aplicada até intervenções comunitárias globais."
        />
      </Helmet>

      <div className="min-h-screen premium-background">
        <Header currentSpecialty="cannabis" setCurrentSpecialty={() => {}} />

        <main className="max-w-7xl mx-auto px-4 py-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            Voltar para Home
          </Link>

          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
              <Stethoscope className="text-primary" size={20} />
              <span className="text-sm font-semibold text-primary">Nôa Esperanza Pesquisa</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Laboratório de Performance em Entrevista Clínica
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Projetos inovadores que aplicam a metodologia AEC em diferentes contextos, 
              desde pesquisa aplicada até intervenções comunitárias globais. Integração de 
              Deep Learning e NLP para saúde humanizada.
            </p>
          </div>

          {/* Seminário em Destaque */}
          <div className="bg-gradient-to-br from-primary/10 to-purple-500/10 border-2 border-primary/30 rounded-2xl p-8 mb-12">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center flex-shrink-0">
                <BookOpen className="text-white" size={32} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    SEMINÁRIO SETEMBRO 2025
                  </span>
                </div>
                <h2 className="text-3xl font-bold mb-3">Saúde Espectral</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Análise de critérios diagnósticos em nefrologia e neurologia, e o uso da 
                  cannabis medicinal na prática clínica. Um olhar expandido pela metodologia 
                  da Arte da Entrevista Clínica.
                </p>
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
                  <Download size={20} />
                  Baixar eBook do Seminário
                </button>
              </div>
            </div>
          </div>

          {/* O que é o LabPEC */}
          <div className="bg-card border border-border rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">🎭 O que acontece no LabPEC?</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              No LabPEC, a metodologia da Arte da Entrevista Clínica ganha corpo em encontros ao vivo, 
              simulados e analisados com profundidade. Aqui, a escuta clínica é treinada com rigor e 
              sensibilidade, em situações reais da prática médica.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-muted rounded-xl">
                <Users className="text-primary mb-3" size={24} />
                <h3 className="font-bold mb-2">Role-playing Clínico Realista</h3>
                <p className="text-sm text-muted-foreground">
                  Consultas encenadas por duplas com base em casos clínicos reais
                </p>
              </div>

              <div className="p-6 bg-muted rounded-xl">
                <Target className="text-primary mb-3" size={24} />
                <h3 className="font-bold mb-2">Análise Triaxial da Consulta</h3>
                <p className="text-sm text-muted-foreground">
                  Diferentes perspectivas entre entrevistador, paciente e professor
                </p>
              </div>

              <div className="p-6 bg-muted rounded-xl">
                <Video className="text-primary mb-3" size={24} />
                <h3 className="font-bold mb-2">Gravação e Revisão Técnica</h3>
                <p className="text-sm text-muted-foreground">
                  Análise em grupo da comunicação clínica e não-verbal
                </p>
              </div>
            </div>
          </div>

          {/* Por que participar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">🎯 Por que participar?</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Award className="text-primary flex-shrink-0 mt-1" size={18} />
                  <span className="text-sm">Treinamento intensivo em habilidades comunicacionais</span>
                </li>
                <li className="flex items-start gap-3">
                  <Stethoscope className="text-primary flex-shrink-0 mt-1" size={18} />
                  <span className="text-sm">Aplicação prática dos conceitos da AEC</span>
                </li>
                <li className="flex items-start gap-3">
                  <Users className="text-primary flex-shrink-0 mt-1" size={18} />
                  <span className="text-sm">Feedback direto e individualizado</span>
                </li>
                <li className="flex items-start gap-3">
                  <Activity className="text-primary flex-shrink-0 mt-1" size={18} />
                  <span className="text-sm">Prática segura, com supervisão ativa</span>
                </li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">👥 Para quem?</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <BookOpen className="text-primary flex-shrink-0 mt-1" size={18} />
                  <span className="text-sm">Estudantes de Medicina e Saúde</span>
                </li>
                <li className="flex items-start gap-3">
                  <Award className="text-primary flex-shrink-0 mt-1" size={18} />
                  <span className="text-sm">Profissionais em formação continuada</span>
                </li>
                <li className="flex items-start gap-3">
                  <Brain className="text-primary flex-shrink-0 mt-1" size={18} />
                  <span className="text-sm">Equipes de pesquisa aplicando a metodologia</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Como funciona */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">🧭 Como funciona?</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  1
                </div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Video size={16} className="text-blue-600" />
                  <span className="font-semibold text-sm">Aulas ao Vivo</span>
                </div>
                <p className="text-xs text-muted-foreground">Zoom às 21h</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  2
                </div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <FileText size={16} className="text-blue-600" />
                  <span className="font-semibold text-sm">Casos Clínicos</span>
                </div>
                <p className="text-xs text-muted-foreground">Alinhados ao tema</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  3
                </div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users size={16} className="text-blue-600" />
                  <span className="font-semibold text-sm">Dupla Selecionada</span>
                </div>
                <p className="text-xs text-muted-foreground">Na hora</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  4
                </div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock size={16} className="text-blue-600" />
                  <span className="font-semibold text-sm">3 Rodadas</span>
                </div>
                <p className="text-xs text-muted-foreground">Por noite</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  5
                </div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Brain size={16} className="text-blue-600" />
                  <span className="font-semibold text-sm">Análise Final</span>
                </div>
                <p className="text-xs text-muted-foreground">Dr. Ricardo</p>
              </div>
            </div>
          </div>

          {/* Projetos de Aplicação AEC */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-3">Projetos de Aplicação AEC</h2>
              <p className="text-lg text-muted-foreground">
                Aplicações da Arte da Entrevista Clínica
              </p>
              <p className="text-muted-foreground max-w-3xl mx-auto mt-2">
                Projetos inovadores que aplicam a metodologia AEC em diferentes contextos, 
                desde pesquisa aplicada até intervenções comunitárias globais.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Cidade Amiga dos Rins */}
              <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all group">
                <div className="h-48 bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
                  <Droplets className="text-white" size={64} />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Cidade Amiga dos Rins</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Saúde Comunitária & Nefrologia
                  </p>
                  <p className="text-sm mb-4">
                    Programa pioneiro de saúde comunitária que integra tecnologia avançada e 
                    cuidado humanizado para identificação de fatores de risco para doença renal crônica.
                  </p>
                  <div className="space-y-2 mb-6">
                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                      <Award size={14} className="text-primary" />
                      35 anos de nefrologia aplicados ao desenvolvimento urbano
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                      <Brain size={14} className="text-primary" />
                      Abordagem preventiva com IA para fatores de risco
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                      <Users size={14} className="text-primary" />
                      Onboarding de profissionais de saúde
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                      <Heart size={14} className="text-primary" />
                      Impacto direto em saúde pública
                    </div>
                  </div>
                  <Link
                    to="/medcann-lab/cidade-amiga-dos-rins"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:opacity-90 transition-opacity"
                  >
                    Explorar Projeto
                  </Link>
                </div>
              </div>

              {/* MedCann Lab */}
              <div className="bg-card border-2 border-primary rounded-xl overflow-hidden hover:shadow-xl transition-all group">
                <div className="h-48 bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                  <Activity className="text-white" size={64} />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold">MedCann Lab</h3>
                    <span className="px-2 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                      PRINCIPAL
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Integração Cannabis & Nefrologia
                  </p>
                  <p className="text-sm mb-4">
                    Pesquisa pioneira da cannabis medicinal aplicada à nefrologia e neurologia, 
                    utilizando a metodologia AEC para identificar benefícios terapêuticos e avaliar 
                    impactos na função renal.
                  </p>
                  <div className="space-y-2 mb-6">
                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                      <Stethoscope size={14} className="text-primary" />
                      Protocolos de prescrição baseados em AEC
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                      <Activity size={14} className="text-primary" />
                      Monitoramento de função renal
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                      <Brain size={14} className="text-primary" />
                      Deep Learning para análise de biomarcadores
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                      <Heart size={14} className="text-primary" />
                      Integração com dispositivos médicos
                    </div>
                  </div>
                  <Link
                    to="/medcann-lab"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                  >
                    Explorar Projeto
                  </Link>
                </div>
              </div>

              {/* Jardins de Cura */}
              <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all group">
                <div className="h-48 bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center">
                  <Globe className="text-white" size={64} />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Jardins de Cura</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Saúde Global & Agência Crítica
                  </p>
                  <p className="text-sm mb-4">
                    Projeto de saúde global focado na aplicação da metodologia AEC em comunidades 
                    vulneráveis, promovendo equidade em saúde e desenvolvimento de capacidades locais.
                  </p>
                  <div className="space-y-2 mb-6">
                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                      <Users size={14} className="text-primary" />
                      Formação de agentes comunitários
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                      <Heart size={14} className="text-primary" />
                      Triagem preventiva baseada em AEC
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                      <Target size={14} className="text-primary" />
                      Indicadores de saúde populacional
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                      <Globe size={14} className="text-primary" />
                      Parcerias com organizações internacionais
                    </div>
                  </div>
                  <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:opacity-90 transition-opacity">
                    Explorar Projeto
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-card border border-border rounded-2xl p-8 text-center">
            <p className="text-sm text-muted-foreground mb-6">
              O LabPEC integra o eixo formativo da plataforma Nôa Esperanza, 
              articulando ensino, clínica e pesquisa.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-purple-600 text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Participar do LabPEC
            </Link>
          </div>
        </main>
      </div>
    </>
  );
};

export default LabPEC;

