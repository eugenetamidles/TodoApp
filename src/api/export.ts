import { ExportData, ExportFormat, Task } from '@/types'
import { taskService } from './tasks'
import { listService } from './lists'
import { tagService } from './tags'
import { apiDelay } from './mockData'

class ExportService {
  async exportData(format: ExportFormat): Promise<string> {
    await apiDelay()

    const tasks = await taskService.getTasks()
    const lists = await listService.getLists()
    const tags = await tagService.getTags()

    const exportData: ExportData = {
      version: '1.0',
      exportDate: new Date(),
      tasks,
      lists,
      tags,
      subtasks: tasks.flatMap((task) => task.subtasks),
    }

    if (format === 'json') {
      return JSON.stringify(exportData, null, 2)
    } else {
      return this.convertToCSV(exportData)
    }
  }

  async importData(data: string, format: ExportFormat): Promise<void> {
    await apiDelay()

    if (format === 'json') {
      const parsed: ExportData = JSON.parse(data)
      // Validation
      if (!parsed.version || !parsed.tasks) {
        throw new Error('Invalid import file format')
      }
      // In a real app, this would merge or replace existing data
      console.log('Would import:', parsed)
    } else {
      // Parse CSV
      console.log('Would import CSV data')
    }
  }

  private convertToCSV(data: ExportData): string {
    const headers = [
      'Title',
      'Description',
      'Status',
      'Priority',
      'Due Date',
      'List',
      'Tags',
      'Created At',
      'Completed At',
    ]

    const rows = data.tasks.map((task) => [
      this.escapeCSV(task.title),
      this.escapeCSV(task.description || ''),
      task.status,
      task.priority,
      task.dueDate ? task.dueDate.toISOString() : '',
      data.lists.find((l) => l.id === task.listId)?.name || '',
      task.tags.map((t) => t.name).join('; '),
      task.createdAt.toISOString(),
      task.completedAt ? task.completedAt.toISOString() : '',
    ])

    return [headers, ...rows].map((row) => row.join(',')).join('\n')
  }

  private escapeCSV(value: string): string {
    if (value.includes(',') || value.includes('"') || value.includes('\n')) {
      return `"${value.replace(/"/g, '""')}"`
    }
    return value
  }

  downloadFile(content: string, filename: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }
}

export const exportService = new ExportService()
