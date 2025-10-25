import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { UnifiedDashboard } from './components/UnifiedDashboard'
import { NoaAvatarFusion } from './components/NoaAvatarFusion'
import { IMRETriaxial } from './components/IMRETriaxial'
import { EducationalSystem } from './components/EducationalSystem'
import { BlockchainSecurity } from './components/BlockchainSecurity'
import Home from './pages/Home'
import AreaPaciente from './pages/AreaPaciente'
import AreaProfissional from './pages/AreaProfissional'
import AreaAluno from './pages/AreaAluno'
import AdminDashboard from './pages/AdminDashboard'
import LabPEC from './pages/LabPEC'
import { 
  Home as HomeIcon, 
  User, 
  Users, 
  BookOpen, 
  Brain, 
  Shield, 
  MessageCircle, 
  Settings, 
  LogIn, 
  UserPlus, 
  Heart, 
  Zap, 
  Star, 
  Award, 
  Activity, 
  Globe, 
  Lock, 
  Key, 
  Database, 
  BarChart3, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Bell, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  ThumbsUp, 
  MessageSquare, 
  Link, 
  Copy, 
  ExternalLink, 
  RefreshCw, 
  Download, 
  Upload, 
  Save, 
  X, 
  ChevronRight, 
  ChevronLeft, 
  ChevronDown, 
  ChevronUp, 
  Menu, 
  X as XIcon
} from 'lucide-react'
import { cn } from './lib/utils'

// Componente de Login
const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [name, setName] = useState('')
  const [userType, setUserType] = useState<'patient' | 'professional' | 'student' | 'admin'>('patient')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { signIn, signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('🚀 Botão clicado! Iniciando processo...')
    setLoading(true)
    setError('')

    try {
      if (isSignUp) {
        console.log('📝 Modo: Criar conta')
        const result = await signUp(email, password, { name, type: userType })
        if (!result.success) {
          console.error('❌ Erro ao criar conta:', result.error)
          setError(result.error || 'Erro ao criar conta')
        } else {
          console.log('✅ Conta criada com sucesso!')
          // Redirecionar para o dashboard após criação bem-sucedida
          window.location.href = '/dashboard'
        }
      } else {
        console.log('🔐 Modo: Login')
        const result = await signIn(email, password)
        if (!result.success) {
          console.error('❌ Erro no login:', result.error)
          setError(result.error || 'Erro ao fazer login')
        } else {
          console.log('✅ Login realizado com sucesso!')
          // Redirecionar para o dashboard após login bem-sucedido
          window.location.href = '/dashboard'
        }
      }
    } catch (error) {
      console.error('❌ Erro inesperado:', error)
      setError('Erro inesperado')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo e Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Nôa Esperanza</h1>
          <p className="text-gray-600">Plataforma de cuidado humanizado com cannabis medicinal</p>
        </div>

        {/* Formulário */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {isSignUp ? 'Criar Conta' : 'Entrar'}
            </h2>
            <p className="text-gray-600">
              {isSignUp ? 'Junte-se à nossa comunidade' : 'Bem-vindo de volta'}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span className="text-sm text-red-700">{error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome completo
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoComplete="username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoComplete="current-password"
                required
              />
            </div>

            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de usuário
                </label>
                <select
                  value={userType}
                  onChange={(e) => setUserType(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="patient">Paciente</option>
                  <option value="professional">Profissional</option>
                  <option value="student">Estudante</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              onClick={(e) => {
                console.log('🖱️ Botão clicado diretamente!')
                console.log('📧 Email:', email)
                console.log('🔑 Senha:', password ? '***' : 'vazio')
                console.log('🔄 Loading:', loading)
              }}
              className={cn(
                "w-full py-3 px-4 rounded-lg font-medium transition-all",
                loading
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
              )}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {isSignUp ? 'Criando conta...' : 'Entrando...'}
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  {isSignUp ? <UserPlus className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
                  {isSignUp ? 'Criar Conta' : 'Entrar'}
                </div>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              {isSignUp ? 'Já tem uma conta? Entrar' : 'Não tem uma conta? Criar conta'}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>Protegido por blockchain e LGPD</p>
          <p className="mt-1">© 2024 Nôa Esperanza. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  )
}

// Componente de Loading
const LoadingPage: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-4">
        <Heart className="w-8 h-8 text-white animate-pulse" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Nôa Esperanza</h2>
      <p className="text-gray-600">Carregando sua experiência...</p>
    </div>
  </div>
)

// Componente de Rota Protegida
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingPage />
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

// Componente de Layout Principal
const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Nôa Esperanza</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-6 px-4">
          <div className="space-y-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: HomeIcon, path: '/dashboard' },
              { id: 'assessments', label: 'Avaliações', icon: Brain, path: '/assessments' },
              { id: 'education', label: 'Educação', icon: BookOpen, path: '/education' },
              { id: 'security', label: 'Segurança', icon: Shield, path: '/security' },
              { id: 'chat', label: 'Chat', icon: MessageCircle, path: '/chat' },
              { id: 'settings', label: 'Configurações', icon: Settings, path: '/settings' }
            ].map((item) => (
              <a
                key={item.id}
                href={item.path}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all"
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </div>

      {/* Overlay para mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

// Configuração do Router com future flags
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: (
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    )
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <UnifiedDashboard userId="user-id" userType="patient" />
        </MainLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/assessments",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <IMRETriaxial userId="user-id" />
        </MainLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/education",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <EducationalSystem userId="user-id" userType="patient" />
        </MainLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/security",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <BlockchainSecurity userId="user-id" userType="patient" />
        </MainLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/chat",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <NoaAvatarFusion context="patient" />
        </MainLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/settings",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <div className="p-6">Configurações</div>
        </MainLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/paciente/*",
    element: <AreaPaciente />
  },
  {
    path: "/profissional/*",
    element: <AreaProfissional />
  },
  {
    path: "/aluno/*",
    element: <AreaAluno />
  },
  {
    path: "/admin/*",
    element: <AdminDashboard />
  },
  {
    path: "/labpec",
    element: <LabPEC />
  }
], {
  future: {
    v7_relativeSplatPath: true
  }
})

// Componente Principal
const AppFusion: React.FC = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default AppFusion
