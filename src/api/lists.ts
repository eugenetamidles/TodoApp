import { List, CreateListInput, UpdateListInput } from '@/types'
import { mockLists, generateId, apiDelay } from './mockData'

class ListService {
  private lists: List[] = [...mockLists]

  async getLists(): Promise<List[]> {
    await apiDelay()
    return [...this.lists].sort((a, b) => a.position - b.position)
  }

  async getListById(id: string): Promise<List | null> {
    await apiDelay()
    return this.lists.find((list) => list.id === id) || null
  }

  async createList(input: CreateListInput): Promise<List> {
    await apiDelay()

    const newList: List = {
      id: generateId(),
      userId: '1',
      name: input.name,
      color: input.color,
      position: this.lists.length,
      isDefault: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.lists.push(newList)
    return newList
  }

  async updateList(id: string, input: UpdateListInput): Promise<List> {
    await apiDelay()

    const index = this.lists.findIndex((list) => list.id === id)
    if (index === -1) throw new Error('List not found')

    // Don't allow updating default lists' core properties
    if (this.lists[index].isDefault && (input.name || input.color)) {
      throw new Error('Cannot update default list properties')
    }

    this.lists[index] = {
      ...this.lists[index],
      ...input,
      updatedAt: new Date(),
    }

    return this.lists[index]
  }

  async deleteList(id: string): Promise<void> {
    await apiDelay()

    const list = this.lists.find((l) => l.id === id)
    if (!list) throw new Error('List not found')

    if (list.isDefault) {
      throw new Error('Cannot delete default lists')
    }

    const index = this.lists.findIndex((l) => l.id === id)
    this.lists.splice(index, 1)
  }

  async reorderLists(listIds: string[]): Promise<void> {
    await apiDelay()

    listIds.forEach((id, index) => {
      const list = this.lists.find((l) => l.id === id)
      if (list) {
        list.position = index
        list.updatedAt = new Date()
      }
    })
  }

  reset(): void {
    this.lists = [...mockLists]
  }
}

export const listService = new ListService()
