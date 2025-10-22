import React from 'react';
import { 
  BookOpen, 
  Target, 
  Brain, 
  CheckCircle2, 
  Award,
  Clock,
  Users,
  Star,
  ChevronRight,
  Play,
  FileText,
  Video,
  MessageSquare
} from 'lucide-react';
import { cn } from '../../lib/utils';

// Course Header Component
interface CourseHeaderProps {
  title: string;
  subtitle: string;
  duration: string;
  level: string;
  version: string;
  badge?: string;
}

export const CourseHeader: React.FC<CourseHeaderProps> = ({
  title,
  subtitle,
  duration,
  level,
  version,
  badge
}) => (
  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 border border-border p-8 mb-8">
    <div className="relative z-10">
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            <BookOpen size={16} />
            Módulo 3
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center gap-2 p-3 rounded-lg bg-background/50 backdrop-blur-sm">
          <Clock className="text-primary" size={20} />
          <div>
            <div className="text-xs text-muted-foreground">Duração</div>
            <div className="font-semibold">{duration}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 p-3 rounded-lg bg-background/50 backdrop-blur-sm">
          <Users className="text-primary" size={20} />
          <div>
            <div className="text-xs text-muted-foreground">Nível</div>
            <div className="font-semibold">{level}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 p-3 rounded-lg bg-background/50 backdrop-blur-sm">
          <Star className="text-primary" size={20} />
          <div>
            <div className="text-xs text-muted-foreground">Versão</div>
            <div className="font-semibold">{version}</div>
          </div>
        </div>
        {badge && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-background/50 backdrop-blur-sm">
            <Award className="text-primary" size={20} />
            <div>
              <div className="text-xs text-muted-foreground">Certificação</div>
              <div className="font-semibold">{badge}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

// Course Objectives Component
interface CourseObjectivesProps {
  objective: string;
  icon?: React.ReactNode;
}

export const CourseObjectives: React.FC<CourseObjectivesProps> = ({ objective, icon }) => (
  <div className="bg-card border border-border rounded-xl p-6 mb-8">
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
        {icon || <Target className="text-primary" size={24} />}
      </div>
      <div className="flex-1">
        <h2 className="text-xl font-bold mb-3">🎯 Objetivo Geral</h2>
        <p className="text-muted-foreground leading-relaxed">
          {objective}
        </p>
      </div>
    </div>
  </div>
);

// Competencies List Component
interface CompetencyItem {
  categoria: string;
  itens: string[];
}

interface CompetenciesListProps {
  competencies: CompetencyItem[];
}

export const CompetenciesList: React.FC<CompetenciesListProps> = ({ competencies = [] }) => (
  <div className="bg-card border border-border rounded-xl p-6 mb-8">
    <div className="flex items-center gap-2 mb-4">
      <Brain className="text-primary" size={24} />
      <h2 className="text-xl font-bold">🧠 Competências Desenvolvidas</h2>
    </div>
    <div className="space-y-6">
      {competencies && competencies.length > 0 ? (
        competencies.map((competency, index) => (
          <div key={index} className="space-y-3">
            <h3 className="text-lg font-semibold text-primary border-b border-border pb-2">
              {competency.categoria}
            </h3>
            <div className="grid gap-2">
              {competency.itens && competency.itens.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors">
                  <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={16} />
                  <span className="text-muted-foreground text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-muted-foreground text-center py-4">Nenhuma competência definida.</p>
      )}
    </div>
  </div>
);

// Course Section Component
interface CourseSectionProps {
  titulo: string;
  descricao: string;
  cargaHoraria: string;
  conteudo: string[];
  icone?: React.ReactNode;
  cor?: string;
}

export const CourseSection: React.FC<CourseSectionProps> = ({ titulo, descricao, cargaHoraria, conteudo = [], icone, cor = "from-primary to-purple-600" }) => (
  <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
    <div className="flex items-start gap-4 mb-4">
      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${cor} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
        {icone}
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
          {titulo}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">{descricao}</p>
        <div className="flex items-center gap-2 mb-4">
          <Clock className="text-primary" size={16} />
          <span className="text-sm font-semibold text-primary">{cargaHoraria}</span>
        </div>
        <ul className="space-y-2">
          {conteudo && conteudo.length > 0 ? (
            conteudo.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <ChevronRight className="flex-shrink-0 mt-0.5 text-primary" size={16} />
                <span>{item}</span>
              </li>
            ))
          ) : (
            <li className="text-sm text-muted-foreground">Nenhum conteúdo definido.</li>
          )}
        </ul>
      </div>
    </div>
  </div>
);

// Practice Activities Component
interface ActivityItem {
  titulo: string;
  descricao: string;
  duracao: string;
}

interface PracticeActivitiesProps {
  atividades: ActivityItem[];
}

export const PracticeActivities: React.FC<PracticeActivitiesProps> = ({ atividades = [] }) => (
  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8">
    <div className="flex items-center gap-2 mb-4">
      <Play className="text-blue-600 dark:text-blue-400" size={24} />
      <h2 className="text-xl font-bold">🧪 Práticas Supervisionadas</h2>
    </div>
    <div className="space-y-4">
      {atividades && atividades.length > 0 ? (
        atividades.map((atividade, index) => (
          <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-white/50 dark:bg-background/50 backdrop-blur-sm">
            <div className="w-8 h-8 rounded-full bg-blue-600 dark:bg-blue-400 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
              {index + 1}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm mb-1">{atividade.titulo}</h3>
              <p className="text-sm text-muted-foreground mb-2">{atividade.descricao}</p>
              <div className="flex items-center gap-1">
                <Clock className="text-blue-600 dark:text-blue-400" size={14} />
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400">{atividade.duracao}</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-muted-foreground text-center py-4">Nenhuma atividade definida.</p>
      )}
    </div>
  </div>
);

// Assessment Component
interface CriterioItem {
  tipo: string;
  peso: string;
  descricao: string;
}

interface AssessmentProps {
  criterios: CriterioItem[];
}

export const Assessment: React.FC<AssessmentProps> = ({ criterios = [] }) => (
  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border border-purple-200 dark:border-purple-800 rounded-xl p-6 mb-8">
    <div className="flex items-center gap-2 mb-4">
      <FileText className="text-purple-600 dark:text-purple-400" size={24} />
      <h2 className="text-xl font-bold">📑 Avaliação</h2>
    </div>
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold mb-3">Critérios de Avaliação:</h3>
        <div className="space-y-3">
          {criterios && criterios.length > 0 ? (
            criterios.map((criterio, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-white/50 dark:bg-background/50 backdrop-blur-sm">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="text-purple-600 dark:text-purple-400" size={16} />
                    <span className="font-medium text-sm">{criterio.tipo}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{criterio.descricao}</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-purple-600 dark:text-purple-400">{criterio.peso}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-center py-4">Nenhum critério definido.</p>
          )}
        </div>
      </div>
    </div>
  </div>
);

// Certificate Badge Component
interface CertificateBadgeProps {
  title: string;
  description: string;
}

export const CertificateBadge: React.FC<CertificateBadgeProps> = ({ title, description }) => (
  <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border-2 border-amber-300 dark:border-amber-700 rounded-xl p-6 mb-8">
    <div className="flex items-start gap-4">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center flex-shrink-0 shadow-lg">
        <Award className="text-white" size={32} />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-bold mb-2 text-amber-900 dark:text-amber-100">
          {title}
        </h3>
        <p className="text-sm text-amber-800 dark:text-amber-200">
          {description}
        </p>
      </div>
    </div>
  </div>
);

// Course CTA Component - Interno
export const CourseCTA: React.FC = () => (
  <div className="bg-gradient-to-r from-primary to-purple-600 rounded-xl p-8 text-white text-center">
    <MessageSquare className="mx-auto mb-4" size={48} />
    <h2 className="text-2xl font-bold mb-2">A Árvore do Ensino</h2>
    <p className="text-white/90 mb-6 max-w-2xl mx-auto">
      Estamos diluindo o curso Arte da Entrevista Clínica em todas as ramificações da plataforma.
      Do tronco às raízes, da copa aos frutos - tudo nasce da escuta.
    </p>
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
      <p className="text-sm text-white/90 mb-4 font-semibold">
        "Não estamos oferecendo um curso. Estamos diluindo uma cosmovisão em linguagem."
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
        <div className="p-3 bg-white/5 rounded-lg">
          <div className="font-bold mb-1">🪷 Copa</div>
          <div className="text-xs text-white/70">Trilhas & Certificações</div>
        </div>
        <div className="p-3 bg-white/5 rounded-lg">
          <div className="font-bold mb-1">🌲 Tronco</div>
          <div className="text-xs text-white/70">Arte da Entrevista Clínica</div>
        </div>
        <div className="p-3 bg-white/5 rounded-lg">
          <div className="font-bold mb-1">🌰 Raízes</div>
          <div className="text-xs text-white/70">Cosmologias do Cuidado</div>
        </div>
      </div>
    </div>
  </div>
);

// References Component
interface ReferencesProps {
  references: string[];
}

export const References: React.FC<ReferencesProps> = ({ references }) => (
  <div className="bg-card border border-border rounded-xl p-6 mb-8">
    <div className="flex items-center gap-2 mb-4">
      <BookOpen className="text-primary" size={24} />
      <h2 className="text-xl font-bold">📜 Referências</h2>
    </div>
    <ul className="space-y-2">
      {references.map((reference, index) => (
        <li key={index} className="text-sm text-muted-foreground pl-4 border-l-2 border-primary/30">
          {reference}
        </li>
      ))}
    </ul>
  </div>
);

