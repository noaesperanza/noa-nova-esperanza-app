import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User } from 'lucide-react';
import { cn } from '../lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface IAChatProps {
  context?: string; // Contexto da conversa (ex: "avaliacao-clinica")
}

export const IAChat: React.FC<IAChatProps> = ({ context = 'geral' }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '🌬️ Bons ventos soprem. Sou a Nôa Esperanza, sua IA Residente. Como posso apoiar você hoje?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Adicionar mensagem do usuário
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simular resposta da IA (placeholder para futura integração)
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Compreendo sua questão sobre "${input}". Como parte da metodologia AEC, gostaria de explorar isso mais profundamente. Pode me contar um pouco mais sobre o contexto?`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[600px] bg-card border border-border rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-b border-border">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
          <Sparkles className="text-white" size={20} />
        </div>
        <div className="flex-1">
          <div className="font-semibold">IA Residente Nôa</div>
          <div className="text-xs text-muted-foreground">Guardiã da escuta • Sempre ativa</div>
        </div>
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-3",
              message.role === 'user' ? "justify-end" : "justify-start"
            )}
          >
            {message.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center flex-shrink-0">
                <Sparkles className="text-white" size={16} />
              </div>
            )}
            
            <div
              className={cn(
                "max-w-[80%] rounded-lg p-3",
                message.role === 'user'
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              )}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
              <div className={cn(
                "text-xs mt-2",
                message.role === 'user' ? "text-primary-foreground/70" : "text-muted-foreground"
              )}>
                {message.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>

            {message.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                <User className="text-muted-foreground" size={16} />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center flex-shrink-0">
              <Sparkles className="text-white" size={16} />
            </div>
            <div className="bg-muted rounded-lg p-3">
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

      {/* Input */}
      <form onSubmit={handleSend} className="p-4 bg-muted/30 border-t border-border">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          A IA Residente utiliza a metodologia AEC para uma escuta profunda e ética.
        </p>
      </form>
    </div>
  );
};

