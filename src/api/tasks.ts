import {
  Task,
  CreateTaskInput,
  UpdateTaskInput,
  FilterOptions,
  SortOrder,
  TaskStatus,
} from '@/types'
import { mockTasks, mockTags, generateId, apiDelay } from './mockData'

class TaskService {
  private tasks: Task[] = [...mockTasks]

  async getTasks(filters?: FilterOptions, sortOrder?: SortOrder): Promise<Task[]> {
    await apiDelay()

    let filtered = [...this.tasks]

    // Apply filters
    if (filters) {
      if (filters.status && filters.status.length > 0) {
        filtered = filtered.filter((task) => filters.status!.includes(task.status))
      }

      if (filters.priority && filters.priority.length > 0) {
        filtered = filtered.filter((task) => filters.priority!.includes(task.priority))
      }

      if (filters.listId) {
        filtered = filtered.filter((task) => task.listId === filters.listId)
      }

      if (filters.tags && filters.tags.length > 0) {
        filtered = filtered.filter((task) =>
          task.tags.some((tag) => filters.tags!.includes(tag.id))
        )
      }

      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase()
        filtered = filtered.filter(
          (task) =>
            task.title.toLowerCase().includes(query) ||
            task.description?.toLowerCase().includes(query)
        )
      }

      if (filters.dueDate) {
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        const weekFromNow = new Date(today)
        weekFromNow.setDate(weekFromNow.getDate() + 7)

        switch (filters.dueDate) {
          case 'overdue':
            filtered = filtered.filter((task) => task.dueDate && task.dueDate < today)
            break
          case 'today':
            filtered = filtered.filter(
              (task) =>
                task.dueDate &&
                task.dueDate >= today &&
                task.dueDate < tomorrow
            )
            break
          case 'tomorrow':
            filtered = filtered.filter(
              (task) =>
                task.dueDate &&
                task.dueDate >= tomorrow &&
                task.dueDate < new Date(tomorrow.getTime() + 86400000)
            )
            break
          case 'this_week':
            filtered = filtered.filter(
              (task) =>
                task.dueDate &&
                task.dueDate >= today &&
                task.dueDate < weekFromNow
            )
            break
          case 'no_date':
            filtered = filtered.filter((task) => !task.dueDate)
            break
        }
      }
    }

    // Apply sorting
    if (sortOrder) {
      filtered.sort((a, b) => {
        switch (sortOrder) {
          case 'due_date':
            if (!a.dueDate && !b.dueDate) return 0
            if (!a.dueDate) return 1
            if (!b.dueDate) return -1
            return a.dueDate.getTime() - b.dueDate.getTime()
          case 'priority':
            const priorityOrder = { high: 0, medium: 1, low: 2, none: 3 }
            return priorityOrder[a.priority] - priorityOrder[b.priority]
          case 'created_at':
            return b.createdAt.getTime() - a.createdAt.getTime()
          case 'alphabetical':
            return a.title.localeCompare(b.title)
          case 'manual':
            return a.position - b.position
          default:
            return 0
        }
      })
    }

    return filtered
  }

  async getTaskById(id: string): Promise<Task | null> {
    await apiDelay()
    return this.tasks.find((task) => task.id === id) || null
  }

  async createTask(input: CreateTaskInput): Promise<Task> {
    await apiDelay()

    const newTask: Task = {
      id: generateId(),
      userId: '1',
      title: input.title,
      description: input.description,
      status: 'active' as TaskStatus,
      priority: input.priority || 'none',
      dueDate: input.dueDate,
      listId: input.listId || 'inbox',
      position: this.tasks.length,
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: input.tags
        ? mockTags.filter((tag) => input.tags!.includes(tag.id))
        : [],
      subtasks: [],
    }

    this.tasks.push(newTask)
    return newTask
  }

  async updateTask(id: string, input: UpdateTaskInput): Promise<Task> {
    await apiDelay()

    const index = this.tasks.findIndex((task) => task.id === id)
    if (index === -1) throw new Error('Task not found')

    const updatedTask: Task = {
      ...this.tasks[index],
      ...input,
      updatedAt: new Date(),
      ...(input.status === 'completed' && !this.tasks[index].completedAt
        ? { completedAt: new Date() }
        : {}),
    }

    if (input.tags) {
      updatedTask.tags = mockTags.filter((tag) => input.tags!.includes(tag.id))
    }

    this.tasks[index] = updatedTask
    return updatedTask
  }

  async deleteTask(id: string, permanent: boolean = false): Promise<void> {
    await apiDelay()

    const index = this.tasks.findIndex((task) => task.id === id)
    if (index === -1) throw new Error('Task not found')

    if (permanent) {
      this.tasks.splice(index, 1)
    } else {
      // Soft delete
      this.tasks[index] = {
        ...this.tasks[index],
        deletedAt: new Date(),
        status: 'archived' as TaskStatus,
      }
    }
  }

  async restoreTask(id: string): Promise<Task> {
    await apiDelay()

    const index = this.tasks.findIndex((task) => task.id === id)
    if (index === -1) throw new Error('Task not found')

    this.tasks[index] = {
      ...this.tasks[index],
      deletedAt: undefined,
      status: 'active' as TaskStatus,
      updatedAt: new Date(),
    }

    return this.tasks[index]
  }

  async toggleTaskStatus(id: string): Promise<Task> {
    await apiDelay()

    const index = this.tasks.findIndex((task) => task.id === id)
    if (index === -1) throw new Error('Task not found')

    const newStatus: TaskStatus =
      this.tasks[index].status === 'completed' ? 'active' : 'completed'

    this.tasks[index] = {
      ...this.tasks[index],
      status: newStatus,
      completedAt: newStatus === 'completed' ? new Date() : undefined,
      updatedAt: new Date(),
    }

    return this.tasks[index]
  }

  async bulkDeleteTasks(ids: string[]): Promise<void> {
    await apiDelay()

    this.tasks = this.tasks.filter((task) => !ids.includes(task.id))
  }

  async reorderTasks(taskIds: string[]): Promise<void> {
    await apiDelay()

    taskIds.forEach((id, index) => {
      const task = this.tasks.find((t) => t.id === id)
      if (task) {
        task.position = index
        task.updatedAt = new Date()
      }
    })
  }

  // Reset to initial state (for testing)
  reset(): void {
    this.tasks = [...mockTasks]
  }
}

export const taskService = new TaskService()
