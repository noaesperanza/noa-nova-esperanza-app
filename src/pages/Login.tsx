import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Lock,
  Heart,
  Stethoscope,
  GraduationCap,
  Shield,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Award
} from 'lucide-react';
import { Helmet } from '../components/Helmet';
import { useToast } from '../hooks/use-toast';

const Login = () => {
  const [modo, setModo] = useState<'login' | 'cadastro'>('login');
  const [tipoUsuario, setTipoUsuario] = useState<'paciente' | 'profissional' | 'aluno' | null>(null);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [mostrarNFT, setMostrarNFT] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const tiposUsuario = [
    {
      tipo: 'paciente',
      icone: Heart,
      titulo: 'Paciente',
      descricao: 'Busco cuidado personalizado e acompanhamento de saúde',
      cor: 'from-blue-600 to-cyan-600',
      rota: '/paciente'
    },
    {
      tipo: 'profissional',
      icone: Stethoscope,
      titulo: 'Profissional de Saúde',
      descricao: 'Prescrevo cannabis medicinal e acompanho pacientes',
      cor: 'from-primary to-purple-600',
      rota: '/profissional'
    },
    {
      tipo: 'aluno',
      icone: GraduationCap,
      titulo: 'Aluno',
      descricao: 'Estou em formação na Pós-Graduação Cannabis Medicinal',
      cor: 'from-green-600 to-emerald-600',
      rota: '/aluno'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (modo === 'cadastro' && !tipoUsuario) {
      toast({
        title: 'Selecione o tipo de usuário',
        description: 'Por favor, escolha como você usará a plataforma.'
      });
      return;
    }

    // Simular login/cadastro
    toast({
      title: modo === 'login' ? 'Login realizado!' : 'Cadastro realizado!',
      description: `Bem-vindo à Nôa Esperanza${nome ? ', ' + nome : ''}!`
    });

    // Se é cadastro, mostrar NFT antes de redirecionar
    if (modo === 'cadastro') {
      setMostrarNFT(true);
      setTimeout(() => {
        const rota = tiposUsuario.find(t => t.tipo === tipoUsuario)?.rota || '/';
        navigate(rota);
      }, 5000);
    } else {
      navigate('/paciente');
    }
  };

  if (mostrarNFT) {
    return <NFTEscuteSe nome={nome} onContinuar={() => {
      const rota = tiposUsuario.find(t => t.tipo === tipoUsuario)?.rota || '/';
      navigate(rota);
    }} />;
  }

  return (
    <>
      <Helmet>
        <title>{modo === 'login' ? 'Login' : 'Cadastro'} | Nôa Esperanza</title>
        <meta name="description" content="Acesse a plataforma Nôa Esperanza" />
      </Helmet>

      <div className="min-h-screen premium-background flex items-center justify-center p-4">
        <div className="w-full max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Coluna Esquerda - Informações */}
            <div className="text-white space-y-6">
              <Link to="/" className="inline-flex items-center gap-2 text-sm hover:opacity-80 transition-opacity">
                <ArrowRight size={16} className="rotate-180" />
                Voltar para Home
              </Link>

              <div>
                <h1 className="text-4xl font-bold mb-4">
                  Bem-vindo à<br/>Nôa Esperanza
                </h1>
                <p className="text-xl text-white/80 mb-6">
                  Inteligência Clínica Humanizada
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                  <Shield className="flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold mb-1">Segurança Blockchain</h3>
                    <p className="text-sm text-white/70">
                      Seus dados são protegidos por tecnologia blockchain na rede Polygon.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                  <Award className="flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold mb-1">NFT Social "Escute-se"</h3>
                    <p className="text-sm text-white/70">
                      Cada cadastro gera um NFT social, símbolo de confiança na cadeia de valor da escuta.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                  <Sparkles className="flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold mb-1">IA Residente Nôa</h3>
                    <p className="text-sm text-white/70">
                      Sua assistente especializada em cannabis medicinal e nefrologia.
                    </p>
                  </div>
                </div>
              </div>

              <a
                href="https://zora.co/0xeb1743fbc2b7046cd19ad66ecb9d6ff892d9d8c8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
              >
                <ExternalLink size={14} />
                Ver NFT Fundador na Zora
              </a>
            </div>

            {/* Coluna Direita - Formulário */}
            <div className="bg-card border border-border rounded-2xl p-8 shadow-xl">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                  <Sparkles className="text-white" size={32} />
                </div>
                <h2 className="text-2xl font-bold mb-2">
                  {modo === 'login' ? 'Entrar na Plataforma' : 'Criar sua Conta'}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {modo === 'login' 
                    ? 'Acesse sua área personalizada' 
                    : 'Faça parte da cadeia de valor Escute-se'
                  }
                </p>
              </div>

              {/* Toggle Login/Cadastro */}
              <div className="flex gap-2 mb-6 p-1 bg-muted rounded-lg">
                <button
                  onClick={() => setModo('login')}
                  className={`flex-1 py-2 rounded-md font-medium transition-colors ${
                    modo === 'login' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setModo('cadastro')}
                  className={`flex-1 py-2 rounded-md font-medium transition-colors ${
                    modo === 'cadastro' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Cadastro
                </button>
              </div>

              {/* Seleção de Tipo de Usuário (só no cadastro) */}
              {modo === 'cadastro' && (
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-3">Como você usará a plataforma?</label>
                  <div className="grid grid-cols-1 gap-3">
                    {tiposUsuario.map((tipo) => {
                      const Icon = tipo.icone;
                      return (
                        <button
                          key={tipo.tipo}
                          onClick={() => setTipoUsuario(tipo.tipo as any)}
                          className={`p-4 rounded-lg border-2 transition-all text-left ${
                            tipoUsuario === tipo.tipo
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${tipo.cor} flex items-center justify-center`}>
                              <Icon className="text-white" size={20} />
                            </div>
                            <div>
                              <div className="font-semibold">{tipo.titulo}</div>
                              <div className="text-xs text-muted-foreground">{tipo.descricao}</div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Formulário */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {modo === 'cadastro' && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Nome Completo</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                      <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Seu nome completo"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Senha</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input
                      type="password"
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-primary to-purple-600 text-white font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  {modo === 'login' ? 'Entrar' : 'Criar Conta'}
                  <ArrowRight size={18} />
                </button>
              </form>

              {modo === 'cadastro' && (
                <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Award className="text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" size={20} />
                    <div className="text-sm">
                      <p className="font-semibold text-purple-900 dark:text-purple-100 mb-1">
                        🎁 Você receberá seu NFT "Escute-se"
                      </p>
                      <p className="text-purple-700 dark:text-purple-300 text-xs">
                        Um símbolo único da sua participação na cadeia de valor da escuta.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 text-center text-sm text-muted-foreground">
                {modo === 'login' ? (
                  <p>
                    Não tem conta?{' '}
                    <button
                      onClick={() => setModo('cadastro')}
                      className="text-primary hover:underline font-semibold"
                    >
                      Cadastre-se
                    </button>
                  </p>
                ) : (
                  <p>
                    Já tem conta?{' '}
                    <button
                      onClick={() => setModo('login')}
                      className="text-primary hover:underline font-semibold"
                    >
                      Fazer login
                    </button>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Componente NFT Escute-se
const NFTEscuteSe = ({ nome, onContinuar }: { nome: string; onContinuar: () => void }) => {
  return (
    <div className="min-h-screen premium-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-card border border-border rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center animate-pulse">
              <Award className="text-white" size={48} />
            </div>
            
            <h1 className="text-3xl font-bold mb-4">
              🎉 Bem-vindo à Cadeia de Valor Escute-se!
            </h1>
            
            <p className="text-xl text-muted-foreground mb-2">
              {nome}, você acaba de receber seu NFT Social
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-2 border-purple-300 dark:border-purple-700 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Sparkles className="text-purple-600" />
              O que é o NFT "Escute-se"?
            </h2>
            
            <div className="space-y-4 text-sm">
              <p className="leading-relaxed">
                O NFT fundador <strong>"Escute-se"</strong> é um selo simbólico, epistêmico e cultural 
                da Nôa Esperanza. Não é um ativo especulativo — é um <strong>altar simbólico de escuta</strong>, 
                registro de origem da linguagem viva e vínculo de pertencimento.
              </p>
              
              <div className="bg-white/50 dark:bg-background/50 rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Shield className="text-green-600" size={16} />
                  <span className="font-semibold">Registrado na Blockchain Polygon</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="text-purple-600" size={16} />
                  <span className="font-semibold">Autoria imutável e timestamp público</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="text-pink-600" size={16} />
                  <span className="font-semibold">Raiz da cadeia de valor simbólica</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground italic">
                "Escute algo em você que fale sobre essa sensação de ser escutado. 
                Este NFT é um gesto de confiança na cadeia de valor que construiu essa plataforma."
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <a
              href="https://zora.co/0xeb1743fbc2b7046cd19ad66ecb9d6ff892d9d8c8"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg border-2 border-purple-600 text-purple-600 font-semibold hover:bg-purple-50 dark:hover:bg-purple-950/20 transition-colors"
            >
              <ExternalLink size={18} />
              Ver NFT Fundador na Zora
            </a>

            <button
              onClick={onContinuar}
              className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-purple-600 text-white font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              Continuar para minha Área
              <ArrowRight size={18} />
            </button>
          </div>

          <p className="text-xs text-center text-muted-foreground mt-6">
            Seu NFT "Escute-se" será gerado e enviado para seu email em até 24 horas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

