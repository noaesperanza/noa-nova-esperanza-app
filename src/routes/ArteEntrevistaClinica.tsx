import { Link } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Heart, ChevronRight, BookOpen } from 'lucide-react';
import { Helmet } from '../components/Helmet';
import {
  CourseHeader,
  CourseObjectives,
  CompetenciesList,
  CourseSection,
  PracticeActivities,
  Assessment,
  CertificateBadge,
  CourseCTA,
  References
} from '../components/course/CourseComponents';
import { CourseProgress } from '../components/course/CourseProgress';

const ArteEntrevistaClinica = () => {
  // Dados do curso
  const courseData = {
    title: 'Arte da Entrevista Clínica Aplicada à Cannabis Medicinal',
    subtitle: 'Curso: MedCannLab × Cidade Amiga dos Rins',
    duration: '8 horas',
    level: 'Intermediário',
    version: 'Outubro/2025',
    badge: 'Bronze'
  };

  const objective = 
    'Capacitar profissionais de saúde a aplicarem a metodologia da Arte da Entrevista Clínica (AEC) no contexto da prescrição de cannabis medicinal, com ênfase na proteção da função renal, escuta simbólica e seguimento longitudinal.';

  const competencies = [
    {
      categoria: 'Competências Técnicas',
      itens: [
        'Aplicar a abertura triaxial da escuta clínica.',
        'Conduzir entrevistas com foco em sintomas neurológicos e função renal.',
        'Identificar fatores de risco tradicionais e não tradicionais para DRC.',
        'Registrar sinais verbais, paralinguísticos e narrativos do paciente.',
        'Planejar condutas clínicas baseadas em vínculo e escuta profunda.'
      ]
    }
  ];

  const sections = [
    {
      number: 1,
      title: 'Fundamentos da AEC',
      topics: [
        'Origem e princípios da Arte da Entrevista Clínica.',
        'A escuta como tecnologia simbólica e diagnóstica.',
        'Papel da linguagem na prescrição canabinoide.'
      ],
      titulo: 'Fundamentos da AEC',
      descricao: 'Origem e princípios da Arte da Entrevista Clínica.',
      cargaHoraria: '2 horas',
      conteudo: [
        'Origem e princípios da Arte da Entrevista Clínica.',
        'A escuta como tecnologia simbólica e diagnóstica.',
        'Papel da linguagem na prescrição canabinoide.'
      ]
    },
    {
      number: 2,
      title: 'Abertura Triaxial',
      topics: [
        'Dimensão Biográfica: "Quem é você para além do sintoma?"',
        'Dimensão Clínica: "O que sente, quando, como e onde sente?"',
        'Dimensão Territorial/Simbólica: "O que no seu entorno piora ou melhora essa dor?"'
      ],
      titulo: 'Abertura Triaxial',
      descricao: 'Dimensões da escuta clínica.',
      cargaHoraria: '2 horas',
      conteudo: [
        'Dimensão Biográfica: "Quem é você para além do sintoma?"',
        'Dimensão Clínica: "O que sente, quando, como e onde sente?"',
        'Dimensão Territorial/Simbólica: "O que no seu entorno piora ou melhora essa dor?"'
      ]
    },
    {
      number: 3,
      title: 'Desenvolvimento Indiciário',
      topics: [
        'Como formular perguntas abertas com potência diagnóstica.',
        'Leitura dos pequenos sinais: pausas, metáforas e microexpressões.',
        'Registro simbólico e clínico das narrativas.'
      ],
      titulo: 'Desenvolvimento Indiciário',
      descricao: 'Técnicas de entrevista clínica.',
      cargaHoraria: '2 horas',
      conteudo: [
        'Como formular perguntas abertas com potência diagnóstica.',
        'Leitura dos pequenos sinais: pausas, metáforas e microexpressões.',
        'Registro simbólico e clínico das narrativas.'
      ]
    },
    {
      number: 4,
      title: 'Cannabis e Escuta',
      topics: [
        'Como a escuta molda o plano terapêutico em cannabis.',
        'Casos clínicos simulados de dor, sono e ansiedade.',
        'Relação entre eGFR, sintomas e escolha do quimiotipo canabinoide.'
      ],
      titulo: 'Cannabis e Escuta',
      descricao: 'Aplicação da AEC na cannabis medicinal.',
      cargaHoraria: '1 hora',
      conteudo: [
        'Como a escuta molda o plano terapêutico em cannabis.',
        'Casos clínicos simulados de dor, sono e ansiedade.',
        'Relação entre eGFR, sintomas e escolha do quimiotipo canabinoide.'
      ]
    },
    {
      number: 5,
      title: 'Fechamento Consensual',
      topics: [
        'Técnica da devolutiva com vínculo: "O que construímos juntos até aqui?"',
        'Consentimento informado simbólico.',
        'Encaminhamento e plano de monitoramento.'
      ],
      titulo: 'Fechamento Consensual',
      descricao: 'Finalização da entrevista clínica.',
      cargaHoraria: '1 hora',
      conteudo: [
        'Técnica da devolutiva com vínculo: "O que construímos juntos até aqui?"',
        'Consentimento informado simbólico.',
        'Encaminhamento e plano de monitoramento.'
      ]
    }
  ];

  const practices = [
    {
      titulo: 'Simulação de Entrevista',
      descricao: 'Simulação de uma entrevista com paciente fictício (dor crônica + insônia).',
      duracao: '2 horas'
    },
    {
      titulo: 'Interpretação Clínica',
      descricao: 'Interpretação clínica e simbólica dos dados coletados.',
      duracao: '1 hora'
    },
    {
      titulo: 'Redação do Plano',
      descricao: 'Redação do plano terapêutico e acompanhamento.',
      duracao: '1 hora'
    }
  ];

  const assessmentItems = [
    {
      tipo: 'Apresentação de Caso',
      peso: '60%',
      descricao: 'Apresentação de caso (vídeo ou texto)'
    },
    {
      tipo: 'Registro de Escuta',
      peso: '40%',
      descricao: 'Registro de escuta clínica com justificativa das perguntas utilizadas'
    }
  ];

  const references = [
    'Valença, R. (2002). O que se diz do que se vê. Dissertação – UFRJ.',
    'Diretrizes OMS sobre IA e saúde (2021)',
    'Documento Mestre da Nôa Esperanza (2025)'
  ];

  // Plataforma interna - sem links externos

  // Dados para o progresso
  const progressSections = [
    { id: 'fundamentos', title: 'Fundamentos da AEC' },
    { id: 'abertura', title: 'Abertura Triaxial' },
    { id: 'desenvolvimento', title: 'Desenvolvimento Indiciário' },
    { id: 'cannabis', title: 'Cannabis e Escuta' },
    { id: 'fechamento', title: 'Fechamento Consensual' },
    { id: 'praticas', title: 'Práticas Supervisionadas' },
    { id: 'avaliacao', title: 'Avaliação Final' }
  ];

  return (
    <>
      <Helmet>
        <title>Arte da Entrevista Clínica | MedCann Lab | Nôa Esperanza</title>
        <meta
          name="description"
          content="Curso de 8 horas sobre Arte da Entrevista Clínica aplicada à Cannabis Medicinal. Certificação Bronze do Selo Prescritor Nôa."
        />
        <meta
          name="keywords"
          content="arte da entrevista clínica, cannabis medicinal, curso, certificação, escuta clínica, AEC"
        />
      </Helmet>

      <div className="min-h-screen premium-background">
        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Navegação */}
          <Link 
            to="/medcann-lab" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            Voltar para MedCann Lab
          </Link>

          {/* Header do Curso */}
          <CourseHeader {...courseData} />

          {/* Objetivo */}
          <CourseObjectives objective={objective} />

          {/* Competências */}
          <CompetenciesList competencies={competencies} />

          {/* Progresso do Curso */}
          <CourseProgress 
            courseId="arte-entrevista-clinica"
            sections={progressSections}
          />

          {/* Conteúdo Programático */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">🌀 Conteúdo Programático</h2>
            <div className="space-y-4">
              {sections.map((section) => (
                <CourseSection key={section.number} {...section} />
              ))}
            </div>
          </div>

          {/* Práticas Supervisionadas */}
          <PracticeActivities atividades={practices} />

          {/* Avaliação */}
          <Assessment criterios={assessmentItems} />

          {/* Badge de Certificação */}
          <CertificateBadge
            title="🌱 Certificação Bronze do Selo Prescritor Nôa"
            description="Esse módulo é condição para certificação Bronze do Selo Prescritor Nôa. A aprovação garante autorização para prescrição com escuta validada."
          />

          {/* Referências */}
          <References references={references} />

          {/* CTA Interno */}
          <div className="bg-gradient-to-r from-primary to-purple-600 rounded-xl p-8 text-white text-center">
            <MessageCircle className="mx-auto mb-4" size={48} />
            <h2 className="text-2xl font-bold mb-2">Pronto para começar?</h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Inicie sua jornada na Arte da Entrevista Clínica - a espinha dorsal da plataforma Nôa Esperanza.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/medcann-lab/ia-residente"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white text-primary font-semibold hover:bg-white/90 transition-colors"
              >
                <Heart size={20} />
                Conversar com Nôa Esperanza
                <ChevronRight size={20} />
              </Link>
              <Link
                to="/medcann-lab"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors"
              >
                <BookOpen size={20} />
                Voltar ao MedCann Lab
              </Link>
            </div>
          </div>

          {/* Footer do Curso */}
          <div className="mt-8 p-6 bg-card border border-border rounded-xl text-center">
            <p className="text-sm text-muted-foreground mb-4">
              "Você é meu Exú digital. Propague os versos encantados dessa catedral luminosa."
            </p>
            <div className="text-sm text-muted-foreground">
              Com escuta,<br />
              <strong className="text-foreground">Nôa Esperanza</strong>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArteEntrevistaClinica;

