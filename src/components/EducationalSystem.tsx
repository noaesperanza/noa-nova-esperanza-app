import React, { useState, useEffect } from 'react'
import { 
  BookOpen, 
  Play, 
  Pause, 
  CheckCircle, 
  Clock, 
  Star,
  Award,
  Users,
  MessageCircle,
  FileText,
  Video,
  Download,
  Share2,
  Heart,
  Brain,
  Zap,
  Target,
  TrendingUp,
  Calendar,
  User,
  Bookmark,
  Share,
  ThumbsUp,
  MessageSquare,
  Eye,
  BarChart3
} from 'lucide-react'
import { cn } from '../lib/utils'
import { supabase, Course, CourseModule } from '../lib/supabase'

interface EducationalSystemProps {
  userId: string
  userType: 'patient' | 'professional' | 'student' | 'admin'
}

interface CourseProgress {
  courseId: string
  completedModules: string[]
  currentModule: string
  progress: number
  lastAccessed: string
  totalTime: number
}

interface ForumPost {
  id: string
  title: string
  content: string
  author: string
  authorType: string
  createdAt: string
  likes: number
  comments: number
  tags: string[]
  isPinned: boolean
}

interface GamificationData {
  points: number
  level: number
  badges: string[]
  streak: number
  achievements: string[]
}

