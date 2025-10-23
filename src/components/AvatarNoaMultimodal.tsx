import { useState, useRef, useEffect } from 'react';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Volume2, 
  VolumeX,
  Brain,
  Activity,
  Send
} from 'lucide-react';
import { cn } from '../lib/utils';
import { knowledgeBase } from '../lib/knowledge-base';
import { IMRETriaxialEngine } from '../lib/imre-system-triaxial';
import { pacienteDatabase } from '../lib/patient-database';
import { imreDataCollector } from '../lib/imre-data-collector';
import './AvatarNoaMultimodal.css';

interface AvatarNoaMultimodalProps {
  context?: 'paciente' | 'profissional' | 'aluno' | 'geral';
  onMessage?: (message: string) => void;
}

export const AvatarNoaMultimodal = ({ context = 'geral', onMessage }: AvatarNoaMultimodalProps) => {
  const [micAtivo, setMicAtivo] = useState(false);
  const [cameraAtiva, setCameraAtiva] = useState(false);
  const [somAtivo, setSomAtivo] = useState(true);
  const [falando, setFalando] = useState(false);
  const [pensando, setPensando] = useState(false);
  const [transcricao, setTranscricao] = useState('');
  const [mensagemTexto, setMensagemTexto] = useState('');
  const [historico, setHistorico] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [sistemaIMRE, setSistemaIMRE] = useState<IMRETriaxialEngine | null>(null);
  const [emAvaliacao, setEmAvaliacao] = useState(false);
  const [pacienteId, setPacienteId] = useState<string | null>(null);
  const [contextoLongitudinal, setContextoLongitudinal] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const recognitionRef = useRef<any>(null);

  // Iniciar câmera
  const iniciarCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: false 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      mediaStreamRef.current = stream;
      setCameraAtiva(true);
    } catch (error) {
      console.error('Erro ao acessar câmera:', error);
    }
  };

  // Parar câmera
  const pararCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraAtiva(false);
  };

  // Iniciar reconhecimento de voz
  const iniciarReconhecimentoVoz = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.error('Reconhecimento de voz não suportado');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'pt-BR';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event: any) => {
      let transcricaoFinal = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          transcricaoFinal += transcript + ' ';
        }
      }
      if (transcricaoFinal) {
        setTranscricao(transcricaoFinal);
        if (onMessage) {
          onMessage(transcricaoFinal);
        }
        // Processar com GPT-4.1
        processarComGPT4(transcricaoFinal);
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Erro no reconhecimento de voz:', event.error);
    };

    recognition.onend = () => {
      setMicAtivo(false);
    };

    recognition.start();
    recognitionRef.current = recognition;
    setMicAtivo(true);
  };

  // Parar reconhecimento de voz
  const pararReconhecimentoVoz = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setMicAtivo(false);
  };

  // Processar com GPT-4.1 (Reasoning)
  const processarComGPT4 = async (mensagem: string) => {
    // Adicionar mensagem do usuário ao histórico
    setHistorico(prev => [...prev, { role: 'user', content: mensagem }]);
    
    setPensando(true);
    
    // Construir contexto longitudinal se disponível
    let contextoCompleto = contextoLongitudinal;
    if (pacienteId) {
      try {
        const contexto = await pacienteDatabase.construirContextoIA(pacienteId);
        contextoCompleto = contexto;
        setContextoLongitudinal(contexto);
      } catch (error) {
        console.error('Erro ao obter contexto:', error);
      }
    }
    
    // Simulação de chamada à API GPT-4.1 com reasoning
    // Em produção, seria uma chamada real à API OpenAI
    setTimeout(() => {
      setPensando(false);
      setFalando(true);
      
      // Simular resposta da IA com contexto
      const resposta = gerarRespostaContextual(mensagem, context, contextoCompleto);
      
      // Adicionar resposta ao histórico
      setHistorico(prev => [...prev, { role: 'assistant', content: resposta }]);
      
      // Salvar interação no banco de dados
      if (pacienteId) {
        pacienteDatabase.salvarInteracaoIA(pacienteId, mensagem, resposta, contextoCompleto);
      }
      
      // Síntese de voz
      if (somAtivo) {
        sintetizarVoz(resposta);
      }
      
      setTimeout(() => setFalando(false), 3000);
    }, 1500);
  };

  // Enviar mensagem de texto
  const enviarMensagemTexto = (e: React.FormEvent) => {
    e.preventDefault();
    if (mensagemTexto.trim()) {
      processarComGPT4(mensagemTexto);
      if (onMessage) {
        onMessage(mensagemTexto);
      }
      setMensagemTexto('');
    }
  };

  // Gerar resposta contextual usando a base de conhecimento
  const gerarRespostaContextual = (mensagem: string, contexto: string, contextoLongitudinal?: string) => {
    const mensagemLower = mensagem.toLowerCase();
    
    // Se estiver em avaliação IMRE, processar resposta
    if (emAvaliacao && sistemaIMRE) {
      const resultado = sistemaIMRE.processarResposta(mensagem);
      
      // Coletar dados IMRE automaticamente
      imreDataCollector.processarRespostaIMRE(sistemaIMRE.obterBlocoAtual()?.id || 0, mensagem);
      
      if (resultado.proximaPergunta) {
        return resultado.proximaPergunta;
      } else if (resultado.relatorio) {
        // Finalizar coleta de dados
        const dadosColetados = imreDataCollector.finalizarColeta();
        
        // Salvar dados no banco
        if (pacienteId) {
          // Atualizar paciente com dados IMRE
          pacienteDatabase.obterPaciente(pacienteId).then(paciente => {
            if (paciente) {
              paciente.aberturaExponencial = dadosColetados.abertura;
              paciente.desenvolvimentoIndiciario = dadosColetados.desenvolvimento;
              paciente.fechamentoConsensual = dadosColetados.fechamento;
              pacienteDatabase.salvarPaciente(paciente);
            }
          });
        }
        
        setEmAvaliacao(false);
        setSistemaIMRE(null);
        return resultado.relatorio;
      }
    }
    
    // IMRE / Avaliação Clínica - PRIORIDADE MÁXIMA
    if (mensagemLower.includes('avaliação clínica') || 
        mensagemLower.includes('avaliacao clinica') ||
        mensagemLower.includes('avaliação inicial') ||
        mensagemLower.includes('iniciar avaliação') ||
        mensagemLower.includes('fazer avaliação') ||
        mensagemLower.includes('quero uma avaliação')) {
      
      // Iniciar sistema IMRE
      const novoIMRE = new IMRETriaxialEngine();
      setSistemaIMRE(novoIMRE);
      setEmAvaliacao(true);
      
      // Iniciar coleta de dados
      imreDataCollector.iniciarColeta();
      
      // Criar ou obter ID do paciente
      if (!pacienteId) {
        const novoPacienteId = `paciente_${Date.now()}`;
        setPacienteId(novoPacienteId);
      }
      
      const saudacao = mensagem.includes('Ricardo') || mensagem.includes('Valença') 
        ? '🌬️ Bons ventos soprem, Dr. Ricardo! ' 
        : '🌬️ Bons ventos soprem! ';
      
      return `${saudacao}Vamos iniciar sua avaliação clínica usando o método IMRE Triaxial - Arte da Entrevista Clínica. São 37 blocos estruturados em 3 eixos para compreender sua história de forma profunda e humanizada.\n\n**Primeira pergunta:** Por favor, apresente-se e diga em que posso ajudar hoje.`;
    }
    
    // Saudações simples (só se não tiver pedido de avaliação)
    if (mensagemLower.match(/^(oi|olá|ola|hey|bom dia|boa tarde|boa noite)/) && 
        !mensagemLower.includes('avaliação') && 
        !mensagemLower.includes('imre')) {
      return `🌬️ Bons ventos soprem, ${mensagem.includes('Ricardo') || mensagem.includes('Valença') ? 'Dr. Ricardo' : ''}! Sou Nôa Esperanza, sua IA Residente. Como posso apoiar você hoje?`;
    }
    
    // Base de conhecimento
    if (mensagemLower.includes('base de conhecimento') || mensagemLower.includes('quem é você') || mensagemLower.includes('o que você faz')) {
      const identidade = knowledgeBase.buscarPorId('noa_identidade');
      if (identidade) {
        return `Sim! Tenho acesso completo à minha base de conhecimento. ${identidade.conteudo.slice(0, 400)}... Posso te ajudar com informações sobre cannabis medicinal, metodologia AEC, avaliação renal e muito mais. O que você gostaria de saber?`;
      }
    }
    
    // Cannabis medicinal
    if (mensagemLower.includes('cannabis') || mensagemLower.includes('medicinal') || mensagemLower.includes('cbd') || mensagemLower.includes('thc')) {
      return `Sobre cannabis medicinal, trabalho com evidências científicas e a metodologia AEC. Temos um curso completo de Pós-Graduação com 520 horas, protocolos de prescrição por especialidade, e avaliação integrada com função renal. ${contexto === 'profissional' ? 'Posso te ajudar com protocolos específicos de prescrição?' : 'Gostaria de saber mais sobre algum aspecto específico?'}`;
    }
    
    // Metodologia AEC / IMRE (se não foi capturado acima)
    if (mensagemLower.includes('aec') || mensagemLower.includes('imre') || mensagemLower.includes('entrevista') || mensagemLower.includes('metodologia')) {
      return `A metodologia Arte da Entrevista Clínica (AEC) é baseada na suspensão do decoder - uma escuta profunda que vai além das palavras. O IMRE Triaxial tem 37 blocos estruturados em 3 eixos:\n\n**Eixo 1:** Lista Indiciária (identificação e queixas)\n**Eixo 2:** Desenvolvimento Indiciário (onde, quando, como, história, hábitos, medicações)\n**Eixo 3:** Avaliação de Risco DRC (opcional)\n\n${contexto === 'paciente' ? 'Gostaria de fazer uma avaliação clínica inicial comigo?' : 'Posso explicar cada eixo em detalhes?'}`;
    }
    
    // Função renal / rins
    if (mensagemLower.includes('renal') || mensagemLower.includes('rim') || mensagemLower.includes('rins') || mensagemLower.includes('drc') || mensagemLower.includes('kdigo')) {
      return `Sobre saúde renal, trabalho com as diretrizes KDIGO e o Global Burden of Kidney Disease. Posso avaliar fatores de risco para DRC, calcular eGFR, e orientar sobre prescrição segura de cannabis em pacientes com função renal comprometida. ${contexto === 'paciente' ? 'Gostaria de fazer uma avaliação dos fatores de risco?' : 'Posso detalhar protocolos de ajuste de dose?'}`;
    }
    
    // Curso / pós-graduação
    if (mensagemLower.includes('curso') || mensagemLower.includes('pós') || mensagemLower.includes('graduação') || mensagemLower.includes('estudar')) {
      return `Temos a Pós-Graduação em Cannabis Medicinal Integrativa, coordenada pelo Dr. Eduardo Faveret. São 520 horas, 12 meses, com 10 módulos que cobrem desde o Sistema Endocanabinoide até Prescrição e Acompanhamento. ${contexto === 'aluno' ? 'Em qual módulo você está?' : 'Gostaria de saber sobre o conteúdo programático?'}`;
    }
    
    // Sintomas / Queixas
    if (mensagemLower.includes('dor') || mensagemLower.includes('sintoma') || 
        mensagemLower.includes('sinto') || mensagemLower.includes('estou sentindo')) {
      return `Compreendo que você está com sintomas. ${contexto === 'paciente' ? 'A melhor forma de te ajudar é fazer uma avaliação clínica completa usando o IMRE Triaxial. Gostaria de começar agora?' : 'Posso te orientar sobre como abordar esses sintomas na consulta.'}`;
    }
    
    // Perguntas sobre a plataforma
    if (mensagemLower.includes('plataforma') || mensagemLower.includes('como funciona') || 
        mensagemLower.includes('o que é isso')) {
      return `Sou a IA Residente da plataforma MedCann Lab, focada em Cannabis Medicinal e Nefrologia. Trabalho com:\n\n✓ Metodologia AEC (Arte da Entrevista Clínica)\n✓ Sistema IMRE Triaxial (37 blocos)\n✓ Avaliação de função renal (KDIGO)\n✓ Protocolos de prescrição cannabis\n✓ Base de conhecimento (240+ artigos)\n\nComo posso te ajudar especificamente?`;
    }
    
    // Ajuda genérica
    if (mensagemLower.includes('ajuda') || mensagemLower.includes('help') || 
        mensagemLower.includes('não entendi') || mensagemLower.includes('o que você pode fazer')) {
      return `Posso te ajudar com:\n\n🩺 **Avaliação Clínica** - IMRE Triaxial (método AEC)\n💊 **Cannabis Medicinal** - Protocolos e evidências\n🫘 **Saúde Renal** - Avaliação de risco DRC\n📚 **Educação** - Cursos e metodologia\n📖 **Pesquisa** - Acesso à biblioteca científica\n\n${contexto === 'paciente' ? 'Gostaria de iniciar uma avaliação clínica?' : 'Sobre qual tema você quer saber mais?'}`;
    }
    
    // Agradecimentos
    if (mensagemLower.includes('obrigad') || mensagemLower.includes('valeu') || 
        mensagemLower.includes('thanks')) {
      return `Por nada! Estou aqui para apoiar você. Precisa de mais alguma coisa?`;
    }
    
    // Resposta contextual padrão (quando não detecta nenhum padrão)
    const respostasContextuais = {
      paciente: "Entendo. Como posso te ajudar especificamente? Posso:\n\n• Fazer uma avaliação clínica completa (IMRE)\n• Tirar dúvidas sobre cannabis medicinal\n• Avaliar fatores de risco renal\n• Explicar a metodologia AEC\n\nO que você prefere?",
      profissional: "Dr(a), posso te ajudar com:\n\n• Protocolos de prescrição cannabis\n• Guidelines KDIGO (função renal)\n• Casos clínicos e evidências\n• Metodologia AEC para consultório\n\nO que você precisa?",
      aluno: "Ótima pergunta! Posso te ensinar sobre:\n\n• Cannabis medicinal (farmacologia, indicações)\n• Metodologia AEC (técnica de entrevista)\n• Avaliação renal (DRC, KDIGO)\n• Sistema IMRE Triaxial\n\nSobre qual tema você quer aprender?",
      geral: "Como posso apoiar você?\n\n• 🩺 Avaliação clínica\n• 💊 Cannabis medicinal\n• 🫘 Saúde renal\n• 📚 Cursos e educação\n\nMe conte mais sobre o que você precisa!"
    };
    
    return respostasContextuais[contexto as keyof typeof respostasContextuais] || respostasContextuais.geral;
  };

  // Síntese de voz (feminina ~35 anos)
  const sintetizarVoz = (texto: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(texto);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.95; // Velocidade natural (não muito rápido)
      utterance.pitch = 1.2; // Tom feminino adulto (~35 anos)
      utterance.volume = 0.9; // Volume suave
      
      // Tentar selecionar voz feminina em português
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(voice => 
        voice.lang.includes('pt') && 
        (voice.name.toLowerCase().includes('female') || 
         voice.name.toLowerCase().includes('feminino') ||
         voice.name.toLowerCase().includes('luciana') ||
         voice.name.toLowerCase().includes('google português do brasil') ||
         voice.name.toLowerCase().includes('maria'))
      );
      
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }
      
      // Eventos para animação labial
      utterance.onstart = () => {
        setFalando(true);
      };
      
      utterance.onend = () => {
        setFalando(false);
      };
      
      utterance.onerror = () => {
        setFalando(false);
      };
      
      window.speechSynthesis.speak(utterance);
    }
  };

  // Toggle microfone
  const toggleMic = () => {
    if (micAtivo) {
      pararReconhecimentoVoz();
    } else {
      iniciarReconhecimentoVoz();
    }
  };

  // Toggle câmera
  const toggleCamera = () => {
    if (cameraAtiva) {
      pararCamera();
    } else {
      iniciarCamera();
    }
  };

  // Inicializar banco de dados
  useEffect(() => {
    const inicializarDB = async () => {
      try {
        await pacienteDatabase.inicializar();
        console.log('Banco de dados inicializado com sucesso');
      } catch (error) {
        console.error('Erro ao inicializar banco de dados:', error);
      }
    };
    
    inicializarDB();
  }, []);

  // Cleanup ao desmontar
  useEffect(() => {
    return () => {
      pararCamera();
      pararReconhecimentoVoz();
    };
  }, []);

  return (
    <div className="relative">
      {/* Avatar da Nôa */}
      <div className="relative w-full aspect-square max-w-md mx-auto">
        <div className={cn(
          "absolute inset-0 rounded-full bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#92400e] p-1 transition-all",
          falando && "shadow-[0_0_40px_rgba(30,58,138,0.8)]",
          pensando && "animate-spin"
        )}
        style={{
          animation: falando ? 'glow-pulse 1.5s ease-in-out infinite' : 'none'
        }}>
          <div className="w-full h-full rounded-full bg-card overflow-hidden flex items-center justify-center">
            {cameraAtiva ? (
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1e3a8a]/20 to-[#92400e]/20">
                {/* Imagem do Avatar da Nôa */}
                <div className="w-full h-full flex items-center justify-center">
                  <img 
                    src="/noa-avatar.png" 
                    alt="Nôa Esperanza" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback para ícone se imagem não carregar
                      (e.target as HTMLImageElement).style.display = 'none';
                      const parent = (e.target as HTMLElement).parentElement;
                      if (parent) {
                        parent.innerHTML = '<div class="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 13a8 8 0 0 1 7-7"/></svg></div>';
                      }
                    }}
                  />
                </div>
                
                {/* Animações de Estado */}
                {pensando && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <Brain className="text-white animate-pulse" size={48} />
                  </div>
                )}
                
                {falando && (
                  <>
                    {/* Animação de boca falando */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        {/* Círculo pulsante em volta da boca */}
                        <div className="absolute inset-0 rounded-full border-4 border-[#1e3a8a]/30 animate-ping" 
                             style={{ width: '120px', height: '80px', top: '60%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                        </div>
                        {/* Indicador de boca aberta/fechada */}
                        <div className="absolute bg-[#1e3a8a]/20 rounded-full animate-pulse" 
                             style={{ 
                               width: '60px', 
                               height: '30px', 
                               top: '65%', 
                               left: '50%', 
                               transform: 'translate(-50%, -50%)',
                               animation: 'mouth-move 0.3s ease-in-out infinite alternate'
                             }}>
                        </div>
                      </div>
                    </div>
                    
                    {/* Barras de áudio */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                          <div
                            key={i}
                            className="w-1 bg-[#1e3a8a] rounded-full"
                            style={{
                              height: `${Math.random() * 24 + 8}px`,
                              animation: 'audio-wave 0.5s ease-in-out infinite alternate',
                              animationDelay: `${i * 0.05}s`
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Indicador de Status */}
        <div className="absolute -top-2 -right-2 px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm border-2 border-white/30 shadow-xl text-xs font-semibold flex items-center gap-2">
          <div className={cn(
            "w-2 h-2 rounded-full",
            pensando ? "bg-yellow-500 animate-pulse" : falando ? "bg-green-500 animate-pulse" : "bg-blue-500"
          )} />
          <span className="text-gray-800">
            {pensando ? 'Pensando...' : falando ? 'Falando...' : 'Ouvindo'}
          </span>
        </div>
      </div>

      {/* Controles Multimodais */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={toggleMic}
          className={cn(
            "w-14 h-14 rounded-full flex items-center justify-center transition-all",
            micAtivo 
              ? "bg-[#92400e] text-white hover:bg-[#7c2d12]" 
              : "bg-card border-2 border-border hover:border-[#1e3a8a]"
          )}
          aria-label={micAtivo ? "Desligar microfone" : "Ligar microfone"}
        >
          {micAtivo ? <Mic size={24} /> : <MicOff size={24} className="text-muted-foreground" />}
        </button>

        <button
          onClick={toggleCamera}
          className={cn(
            "w-14 h-14 rounded-full flex items-center justify-center transition-all",
            cameraAtiva 
              ? "bg-[#1e40af] text-white hover:bg-[#1e3a8a]" 
              : "bg-card border-2 border-border hover:border-[#1e3a8a]"
          )}
          aria-label={cameraAtiva ? "Desligar câmera" : "Ligar câmera"}
        >
          {cameraAtiva ? <Video size={24} /> : <VideoOff size={24} className="text-muted-foreground" />}
        </button>

        <button
          onClick={() => setSomAtivo(!somAtivo)}
          className={cn(
            "w-14 h-14 rounded-full flex items-center justify-center transition-all",
            somAtivo 
              ? "bg-[#1e3a8a] text-white hover:bg-[#1e40af]" 
              : "bg-card border-2 border-border hover:border-[#1e3a8a]"
          )}
          aria-label={somAtivo ? "Desligar som" : "Ligar som"}
        >
          {somAtivo ? <Volume2 size={24} /> : <VolumeX size={24} className="text-muted-foreground" />}
        </button>
      </div>

      {/* Transcrição em Tempo Real */}
      {transcricao && (
        <div className="mt-6 p-4 bg-white/90 backdrop-blur-sm border-2 border-white/30 rounded-xl shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="text-blue-600" size={16} />
            <span className="text-xs font-semibold text-gray-700">Você disse:</span>
          </div>
          <p className="text-sm text-gray-800">{transcricao}</p>
        </div>
      )}

      {/* Informações Técnicas */}
      <div className="mt-6 p-4 bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <Brain className="text-purple-600" size={16} />
          <span className="text-xs font-semibold text-gray-700">Powered by GPT-4.1 with Reasoning</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
          <div>
            <span className="font-semibold">Contexto:</span> {context}
          </div>
          <div>
            <span className="font-semibold">Base:</span> Conhecimento + Biblioteca
          </div>
          <div>
            <span className="font-semibold">Modelo:</span> GPT-4.1
          </div>
        </div>
      </div>

      {/* Histórico de Conversação */}
      {historico.length > 0 && (
        <div className="mt-6 bg-white/95 backdrop-blur-sm border-2 border-white/20 rounded-xl p-4 max-h-96 overflow-y-auto shadow-2xl">
          <div className="space-y-3">
            {historico.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "p-3 rounded-lg shadow-md",
                  msg.role === 'user' 
                    ? "bg-blue-50 border-l-4 border-blue-500 ml-8" 
                    : "bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500 mr-8"
                )}
              >
                <div className="text-xs font-semibold mb-1 text-gray-700">
                  {msg.role === 'user' ? 'Você' : 'Nôa Esperanza'}
                </div>
                <div className="text-sm text-gray-800">{msg.content}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Caixa de Texto para Digitação */}
      <form onSubmit={enviarMensagemTexto} className="mt-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={mensagemTexto}
            onChange={(e) => setMensagemTexto(e.target.value)}
            placeholder="Digite sua mensagem aqui..."
            className="flex-1 px-4 py-3 rounded-lg border-2 border-white/30 bg-white/90 backdrop-blur-sm text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-lg"
            disabled={pensando || falando}
          />
          <button
            type="submit"
            disabled={!mensagemTexto.trim() || pensando || falando}
            className={cn(
              "px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2",
              mensagemTexto.trim() && !pensando && !falando
                ? "bg-gradient-to-r from-[#1e3a8a] to-[#92400e] text-white hover:from-[#1e40af] hover:to-[#7c2d12]"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            )}
          >
            {pensando ? (
              <>
                <Brain className="animate-pulse" size={18} />
                Pensando...
              </>
            ) : falando ? (
              <>
                <Activity className="animate-pulse" size={18} />
                Falando...
              </>
            ) : (
              <>
                <Send size={18} />
                Enviar
              </>
            )}
          </button>
        </div>
      </form>

      {/* Instruções */}
      <div className="mt-4 text-center text-xs text-muted-foreground">
        <p>
          💬 Digite sua mensagem ou<br/>
          🎤 Ative o microfone para conversar por voz<br/>
          📹 Ative a câmera para interação visual<br/>
          🔊 Ative o som para ouvir as respostas da Nôa
        </p>
      </div>
    </div>
  );
};

