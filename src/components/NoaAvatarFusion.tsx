import React, { useState, useRef, useEffect } from 'react'
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Volume2, 
  VolumeX,
  Brain,
  Activity,
  Send,
  Sparkles,
  Heart,
  Zap
} from 'lucide-react'
import { cn } from '../lib/utils'
import { noaEngine, SemanticAnalysis } from '../lib/noaEngine'
import { supabase, chatService } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

interface NoaAvatarFusionProps {
  context?: 'patient' | 'professional' | 'student' | 'admin'
  onMessage?: (message: string) => void
}

export const NoaAvatarFusion: React.FC<NoaAvatarFusionProps> = ({ 
  context = 'patient', 
  onMessage 
}) => {
  const { user } = useAuth()
  const [micAtivo, setMicAtivo] = useState(false)
  const [cameraAtiva, setCameraAtiva] = useState(false)
  const [somAtivo, setSomAtivo] = useState(true)
  const [falando, setFalando] = useState(false)
  const [pensando, setPensando] = useState(false)
  const [transcricao, setTranscricao] = useState('')
  const [mensagemTexto, setMensagemTexto] = useState('')
  const [historico, setHistorico] = useState<Array<{role: 'user' | 'assistant', content: string, analysis?: SemanticAnalysis}>>([])
  const [isInitialized, setIsInitialized] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaStreamRef = useRef<MediaStream | null>(null)
  const recognitionRef = useRef<any>(null)

  // Inicializar NOA Engine
  useEffect(() => {
    const initNOA = async () => {
      try {
        await noaEngine.initialize()
        setIsInitialized(true)
        console.log('✅ NOA Avatar Fusion inicializado!')
      } catch (error) {
        console.error('❌ Erro ao inicializar NOA:', error)
      }
    }
    
    initNOA()
  }, [])

  // Iniciar câmera
  const iniciarCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: false 
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      mediaStreamRef.current = stream
      setCameraAtiva(true)
    } catch (error) {
      console.error('Erro ao acessar câmera:', error)
    }
  }

  // Parar câmera
  const pararCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop())
      mediaStreamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    setCameraAtiva(false)
  }

  // Iniciar reconhecimento de voz
  const iniciarReconhecimentoVoz = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.error('Reconhecimento de voz não suportado')
      return
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    
    recognition.lang = 'pt-BR'
    recognition.continuous = true
    recognition.interimResults = true

    recognition.onresult = (event: any) => {
      let transcricaoFinal = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          transcricaoFinal += transcript + ' '
        }
      }
      if (transcricaoFinal) {
        setTranscricao(transcricaoFinal)
        if (onMessage) {
          onMessage(transcricaoFinal)
        }
        processarComNOA(transcricaoFinal)
      }
    }

    recognition.onerror = (event: any) => {
      console.error('Erro no reconhecimento de voz:', event.error)
    }

    recognition.onend = () => {
      setMicAtivo(false)
    }

    recognition.start()
    recognitionRef.current = recognition
    setMicAtivo(true)
  }

  // Parar reconhecimento de voz
  const pararReconhecimentoVoz = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      recognitionRef.current = null
    }
    setMicAtivo(false)
  }

  // Processar com NOA Engine
  const processarComNOA = async (mensagem: string) => {
    if (!user) return

    // Adicionar mensagem do usuário ao histórico
    setHistorico(prev => [...prev, { role: 'user', content: mensagem }])
    
    setPensando(true)
    
    try {
      // Análise semântica com NOA Engine
      const analysis = await noaEngine.analyzePatientInput(mensagem)
      
      // Salvar mensagem no Supabase
      await chatService.sendMessage(user.id, mensagem, analysis)
      
      // Gerar resposta da NOA
      const resposta = noaEngine.generateNOAResponse(mensagem, analysis)
      
      // Adicionar resposta ao histórico
      setHistorico(prev => [...prev, { role: 'assistant', content: resposta, analysis }])
      
      // Salvar resposta da NOA no Supabase
      await chatService.sendMessage(user.id, resposta, null)
      
      // Síntese de voz
      if (somAtivo) {
        sintetizarVoz(resposta)
      }
      
      setPensando(false)
      setFalando(true)
      
      setTimeout(() => setFalando(false), 3000)
    } catch (error) {
      console.error('Erro ao processar com NOA:', error)
      setPensando(false)
    }
  }

  // Enviar mensagem de texto
  const enviarMensagemTexto = async (e: React.FormEvent) => {
    e.preventDefault()
    if (mensagemTexto.trim() && user) {
      await processarComNOA(mensagemTexto)
      if (onMessage) {
        onMessage(mensagemTexto)
      }
      setMensagemTexto('')
    }
  }

  // Síntese de voz (feminina ~35 anos)
  const sintetizarVoz = (texto: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(texto)
      utterance.lang = 'pt-BR'
      utterance.rate = 0.95
      utterance.pitch = 1.2
      utterance.volume = 0.9
      
      // Tentar selecionar voz feminina em português
      const voices = window.speechSynthesis.getVoices()
      const femaleVoice = voices.find(voice => 
        voice.lang.includes('pt') && 
        (voice.name.toLowerCase().includes('female') || 
         voice.name.toLowerCase().includes('feminino') ||
         voice.name.toLowerCase().includes('luciana') ||
         voice.name.toLowerCase().includes('google português do brasil') ||
         voice.name.toLowerCase().includes('maria'))
      )
      
      if (femaleVoice) {
        utterance.voice = femaleVoice
      }
      
      utterance.onstart = () => setFalando(true)
      utterance.onend = () => setFalando(false)
      utterance.onerror = () => setFalando(false)
      
      window.speechSynthesis.speak(utterance)
    }
  }

  // Toggle microfone
  const toggleMic = () => {
    if (micAtivo) {
      pararReconhecimentoVoz()
    } else {
      iniciarReconhecimentoVoz()
    }
  }

  // Toggle câmera
  const toggleCamera = () => {
    if (cameraAtiva) {
      pararCamera()
    } else {
      iniciarCamera()
    }
  }

  // Cleanup ao desmontar
  useEffect(() => {
    return () => {
      pararCamera()
      pararReconhecimentoVoz()
    }
  }, [])

  if (!isInitialized) {
    return (
      <div className="relative">
        <div className="w-full aspect-square max-w-md mx-auto">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#92400e] p-1 animate-pulse">
            <div className="w-full h-full rounded-full bg-card overflow-hidden flex items-center justify-center">
              <div className="flex items-center justify-center space-x-3">
                <Brain className="w-8 h-8 text-primary animate-spin" />
                <span className="text-white font-semibold">Inicializando NOA...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

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
                      (e.target as HTMLImageElement).style.display = 'none'
                      const parent = (e.target as HTMLElement).parentElement
                      if (parent) {
                        parent.innerHTML = '<div class="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 13a8 8 0 0 1 7-7"/></svg></div>'
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
                        <div className="absolute inset-0 rounded-full border-4 border-[#1e3a8a]/30 animate-ping" 
                             style={{ width: '120px', height: '80px', top: '60%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                        </div>
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
          <span className="text-xs font-semibold text-gray-700">Powered by NOA Engine + Supabase</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
          <div>
            <span className="font-semibold">Contexto:</span> {context}
          </div>
          <div>
            <span className="font-semibold">IA:</span> Local + Cloud
          </div>
          <div>
            <span className="font-semibold">DB:</span> Supabase
          </div>
        </div>
      </div>

      {/* Histórico de Conversação */}
      {historico.length > 0 && (
        <div className="mt-6 bg-white/98 backdrop-blur-sm border-2 border-white/40 rounded-xl p-4 max-h-96 overflow-y-auto shadow-2xl">
          <div className="space-y-3">
            {historico.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "p-3 rounded-lg shadow-md",
                  msg.role === 'user' 
                    ? "bg-blue-500 border-l-4 border-blue-600 ml-8" 
                    : "bg-black border-l-4 border-indigo-400 mr-8"
                )}
              >
                <div className={cn(
                  "text-xs font-semibold mb-1",
                  msg.role === 'user' ? "text-blue-100" : "text-indigo-200"
                )}>
                  {msg.role === 'user' ? 'Você' : 'Nôa Esperanza'}
                </div>
                <div className={cn(
                  "text-sm font-medium",
                  msg.role === 'user' ? "text-white" : "text-white"
                )}>{msg.content}</div>
                
                {/* Análise semântica */}
                {msg.analysis && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {msg.analysis.biomedical_terms.slice(0, 3).map((term, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">
                        {term}
                      </span>
                    ))}
                    {msg.analysis.topics.slice(0, 2).map((topic, idx) => (
                      <span key={idx} className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded">
                        {topic}
                      </span>
                    ))}
                  </div>
                )}
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
  )
}
