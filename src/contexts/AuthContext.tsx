import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { supabase, authService, User } from '../lib/supabase'

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signUp: (email: string, password: string, userData: Partial<User>) => Promise<{ success: boolean; error?: string }>
  signOut: () => Promise<void>
  updateUser: (userData: Partial<User>) => Promise<{ success: boolean; error?: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar se há usuário logado
    const checkUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser()
        if (currentUser) {
          // Buscar dados completos do usuário usando a função corrigida
          const { data: userData, error } = await authService.getUserProfile(currentUser.id)
          if (userData && !error) {
            setUser(userData)
          }
        }
      } catch (error) {
        console.error('Erro ao verificar usuário:', error)
      } finally {
        setLoading(false)
      }
    }

    // Aguardar um pouco antes de verificar para dar tempo da sessão ser estabelecida
    const timeoutId = setTimeout(checkUser, 100)
    
    return () => clearTimeout(timeoutId)

    // Escutar mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user?.id)
        
        if (event === 'SIGNED_IN' && session?.user) {
          try {
            const { data: userData, error } = await authService.getUserProfile(session.user.id)
            if (userData && !error) {
              setUser(userData)
            } else {
              console.error('Erro ao buscar perfil do usuário:', error)
            }
          } catch (error) {
            console.error('Erro ao buscar perfil:', error)
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      console.log('🔐 Tentando fazer login com:', email)
      const { data, error } = await authService.signIn(email, password)
      
      if (error) {
        console.error('❌ Erro no signIn:', error)
        return { success: false, error: error.message }
      }

      if (data?.user) {
        console.log('✅ Login bem-sucedido, buscando perfil...')
        // Buscar perfil do usuário usando a função corrigida
        const { data: userData, error: profileError } = await authService.getUserProfile(data.user.id)
        if (userData && !profileError) {
          console.log('✅ Perfil encontrado:', userData)
          setUser(userData)
          return { success: true }
        } else {
          console.error('❌ Erro ao buscar perfil:', profileError)
          return { success: false, error: 'Erro ao buscar perfil do usuário' }
        }
      }
      
      console.error('❌ Usuário não encontrado nos dados')
      return { success: false, error: 'Usuário não encontrado' }
    } catch (error: any) {
      console.error('❌ Erro inesperado no signIn:', error)
      return { success: false, error: error.message || 'Erro inesperado' }
    }
  }

  const signUp = async (email: string, password: string, userData: Partial<User>) => {
    try {
      const { data, error } = await authService.signUp(email, password, userData)
      if (error) {
        console.error('Erro no signUp:', error)
        return { success: false, error: error.message }
      }

      if (data.user) {
        // O perfil já foi criado na função signUp do authService
        // Buscar o perfil criado
        const { data: newUser, error: profileError } = await authService.getUserProfile(data.user.id)
        if (newUser && !profileError) {
          setUser(newUser)
          return { success: true }
        } else {
          console.error('Erro ao buscar perfil criado:', profileError)
          return { success: false, error: 'Erro ao buscar perfil do usuário' }
        }
      }
      
      return { success: false, error: 'Erro ao criar usuário' }
    } catch (error: any) {
      console.error('Erro inesperado no signUp:', error)
      return { success: false, error: error.message || 'Erro inesperado' }
    }
  }

  const signOut = async () => {
    try {
      await authService.signOut()
      setUser(null)
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }

  const updateUser = async (userData: Partial<User>) => {
    if (!user) return { success: false, error: 'Usuário não logado' }

    try {
      const { data, error } = await supabase
        .from('users')
        .update({
          ...userData,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)
        .select()
        .single()

      if (error) throw error

      setUser(data)
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}
