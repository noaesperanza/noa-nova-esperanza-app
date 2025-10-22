import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Info } from 'lucide-react';
import { Helmet } from '../components/Helmet';
import { AvatarNoaMultimodal } from '../components/AvatarNoaMultimodal';

const AvatarDemo = () => {
  const [contexto, setContexto] = useState<'paciente' | 'profissional' | 'aluno' | 'geral'>('geral');
  const [mensagens, setMensagens] = useState<string[]>([]);

  const handleMessage = (message: string) => {
    setMensagens(prev => [...prev, message]);
  };

  return (
    <>
      <Helmet>
        <title>Avatar Multimodal Nôa Esperanza | Demo</title>
        <meta name="description" content="Demonstração do avatar multimodal da IA Residente Nôa Esperanza" />
      </Helmet>

      <div className="min-h-screen premium-background">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            Voltar para Home
          </Link>

          {/* Header */}
          <div className="text-center mb-8 text-white">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
              <Sparkles size={32} />
            </div>
            <h1 className="text-4xl font-bold mb-3">Avatar Multimodal Nôa Esperanza</h1>
            <p className="text-xl text-white/80">
              Interação por Voz, Vídeo e Texto com GPT-4.1 Reasoning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Coluna Esquerda - Avatar */}
            <div className="md:col-span-2">
              <div className="bg-card border border-border rounded-2xl p-8">
                <AvatarNoaMultimodal context={contexto} onMessage={handleMessage} />
              </div>
            </div>

            {/* Coluna Direita - Controles e Info */}
            <div className="space-y-6">
              {/* Seletor de Contexto */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="font-bold mb-4 flex items-center gap-2">
                  <Info size={18} />
                  Contexto de Interação
                </h2>
                <div className="space-y-2">
                  {[
                    { id: 'paciente', label: 'Paciente', desc: 'Acolhimento e cuidado' },
                    { id: 'profissional', label: 'Profissional', desc: 'Técnico e evidências' },
                    { id: 'aluno', label: 'Aluno', desc: 'Didático e explicativo' },
                    { id: 'geral', label: 'Geral', desc: 'Conversa aberta' }
                  ].map((ctx) => (
                    <button
                      key={ctx.id}
                      onClick={() => setContexto(ctx.id as any)}
                      className={`w-full p-3 rounded-lg text-left transition-all ${
                        contexto === ctx.id
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-accent'
                      }`}
                    >
                      <div className="font-semibold text-sm">{ctx.label}</div>
                      <div className="text-xs opacity-80">{ctx.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recursos Disponíveis */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="font-bold mb-4">Recursos da IA</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span>Base de Conhecimento</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span>Biblioteca (240+ artigos)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span>Sistema IMRE (37 blocos)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span>GPT-4.1 Reasoning</span>
                  </div>
                </div>
              </div>

              {/* Últimas Mensagens */}
              {mensagens.length > 0 && (
                <div className="bg-card border border-border rounded-xl p-6">
                  <h2 className="font-bold mb-4">Últimas Mensagens</h2>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {mensagens.slice(-5).map((msg, i) => (
                      <div key={i} className="p-2 bg-muted rounded text-xs">
                        {msg}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Informações Técnicas */}
          <div className="mt-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-2 border-purple-300 dark:border-purple-700 rounded-xl p-6">
            <h2 className="font-bold mb-3">🔬 Tecnologia Multimodal</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-semibold mb-2">🎤 Reconhecimento de Voz</div>
                <p className="text-xs text-muted-foreground">
                  Web Speech API para transcrição em tempo real em português
                </p>
              </div>
              <div>
                <div className="font-semibold mb-2">📹 Visão Computacional</div>
                <p className="text-xs text-muted-foreground">
                  Acesso à câmera para interação visual (futuro: análise de expressões)
                </p>
              </div>
              <div>
                <div className="font-semibold mb-2">🧠 GPT-4.1 Reasoning</div>
                <p className="text-xs text-muted-foreground">
                  Processamento avançado com raciocínio explícito e base de conhecimento
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AvatarDemo;

