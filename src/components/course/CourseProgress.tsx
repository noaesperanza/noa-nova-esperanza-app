import { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Award } from 'lucide-react';
import { cn } from '../../lib/utils';

interface CourseProgressProps {
  courseId: string;
  sections: Array<{
    id: string;
    title: string;
  }>;
}

interface ProgressData {
  completedSections: string[];
  lastAccess: string;
  progress: number;
}

export const CourseProgress: React.FC<CourseProgressProps> = ({ courseId, sections }) => {
  const [progressData, setProgressData] = useState<ProgressData>({
    completedSections: [],
    lastAccess: new Date().toISOString(),
    progress: 0
  });

  // Carregar progresso do localStorage
  useEffect(() => {
    const stored = localStorage.getItem(`course_progress_${courseId}`);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setProgressData(data);
      } catch (e) {
        console.error('Erro ao carregar progresso:', e);
      }
    }
  }, [courseId]);

  // Salvar progresso no localStorage
  const saveProgress = (data: ProgressData) => {
    localStorage.setItem(`course_progress_${courseId}`, JSON.stringify(data));
    setProgressData(data);
  };

  // Marcar seção como completa
  const toggleSection = (sectionId: string) => {
    const newCompletedSections = progressData.completedSections.includes(sectionId)
      ? progressData.completedSections.filter(id => id !== sectionId)
      : [...progressData.completedSections, sectionId];

    const newProgress = Math.round((newCompletedSections.length / sections.length) * 100);

    saveProgress({
      completedSections: newCompletedSections,
      lastAccess: new Date().toISOString(),
      progress: newProgress
    });
  };

  const isCompleted = (sectionId: string) => {
    return progressData.completedSections.includes(sectionId);
  };

  const allCompleted = progressData.completedSections.length === sections.length;

  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold mb-1">Seu Progresso</h3>
          <p className="text-sm text-muted-foreground">
            {progressData.completedSections.length} de {sections.length} seções completas
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-primary">{progressData.progress}%</div>
          {allCompleted && (
            <div className="flex items-center gap-1 text-sm text-amber-600 dark:text-amber-400">
              <Award size={16} />
              <span className="font-semibold">Completo!</span>
            </div>
          )}
        </div>
      </div>

      {/* Barra de Progresso */}
      <div className="w-full h-3 bg-muted rounded-full overflow-hidden mb-6">
        <div 
          className="h-full bg-gradient-to-r from-primary to-purple-600 transition-all duration-500"
          style={{ width: `${progressData.progress}%` }}
        />
      </div>

      {/* Lista de Seções */}
      <div className="space-y-2">
        {sections.map((section) => {
          const completed = isCompleted(section.id);
          return (
            <button
              key={section.id}
              onClick={() => toggleSection(section.id)}
              className={cn(
                "w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left",
                completed 
                  ? "bg-primary/10 hover:bg-primary/15" 
                  : "hover:bg-accent"
              )}
            >
              {completed ? (
                <CheckCircle2 className="text-primary flex-shrink-0" size={20} />
              ) : (
                <Circle className="text-muted-foreground flex-shrink-0" size={20} />
              )}
              <span className={cn(
                "text-sm",
                completed ? "text-foreground font-medium" : "text-muted-foreground"
              )}>
                {section.title}
              </span>
            </button>
          );
        })}
      </div>

      {allCompleted && (
        <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border-2 border-amber-300 dark:border-amber-700 rounded-lg">
          <div className="flex items-center gap-3">
            <Award className="text-amber-600 dark:text-amber-400" size={24} />
            <div>
              <div className="font-bold text-amber-900 dark:text-amber-100">
                Parabéns! Você completou todo o conteúdo.
              </div>
              <div className="text-sm text-amber-800 dark:text-amber-200">
                Agora você está pronto para a avaliação final.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

