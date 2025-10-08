import { User, Task, List, Tag, TaskStatus, TaskPriority } from '@/types'

// Mock User
export const mockUser: User = {
  id: '1',
  email: 'user@example.com',
  name: 'John Doe',
  createdAt: new Date(),
  updatedAt: new Date(),
  preferences: {
    theme: 'auto',
    defaultView: 'list',
    defaultSortOrder: 'due_date',
    density: 'comfortable',
    firstDayOfWeek: 0,
    notifications: {
      browserNotifications: true,
      emailNotifications: false,
      defaultTiming: '15min',
    },
    taskDefaults: {
      autoArchiveCompleted: false,
      confirmBeforeDelete: true,
    },
  },
}

// Mock Lists
export const mockLists: List[] = [
  {
    id: 'inbox',
    userId: '1',
    name: 'Inbox',
    color: '#3b82f6',
    position: 0,
    isDefault: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'today',
    userId: '1',
    name: 'Today',
    color: '#10b981',
    position: 1,
    isDefault: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'upcoming',
    userId: '1',
    name: 'Upcoming',
    color: '#f59e0b',
    position: 2,
    isDefault: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'work',
    userId: '1',
    name: 'Work',
    color: '#8b5cf6',
    position: 3,
    isDefault: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'personal',
    userId: '1',
    name: 'Personal',
    color: '#ec4899',
    position: 4,
    isDefault: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

// Mock Tags
export const mockTags: Tag[] = [
  {
    id: 'urgent',
    userId: '1',
    name: 'Urgent',
    color: '#ef4444',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'important',
    userId: '1',
    name: 'Important',
    color: '#f97316',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'meeting',
    userId: '1',
    name: 'Meeting',
    color: '#3b82f6',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'research',
    userId: '1',
    name: 'Research',
    color: '#06b6d4',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

// Mock Tasks
export const mockTasks: Task[] = [
  {
    id: '1',
    userId: '1',
    title: 'Complete project proposal',
    description: 'Finish the Q1 project proposal and send it to the team for review',
    status: 'active' as TaskStatus,
    priority: 'high' as TaskPriority,
    dueDate: new Date(Date.now() + 86400000), // Tomorrow
    listId: 'work',
    position: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: [mockTags[0], mockTags[1]],
    subtasks: [
      {
        id: 's1',
        taskId: '1',
        title: 'Research market trends',
        completed: true,
        position: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 's2',
        taskId: '1',
        title: 'Write executive summary',
        completed: false,
        position: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 's3',
        taskId: '1',
        title: 'Create budget breakdown',
        completed: false,
        position: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
  {
    id: '2',
    userId: '1',
    title: 'Team meeting at 2pm',
    description: 'Discuss sprint planning and upcoming deadlines',
    status: 'active' as TaskStatus,
    priority: 'medium' as TaskPriority,
    dueDate: new Date(), // Today
    listId: 'work',
    position: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: [mockTags[2]],
    subtasks: [],
  },
  {
    id: '3',
    userId: '1',
    title: 'Buy groceries',
    description: 'Milk, eggs, bread, vegetables',
    status: 'active' as TaskStatus,
    priority: 'low' as TaskPriority,
    listId: 'personal',
    position: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: [],
    subtasks: [],
  },
  {
    id: '4',
    userId: '1',
    title: 'Review pull requests',
    description: '',
    status: 'active' as TaskStatus,
    priority: 'medium' as TaskPriority,
    dueDate: new Date(Date.now() + 2 * 86400000), // 2 days from now
    listId: 'work',
    position: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: [],
    subtasks: [],
  },
  {
    id: '5',
    userId: '1',
    title: 'Call dentist',
    description: 'Schedule annual checkup',
    status: 'completed' as TaskStatus,
    priority: 'low' as TaskPriority,
    listId: 'personal',
    position: 1,
    createdAt: new Date(Date.now() - 7 * 86400000),
    updatedAt: new Date(),
    completedAt: new Date(),
    tags: [],
    subtasks: [],
  },
  {
    id: '6',
    userId: '1',
    title: 'Research new technologies',
    description: 'Look into latest frontend frameworks and tools',
    status: 'active' as TaskStatus,
    priority: 'none' as TaskPriority,
    listId: 'work',
    position: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: [mockTags[3]],
    subtasks: [],
  },
]

// Helper functions for generating IDs
let idCounter = 100

export function generateId(): string {
  return `${idCounter++}`
}

// Simulated delay for API calls
export const apiDelay = (ms: number = 300) =>
  new Promise((resolve) => setTimeout(resolve, ms))
