import { create } from 'zustand'
import { List, CreateListInput, UpdateListInput } from '@/types'
import { listService } from '@/api/lists'

interface ListState {
  lists: List[]
  loading: boolean
  error: string | null
  selectedListId: string | null

  // Actions
  fetchLists: () => Promise<void>
  createList: (input: CreateListInput) => Promise<List>
  updateList: (id: string, input: UpdateListInput) => Promise<List>
  deleteList: (id: string) => Promise<void>
  reorderLists: (listIds: string[]) => Promise<void>
  setSelectedList: (id: string | null) => void
}

export const useListStore = create<ListState>((set, get) => ({
  lists: [],
  loading: false,
  error: null,
  selectedListId: null,

  fetchLists: async () => {
    set({ loading: true, error: null })
    try {
      const lists = await listService.getLists()
      set({ lists, loading: false })
    } catch (error) {
      set({ error: (error as Error).message, loading: false })
    }
  },

  createList: async (input: CreateListInput) => {
    try {
      const list = await listService.createList(input)
      set((state) => ({ lists: [...state.lists, list] }))
      return list
    } catch (error) {
      set({ error: (error as Error).message })
      throw error
    }
  },

  updateList: async (id: string, input: UpdateListInput) => {
    try {
      const updatedList = await listService.updateList(id, input)
      set((state) => ({
        lists: state.lists.map((list) =>
          list.id === id ? updatedList : list
        ),
      }))
      return updatedList
    } catch (error) {
      set({ error: (error as Error).message })
      throw error
    }
  },

  deleteList: async (id: string) => {
    try {
      await listService.deleteList(id)
      set((state) => ({
        lists: state.lists.filter((list) => list.id !== id),
      }))
    } catch (error) {
      set({ error: (error as Error).message })
      throw error
    }
  },

  reorderLists: async (listIds: string[]) => {
    try {
      await listService.reorderLists(listIds)
      await get().fetchLists()
    } catch (error) {
      set({ error: (error as Error).message })
      throw error
    }
  },

  setSelectedList: (id: string | null) => {
    set({ selectedListId: id })
  },
}))
