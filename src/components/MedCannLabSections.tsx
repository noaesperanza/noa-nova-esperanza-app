import { 
  BookOpen, 
  Users, 
  Heart, 
  Brain, 
  Activity, 
  Shield,
  Stethoscope,
  Microscope,
  FlaskConical,
  ArrowRight,
  Sparkles,
  Droplets,
  GraduationCap,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export const SidebarPesquisa = () => {
  const recursos = [
    { icon: GraduationCap, label: 'Pós-Graduação Cannabis', badge: 'PRINCIPAL', link: '/medcann-lab/pos-graduacao', highlight: true, principal: true },
    { icon: Sparkles, label: 'IA Residente Nôa', badge: 'Avaliação IMRE', link: '/medcann-lab/ia-residente', highlight: true, special: true },
    { icon: Stethoscope, label: 'Arte da Entrevista Clínica', badge: 'Módulo Transversal', link: '/medcann-lab/arte-entrevista-clinica', highlight: true },
    { icon: Droplets, label: 'Cidade Amiga dos Rins', badge: 'MBA', link: '/medcann-lab/cidade-amiga-dos-rins', highlight: true },
    { icon: BookOpen, label: 'Biblioteca Científica', badge: '240+ artigos' },
    { icon: Users, label: 'Casos Clínicos', badge: 'Em breve' },
    { icon: FlaskConical, label: 'Protocolos AEC', badge: 'Atualizado' },
    { icon: Microscope, label: 'Pesquisas Ativas', badge: '12 estudos' },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-4 shadow-sm">
      <div className="flex items-center gap-2 pb-3 border-b border-border">
        <BookOpen className="text-primary" size={20} />
        <h2 className="font-semibold text-sm">Recursos de Pesquisa</h2>
      </div>
      
      <div className="space-y-2">
        {recursos.map((recurso, index) => {
          const Icon = recurso.icon;
          const Component = recurso.link ? Link : 'button';
          const props = recurso.link ? { to: recurso.link } : { type: 'button' as const };
          
          return (
            <Component
              key={index}
              {...props}
              className={cn(
                "w-full flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors group",
                recurso.link && "bg-primary/5 border border-primary/20",
                recurso.highlight && !recurso.special && !recurso.principal && "bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border-2 border-amber-300 dark:border-amber-700",
                recurso.special && "bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-2 border-purple-400 dark:border-purple-600 shadow-lg",
                recurso.principal && "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-2 border-green-400 dark:border-green-600 shadow-xl"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon size={18} className={cn(
                  "text-muted-foreground group-hover:text-primary transition-colors",
                  recurso.link && "text-primary",
                  recurso.highlight && !recurso.special && !recurso.principal && "text-amber-600 dark:text-amber-400",
                  recurso.special && "text-purple-600 dark:text-purple-400 animate-pulse",
                  recurso.principal && "text-green-600 dark:text-green-400 animate-pulse"
                )} />
                <span className={cn(
                  "text-sm font-medium",
                  recurso.highlight && !recurso.special && !recurso.principal && "text-amber-900 dark:text-amber-100",
                  recurso.special && "text-purple-900 dark:text-purple-100 font-bold",
                  recurso.principal && "text-green-900 dark:text-green-100 font-bold text-base"
                )}>{recurso.label}</span>
              </div>
              {recurso.badge && (
                <span className={cn(
                  "text-xs px-2 py-1 rounded-full font-semibold",
                  recurso.special && "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md animate-pulse",
                  recurso.principal && "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg animate-pulse font-bold",
                  recurso.highlight && !recurso.special && !recurso.principal && "bg-amber-500 text-white shadow-md",
                  recurso.link && !recurso.highlight && !recurso.special && !recurso.principal && "bg-primary text-primary-foreground",
                  !recurso.link && !recurso.highlight && !recurso.special && !recurso.principal && "bg-primary/10 text-primary"
                )}>
                  {recurso.badge}
                </span>
              )}
            </Component>
          );
        })}
      </div>

      <div className="pt-3 border-t border-border">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
          <Activity size={16} />
          <span className="text-sm">Submeter Pesquisa</span>
        </button>
      </div>
    </div>
  );
};

export const MetodologiaCards = () => {
  const metodologias = [
    {
      icon: Heart,
      title: 'Avaliação Clínica',
      description: 'Entrevista humanizada com escuta ativa e coleta estruturada de sintomas, histórico e contexto biopsicossocial do paciente.',
      color: 'from-red-500/20 to-pink-500/20',
      iconColor: 'text-red-500'
    },
    {
      icon: Brain,
      title: 'Estratégia Terapêutica',
      description: 'Definição de protocolo canabinoide personalizado integrando nefrologia, neurologia e medicina integrativa.',
      color: 'from-purple-500/20 to-indigo-500/20',
      iconColor: 'text-purple-500'
    },
    {
      icon: Activity,
      title: 'Controle & Monitoramento',
      description: 'Acompanhamento longitudinal com ajuste terapêutico baseado em biomarcadores, função renal e resposta clínica.',
      color: 'from-blue-500/20 to-cyan-500/20',
      iconColor: 'text-blue-500'
    },
    {
      icon: Shield,
      title: 'Governança Ética',
      description: 'Conformidade regulatória, consentimento informado e proteção de dados seguindo diretrizes ANVISA e LGPD.',
      color: 'from-green-500/20 to-emerald-500/20',
      iconColor: 'text-green-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {metodologias.map((met, index) => {
        const Icon = met.icon;
        return (
          <div
            key={index}
            className={cn(
              "relative overflow-hidden rounded-lg border border-border bg-card p-6 hover:shadow-lg transition-all duration-300 group"
            )}
          >
            <div className={cn(
              "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300",
              met.color
            )} />
            
            <div className="relative z-10">
              <div className={cn("w-12 h-12 rounded-lg bg-background/80 backdrop-blur-sm flex items-center justify-center mb-4", met.iconColor)}>
                <Icon size={24} />
              </div>
              
              <h3 className="font-semibold text-base mb-2">{met.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {met.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const CallToAction = () => {
  const features = [
    'Prescrição segura de cannabis medicinal',
    'Monitoramento da função renal',
    'Integração neuro-nefro-canabinoide',
    'Protocolos baseados em evidências'
  ];

  return (
    <div className="mt-8 rounded-lg border border-border bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 p-8">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
          <Stethoscope size={16} />
          <span className="text-sm font-semibold">Metodologia AEC</span>
        </div>
        
        <h2 className="text-2xl font-bold mb-4">
          Transforme o cuidado com cannabis medicinal
        </h2>
        
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Junte-se a profissionais de saúde que já utilizam nossa plataforma para 
          prescrições canabinoides seguras e baseadas em evidências científicas.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 max-w-2xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/medcann-lab/ia-residente"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-lg"
          >
            <Heart size={18} />
            Conversar com Nôa (Avaliação IMRE)
            <ArrowRight size={18} />
          </Link>
          
          <button className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border bg-background font-semibold hover:bg-accent transition-colors">
            <BookOpen size={18} />
            Explorar Pesquisas
          </button>
        </div>
      </div>
    </div>
  );
};

