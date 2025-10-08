import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low' | 'none';
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

interface TaskStore {
  tasks: Task[];
  addTask: (title: string) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  searchTasks: (query: string) => Task[];
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],

      addTask: (title: string) => {
        const newTask: Task = {
          id: crypto.randomUUID(),
          title,
          completed: false,
          priority: 'none',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({ tasks: [...state.tasks, newTask] }));
      },

      updateTask: (id: string, updates: Partial<Task>) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? { ...task, ...updates, updatedAt: new Date().toISOString() }
              : task
          ),
        }));
      },

      deleteTask: (id: string) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },

      toggleTask: (id: string) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() }
              : task
          ),
        }));
      },

      searchTasks: (query: string) => {
        const { tasks } = get();
        const lowercaseQuery = query.toLowerCase();
        return tasks.filter(
          (task) =>
            task.title.toLowerCase().includes(lowercaseQuery) ||
            task.description?.toLowerCase().includes(lowercaseQuery)
        );
      },
    }),
    {
      name: 'todo-storage',
    }
  )
);
