import { Helmet } from "../components/Helmet";
import { CourseHeader, CourseObjectives, CompetenciesList, CourseSection, PracticeActivities, Assessment, CertificateBadge, CourseCTA } from "../components/course/CourseComponents";
import { GraduationCap, BookOpen, Users, Clock, Award, Brain, Heart, Microscope } from "lucide-react";

const PosGraduacaoCannabis = () => {
  const modulos = [
    {
      id: 1,
      titulo: "Fundamentos Históricos e Regulatórios da Cannabis",
      descricao: "História do uso medicinal, legislação brasileira e contexto internacional",
      cargaHoraria: 40,
      conteudo: [
        "História do uso da cannabis na China, Índia, Oriente Médio, Europa e Américas",
        "História da proibição e redescoberta medicinal",
        "Legislação brasileira: RDC 327, prescrição e judicialização",
        "Contexto internacional: OMS, ONU, FDA, EMA"
      ]
    },
    {
      id: 2,
      titulo: "A Planta Cannabis: Botânica, Genética e Quimiotipos",
      descricao: "Anatomia, fisiologia, genéticas e quimiotipos da cannabis",
      cargaHoraria: 40,
      conteudo: [
        "Anatomia e fisiologia da planta",
        "Genéticas: sativa, indica, ruderalis",
        "Quimiotipos: dominância canabinoide e terpenoide",
        "Cultivares, híbridos e potencial farmacognóstico"
      ]
    },
    {
      id: 3,
      titulo: "Cultivo, Extração, Análise e Manufatura de Produtos",
      descricao: "Boas práticas de cultivo, extração e análise laboratorial",
      cargaHoraria: 50,
      conteudo: [
        "Boas práticas de cultivo (indoor, outdoor, greenhouse)",
        "Métodos de extração: etanol, CO₂ supercrítico, óleo",
        "Análise laboratorial: COA, cromatografia",
        "Veículos e formas farmacêuticas: óleos, cápsulas, sprays, cosméticos, supositórios"
      ]
    },
    {
      id: 4,
      titulo: "Sistema Endocanabinoide e Endocanabinoide Ampliado",
      descricao: "Descoberta e funcionamento do sistema endocanabinoide",
      cargaHoraria: 50,
      conteudo: [
        "Descoberta dos receptores CB1 e CB2, anandamida e 2-AG",
        "Enzimas FAAH, MAGL, e seus inibidores",
        "Sistema endocanabinoide ampliado: PPARs, TRPV, GPR55, microbiota, eixo neuroimune"
      ]
    },
    {
      id: 5,
      titulo: "Prescrição Prática de Produtos Canabinoides",
      descricao: "Protocolos de prescrição e monitoramento terapêutico",
      cargaHoraria: 50,
      conteudo: [
        "Relação dose-resposta: titulação individualizada",
        "Diferença entre produtos full spectrum, broad spectrum, isolados",
        "Protocolos por condições clínicas",
        "Interações medicamentosas, efeitos adversos, monitoramento"
      ]
    },
    {
      id: 6,
      titulo: "Aplicações Terapêuticas por Especialidades Médicas",
      descricao: "Uso da cannabis em diferentes especialidades médicas",
      cargaHoraria: 60,
      conteudo: [
        "Neurologia: epilepsia, Parkinson, esclerose múltipla, dor neuropática, neuroproteção",
        "Psiquiatria: ansiedade, TEA, TOC, TDAH, psicose, insônia, depressão, síndrome de Tourette",
        "Reumatologia: fibromialgia, artrite reumatoide, lúpus",
        "Endocrinologia: obesidade, diabetes, resistência à insulina",
        "Imunologia e Inflamação: doenças autoimunes e inflamatórias",
        "Oncologia: dor, náusea, apetite, efeitos colaterais de quimioterapia, efeitos antitumorais",
        "Dermatologia: psoríase, dermatite atópica, acne, envelhecimento",
        "Cardiologia: hipertensão, inflamação vascular",
        "Pneumologia: asma, apneia, inflamação crônica",
        "Nefrologia e hematologia: suporte paliativo e inflamatório",
        "Sistema digestivo: doença inflamatória intestinal, SII"
      ]
    },
    {
      id: 7,
      titulo: "Integração com Nutrição, Fitoterapia e Práticas Integrativas",
      descricao: "Cannabis na medicina integrativa e práticas complementares",
      cargaHoraria: 50,
      conteudo: [
        "Canabinoides e microbiota intestinal",
        "Plantas sinérgicas: ashwagandha, cúrcuma, bacopa, gengibre",
        "Estilo de vida, meditação, ayurveda, medicina chinesa",
        "Fundamentos da Medicina Ayurvédica: doshas (Vata, Pitta, Kapha), elementos, rotinas e plantas medicinais",
        "Fundamentos da Medicina Tradicional Chinesa (MTC): yin-yang, cinco elementos, meridianos, uso de fitoterapia chinesa",
        "Fundamentos da Medicina Antroposófica: constituição humana em níveis físico, etérico, astral e ego; terapias integrativas, medicamentos antroposóficos, visão ampliada da doença"
      ]
    },
    {
      id: 8,
      titulo: "Casos Clínicos Integrativos e Interdisciplinares",
      descricao: "Discussão de casos clínicos com abordagem interdisciplinar",
      cargaHoraria: 60,
      conteudo: [
        "Discussão semanal de casos clínicos por módulo",
        "Reunião mensal integrativa com todas as especialidades e equipe multiprofissional",
        "Metodologia AEC aplicada aos casos clínicos",
        "Sistema IMRE na prática clínica"
      ]
    },
    {
      id: 9,
      titulo: "Pesquisa Científica, Bioética e TCC",
      descricao: "Desenvolvimento de pesquisa científica e trabalho de conclusão",
      cargaHoraria: 60,
      conteudo: [
        "Leitura crítica de artigos, elaboração de revisão sistemática",
        "Ética na pesquisa com cannabis e em prescrição clínica",
        "Estruturação do trabalho de conclusão de curso (TCC)"
      ]
    },
    {
      id: 10,
      titulo: "Inteligência Artificial na Clínica, Ensino e Pesquisa",
      descricao: "Aplicações da IA na medicina canabinoide",
      cargaHoraria: 50,
      conteudo: [
        "Aplicações clínicas: triagem, apoio diagnóstico, plano terapêutico",
        "Ensino: construção de materiais, mapas mentais, quizzes, slides",
        "Pesquisa: resumo de artigos, crítica e revisão automatizada",
        "Simulação clínica com IA, prontuário digital interativo",
        "Considerações éticas, limites e potencial futuro"
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Curso de Pós-Graduação: Cannabis Medicinal Integrativa | Nôa Esperanza</title>
        <meta
          name="description"
          content="Curso de Pós-Graduação em Cannabis Medicinal Integrativa - 12 meses, 520 horas. Coordenação: Dr. Eduardo de Sá Campello Faveret."
        />
        <meta
          name="keywords"
          content="pós-graduação, cannabis medicinal, medicina integrativa, curso, especialização"
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="container mx-auto px-4 py-8">
          {/* Header do Curso */}
          <CourseHeader
            title="Curso de Pós-Graduação: Cannabis Medicinal Integrativa"
            subtitle="Versão Estendida com Conteúdos Modulares"
            duration="12 meses"
            level="Especialização"
            version="2025"
            badge="520 horas"
          />

          {/* Objetivos do Curso */}
          <CourseObjectives
            objective="Formar especialistas em Cannabis Medicinal com visão integrativa e baseada em evidências, desenvolvendo competências clínicas para prescrição segura e eficaz de produtos canabinoides, integrando conhecimentos de medicina tradicional e complementar, preparando profissionais para pesquisa científica e aplicando metodologia AEC na prática clínica."
          />

          {/* Competências Desenvolvidas */}
          <CompetenciesList
            competencies={[
              {
                categoria: "Conhecimento Científico",
                itens: [
                  "Botânica e genética da cannabis",
                  "Sistema endocanabinoide e fisiopatologia",
                  "Farmacologia dos canabinoides",
                  "Evidências científicas em cannabis medicinal"
                ]
              },
              {
                categoria: "Competências Clínicas",
                itens: [
                  "Avaliação clínica com metodologia AEC",
                  "Prescrição personalizada de produtos canabinoides",
                  "Monitoramento terapêutico e farmacovigilância",
                  "Manejo de efeitos adversos e interações"
                ]
              },
              {
                categoria: "Habilidades Integrativas",
                itens: [
                  "Integração com medicina tradicional chinesa",
                  "Aplicação de princípios ayurvédicos",
                  "Medicina antroposófica e cannabis",
                  "Nutrição e fitoterapia complementar"
                ]
              },
              {
                categoria: "Pesquisa e Inovação",
                itens: [
                  "Metodologia de pesquisa em cannabis",
                  "Análise crítica de literatura científica",
                  "Desenvolvimento de protocolos clínicos",
                  "Aplicação de IA na prática clínica"
                ]
              }
            ]}
          />

          {/* Módulos do Curso */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
              Módulos do Curso
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {modulos.map((modulo) => (
                <CourseSection
                  key={modulo.id}
                  titulo={`Módulo ${modulo.id}: ${modulo.titulo}`}
                  descricao={modulo.descricao}
                  cargaHoraria={`${modulo.cargaHoraria}h`}
                  conteudo={modulo.conteudo}
                  icone={<BookOpen className="w-6 h-6" />}
                  cor="from-blue-500 to-cyan-500"
                />
              ))}
            </div>
          </div>

          {/* Metodologia */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
              Metodologia de Ensino
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="bg-card p-6 rounded-xl border border-border">
                <Brain className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Aprendizado Baseado em Casos</h3>
                <p className="text-muted-foreground">
                  Discussão de casos clínicos reais com abordagem interdisciplinar
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <Users className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Aulas Interativas</h3>
                <p className="text-muted-foreground">
                  Sessões ao vivo com especialistas e discussões em grupo
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <Microscope className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Pesquisa Científica</h3>
                <p className="text-muted-foreground">
                  Desenvolvimento de TCC com orientação especializada
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <Heart className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Prática Clínica</h3>
                <p className="text-muted-foreground">
                  Aplicação prática da metodologia AEC e sistema IMRE
                </p>
              </div>
            </div>
          </div>

          {/* Atividades Práticas */}
          <PracticeActivities
            atividades={[
              {
                titulo: "Seminários Interdisciplinares",
                descricao: "Discussão mensal de casos clínicos com todas as especialidades",
                duracao: "2h/semana"
              },
              {
                titulo: "Workshops de Prescrição",
                descricao: "Prática de prescrição com diferentes produtos canabinoides",
                duracao: "4h/mês"
              },
              {
                titulo: "Laboratório de Análise",
                descricao: "Análise de produtos canabinoides e interpretação de laudos",
                duracao: "3h/mês"
              },
              {
                titulo: "Simulação Clínica com IA",
                descricao: "Uso da IA Nôa Esperanza para simulação de consultas",
                duracao: "2h/semana"
              }
            ]}
          />

          {/* Avaliação */}
          <Assessment
            criterios={[
              {
                tipo: "Participação em Aulas",
                peso: "20%",
                descricao: "Presença e participação ativa nas aulas"
              },
              {
                tipo: "Casos Clínicos",
                peso: "30%",
                descricao: "Resolução e discussão de casos clínicos"
              },
              {
                tipo: "Projetos Práticos",
                peso: "25%",
                descricao: "Desenvolvimento de protocolos e prescrições"
              },
              {
                tipo: "Trabalho de Conclusão",
                peso: "25%",
                descricao: "TCC com pesquisa científica em cannabis medicinal"
              }
            ]}
          />

          {/* Certificação */}
          <CertificateBadge
            title="Certificado de Especialização"
            description="Certificado de Especialização em Cannabis Medicinal Integrativa reconhecido pelo Conselho Federal de Medicina. Requisitos: frequência mínima de 75%, aprovação em todos os módulos, TCC aprovado e participação em atividades práticas."
          />

          {/* CTA Final */}
          <CourseCTA />
        </div>
      </div>
    </>
  );
};

export default PosGraduacaoCannabis;
