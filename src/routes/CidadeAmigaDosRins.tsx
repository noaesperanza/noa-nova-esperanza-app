import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Heart, 
  Users, 
  Database, 
  Target, 
  Building2,
  Shield,
  TrendingUp,
  Globe,
  Droplets,
  Activity,
  MapPin,
  GraduationCap,
  BarChart3,
  Leaf
} from 'lucide-react';
import { Helmet } from '../components/Helmet';
import { DashboardCidadeAmiga } from '../components/DashboardCidadeAmiga';
import { cn } from '../lib/utils';

const CidadeAmigaDosRins = () => {
  const pilares = [
    {
      numero: 1,
      icon: GraduationCap,
      titulo: 'Formação e Telemedicina',
      descricao: 'Formação de alunos de medicina em entrevista especializada e oferecimento de telemedicina para a saúde renal',
      cor: 'from-blue-500 to-cyan-500'
    },
    {
      numero: 2,
      icon: Database,
      titulo: 'Ciência de Dados',
      descricao: 'Criação do banco de dados para aplicação de ciência de dados e proposição de soluções relacionando dados individuais e populacionais',
      cor: 'from-purple-500 to-pink-500'
    },
    {
      numero: 3,
      icon: Leaf,
      titulo: '17 Objetivos de Sustentabilidade',
      descricao: 'Alinhamento de soluções de acordo com os 17 objetivos de sustentabilidade da OMS',
      cor: 'from-green-500 to-emerald-500'
    },
    {
      numero: 4,
      icon: Building2,
      titulo: 'Ecossistema de Tecnologia',
      descricao: 'Criação do ecossistema de tecnologia em saúde para fundação de startups relacionadas à saúde renal',
      cor: 'from-orange-500 to-red-500'
    },
    {
      numero: 5,
      icon: Shield,
      titulo: 'Governança Corporativa',
      descricao: 'Desenvolvimento de governança corporativa para realização de estratégias regionais de mitigação de risco à saúde renal',
      cor: 'from-indigo-500 to-blue-500'
    }
  ];

  const segmentos = [
    {
      titulo: 'Pacientes',
      descricao: 'Hospital da Praia Brava, Angra dos Reis, Costa Verde',
      subtitulos: ['Usuários SUS', 'Saúde Suplementar'],
      icon: Heart
    },
    {
      titulo: 'Instituições',
      descricao: 'Ecossistema em torno do Hospital',
      subtitulos: ['Eletronuclear', 'Petrobrás', 'Estaleiro Verolme', 'Universidades'],
      icon: Building2
    },
    {
      titulo: 'Operadoras',
      descricao: 'Seguradoras e operadoras ANS',
      subtitulos: ['Gestão de risco', 'Redução de custos'],
      icon: Shield
    },
    {
      titulo: 'Estudantes',
      descricao: 'Medicina e áreas afins',
      subtitulos: ['Formação especializada', 'Telemedicina'],
      icon: GraduationCap
    }
  ];

  return (
    <>
      <Helmet>
        <title>Cidade Amiga dos Rins | Nôa Esperanza</title>
        <meta
          name="description"
          content="Criando cidades sustentáveis com saúde renal. Sistema de gestão, inovação e prevenção da doença renal crônica."
        />
      </Helmet>

      <div className="min-h-screen premium-background">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Link 
            to="/medcann-lab" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            Voltar para MedCann Lab
          </Link>

          {/* Header */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-indigo-500/10 border border-cyan-300/30 p-8 mb-8">
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-2xl">
                  <Droplets size={40} />
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
                Cidade Amiga dos Rins
              </h1>
              
              <p className="text-xl text-center text-muted-foreground mb-6">
                Criando Cidades Sustentáveis com Saúde Renal
              </p>

              <div className="max-w-3xl mx-auto text-center">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Sistema integrado de gestão, inovação e prevenção da doença renal crônica, 
                  alinhado aos 17 objetivos de sustentabilidade da OMS.
                </p>
              </div>
            </div>
          </div>

          {/* Problema e Contexto */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Target className="text-primary" size={28} />
              <h2 className="text-2xl font-bold">🎯 O Problema</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="text-3xl font-bold text-primary mb-2">150 mil</div>
                <div className="text-sm text-muted-foreground">
                  Pessoas em diálise no Brasil (Estágio 5)
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <div className="text-3xl font-bold text-primary mb-2">1% PIB</div>
                <div className="text-sm text-muted-foreground">
                  Consumo do PIB em qualquer nação
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <div className="text-3xl font-bold text-primary mb-2">5 Estágios</div>
                <div className="text-sm text-muted-foreground">
                  De classificação da doença renal
                </div>
              </div>
            </div>

            <div className="mt-6 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Activity className="text-red-600" size={20} />
                Impactos da DRC
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span>Superlotação de emergências com atendimentos evitáveis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span>Regiões remotas sem acesso a especialistas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span>Impacto ambiental: consumo de água, resíduos, gasto energético</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span>Estágio 1 só detectável por profissional treinado + ciência de dados</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Proposta Única de Valor */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-primary to-purple-600 rounded-xl p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-4">✨ Proposta Única de Valor</h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Criar cidades sustentáveis que previnem, detectam e cuidam da saúde renal 
                através de formação, telemedicina, ciência de dados e governança regional.
              </p>
            </div>
          </div>

          {/* 5 Pilares */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Target className="text-primary" size={28} />
              <h2 className="text-2xl font-bold">🏛️ Os 5 Pilares da Cidade Amiga dos Rins</h2>
            </div>

            <div className="space-y-4">
              {pilares.map((pilar) => {
                const Icon = pilar.icon;
                return (
                  <div
                    key={pilar.numero}
                    className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "w-14 h-14 rounded-lg bg-gradient-to-br flex items-center justify-center text-white font-bold text-xl flex-shrink-0",
                        pilar.cor
                      )}>
                        {pilar.numero}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-3">
                          <Icon className="text-primary flex-shrink-0 mt-1" size={24} />
                          <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                            {pilar.titulo}
                          </h3>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {pilar.descricao}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Segmentos de Clientes */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Users className="text-primary" size={28} />
              <h2 className="text-2xl font-bold">👥 Segmentos de Clientes</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {segmentos.map((segmento, index) => {
                const Icon = segmento.icon;
                return (
                  <div key={index} className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="text-primary" size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">{segmento.titulo}</h3>
                        <p className="text-sm text-muted-foreground">{segmento.descricao}</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      {segmento.subtitulos.map((sub, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span className="text-muted-foreground">{sub}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Lean Canvas Summary */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="text-primary" size={28} />
              <h2 className="text-2xl font-bold">📈 Modelo de Negócio (Lean Canvas)</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <Target size={20} className="text-primary" />
                  Solução
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Banco de Dados + Site + App</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Telemedicina com formação especializada</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Avaliação de risco por 17 ODS</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Governança baseada em risco</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Ciência de dados para projetos regionais</span>
                  </li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <Globe size={20} className="text-primary" />
                  Canais
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {['Site CAR', 'App Mobile', 'Redes Sociais', 'Hospital', 'Operadoras', 'Zendesk'].map((canal, i) => (
                    <div key={i} className="text-xs p-2 bg-accent rounded-lg text-center">
                      {canal}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Localização e Aprovação */}
          <div className="mb-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-2 border-green-300 dark:border-green-700 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-white flex-shrink-0">
                  <MapPin size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2 text-green-900 dark:text-green-100">
                    ✅ Projeto Aprovado
                  </h3>
                  <p className="text-sm text-green-800 dark:text-green-200 mb-3">
                    Desenvolvimento do <strong>"Product Market Fit"</strong> aprovado no:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3 bg-white/50 dark:bg-background/50 rounded-lg">
                      <div className="font-semibold text-sm mb-1">Hospital da Praia Brava</div>
                      <div className="text-xs text-muted-foreground">Angra dos Reis, RJ</div>
                    </div>
                    <div className="p-3 bg-white/50 dark:bg-background/50 rounded-lg">
                      <div className="font-semibold text-sm mb-1">Fundação Eletronuclear</div>
                      <div className="text-xs text-muted-foreground">FEAM - Assistência Médica</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Canais */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="text-primary" size={28} />
              <h2 className="text-2xl font-bold">📡 Canais de Comunicação</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Site CAR', icon: Globe },
                { label: 'App Mobile', icon: Activity },
                { label: 'Redes Sociais', icon: Users },
                { label: 'Telemedicina', icon: Heart },
                { label: 'Hospital', icon: Building2 },
                { label: 'Operadoras', icon: Shield },
                { label: 'Zendesk', icon: Users },
                { label: 'Analytics', icon: BarChart3 }
              ].map((canal, index) => {
                const Icon = canal.icon;
                return (
                  <div key={index} className="bg-card border border-border rounded-lg p-4 text-center hover:bg-accent transition-colors">
                    <Icon className="text-primary mx-auto mb-2" size={24} />
                    <div className="text-xs font-medium">{canal.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dashboard de Indicadores */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="text-primary" size={28} />
              <h2 className="text-2xl font-bold">📊 Dashboard de Gestão</h2>
            </div>
            <DashboardCidadeAmiga />
          </div>

          {/* Integração com Nôa Esperanza */}
          <div className="mb-8">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-2 border-purple-300 dark:border-purple-700 rounded-xl p-8">
              <h3 className="text-xl font-bold mb-4 text-center">
                🌿 Integração com a Plataforma Nôa Esperanza
              </h3>
              <p className="text-center text-muted-foreground mb-6">
                O projeto Cidade Amiga dos Rins utiliza a <strong>metodologia AEC</strong> e a 
                <strong> IA Residente Nôa</strong> para fortalecer a escuta clínica e a detecção precoce de riscos renais.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  to="/medcann-lab/arte-entrevista-clinica"
                  className="p-4 bg-white/50 dark:bg-background/50 rounded-lg hover:bg-white dark:hover:bg-background transition-colors text-center"
                >
                  <GraduationCap className="text-primary mx-auto mb-2" size={28} />
                  <div className="font-semibold text-sm mb-1">Formação AEC</div>
                  <div className="text-xs text-muted-foreground">Curso 8 horas</div>
                </Link>

                <Link
                  to="/medcann-lab/ia-residente"
                  className="p-4 bg-white/50 dark:bg-background/50 rounded-lg hover:bg-white dark:hover:bg-background transition-colors text-center"
                >
                  <Activity className="text-primary mx-auto mb-2" size={28} />
                  <div className="font-semibold text-sm mb-1">IA Residente</div>
                  <div className="text-xs text-muted-foreground">Escuta + Análise</div>
                </Link>

                <Link
                  to="/medcann-lab/avaliacao-clinica-inicial"
                  className="p-4 bg-white/50 dark:bg-background/50 rounded-lg hover:bg-white dark:hover:bg-background transition-colors text-center"
                >
                  <Heart className="text-primary mx-auto mb-2" size={28} />
                  <div className="font-semibold text-sm mb-1">Avaliação</div>
                  <div className="text-xs text-muted-foreground">Triagem + Risco</div>
                </Link>
              </div>
            </div>
          </div>

          {/* Footer com Referência MBA */}
          <div className="mt-8 p-6 bg-card border border-border rounded-xl">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="font-semibold mb-1">Trabalho de Conclusão de Curso</div>
                <div className="text-sm text-muted-foreground">
                  MBA em Gestão, Inovação e Serviços em Saúde
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold">Dr. Ricardo Valença</div>
                <div className="text-sm text-muted-foreground">Coordenação Científica</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CidadeAmigaDosRins;

