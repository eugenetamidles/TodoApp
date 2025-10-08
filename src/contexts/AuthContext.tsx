import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, LoginCredentials, RegisterCredentials } from '@/types'
import { authService } from '@/api/auth'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  register: (credentials: RegisterCredentials) => Promise<void>
  logout: () => Promise<void>
  updateUser: (updates: Partial<User>) => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    authService
      .getCurrentUser()
      .then((user) => setUser(user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  const login = async (credentials: LoginCredentials) => {
    const { user } = await authService.login(credentials)
    setUser(user)
  }

  const register = async (credentials: RegisterCredentials) => {
    const { user } = await authService.register(credentials)
    setUser(user)
  }

  const logout = async () => {
    await authService.logout()
    setUser(null)
  }

  const updateUser = async (updates: Partial<User>) => {
    if (!user) throw new Error('No user logged in')
    const updatedUser = await authService.updateProfile(user.id, updates)
    setUser(updatedUser)
  }

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
