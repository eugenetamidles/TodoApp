// User Types
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: Date
  updatedAt: Date
  preferences: UserPreferences
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto'
  defaultView: 'list' | 'card' | 'calendar'
  defaultSortOrder: SortOrder
  density: 'compact' | 'comfortable'
  firstDayOfWeek: number
  notifications: NotificationPreferences
  taskDefaults: TaskDefaults
}

export interface NotificationPreferences {
  browserNotifications: boolean
  emailNotifications: boolean
  defaultTiming: NotificationTiming
  quietHours?: {
    start: string
    end: string
  }
}

export type NotificationTiming = 'at_time' | '15min' | '1hour' | '1day'

export interface TaskDefaults {
  defaultListId?: string
  autoArchiveCompleted: boolean
  autoArchiveDelay?: number
  confirmBeforeDelete: boolean
}

// Task Types
export interface Task {
  id: string
  userId: string
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  dueDate?: Date
  listId?: string
  position: number
  createdAt: Date
  updatedAt: Date
  completedAt?: Date
  deletedAt?: Date
  tags: Tag[]
  subtasks: Subtask[]
}

export type TaskStatus = 'active' | 'completed' | 'archived'
export type TaskPriority = 'none' | 'low' | 'medium' | 'high'

// List Types
export interface List {
  id: string
  userId: string
  name: string
  color: string
  position: number
  isDefault: boolean
  createdAt: Date
  updatedAt: Date
}

// Tag Types
export interface Tag {
  id: string
  userId: string
  name: string
  color: string
  createdAt: Date
  updatedAt: Date
}

// Subtask Types
export interface Subtask {
  id: string
  taskId: string
  title: string
  completed: boolean
  position: number
  createdAt: Date
  updatedAt: Date
}

// Filter & Sort Types
export interface FilterOptions {
  status?: TaskStatus[]
  priority?: TaskPriority[]
  dueDate?: DueDateFilter
  tags?: string[]
  listId?: string
  searchQuery?: string
}

export type DueDateFilter = 'overdue' | 'today' | 'tomorrow' | 'this_week' | 'no_date' | 'all'

export type SortOrder = 'due_date' | 'priority' | 'created_at' | 'alphabetical' | 'manual'

export interface SavedFilter {
  id: string
  userId: string
  name: string
  filters: FilterOptions
  sortOrder: SortOrder
  createdAt: Date
}

// Notification Types
export interface Notification {
  id: string
  userId: string
  taskId: string
  type: NotificationType
  message: string
  read: boolean
  createdAt: Date
}

export type NotificationType = 'due_soon' | 'overdue' | 'reminder'

// Form Types
export interface CreateTaskInput {
  title: string
  description?: string
  priority?: TaskPriority
  dueDate?: Date
  listId?: string
  tags?: string[]
}

export interface UpdateTaskInput extends Partial<CreateTaskInput> {
  status?: TaskStatus
  position?: number
}

export interface CreateListInput {
  name: string
  color: string
}

export interface UpdateListInput extends Partial<CreateListInput> {
  position?: number
}

export interface CreateTagInput {
  name: string
  color: string
}

export interface CreateSubtaskInput {
  title: string
  taskId: string
}

export interface UpdateSubtaskInput {
  title?: string
  completed?: boolean
  position?: number
}

// Auth Types
export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterCredentials {
  email: string
  password: string
  name: string
}

export interface AuthResponse {
  user: User
  token: string
}

export interface PasswordResetRequest {
  email: string
}

export interface PasswordResetConfirm {
  token: string
  newPassword: string
}

// Export/Import Types
export interface ExportData {
  version: string
  exportDate: Date
  tasks: Task[]
  lists: List[]
  tags: Tag[]
  subtasks: Subtask[]
}

export type ExportFormat = 'json' | 'csv'

// API Response Types
export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface ApiError {
  message: string
  code: string
  details?: Record<string, unknown>
}

// Pagination Types
export interface PaginationParams {
  page: number
  limit: number
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
