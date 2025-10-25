import { createClient } from '@supabase/supabase-js'

// Configuração do Supabase com fallback para desenvolvimento local
const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || 'https://itdjkfubfzmvmuxxjoae.supabase.co'
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0ZGprZnViZnptdm11eHhqb2FlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExNjUyOTAsImV4cCI6MjA3Njc0MTI5MH0.j9Kfff56O2cWs5ocInVHaUFcaNTS7lrUNwsKBh2KIFM'

// Singleton pattern para evitar múltiplas instâncias
let supabaseInstance: any = null

export const getSupabaseClient = () => {
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    })
  }
  return supabaseInstance
}

export const supabase = getSupabaseClient()

// Tipos para o sistema unificado
export interface User {
  id: string
  email: string
  name: string
  type: 'patient' | 'professional' | 'student' | 'admin'
  avatar?: string
  nft_soulbound?: string
  created_at: string
  updated_at: string
}

export interface ChatMessage {
  id: string
  user_id: string
  content: string
  is_user: boolean
  analysis?: {
    topics: string[]
    emotions: string
    biomedical_terms: string[]
    interpretations: string
    confidence: number
  }
  created_at: string
}

export interface IMREAssessment {
  id: string
  user_id: string
  patient_id?: string
  status: 'in_progress' | 'completed' | 'pending'
  current_block: number
  total_blocks: number
  data: Record<string, any>
  created_at: string
  completed_at?: string
}

export interface Course {
  id: string
  title: string
  description: string
  duration_hours: number
  modules: CourseModule[]
  created_at: string
}

export interface CourseModule {
  id: string
  course_id: string
  title: string
  content: string
  duration_minutes: number
  order: number
}

// Funções de autenticação
export const authService = {
  async signUp(email: string, password: string, userData: Partial<User>) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      })

      if (error) {
        console.error('Erro no signUp:', error)
        return { data: null, error }
      }

      // Criar perfil do usuário na tabela users
      if (data.user) {
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert({
            id: data.user.id,
            email: data.user.email,
            name: userData.name || '',
            type: userData.type || 'patient',
            avatar: userData.avatar,
            nft_soulbound: userData.nft_soulbound
          })

        if (profileError) {
          console.error('Erro ao criar perfil:', profileError)
        }
      }

      return { data, error }
    } catch (error) {
      console.error('Erro inesperado no signUp:', error)
      return { data: null, error }
    }
  },

  async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        console.error('Erro no signIn:', error)
        return { data: null, error }
      }

      return { data, error }
    } catch (error) {
      console.error('Erro inesperado no signIn:', error)
      return { data: null, error }
    }
  },

  async signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      return { error }
    } catch (error) {
      console.error('Erro inesperado no signOut:', error)
      return { error }
    }
  },

  async getCurrentUser() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        console.error('Erro ao obter sessão:', error)
        return null
      }

      return session?.user || null
    } catch (error) {
      console.error('Erro inesperado ao obter usuário:', error)
      return null
    }
  },

  async getUserProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Erro ao obter perfil:', error)
        return { data: null, error }
      }

      return { data, error: null }
    } catch (error) {
      console.error('Erro inesperado ao obter perfil:', error)
      return { data: null, error }
    }
  }
}

// Funções de chat
export const chatService = {
  async sendMessage(userId: string, content: string, analysis?: any) {
    const { data, error } = await supabase
      .from('chat_messages')
      .insert({
        user_id: userId,
        content,
        is_user: true,
        analysis
      })
      .select()
      .single()
    
    return { data, error }
  },

  async getMessages(userId: string, limit = 50) {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)
    
    return { data, error }
  },

  async subscribeToMessages(userId: string, callback: (message: ChatMessage) => void) {
    return supabase
      .channel('chat_messages')
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'chat_messages',
          filter: `user_id=eq.${userId}`
        }, 
        (payload) => callback(payload.new as ChatMessage)
      )
      .subscribe()
  }
}

// Funções de avaliação IMRE
export const imreService = {
  async createAssessment(userId: string, patientId?: string) {
    const { data, error } = await supabase
      .from('imre_assessments')
      .insert({
        user_id: userId,
        patient_id: patientId,
        status: 'in_progress',
        current_block: 1,
        total_blocks: 37,
        data: {}
      })
      .select()
      .single()
    
    return { data, error }
  },

  async updateAssessment(assessmentId: string, blockData: any, currentBlock: number) {
    const { data, error } = await supabase
      .from('imre_assessments')
      .update({
        current_block: currentBlock,
        data: blockData,
        status: currentBlock >= 37 ? 'completed' : 'in_progress',
        completed_at: currentBlock >= 37 ? new Date().toISOString() : null
      })
      .eq('id', assessmentId)
      .select()
      .single()
    
    return { data, error }
  },

  async getAssessment(assessmentId: string) {
    const { data, error } = await supabase
      .from('imre_assessments')
      .select('*')
      .eq('id', assessmentId)
      .single()
    
    return { data, error }
  }
}
