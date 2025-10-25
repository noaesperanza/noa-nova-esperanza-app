import React, { useState, useEffect } from 'react'
import { 
  Home, 
  User, 
  Users, 
  BookOpen, 
  Brain, 
  Shield, 
  BarChart3,
  Calendar,
  MessageCircle,
  FileText,
  Video,
  Download,
  Share2,
  Heart,
  Zap,
  Target,
  TrendingUp,
  Award,
  Clock,
  CheckCircle,
  AlertTriangle,
  Settings,
  Bell,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Star,
  ThumbsUp,
  MessageSquare,
  Activity,
  Database,
  Globe,
  Lock,
  Key,
  Link,
  Copy,
  ExternalLink,
  RefreshCw,
  Download as DownloadIcon,
  Upload,
  Save,
  X,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import { cn } from '../lib/utils'
import { supabase, User as SupabaseUser } from '../lib/supabase'
import { NoaAvatarFusion } from './NoaAvatarFusion'
import { IMRETriaxial } from './IMRETriaxial'
import { EducationalSystem } from './EducationalSystem'
import { BlockchainSecurity } from './BlockchainSecurity'

interface UnifiedDashboardProps {
  userId: string
  userType: 'patient' | 'professional' | 'student' | 'admin'
}

interface DashboardMetric {
  title: string
  value: string | number
  change: number
  icon: React.ComponentType<any>
  color: string
}

interface RecentActivity {
  id: string
  type: 'assessment' | 'course' | 'chat' | 'document' | 'forum'
  title: string
  description: string
  timestamp: string
  status: 'completed' | 'in_progress' | 'pending'
}

interface QuickAction {
  id: string
  title: string
  description: string
  icon: React.ComponentType<any>
  color: string
  action: () => void
}

export const UnifiedDashboard: React.FC<UnifiedDashboardProps> = ({ 
  userId, 
  userType 
}) => {
  const [activeSection, setActiveSection] = useState<'overview' | 'assessments' | 'education' | 'security' | 'chat' | 'settings'>('overview')
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [metrics, setMetrics] = useState<DashboardMetric[]>([])
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [quickActions, setQuickActions] = useState<QuickAction[]>([])
  const [loading, setLoading] = useState(false)

  // Carregar dados do dashboard
  useEffect(() => {
    loadDashboardData()
  }, [userId, userType])

  const loadDashboardData = async () => {
    setLoading(true)
    try {
      // Carregar dados do usuário
      const { data: userData } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()
      
      setUser(userData)

      // Carregar métricas baseadas no tipo de usuário
      const userMetrics = await loadUserMetrics(userType)
      setMetrics(userMetrics)

      // Carregar atividades recentes
      const { data: activityData } = await supabase
        .from('recent_activities')
        .select('*')
        .eq('user_id', userId)
        .order('timestamp', { ascending: false })
        .limit(10)
      
      setRecentActivity(activityData || [])

      // Carregar ações rápidas
      const actions = getQuickActions(userType)
      setQuickActions(actions)
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  // Carregar métricas por tipo de usuário
  const loadUserMetrics = async (type: string): Promise<DashboardMetric[]> => {
    const baseMetrics = [
      {
        title: 'Total de Sessões',
        value: 0,
        change: 0,
        icon: Activity,
        color: 'blue'
      },
      {
        title: 'Tempo Total',
        value: '0h',
        change: 0,
        icon: Clock,
        color: 'green'
      },
      {
        title: 'Progresso Geral',
        value: '0%',
        change: 0,
        icon: TrendingUp,
        color: 'purple'
      }
    ]

    switch (type) {
      case 'patient':
        return [
          ...baseMetrics,
          {
            title: 'Avaliações Completas',
            value: 0,
            change: 0,
            icon: CheckCircle,
            color: 'green'
          },
          {
            title: 'Chats com Nôa',
            value: 0,
            change: 0,
            icon: MessageCircle,
            color: 'blue'
          },
          {
            title: 'Documentos Compartilhados',
            value: 0,
            change: 0,
            icon: Share2,
            color: 'orange'
          }
        ]
      
      case 'professional':
        return [
          ...baseMetrics,
          {
            title: 'Pacientes Atendidos',
            value: 0,
            change: 0,
            icon: Users,
            color: 'green'
          },
          {
            title: 'Avaliações Realizadas',
            value: 0,
            change: 0,
            icon: Brain,
            color: 'blue'
          },
          {
            title: 'Cursos Completos',
            value: 0,
            change: 0,
            icon: BookOpen,
            color: 'purple'
          }
        ]
      
      case 'student':
        return [
          ...baseMetrics,
          {
            title: 'Cursos em Andamento',
            value: 0,
            change: 0,
            icon: BookOpen,
            color: 'blue'
          },
          {
            title: 'Certificados',
            value: 0,
            change: 0,
            icon: Award,
            color: 'green'
          },
          {
            title: 'Participações no Fórum',
            value: 0,
            change: 0,
            icon: MessageSquare,
            color: 'orange'
          }
        ]
      
      case 'admin':
        return [
          ...baseMetrics,
          {
            title: 'Usuários Ativos',
            value: 0,
            change: 0,
            icon: Users,
            color: 'green'
          },
          {
            title: 'Sistema de Saúde',
            value: '99.9%',
            change: 0,
            icon: Shield,
            color: 'blue'
          },
          {
            title: 'Dados Processados',
            value: '0GB',
            change: 0,
            icon: Database,
            color: 'purple'
          }
        ]
      
      default:
        return baseMetrics
    }
  }

  // Obter ações rápidas por tipo de usuário
  const getQuickActions = (type: string): QuickAction[] => {
    const baseActions = [
      {
        id: 'chat',
        title: 'Chat com Nôa',
        description: 'Conversar com a IA',
        icon: MessageCircle,
        color: 'blue',
        action: () => setActiveSection('chat')
      }
    ]

    switch (type) {
      case 'patient':
        return [
          ...baseActions,
          {
            id: 'assessment',
            title: 'Nova Avaliação',
            description: 'Iniciar avaliação IMRE',
            icon: Brain,
            color: 'green',
            action: () => setActiveSection('assessments')
          },
          {
            id: 'education',
            title: 'Cursos',
            description: 'Acessar educação',
            icon: BookOpen,
            color: 'purple',
            action: () => setActiveSection('education')
          },
          {
            id: 'security',
            title: 'Segurança',
            description: 'Ver dados de segurança',
            icon: Shield,
            color: 'orange',
            action: () => setActiveSection('security')
          }
        ]
      
      case 'professional':
        return [
          ...baseActions,
          {
            id: 'patients',
            title: 'Meus Pacientes',
            description: 'Gerenciar pacientes',
            icon: Users,
            color: 'green',
            action: () => setActiveSection('overview')
          },
          {
            id: 'assessments',
            title: 'Avaliações',
            description: 'Realizar avaliações',
            icon: Brain,
            color: 'blue',
            action: () => setActiveSection('assessments')
          },
          {
            id: 'education',
            title: 'Educação',
            description: 'Cursos e treinamentos',
            icon: BookOpen,
            color: 'purple',
            action: () => setActiveSection('education')
          }
        ]
      
      case 'student':
        return [
          ...baseActions,
          {
            id: 'courses',
            title: 'Meus Cursos',
            description: 'Continuar estudos',
            icon: BookOpen,
            color: 'blue',
            action: () => setActiveSection('education')
          },
          {
            id: 'forum',
            title: 'Fórum',
            description: 'Participar da comunidade',
            icon: MessageSquare,
            color: 'green',
            action: () => setActiveSection('education')
          },
          {
            id: 'certificates',
            title: 'Certificados',
            description: 'Ver conquistas',
            icon: Award,
            color: 'purple',
            action: () => setActiveSection('education')
          }
        ]
      
      case 'admin':
        return [
          ...baseActions,
          {
            id: 'users',
            title: 'Usuários',
            description: 'Gerenciar usuários',
            icon: Users,
            color: 'blue',
            action: () => setActiveSection('overview')
          },
          {
            id: 'analytics',
            title: 'Analytics',
            description: 'Ver métricas',
            icon: BarChart3,
            color: 'green',
            action: () => setActiveSection('overview')
          },
          {
            id: 'security',
            title: 'Segurança',
            description: 'Monitorar segurança',
            icon: Shield,
            color: 'red',
            action: () => setActiveSection('security')
          }
        ]
      
      default:
        return baseActions
    }
  }

  // Renderizar overview
  const renderOverview = () => (
    <div className="space-y-6">
      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={cn(
                "p-3 rounded-lg",
                metric.color === 'blue' && "bg-blue-100",
                metric.color === 'green' && "bg-green-100",
                metric.color === 'purple' && "bg-purple-100",
                metric.color === 'orange' && "bg-orange-100",
                metric.color === 'red' && "bg-red-100"
              )}>
                <metric.icon className={cn(
                  "w-6 h-6",
                  metric.color === 'blue' && "text-blue-600",
                  metric.color === 'green' && "text-green-600",
                  metric.color === 'purple' && "text-purple-600",
                  metric.color === 'orange' && "text-orange-600",
                  metric.color === 'red' && "text-red-600"
                )} />
              </div>
              <div className="text-right">
                <span className={cn(
                  "text-sm font-medium",
                  metric.change > 0 ? "text-green-600" : metric.change < 0 ? "text-red-600" : "text-gray-600"
                )}>
                  {metric.change > 0 ? "+" : ""}{metric.change}%
                </span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
            <p className="text-sm text-gray-600">{metric.title}</p>
          </div>
        ))}
      </div>

      {/* Ações Rápidas */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={action.action}
              className="p-4 rounded-lg border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={cn(
                  "p-2 rounded-lg",
                  action.color === 'blue' && "bg-blue-100 group-hover:bg-blue-200",
                  action.color === 'green' && "bg-green-100 group-hover:bg-green-200",
                  action.color === 'purple' && "bg-purple-100 group-hover:bg-purple-200",
                  action.color === 'orange' && "bg-orange-100 group-hover:bg-orange-200",
                  action.color === 'red' && "bg-red-100 group-hover:bg-red-200"
                )}>
                  <action.icon className={cn(
                    "w-5 h-5",
                    action.color === 'blue' && "text-blue-600",
                    action.color === 'green' && "text-green-600",
                    action.color === 'purple' && "text-purple-600",
                    action.color === 'orange' && "text-orange-600",
                    action.color === 'red' && "text-red-600"
                  )} />
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
              </div>
              <h4 className="font-medium text-gray-900 text-left">{action.title}</h4>
              <p className="text-sm text-gray-600 text-left">{action.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Atividades Recentes */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Atividades Recentes</h3>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-all">
              <div className={cn(
                "p-2 rounded-lg",
                activity.type === 'assessment' && "bg-green-100",
                activity.type === 'course' && "bg-blue-100",
                activity.type === 'chat' && "bg-purple-100",
                activity.type === 'document' && "bg-orange-100",
                activity.type === 'forum' && "bg-yellow-100"
              )}>
                {activity.type === 'assessment' && <Brain className="w-4 h-4 text-green-600" />}
                {activity.type === 'course' && <BookOpen className="w-4 h-4 text-blue-600" />}
                {activity.type === 'chat' && <MessageCircle className="w-4 h-4 text-purple-600" />}
                {activity.type === 'document' && <FileText className="w-4 h-4 text-orange-600" />}
                {activity.type === 'forum' && <MessageSquare className="w-4 h-4 text-yellow-600" />}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{activity.title}</h4>
                <p className="text-sm text-gray-600">{activity.description}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  {new Date(activity.timestamp).toLocaleDateString()}
                </p>
                <div className={cn(
                  "px-2 py-1 rounded-full text-xs",
                  activity.status === 'completed' && "bg-green-100 text-green-700",
                  activity.status === 'in_progress' && "bg-blue-100 text-blue-700",
                  activity.status === 'pending' && "bg-yellow-100 text-yellow-700"
                )}>
                  {activity.status === 'completed' && 'Concluído'}
                  {activity.status === 'in_progress' && 'Em andamento'}
                  {activity.status === 'pending' && 'Pendente'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // Renderizar seção de avaliações
  const renderAssessments = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Avaliações IMRE Triaxial</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
          <Plus className="w-4 h-4 inline mr-2" />
          Nova Avaliação
        </button>
      </div>
      
      <IMRETriaxial 
        userId={userId} 
        onComplete={(assessment) => {
          console.log('Avaliação concluída:', assessment)
          loadDashboardData()
        }}
        onProgress={(current, total) => {
          console.log(`Progresso: ${current}/${total}`)
        }}
      />
    </div>
  )

  // Renderizar seção de educação
  const renderEducation = () => (
    <EducationalSystem userId={userId} userType={userType} />
  )

  // Renderizar seção de segurança
  const renderSecurity = () => (
    <BlockchainSecurity userId={userId} userType={userType} />
  )

  // Renderizar seção de chat
  const renderChat = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Chat com Nôa Esperanza</h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span>Online</span>
        </div>
      </div>
      
      <NoaAvatarFusion 
        context={userType}
        onMessage={(message) => {
          console.log('Mensagem recebida:', message)
        }}
      />
    </div>
  )

  // Renderizar seção de configurações
  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Configurações</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Perfil</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
              <input 
                type="text" 
                value={user?.name || ''} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                value={user?.email || ''} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Usuário</label>
              <select 
                value={user?.type || ''} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled
              >
                <option value="patient">Paciente</option>
                <option value="professional">Profissional</option>
                <option value="student">Estudante</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferências</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Notificações</span>
              <button className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-all">
                <CheckCircle className="w-4 h-4 inline mr-1" />
                Ativo
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Tema</span>
              <select className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="light">Claro</option>
                <option value="dark">Escuro</option>
                <option value="auto">Automático</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Idioma</span>
              <select className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="pt">Português</option>
                <option value="en">English</option>
                <option value="es">Español</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <Activity className="w-12 h-12 text-blue-600 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Carregando dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Dashboard Nôa Esperanza
            </h1>
            <p className="text-gray-600">
              Bem-vindo, {user?.name || 'Usuário'} • {userType === 'patient' && 'Paciente'}
              {userType === 'professional' && 'Profissional'}
              {userType === 'student' && 'Estudante'}
              {userType === 'admin' && 'Administrador'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-all">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-all">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mb-8">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {[
            { id: 'overview', label: 'Visão Geral', icon: Home },
            { id: 'assessments', label: 'Avaliações', icon: Brain },
            { id: 'education', label: 'Educação', icon: BookOpen },
            { id: 'security', label: 'Segurança', icon: Shield },
            { id: 'chat', label: 'Chat', icon: MessageCircle },
            { id: 'settings', label: 'Configurações', icon: Settings }
          ].map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id as any)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all",
                activeSection === section.id
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              <section.icon className="w-4 h-4" />
              {section.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {activeSection === 'overview' && renderOverview()}
      {activeSection === 'assessments' && renderAssessments()}
      {activeSection === 'education' && renderEducation()}
      {activeSection === 'security' && renderSecurity()}
      {activeSection === 'chat' && renderChat()}
      {activeSection === 'settings' && renderSettings()}
    </div>
  )
}
