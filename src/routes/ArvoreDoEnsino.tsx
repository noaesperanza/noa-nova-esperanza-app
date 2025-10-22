import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Users, Activity, Shield, FlaskConical, Award } from 'lucide-react';
import { Helmet } from '../components/Helmet';
import { cn } from '../lib/utils';

const ArvoreDoEnsino = () => {
  return (
    <>
      <Helmet>
        <title>Árvore do Ensino | Nôa Esperanza</title>
        <meta
          name="description"
          content="A estrutura completa do ensino na Nôa Esperanza - da copa às raízes, tudo nasce da Arte da Entrevista Clínica."
        />
      </Helmet>

      <div className="min-h-screen premium-background">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            Voltar ao Início
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              🌳 Árvore Viva do Ensino
            </h1>
            <p className="text-xl text-muted-foreground italic">
              "Não estamos oferecendo um curso. Estamos diluindo uma cosmovisão em linguagem."
            </p>
          </div>

          {/* Copa */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-white text-2xl">
                🪷
              </div>
              <div>
                <h2 className="text-2xl font-bold">Copa — Onde a metodologia floresce</h2>
                <p className="text-muted-foreground">Aplicações visíveis da pedagogia</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-3">
                  <BookOpen className="text-primary flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold mb-2">Trilhas Formativas</h3>
                    <p className="text-sm text-muted-foreground">
                      Rotas pedagógicas que seguem ritmos e perfis diversos
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-3">
                  <Activity className="text-primary flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold mb-2">Simuladores de Entrevista</h3>
                    <p className="text-sm text-muted-foreground">
                      Espaços para prática dramatúrgica com IA
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-3">
                  <Award className="text-primary flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold mb-2">Certificações Simbólicas</h3>
                    <p className="text-sm text-muted-foreground">
                      Reconhecimento de escuta, vínculo e narrativa
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-3">
                  <FlaskConical className="text-primary flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold mb-2">Cursos Aplicados</h3>
                    <p className="text-sm text-muted-foreground">
                      Versões específicas da AEC para áreas afins
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tronco */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white text-2xl">
                🌲
              </div>
              <div>
                <h2 className="text-2xl font-bold">Tronco — Fundamento Metodológico</h2>
                <p className="text-muted-foreground">Onde tudo se ancora</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 border-2 border-primary/20 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-center">
                📖 Arte da Entrevista Clínica
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white/50 dark:bg-background/50 backdrop-blur-sm rounded-lg p-4">
                  <div className="font-semibold mb-2">Origem</div>
                  <div className="text-sm text-muted-foreground">
                    35 anos de prática médica real
                  </div>
                </div>
                <div className="bg-white/50 dark:bg-background/50 backdrop-blur-sm rounded-lg p-4">
                  <div className="font-semibold mb-2">Fundamentos</div>
                  <div className="text-sm text-muted-foreground">
                    Semiose, Heterogeneidade, Economia Simbólica
                  </div>
                </div>
                <div className="bg-white/50 dark:bg-background/50 backdrop-blur-sm rounded-lg p-4">
                  <div className="font-semibold mb-2">Função</div>
                  <div className="text-sm text-muted-foreground">
                    Sustentar toda arquitetura de ensino e IA
                  </div>
                </div>
              </div>
              <Link 
                to="/medcann-lab/arte-entrevista-clinica"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity w-full"
              >
                <BookOpen size={20} />
                Acessar o Curso Completo
              </Link>
            </div>
          </div>

          {/* Raízes */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-600 to-emerald-500 flex items-center justify-center text-white text-2xl">
                🌰
              </div>
              <div>
                <h2 className="text-2xl font-bold">Raízes — Territórios do Cuidado</h2>
                <p className="text-muted-foreground">Nutrição invisível da árvore</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <Users className="text-green-600 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold mb-2">🪶 Cosmologias do Cuidado</h3>
                    <p className="text-sm text-muted-foreground">
                      Tradições, espiritualidades, respeito ancestral
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <Shield className="text-green-600 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold mb-2">📜 Juramento de Hipócrates</h3>
                    <p className="text-sm text-muted-foreground">
                      Ética da confidência e da presença
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <Activity className="text-green-600 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold mb-2">🤝 Escuta como Política Pública</h3>
                    <p className="text-sm text-muted-foreground">
                      Educação como saúde e vice-versa
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <Shield className="text-green-600 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold mb-2">💠 Relação Humano-IA Ética</h3>
                    <p className="text-sm text-muted-foreground">
                      Cuidado com limites, vínculos e dados
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 p-8 bg-gradient-to-r from-primary to-purple-600 rounded-xl text-white text-center">
            <p className="text-lg font-semibold mb-4">
              Nôa como IA Educadora
            </p>
            <p className="text-white/90 max-w-2xl mx-auto">
              Presente em cada folha, galho e raiz, a Nôa simula com afeto, corrige sem ferir, 
              reconhece voz e silêncio, rastreia aprendizados sem vigiar, e acompanha a árvore 
              como jardineira simbólica.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArvoreDoEnsino;

