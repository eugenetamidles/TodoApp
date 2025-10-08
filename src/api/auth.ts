import {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
  PasswordResetRequest,
  User,
} from '@/types'
import { mockUser, apiDelay } from './mockData'

// Mock auth service
class AuthService {
  private static readonly TOKEN_KEY = 'auth_token'
  private static readonly USER_KEY = 'auth_user'

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await apiDelay()

    // Simple mock validation
    if (credentials.email === 'user@example.com' && credentials.password === 'password') {
      const token = this.generateToken()
      const user = mockUser

      // Store in localStorage if remember me
      if (credentials.rememberMe) {
        this.setToken(token)
        this.setUser(user)
      } else {
        sessionStorage.setItem(AuthService.TOKEN_KEY, token)
        sessionStorage.setItem(AuthService.USER_KEY, JSON.stringify(user))
      }

      return { user, token }
    }

    throw new Error('Invalid email or password')
  }

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    await apiDelay()

    const user: User = {
      ...mockUser,
      email: credentials.email,
      name: credentials.name,
      id: Date.now().toString(),
    }

    const token = this.generateToken()

    this.setToken(token)
    this.setUser(user)

    return { user, token }
  }

  async logout(): Promise<void> {
    await apiDelay(100)

    localStorage.removeItem(AuthService.TOKEN_KEY)
    localStorage.removeItem(AuthService.USER_KEY)
    sessionStorage.removeItem(AuthService.TOKEN_KEY)
    sessionStorage.removeItem(AuthService.USER_KEY)
  }

  async requestPasswordReset(data: PasswordResetRequest): Promise<void> {
    await apiDelay()

    // In a real app, this would send an email
    console.log('Password reset email would be sent to:', data.email)
  }

  async getCurrentUser(): Promise<User | null> {
    await apiDelay(100)

    const token = this.getToken()
    if (!token) return null

    const userJson = this.getStoredUser()
    if (!userJson) return null

    try {
      return JSON.parse(userJson)
    } catch {
      return null
    }
  }

  async updateProfile(userId: string, updates: Partial<User>): Promise<User> {
    await apiDelay()

    const currentUser = await this.getCurrentUser()
    if (!currentUser) throw new Error('Not authenticated')

    const updatedUser = { ...currentUser, ...updates, updatedAt: new Date() }
    this.setUser(updatedUser)

    return updatedUser
  }

  async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    await apiDelay()

    // Mock validation
    if (oldPassword !== 'password') {
      throw new Error('Current password is incorrect')
    }

    // In a real app, this would update the password in the backend
    console.log('Password would be changed to:', newPassword)
  }

  async deleteAccount(userId: string): Promise<void> {
    await apiDelay()

    // Clear all data
    await this.logout()

    // In a real app, this would delete the user account in the backend
    console.log('Account would be deleted for user:', userId)
  }

  // Helper methods
  private generateToken(): string {
    return `mock-jwt-token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  private getToken(): string | null {
    return (
      localStorage.getItem(AuthService.TOKEN_KEY) ||
      sessionStorage.getItem(AuthService.TOKEN_KEY)
    )
  }

  private setToken(token: string): void {
    localStorage.setItem(AuthService.TOKEN_KEY, token)
  }

  private getStoredUser(): string | null {
    return (
      localStorage.getItem(AuthService.USER_KEY) ||
      sessionStorage.getItem(AuthService.USER_KEY)
    )
  }

  private setUser(user: User): void {
    localStorage.setItem(AuthService.USER_KEY, JSON.stringify(user))
  }

  isAuthenticated(): boolean {
    return !!this.getToken()
  }
}

export const authService = new AuthService()
