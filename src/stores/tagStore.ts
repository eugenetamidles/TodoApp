import { create } from 'zustand'
import { Tag, CreateTagInput } from '@/types'
import { tagService } from '@/api/tags'

interface TagState {
  tags: Tag[]
  loading: boolean
  error: string | null

  // Actions
  fetchTags: () => Promise<void>
  createTag: (input: CreateTagInput) => Promise<Tag>
  updateTag: (id: string, input: Partial<CreateTagInput>) => Promise<Tag>
  deleteTag: (id: string) => Promise<void>
  mergeTags: (sourceId: string, targetId: string) => Promise<void>
}

export const useTagStore = create<TagState>((set, get) => ({
  tags: [],
  loading: false,
  error: null,

  fetchTags: async () => {
    set({ loading: true, error: null })
    try {
      const tags = await tagService.getTags()
      set({ tags, loading: false })
    } catch (error) {
      set({ error: (error as Error).message, loading: false })
    }
  },

  createTag: async (input: CreateTagInput) => {
    try {
      const tag = await tagService.createTag(input)
      set((state) => ({ tags: [...state.tags, tag] }))
      return tag
    } catch (error) {
      set({ error: (error as Error).message })
      throw error
    }
  },

  updateTag: async (id: string, input: Partial<CreateTagInput>) => {
    try {
      const updatedTag = await tagService.updateTag(id, input)
      set((state) => ({
        tags: state.tags.map((tag) => (tag.id === id ? updatedTag : tag)),
      }))
      return updatedTag
    } catch (error) {
      set({ error: (error as Error).message })
      throw error
    }
  },

  deleteTag: async (id: string) => {
    try {
      await tagService.deleteTag(id)
      set((state) => ({
        tags: state.tags.filter((tag) => tag.id !== id),
      }))
    } catch (error) {
      set({ error: (error as Error).message })
      throw error
    }
  },

  mergeTags: async (sourceId: string, targetId: string) => {
    try {
      await tagService.mergeTags(sourceId, targetId)
      set((state) => ({
        tags: state.tags.filter((tag) => tag.id !== sourceId),
      }))
    } catch (error) {
      set({ error: (error as Error).message })
      throw error
    }
  },
}))
