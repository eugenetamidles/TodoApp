import { useState, useEffect } from 'react';
import type { Task } from '../stores/taskStore';
import { X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

interface TaskDetailModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
}

export default function TaskDetailModal({ task, isOpen, onClose, onUpdate }: TaskDetailModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('none');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setPriority(task.priority);
      setDueDate(task.dueDate || '');
    }
  }, [task]);

  const handleSave = () => {
    if (task && title.trim()) {
      onUpdate(task.id, {
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
        dueDate: dueDate || undefined,
      });
      onClose();
    }
  };

  if (!task) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="title" className="text-sm font-medium">
              Title
            </Label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-2 px-3 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 hover:border-primary/50"
              maxLength={200}
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-2 px-3 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent min-h-[100px] transition-all duration-200 hover:border-primary/50 resize-none"
              maxLength={2000}
            />
          </div>

          <div>
            <Label htmlFor="priority" className="text-sm font-medium">
              Priority
            </Label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Task['priority'])}
              className="w-full mt-2 px-3 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 hover:border-primary/50 cursor-pointer hover:shadow-md"
            >
              <option value="none">None</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <Label htmlFor="dueDate" className="text-sm font-medium">
              Due Date
            </Label>
            <input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full mt-2 px-3 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 hover:border-primary/50 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 text-gray-900 dark:text-gray-100 font-medium hover:scale-105 active:scale-95 hover:shadow-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 bg-gradient-to-r from-primary to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 font-medium hover:scale-105 active:scale-95 hover:brightness-110"
          >
            Save Changes
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
