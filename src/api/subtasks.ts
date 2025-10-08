import { Subtask, CreateSubtaskInput, UpdateSubtaskInput } from '@/types'
import { generateId, apiDelay } from './mockData'
import { taskService } from './tasks'

class SubtaskService {
  async getSubtasks(taskId: string): Promise<Subtask[]> {
    await apiDelay()

    const task = await taskService.getTaskById(taskId)
    if (!task) throw new Error('Task not found')

    return task.subtasks.sort((a, b) => a.position - b.position)
  }

  async createSubtask(input: CreateSubtaskInput): Promise<Subtask> {
    await apiDelay()

    const task = await taskService.getTaskById(input.taskId)
    if (!task) throw new Error('Task not found')

    const newSubtask: Subtask = {
      id: generateId(),
      taskId: input.taskId,
      title: input.title,
      completed: false,
      position: task.subtasks.length,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    task.subtasks.push(newSubtask)
    return newSubtask
  }

  async updateSubtask(
    taskId: string,
    subtaskId: string,
    input: UpdateSubtaskInput
  ): Promise<Subtask> {
    await apiDelay()

    const task = await taskService.getTaskById(taskId)
    if (!task) throw new Error('Task not found')

    const index = task.subtasks.findIndex((st) => st.id === subtaskId)
    if (index === -1) throw new Error('Subtask not found')

    task.subtasks[index] = {
      ...task.subtasks[index],
      ...input,
      updatedAt: new Date(),
    }

    return task.subtasks[index]
  }

  async toggleSubtask(taskId: string, subtaskId: string): Promise<Subtask> {
    await apiDelay()

    const task = await taskService.getTaskById(taskId)
    if (!task) throw new Error('Task not found')

    const index = task.subtasks.findIndex((st) => st.id === subtaskId)
    if (index === -1) throw new Error('Subtask not found')

    task.subtasks[index] = {
      ...task.subtasks[index],
      completed: !task.subtasks[index].completed,
      updatedAt: new Date(),
    }

    return task.subtasks[index]
  }

  async deleteSubtask(taskId: string, subtaskId: string): Promise<void> {
    await apiDelay()

    const task = await taskService.getTaskById(taskId)
    if (!task) throw new Error('Task not found')

    const index = task.subtasks.findIndex((st) => st.id === subtaskId)
    if (index === -1) throw new Error('Subtask not found')

    task.subtasks.splice(index, 1)
  }

  async reorderSubtasks(taskId: string, subtaskIds: string[]): Promise<void> {
    await apiDelay()

    const task = await taskService.getTaskById(taskId)
    if (!task) throw new Error('Task not found')

    subtaskIds.forEach((id, index) => {
      const subtask = task.subtasks.find((st) => st.id === id)
      if (subtask) {
        subtask.position = index
        subtask.updatedAt = new Date()
      }
    })
  }
}

export const subtaskService = new SubtaskService()