export const EducationalSystem: React.FC<EducationalSystemProps> = ({ 
  userId, 
  userType 
}) => {
  const [activeTab, setActiveTab] = useState<'courses' | 'forum' | 'library' | 'progress' | 'gamification'>('courses')
  const [courses, setCourses] = useState<Course[]>([])
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [currentModule, setCurrentModule] = useState<CourseModule | null>(null)
  const [progress, setProgress] = useState<CourseProgress[]>([])
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([])
  const [gamification, setGamification] = useState<GamificationData>({
    points: 0,
    level: 1,
    badges: [],
    streak: 0,
    achievements: []
  })
  const [loading, setLoading] = useState(false)

  // Carregar dados iniciais
  useEffect(() => {
    loadInitialData()
  }, [userId])

  const loadInitialData = async () => {
    setLoading(true)
    try {
      // Carregar cursos
      const { data: coursesData } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false })
      
      setCourses(coursesData || [])

      // Carregar progresso
      const { data: progressData } = await supabase
        .from('course_progress')
        .select('*')
        .eq('user_id', userId)
      
      setProgress(progressData || [])

      // Carregar posts do fórum
      const { data: forumData } = await supabase
        .from('forum_posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20)
      
      setForumPosts(forumData || [])

      // Carregar gamificação
      const { data: gamificationData } = await supabase
        .from('user_gamification')
        .select('*')
        .eq('user_id', userId)
        .single()
      
      if (gamificationData) {
        setGamification(gamificationData)
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  // Iniciar curso
  const startCourse = async (course: Course) => {
    setSelectedCourse(course)
    if (course.modules && course.modules.length > 0) {
      setCurrentModule(course.modules[0])
    }
  }

  // Marcar módulo como completo
  const completeModule = async (moduleId: string) => {
    if (!selectedCourse) return

    try {
      const { error } = await supabase
        .from('course_progress')
        .upsert({
          user_id: userId,
          course_id: selectedCourse.id,
          completed_modules: [...(progress.find(p => p.courseId === selectedCourse.id)?.completedModules || []), moduleId],
          current_module: moduleId,
          progress: calculateProgress(selectedCourse.id, moduleId),
          last_accessed: new Date().toISOString(),
          total_time: (progress.find(p => p.courseId === selectedCourse.id)?.totalTime || 0) + 30
        })

      if (error) throw error

      // Atualizar gamificação
      await updateGamification('module_completed')
      
      loadInitialData()
    } catch (error) {
      console.error('Erro ao completar módulo:', error)
    }
  }

  // Calcular progresso
  const calculateProgress = (courseId: string, moduleId: string) => {
    const course = courses.find(c => c.id === courseId)
    if (!course || !course.modules) return 0
    
    const completedModules = progress.find(p => p.courseId === courseId)?.completedModules || []
    return (completedModules.length / course.modules.length) * 100
  }

  // Atualizar gamificação
  const updateGamification = async (action: string) => {
    const pointsToAdd = {
      'module_completed': 10,
      'course_completed': 50,
      'forum_post': 5,
      'forum_comment': 2,
      'daily_login': 1
    }

    const newPoints = gamification.points + (pointsToAdd[action] || 0)
    const newLevel = Math.floor(newPoints / 100) + 1
    const newBadges = [...gamification.badges]
    
    // Adicionar badges baseado em conquistas
    if (newLevel > gamification.level && !newBadges.includes('level_up')) {
      newBadges.push('level_up')
    }
    if (newPoints >= 100 && !newBadges.includes('centurion')) {
      newBadges.push('centurion')
    }

    const updatedGamification = {
      ...gamification,
      points: newPoints,
      level: newLevel,
      badges: newBadges,
      streak: gamification.streak + 1
    }

    setGamification(updatedGamification)

    try {
      await supabase
        .from('user_gamification')
        .upsert({
          user_id: userId,
          ...updatedGamification
        })
    } catch (error) {
      console.error('Erro ao atualizar gamificação:', error)
    }
  }

  // Renderizar cursos
  const renderCourses = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Cursos Disponíveis</h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <BookOpen className="w-4 h-4" />
          <span>{courses.length} cursos</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => {
          const courseProgress = progress.find(p => p.courseId === course.id)
          const progressPercent = courseProgress ? courseProgress.progress : 0
          const isCompleted = progressPercent >= 100

          return (
            <div key={course.id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                      <p className="text-sm text-gray-600">{course.duration_hours}h de conteúdo</p>
                    </div>
                  </div>
                  {isCompleted && (
                    <div className="p-2 bg-green-100 rounded-full">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                  )}
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progresso</span>
                    <span>{Math.round(progressPercent)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration_hours}h</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      <span>{course.modules?.length || 0} módulos</span>
                    </div>
                  </div>

                  <button
                    onClick={() => startCourse(course)}
                    className={cn(
                      "px-4 py-2 rounded-lg font-medium transition-all",
                      isCompleted
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    )}
                  >
                    {isCompleted ? (
                      <>
                        <CheckCircle className="w-4 h-4 inline mr-1" />
                        Concluído
                      </>
                    ) : courseProgress ? (
                      <>
                        <Play className="w-4 h-4 inline mr-1" />
                        Continuar
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 inline mr-1" />
                        Iniciar
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  // Renderizar fórum
  const renderForum = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Fórum da Comunidade</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
          <MessageCircle className="w-4 h-4 inline mr-2" />
          Nova Postagem
        </button>
      </div>

      <div className="space-y-4">
        {forumPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{post.title}</h3>
                  <p className="text-sm text-gray-600">
                    Por {post.author} • {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              {post.isPinned && (
                <div className="p-1 bg-yellow-100 rounded">
                  <Star className="w-4 h-4 text-yellow-600" />
                </div>
              )}
            </div>

            <p className="text-gray-700 mb-4 line-clamp-3">{post.content}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <button className="flex items-center gap-1 hover:text-blue-600">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center gap-1 hover:text-blue-600">
                  <MessageSquare className="w-4 h-4" />
                  <span>{post.comments}</span>
                </button>
                <button className="flex items-center gap-1 hover:text-blue-600">
                  <Eye className="w-4 h-4" />
                  <span>Ver</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // Renderizar biblioteca
  const renderLibrary = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Biblioteca de Recursos</h2>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all">
          <Download className="w-4 h-4 inline mr-2" />
          Upload Documento
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Protocolos Clínicos", count: 24, icon: FileText, color: "blue" },
          { title: "Artigos Científicos", count: 156, icon: BookOpen, color: "green" },
          { title: "Vídeos Educativos", count: 43, icon: Video, color: "purple" },
          { title: "Guias Práticos", count: 18, icon: Target, color: "orange" },
          { title: "Casos Clínicos", count: 67, icon: Brain, color: "red" },
          { title: "Legislação", count: 12, icon: Award, color: "indigo" }
        ].map((resource, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className={cn(
                "p-3 rounded-lg",
                resource.color === 'blue' && "bg-blue-100",
                resource.color === 'green' && "bg-green-100",
                resource.color === 'purple' && "bg-purple-100",
                resource.color === 'orange' && "bg-orange-100",
                resource.color === 'red' && "bg-red-100",
                resource.color === 'indigo' && "bg-indigo-100"
              )}>
                <resource.icon className={cn(
                  "w-6 h-6",
                  resource.color === 'blue' && "text-blue-600",
                  resource.color === 'green' && "text-green-600",
                  resource.color === 'purple' && "text-purple-600",
                  resource.color === 'orange' && "text-orange-600",
                  resource.color === 'red' && "text-red-600",
                  resource.color === 'indigo' && "text-indigo-600"
                )} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{resource.title}</h3>
                <p className="text-sm text-gray-600">{resource.count} itens</p>
              </div>
            </div>
            <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all">
              Explorar
            </button>
          </div>
        ))}
      </div>
    </div>
  )

  // Renderizar progresso
  const renderProgress = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Meu Progresso</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Cursos Completos</h3>
          </div>
          <p className="text-3xl font-bold text-blue-600">
            {progress.filter(p => p.progress >= 100).length}
          </p>
          <p className="text-sm text-gray-600">de {courses.length} cursos</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Tempo Total</h3>
          </div>
          <p className="text-3xl font-bold text-green-600">
            {Math.round(progress.reduce((acc, p) => acc + p.totalTime, 0) / 60)}h
          </p>
          <p className="text-sm text-gray-600">de estudo</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Nível Atual</h3>
          </div>
          <p className="text-3xl font-bold text-purple-600">{gamification.level}</p>
          <p className="text-sm text-gray-600">{gamification.points} pontos</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Cursos em Andamento</h3>
        <div className="space-y-4">
          {progress.filter(p => p.progress > 0 && p.progress < 100).map((courseProgress) => {
            const course = courses.find(c => c.id === courseProgress.courseId)
            if (!course) return null

            return (
              <div key={courseProgress.courseId} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <div>
                    <h4 className="font-medium text-gray-900">{course.title}</h4>
                    <p className="text-sm text-gray-600">{Math.round(courseProgress.progress)}% completo</p>
                  </div>
                </div>
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${courseProgress.progress}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

  // Renderizar gamificação
  const renderGamification = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Gamificação</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Estatísticas</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Pontos</span>
              <span className="font-semibold text-blue-600">{gamification.points}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Nível</span>
              <span className="font-semibold text-green-600">{gamification.level}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Sequência</span>
              <span className="font-semibold text-purple-600">{gamification.streak} dias</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Conquistas</h3>
          <div className="space-y-2">
            {gamification.badges.map((badge, index) => (
              <div key={index} className="flex items-center gap-2">
                <Award className="w-4 h-4 text-yellow-600" />
                <span className="text-sm text-gray-700">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <BookOpen className="w-12 h-12 text-blue-600 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Carregando sistema educacional...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Sistema Educacional Nôa Esperanza</h1>
        <p className="text-gray-600">Formação contínua em cannabis medicinal e cuidado humanizado</p>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-8">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {[
            { id: 'courses', label: 'Cursos', icon: BookOpen },
            { id: 'forum', label: 'Fórum', icon: MessageCircle },
            { id: 'library', label: 'Biblioteca', icon: FileText },
            { id: 'progress', label: 'Progresso', icon: BarChart3 },
            { id: 'gamification', label: 'Gamificação', icon: Award }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all",
                activeTab === tab.id
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {activeTab === 'courses' && renderCourses()}
      {activeTab === 'forum' && renderForum()}
      {activeTab === 'library' && renderLibrary()}
      {activeTab === 'progress' && renderProgress()}
      {activeTab === 'gamification' && renderGamification()}
    </div>
  )
}
