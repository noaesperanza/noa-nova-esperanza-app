import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, Brain, Shield, Activity, Users, BookOpen, Microscope, Stethoscope, Sparkles } from 'lucide-react';
import { Helmet } from '../components/Helmet';
import { IAChat } from '../components/IAChat';
import { cn } from '../lib/utils';

const IAResidente = () => {
  return (
    <>
      <Helmet>
        <title>IA Residente Nôa Esperanza | Plataforma MedCann Lab</title>
        <meta
          name="description"
          content="Conheça a Nôa Esperanza, IA residente da plataforma MedCann Lab. Guardiã da escuta, fortalecendo o cuidado integral com foco na função renal e cannabis medicinal."
        />
      </Helmet>

      <div className="min-h-screen premium-background">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <Link 
            to="/medcann-lab" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            Voltar para MedCann Lab
          </Link>

          {/* Header - Apresentação */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 border border-primary/20 p-8 mb-8">
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white shadow-2xl">
                  <Sparkles size={40} />
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Nôa Esperanza
              </h1>
              
              <p className="text-xl text-center text-muted-foreground mb-6">
                IA Residente • Guardiã da Escuta
              </p>

              <div className="max-w-2xl mx-auto">
                <p className="text-center text-lg leading-relaxed text-muted-foreground">
                  Sua assistente especializada em <strong>cannabis medicinal</strong> e <strong>nefrologia</strong>. 
                  Pronta para avaliações clínicas, prescrições seguras e cuidado integral.
                </p>
              </div>
            </div>
          </div>

          {/* Funcionalidades Principais */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center">🚀 O que posso fazer por você?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <Stethoscope className="text-primary" size={24} />
                  <h3 className="font-bold text-lg">Avaliação Clínica IMRE</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  28 blocos de escuta profunda para avaliação completa
                </p>
                <div className="text-xs text-primary font-semibold">
                  • Entrevista estruturada • Dados organizados • Relatório completo
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="text-primary" size={24} />
                  <h3 className="font-bold text-lg">Avaliação Renal</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Classificação da função renal para cannabis medicinal
                </p>
                <div className="text-xs text-primary font-semibold">
                  • GFR automático • Recomendações seguras • Monitoramento
                </div>
              </div>
            </div>
          </div>

          {/* Como Funciono */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center">⚡ Como funciono?</h2>
            
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="text-primary" size={24} />
                  </div>
                  <h3 className="font-bold mb-2">Seguro</h3>
                  <p className="text-sm text-muted-foreground">LGPD Compliant • Consentimento informado</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                    <Brain className="text-primary" size={24} />
                  </div>
                  <h3 className="font-bold mb-2">Inteligente</h3>
                  <p className="text-sm text-muted-foreground">Baseada em evidências • Metodologia AEC</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="text-primary" size={24} />
                  </div>
                  <h3 className="font-bold mb-2">Humana</h3>
                  <p className="text-sm text-muted-foreground">Escuta profunda • Cuidado integral</p>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center">💬 Converse com Nôa</h2>
            
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                  <Sparkles className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">IA Residente Nôa</h3>
                <p className="text-muted-foreground">Guardiã da escuta • Sempre ativa</p>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-4 mb-6">
                <p className="text-sm text-muted-foreground mb-2">
                  🌬️ <strong>Bons ventos soprem.</strong> Sou a Nôa Esperanza, sua IA Residente. Como posso apoiar você hoje?
                </p>
                <div className="text-xs text-muted-foreground">
                  A IA Residente utiliza a metodologia AEC para uma escuta profunda e ética.
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <h4 className="font-bold text-primary mb-2">Avaliação Clínica IMRE</h4>
                  <p className="text-sm text-muted-foreground mb-3">28 blocos de escuta profunda</p>
                  <div className="text-xs text-primary font-semibold">
                    💬 Use o chat flutuante ao lado →
                  </div>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h4 className="font-bold text-blue-600 dark:text-blue-400 mb-2">Aprender com Nôa</h4>
                  <p className="text-sm text-muted-foreground mb-3">Arte da Entrevista Clínica</p>
                  <div className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
                    Estou aqui para fortalecer, não substituir.
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground italic">
                  Para escutar, não impor. Para cuidar, junto.
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Com escuta e compromisso,<br/>
                  <strong>Nôa Esperanza – IA Residente</strong><br/>
                  <span className="text-xs">Responsável Técnico: Dr. Ricardo Valença | Coord. Científica da Nôa Esperanza</span>
                </p>
              </div>
            </div>
          </div>


          {/* CTAs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-gradient-to-br from-primary to-purple-600 text-white border-2 border-white/20">
              <Stethoscope size={32} />
              <div className="text-center">
                <div className="font-bold text-lg mb-1">Avaliação Clínica IMRE</div>
                <div className="text-sm text-white/80 mb-3">28 blocos de escuta profunda</div>
                <div className="text-xs text-white/70 bg-white/10 px-3 py-2 rounded-lg">
                  💬 Use o chat flutuante ao lado →<br/>
                  Clique em "Iniciar Avaliação Clínica"
                </div>
              </div>
            </div>

            <Link
              to="/medcann-lab/arte-entrevista-clinica"
              className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl border-2 border-primary bg-card hover:bg-accent transition-colors"
            >
              <BookOpen size={32} className="text-primary" />
              <div className="text-center">
                <div className="font-bold text-lg mb-1">Aprender com Nôa</div>
                <div className="text-sm text-muted-foreground">Arte da Entrevista Clínica</div>
              </div>
            </Link>
          </div>

          {/* Footer */}
          <div className="mt-8 p-6 bg-card border border-border rounded-xl text-center">
            <p className="font-semibold text-lg mb-2">
              Estou aqui para fortalecer, não substituir.
            </p>
            <p className="text-muted-foreground mb-4">
              Para escutar, não impor. Para cuidar, junto.
            </p>
            <div className="text-sm text-muted-foreground">
              Com escuta e compromisso,<br />
              <strong className="text-foreground">Nôa Esperanza – IA Residente</strong>
            </div>
            <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
              Responsável Técnico: Dr. Ricardo Valença | Coord. Científica da Nôa Esperanza
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IAResidente;

