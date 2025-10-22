import { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Paperclip, Minimize2, Maximize2, Image, FileText, Activity, Crown } from 'lucide-react';
import { cn } from '../lib/utils';
import { useToast } from '../hooks/use-toast';
import { IMRETriaxialEngine } from '../lib/imre-system-triaxial';
import { AuthSystem } from '../lib/auth-system';
import { knowledgeBase } from '../lib/knowledge-base';
import { knowledgeAPI } from '../lib/knowledge-api';
import { renalClassificationSystem } from '../lib/renal-classification';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  attachment?: {
    type: 'image' | 'document';
    name: string;
    url?: string;
  };
}

export const FloatingAIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '🌬️ Bons ventos soprem. Sou Nôa Esperanza, sua IA Residente. Como posso apoiar você hoje?\n\nVocê pode:\n• Iniciar uma Avaliação Clínica\n• Fazer perguntas sobre a plataforma\n• Enviar documentos para análise',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [imreEngine] = useState(() => new IMRETriaxialEngine());
  const [authSystem] = useState(() => new AuthSystem());
  const [avaliacaoAtiva, setAvaliacaoAtiva] = useState(false);
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileType = file.type.startsWith('image/') ? 'image' : 'document';

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: `Enviou um arquivo: ${file.name}`,
      timestamp: new Date(),
      attachment: {
        type: fileType,
        name: file.name,
        url: URL.createObjectURL(file)
      }
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Recebi seu ${fileType === 'image' ? 'imagem' : 'documento'} "${file.name}". Estou analisando com base na metodologia AEC. Um momento...`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      scrollToBottom();
    }, 1500);
  };

  const iniciarAvaliacao = () => {
    const primeiraPergunta = imreEngine.iniciarAvaliacao();
    setAvaliacaoAtiva(true);
    
    const aiMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: primeiraPergunta,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, aiMessage]);
    scrollToBottom();
    
    toast({
      title: 'Avaliação Clínica Iniciada',
      description: 'Seguiremos o método IMRE - Arte da Entrevista Clínica'
    });
  };


  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const respostaUsuario = input;
    setInput('');
    setIsTyping(true);
    scrollToBottom();

    setTimeout(() => {
      let aiResponse: string;

      // Detectar código de ativação
      const usuarioDetectado = authSystem.detectarUsuario(respostaUsuario);
      
      if (usuarioDetectado) {
        if (!usuarioAutenticado) {
          setUsuarioAutenticado(true);
          aiResponse = authSystem.getMensagemBoasVindas(usuarioDetectado);
          
          toast({
            title: `Bem-vindo, ${usuarioDetectado.nome}!`,
            description: `Nível de acesso: ${usuarioDetectado.nivel}`
          });
        } else {
          aiResponse = `Dr. Ricardo, você já está autenticado! Como posso apoiá-lo hoje?`;
        }
      } else {
        // PRIORIDADE: Se avaliação está ativa, processar APENAS com IMRE
        if (avaliacaoAtiva) {
          // Processar resposta com IMRE
          const resultado = imreEngine.processarResposta(respostaUsuario);
          aiResponse = resultado.proximaPergunta;
          
          if (resultado.concluido) {
            setAvaliacaoAtiva(false);
            const progresso = imreEngine.getProgresso();
            toast({
              title: 'Avaliação Concluída!',
              description: `${progresso.total} perguntas respondidas. Dados salvos com segurança.`
            });
          }
        } else {
          // Detectar comandos especiais APENAS se avaliação NÃO está ativa
          const inputLower = respostaUsuario.toLowerCase();
          
          if (inputLower.includes('avaliação') || inputLower.includes('consulta') || inputLower.includes('avaliar')) {
            aiResponse = 'Entendi que você deseja iniciar uma Avaliação Clínica. Vou conduzi-la usando o método IMRE (Incentivador Mínimo do Relato Espontâneo). Podemos começar?';
            
            // Auto-iniciar após confirmação implícita
            setTimeout(() => {
              iniciarAvaliacao();
            }, 2000);
          } else {
            // Resposta baseada na base de conhecimento
            const respostaKB = knowledgeBase.obterRespostaInteligente(respostaUsuario);
            aiResponse = respostaKB;
          }
        }
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      scrollToBottom();
    }, 1500);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform animate-pulse"
        aria-label="Abrir chat com Nôa Esperanza"
      >
        <Sparkles size={28} />
      </button>
    );
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && !isMinimized && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Chat Window */}
      <div className={cn(
        "fixed z-50 bg-card border-2 border-primary/30 shadow-2xl transition-all duration-300",
        isMinimized 
          ? "bottom-6 right-6 w-80 h-16 rounded-full" 
          : "bottom-6 right-6 w-[95vw] md:w-96 h-[600px] rounded-2xl",
        "flex flex-col overflow-hidden"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary to-purple-600 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Sparkles className="animate-pulse" size={20} />
            </div>
            {!isMinimized && (
              <div>
                <div className="font-bold flex items-center gap-2">
                  Nôa Esperanza
                  {usuarioAutenticado && (
                    <Crown className="text-yellow-300" size={14} />
                  )}
                </div>
                <div className="text-xs text-white/80 flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  IA Residente • {avaliacaoAtiva ? 'Em Avaliação' : usuarioAutenticado ? 'Modo Admin' : 'Sempre ativa'}
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            {avaliacaoAtiva && !isMinimized && (
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                <Activity size={14} />
                <span className="text-xs font-semibold">
                  {imreEngine.getProgresso().percentual}%
                </span>
              </div>
            )}
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label={isMinimized ? "Maximizar" : "Minimizar"}
            >
              {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Fechar"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-background to-muted/20">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-2",
                    message.role === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="text-white" size={14} />
                    </div>
                  )}
                  
                  <div className="max-w-[75%]">
                    <div
                      className={cn(
                        "rounded-2xl p-3 shadow-sm",
                        message.role === 'user'
                          ? "bg-primary text-primary-foreground rounded-br-none"
                          : "bg-white dark:bg-card border border-border rounded-bl-none"
                      )}
                    >
                      {message.attachment && (
                        <div className="mb-2 p-2 bg-accent rounded-lg flex items-center gap-2">
                          {message.attachment.type === 'image' ? (
                            <Image size={16} className="text-primary" />
                          ) : (
                            <FileText size={16} className="text-primary" />
                          )}
                          <span className="text-xs truncate">{message.attachment.name}</span>
                        </div>
                      )}
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <div className={cn(
                        "text-[10px] mt-1",
                        message.role === 'user' ? "text-primary-foreground/70" : "text-muted-foreground"
                      )}>
                        {message.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2 justify-start">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="text-white" size={14} />
                  </div>
                  <div className="bg-white dark:bg-card border border-border rounded-2xl rounded-bl-none p-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

              {/* Quick Actions */}
              {!avaliacaoAtiva && messages.length <= 2 && (
                <div className="px-4 py-2 border-t border-border bg-muted/30">
                  <button
                    onClick={iniciarAvaliacao}
                    className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-purple-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    <Activity size={16} />
                    Iniciar Avaliação Clínica IMRE Triaxial
                  </button>
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    Inclui avaliação de risco renal integrada
                  </p>
                </div>
              )}

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 bg-muted/50 border-t border-border">
              <div className="flex gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                  accept="image/*,.pdf,.doc,.docx,.txt"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 rounded-lg hover:bg-accent transition-colors"
                  aria-label="Anexar arquivo"
                >
                  <Paperclip size={20} className="text-muted-foreground" />
                </button>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={avaliacaoAtiva ? "Sua resposta..." : "Digite sua mensagem..."}
                  className="flex-1 px-4 py-2 rounded-full border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="px-4 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={18} />
                </button>
              </div>
              <p className="text-[10px] text-muted-foreground mt-2 text-center">
                {avaliacaoAtiva 
                  ? `IMRE Triaxial • Eixo ${imreEngine.getProgresso().eixo}: ${imreEngine.getEixoAtual()} • ${imreEngine.getProgresso().percentual}%`
                  : 'Nôa utiliza AEC para escuta profunda e ética • LGPD Compliant'
                }
              </p>
            </form>
          </>
        )}
      </div>
    </>
  );
};

