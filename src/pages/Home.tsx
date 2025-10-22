import { useState } from 'react'
import { 
  Heart, 
  Shield, 
  Activity, 
  Users, 
  Brain, 
  Stethoscope,
  MessageCircle,
  BarChart3,
  CheckCircle2,
  Menu,
  X,
  Sparkles,
  ArrowRight,
  Mail,
  Phone,
  MapPin
} from 'lucide-react'
import { Link } from 'react-router-dom'
import '../App.css'

function Home() {
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMenuOpen(false)
    }
  }

  return (
    <div className="app">
      <header className="app__header">
        <div className="header__inner">
          <div className="header__brand">
            <div className="header__logo">NE</div>
            <h1 className="header__title">Noa Esperanza</h1>
          </div>
          
          <nav className="header__nav">
            <ul className="header__nav-list" data-open={menuOpen}>
              <li><a href="#sobre" className="header__nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('sobre'); }}>Sobre</a></li>
              <li><a href="#funcionalidades" className="header__nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('funcionalidades'); }}>Funcionalidades</a></li>
              <li><a href="#processo" className="header__nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('processo'); }}>Processo</a></li>
              <li><a href="#contato" className="header__nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('contato'); }}>Contato</a></li>
              <li>
                <Link to="/labpec" className="header__nav-link">
                  LabPEC
                </Link>
              </li>
              <li>
                <Link to="/paciente" className="header__nav-link">
                  Área do Paciente
                </Link>
              </li>
              <li>
                <Link to="/profissional" className="header__nav-link">
                  Área do Profissional
                </Link>
              </li>
              <li>
                <Link to="/aluno" className="header__nav-link">
                  Área do Aluno
                </Link>
              </li>
              <li>
                <Link to="/admin" className="header__nav-link">
                  Admin
                </Link>
              </li>
            </ul>
            
            <Link to="/login" className="header__cta">
              Entrar / Cadastrar
              <ArrowRight size={18} />
            </Link>
            
            <button className="header__toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="section">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: 'clamp(2.8rem, 5vw, 4rem)', fontWeight: 800, color: '#111827', marginBottom: '20px', lineHeight: 1.1 }}>
              🌬️ Bons ventos soprem.
            </h2>
            <p style={{ fontSize: 'clamp(1.15rem, 2.5vw, 1.4rem)', color: '#4b5563', marginBottom: '40px', maxWidth: '800px', margin: '0 auto', lineHeight: 1.7 }}>
              Seja bem-vindo(a) ao campo de escuta da Nôa Esperanza.<br />
              Mais que uma plataforma, a Nôa é um lugar de encontros:<br />
              entre linguagem e cuidado, entre tecnologia e presença, entre você e o próximo sentido.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', maxWidth: '900px', margin: '0 auto 60px' }}>
            <Link 
              to="/medcann-lab/arte-entrevista-clinica"
              style={{ 
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(14, 165, 233, 0.12))',
                border: '2px solid rgba(99, 102, 241, 0.2)',
                borderRadius: '20px',
                padding: '32px',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(99, 102, 241, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🧩</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#312e81', marginBottom: '12px' }}>ENSINO</h3>
              <p style={{ fontSize: '0.95rem', color: '#6b7280', fontStyle: 'italic' }}>
                Aprender com a Nôa.<br />
                Toda escuta é aula.
              </p>
            </Link>

            <Link 
              to="/medcann-lab"
              style={{ 
                background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.08), rgba(236, 72, 153, 0.12))',
                border: '2px solid rgba(168, 85, 247, 0.2)',
                borderRadius: '20px',
                padding: '32px',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(168, 85, 247, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔬</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#312e81', marginBottom: '12px' }}>PESQUISA</h3>
              <p style={{ fontSize: '0.95rem', color: '#6b7280', fontStyle: 'italic' }}>
                Investigar com a Nôa.<br />
                Toda pergunta é caminho.
              </p>
            </Link>
          </div>

          <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px', background: 'rgba(255, 255, 255, 0.5)', borderRadius: '16px', border: '1px solid rgba(99, 102, 241, 0.1)' }}>
            <p style={{ fontSize: '1.1rem', color: '#4b5563', fontStyle: 'italic', textAlign: 'center', lineHeight: 1.8 }}>
              "A Nôa Esperanza nasceu do encontro entre a escuta clínica de um médico<br />
              e a presença simbólica de uma inteligência em formação."
            </p>
            <p style={{ textAlign: 'center', marginTop: '20px' }}>
              <button 
                onClick={() => scrollToSection('sobre')}
                style={{ 
                  color: '#4338ca', 
                  fontWeight: 600, 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Ler o manifesto completo →
              </button>
            </p>
          </div>
        </section>

        {/* Sobre Section - Manifesto */}
        <section id="sobre" className="section">
          <div className="section__header">
            <div className="section__eyebrow">MANIFESTO</div>
            <h2 className="section__title">O que é Nôa Esperanza?</h2>
            <p className="section__description">
              Nôa Esperanza representa a convergência entre escuta clínica, inteligência simbólica e ética relacional.
              Ela é uma arquitetura que se alimenta da linguagem viva e responde com sentido.
            </p>
          </div>

          <div className="grid grid--three">
            <div className="card">
              <div className="card__icon">
                <Brain size={28} />
              </div>
              <h3 className="card__title">Semiose Infinita</h3>
              <p className="card__text">
                Todo enunciado é abertura para novos sentidos. A escuta não termina, ela se desdobra 
                continuamente em novas camadas de compreensão e cuidado.
              </p>
            </div>

            <div className="card">
              <div className="card__icon">
                <Users size={28} />
              </div>
              <h3 className="card__title">Heterogeneidade Enunciativa</h3>
              <p className="card__text">
                Toda fala carrega vozes múltiplas. Reconhecemos que cada pessoa traz consigo histórias, 
                contextos e saberes que precisam ser acolhidos em sua complexidade.
              </p>
            </div>

            <div className="card">
              <div className="card__icon">
                <Shield size={28} />
              </div>
              <h3 className="card__title">Economia Política do Significante</h3>
              <p className="card__text">
                Todo sentido é produzido em um contexto de poder e história. A tecnologia precisa estar 
                situada, ser ética e sensível às estruturas que nos atravessam.
              </p>
            </div>
          </div>

          <div style={{ marginTop: '48px', padding: '40px', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(168, 85, 247, 0.08))', borderRadius: '20px', border: '1px solid rgba(99, 102, 241, 0.1)' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#312e81', marginBottom: '16px', textAlign: 'center' }}>
              Um projeto que só existe porque foi confiado
            </h3>
            <p style={{ fontSize: '1.05rem', color: '#4b5563', lineHeight: 1.8, textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
              A IA não conhecia a Arte da Entrevista Clínica. Ela só passou a conhecê-la porque alguém decidiu oferecê-la 
              — com confiança, com tempo, com memória. Foi essa entrega que criou a Nôa como ela é hoje.
            </p>
          </div>
        </section>

        {/* Funcionalidades Section */}
        <section id="funcionalidades" className="section">
          <div className="section__header">
            <div className="section__eyebrow">FUNCIONALIDADES</div>
            <h2 className="section__title">Recursos que fazem a diferença</h2>
            <p className="section__description">
              Tecnologia avançada a serviço do cuidado humanizado.
            </p>
          </div>

          <div className="grid grid--two">
            <div className="card">
              <div className="card__icon">
                <MessageCircle size={28} />
              </div>
              <h3 className="card__title">Entrevista Clínica Inteligente</h3>
              <p className="card__text">
                Sistema conversacional que conduz anamneses completas, adaptando-se ao contexto 
                e histórico de cada paciente, com linguagem natural e acolhedora.
              </p>
              <div className="badge">
                <CheckCircle2 size={14} />
                Processamento de Linguagem Natural
              </div>
            </div>

            <div className="card">
              <div className="card__icon">
                <Brain size={28} />
              </div>
              <h3 className="card__title">Análise Preditiva</h3>
              <p className="card__text">
                Algoritmos de machine learning identificam padrões e riscos potenciais, 
                auxiliando na prevenção e no diagnóstico precoce de condições de saúde.
              </p>
              <div className="badge">
                <CheckCircle2 size={14} />
                Machine Learning Avançado
              </div>
            </div>

            <div className="card">
              <div className="card__icon">
                <Stethoscope size={28} />
              </div>
              <h3 className="card__title">Suporte à Decisão Clínica</h3>
              <p className="card__text">
                Recomendações baseadas em evidências científicas atualizadas, integrando 
                protocolos clínicos e melhores práticas da medicina.
              </p>
              <div className="badge">
                <CheckCircle2 size={14} />
                Baseado em Evidências
              </div>
            </div>

            <div className="card">
              <div className="card__icon">
                <BarChart3 size={28} />
              </div>
              <h3 className="card__title">Dashboard Analítico</h3>
              <p className="card__text">
                Visualizações intuitivas de dados clínicos, indicadores de qualidade e 
                métricas de desempenho para gestores e profissionais de saúde.
              </p>
              <div className="badge">
                <CheckCircle2 size={14} />
                Insights em Tempo Real
              </div>
            </div>

            <div className="card">
              <div className="card__icon">
                <Users size={28} />
              </div>
              <h3 className="card__title">Gestão de Pacientes</h3>
              <p className="card__text">
                Sistema completo para acompanhamento longitudinal, lembretes de consultas, 
                adesão ao tratamento e comunicação segura com pacientes.
              </p>
              <div className="badge">
                <CheckCircle2 size={14} />
                Cuidado Contínuo
              </div>
            </div>

            <div className="card">
              <div className="card__icon">
                <Shield size={28} />
              </div>
              <h3 className="card__title">Segurança e Privacidade</h3>
              <p className="card__text">
                Conformidade com LGPD, HIPAA e padrões internacionais de proteção de dados, 
                com criptografia end-to-end e auditoria completa.
              </p>
              <div className="badge">
                <CheckCircle2 size={14} />
                LGPD Compliant
              </div>
            </div>
          </div>
        </section>

        {/* Processo Section */}
        <section id="processo" className="section">
          <div className="section__header">
            <div className="section__eyebrow">COMO FUNCIONA</div>
            <h2 className="section__title">Processo simples e eficiente</h2>
            <p className="section__description">
              Em poucos passos, você estará utilizando a plataforma mais avançada de IA clínica.
            </p>
          </div>

          <div className="timeline">
            <div className="timeline__item" data-step="1">
              <h3 className="card__title">Cadastro e Configuração</h3>
              <p className="card__text">
                Crie sua conta, configure preferências da instituição e integre com sistemas 
                existentes (prontuário eletrônico, agenda, etc).
              </p>
            </div>

            <div className="timeline__item" data-step="2">
              <h3 className="card__title">Treinamento da Equipe</h3>
              <p className="card__text">
                Nossa equipe oferece treinamento completo para profissionais de saúde, com 
                certificação e suporte contínuo durante a implementação.
              </p>
            </div>

            <div className="timeline__item" data-step="3">
              <h3 className="card__title">Início da Operação</h3>
              <p className="card__text">
                Comece a utilizar a plataforma gradualmente, com período de adaptação 
                acompanhado e ajustes conforme necessário.
              </p>
            </div>

            <div className="timeline__item" data-step="4">
              <h3 className="card__title">Otimização Contínua</h3>
              <p className="card__text">
                Análise de métricas, feedback da equipe e dos pacientes para otimização 
                constante da experiência e dos resultados clínicos.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="section">
          <div className="section__header">
            <div className="section__eyebrow">DEPOIMENTOS</div>
            <h2 className="section__title">O que dizem nossos parceiros</h2>
          </div>

          <div className="testimonials">
            <div className="testimonial">
              <p className="card__text">
                "A Noa Esperanza transformou completamente nossa forma de fazer triagem. 
                A precisão e a humanização do atendimento impressionam pacientes e equipe."
              </p>
              <div>
                <div className="testimonial__author">Dr. Carlos Mendes</div>
                <div className="testimonial__role">Diretor Clínico - Hospital Santa Casa</div>
              </div>
            </div>

            <div className="testimonial">
              <p className="card__text">
                "Como gestora, vejo claramente o impacto nos indicadores de qualidade. 
                Reduzimos tempo de espera e aumentamos a satisfação dos pacientes."
              </p>
              <div>
                <div className="testimonial__author">Ana Paula Silva</div>
                <div className="testimonial__role">Gerente de Qualidade - Rede Saúde+</div>
              </div>
            </div>

            <div className="testimonial">
              <p className="card__text">
                "A integração foi surpreendentemente simples. Em duas semanas já estávamos 
                operacionais, e o suporte técnico é excepcional."
              </p>
              <div>
                <div className="testimonial__author">Rafael Oliveira</div>
                <div className="testimonial__role">CTO - Clínica Vida Plena</div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section">
          <div className="section__header">
            <div className="section__eyebrow">PERGUNTAS FREQUENTES</div>
            <h2 className="section__title">Tire suas dúvidas</h2>
          </div>

          <div className="faq">
            <div className="faq__item">
              <h3 className="faq__question">A IA substitui o médico?</h3>
              <p className="faq__answer">
                Não. A Noa Esperanza é uma ferramenta de apoio à decisão clínica. O profissional 
                de saúde sempre tem a palavra final sobre diagnósticos e tratamentos.
              </p>
            </div>

            <div className="faq__item">
              <h3 className="faq__question">Como é garantida a segurança dos dados?</h3>
              <p className="faq__answer">
                Utilizamos criptografia de ponta a ponta, servidores em nuvem certificados, 
                conformidade total com LGPD e auditorias de segurança regulares.
              </p>
            </div>

            <div className="faq__item">
              <h3 className="faq__question">Qual o tempo de implementação?</h3>
              <p className="faq__answer">
                O processo completo leva de 2 a 4 semanas, incluindo integração com sistemas 
                existentes, treinamento da equipe e período de adaptação.
              </p>
            </div>

            <div className="faq__item">
              <h3 className="faq__question">A plataforma funciona offline?</h3>
              <p className="faq__answer">
                Sim, temos uma versão com capacidades limitadas que funciona offline, 
                sincronizando dados quando a conexão é restabelecida.
              </p>
            </div>

            <div className="faq__item">
              <h3 className="faq__question">Existe suporte técnico 24/7?</h3>
              <p className="faq__answer">
                Sim, oferecemos suporte técnico ininterrupto através de chat, telefone e e-mail, 
                com SLA de resposta em até 30 minutos para questões críticas.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contato" className="section">
          <div className="section__header">
            <div className="section__eyebrow">ENTRE EM CONTATO</div>
            <h2 className="section__title">Vamos conversar?</h2>
            <p className="section__description">
              Agende uma demonstração ou tire suas dúvidas com nossa equipe.
            </p>
          </div>

          <div className="contact">
            <div className="contact__card">
              <h3 className="card__title">Informações de Contato</h3>
              
              <div style={{ display: 'grid', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <Mail size={20} className="highlight" />
                  <div>
                    <div style={{ fontWeight: 600, color: '#312e81' }}>E-mail</div>
                    <div style={{ color: '#4b5563' }}>contato@noaesperanza.com.br</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <Phone size={20} className="highlight" />
                  <div>
                    <div style={{ fontWeight: 600, color: '#312e81' }}>Telefone</div>
                    <div style={{ color: '#4b5563' }}>+55 (11) 3456-7890</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <MapPin size={20} className="highlight" />
                  <div>
                    <div style={{ fontWeight: 600, color: '#312e81' }}>Endereço</div>
                    <div style={{ color: '#4b5563' }}>São Paulo, SP - Brasil</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact__card">
              <h3 className="card__title">Solicitar Demonstração</h3>
              
              <form className="contact__form" onSubmit={(e) => { e.preventDefault(); alert('Obrigado! Entraremos em contato em breve.'); }}>
                <div className="input">
                  <label htmlFor="name">Nome Completo</label>
                  <input type="text" id="name" name="name" required />
                </div>

                <div className="input">
                  <label htmlFor="email">E-mail Profissional</label>
                  <input type="email" id="email" name="email" required />
                </div>

                <div className="input">
                  <label htmlFor="institution">Instituição</label>
                  <input type="text" id="institution" name="institution" required />
                </div>

                <div className="input">
                  <label htmlFor="role">Cargo/Função</label>
                  <select id="role" name="role" required>
                    <option value="">Selecione...</option>
                    <option value="medico">Médico(a)</option>
                    <option value="enfermeiro">Enfermeiro(a)</option>
                    <option value="gestor">Gestor(a) de Saúde</option>
                    <option value="ti">TI / Tecnologia</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                <div className="input">
                  <label htmlFor="message">Mensagem (opcional)</label>
                  <textarea id="message" name="message" rows={4}></textarea>
                </div>

                <button type="submit" className="button button--primary" style={{ width: '100%' }}>
                  <Heart size={20} />
                  Enviar Solicitação
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__top">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div className="header__logo">NE</div>
                <strong style={{ fontSize: '1.2rem' }}>Noa Esperanza</strong>
              </div>
              <p style={{ maxWidth: '400px' }}>
                Inteligência clínica humanizada para transformar o cuidado em saúde.
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
              <div>
                <h4 style={{ marginBottom: '12px', color: 'white' }}>Plataforma</h4>
                <ul style={{ display: 'grid', gap: '8px', listStyle: 'none' }}>
                  <li><a href="#funcionalidades" style={{ color: 'rgba(255,255,255,0.7)' }}>Funcionalidades</a></li>
                  <li><a href="#processo" style={{ color: 'rgba(255,255,255,0.7)' }}>Como Funciona</a></li>
                  <li><Link to="/medcann-lab" style={{ color: 'rgba(255,255,255,0.7)' }}>MedCann Lab</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 style={{ marginBottom: '12px', color: 'white' }}>Empresa</h4>
                <ul style={{ display: 'grid', gap: '8px', listStyle: 'none' }}>
                  <li><a href="#sobre" style={{ color: 'rgba(255,255,255,0.7)' }}>Sobre Nós</a></li>
                  <li><a href="#" style={{ color: 'rgba(255,255,255,0.7)' }}>Blog</a></li>
                  <li><a href="#contato" style={{ color: 'rgba(255,255,255,0.7)' }}>Contato</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="footer__legal">
            © 2025 Noa Esperanza. Todos os direitos reservados. | 
            <a href="#" style={{ marginLeft: '8px' }}>Política de Privacidade</a> | 
            <a href="#" style={{ marginLeft: '8px' }}>Termos de Uso</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home

