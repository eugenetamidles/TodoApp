import { Tag, CreateTagInput } from '@/types'
import { mockTags, generateId, apiDelay } from './mockData'

class TagService {
  private tags: Tag[] = [...mockTags]

  async getTags(): Promise<Tag[]> {
    await apiDelay()
    return [...this.tags].sort((a, b) => a.name.localeCompare(b.name))
  }

  async getTagById(id: string): Promise<Tag | null> {
    await apiDelay()
    return this.tags.find((tag) => tag.id === id) || null
  }

  async createTag(input: CreateTagInput): Promise<Tag> {
    await apiDelay()

    // Check if tag with same name already exists
    const existing = this.tags.find(
      (tag) => tag.name.toLowerCase() === input.name.toLowerCase()
    )
    if (existing) throw new Error('Tag with this name already exists')

    const newTag: Tag = {
      id: generateId(),
      userId: '1',
      name: input.name,
      color: input.color,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.tags.push(newTag)
    return newTag
  }

  async updateTag(id: string, input: Partial<CreateTagInput>): Promise<Tag> {
    await apiDelay()

    const index = this.tags.findIndex((tag) => tag.id === id)
    if (index === -1) throw new Error('Tag not found')

    // Check for name conflicts
    if (input.name) {
      const existing = this.tags.find(
        (tag) =>
          tag.id !== id && tag.name.toLowerCase() === input.name!.toLowerCase()
      )
      if (existing) throw new Error('Tag with this name already exists')
    }

    this.tags[index] = {
      ...this.tags[index],
      ...input,
      updatedAt: new Date(),
    }

    return this.tags[index]
  }

  async deleteTag(id: string): Promise<void> {
    await apiDelay()

    const index = this.tags.findIndex((tag) => tag.id === id)
    if (index === -1) throw new Error('Tag not found')

    this.tags.splice(index, 1)
  }

  async mergeTags(sourceId: string, targetId: string): Promise<void> {
    await apiDelay()

    const sourceIndex = this.tags.findIndex((tag) => tag.id === sourceId)
    const targetIndex = this.tags.findIndex((tag) => tag.id === targetId)

    if (sourceIndex === -1 || targetIndex === -1) {
      throw new Error('Tag not found')
    }

    // In a real app, this would also update all tasks using the source tag
    this.tags.splice(sourceIndex, 1)
  }

  reset(): void {
    this.tags = [...mockTags]
  }
}

export const tagService = new TagService()
