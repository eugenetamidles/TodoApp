import { Trash2, Edit, Clock, Flag } from 'lucide-react';
import type { Task } from '../stores/taskStore';
import { Checkbox } from '@/components/ui/checkbox';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

export default function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  const priorityConfig = {
    high: {
      border: 'border-l-red-500',
      badge: 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300',
      icon: 'text-red-500 dark:text-red-400'
    },
    medium: {
      border: 'border-l-yellow-500',
      badge: 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300',
      icon: 'text-yellow-500 dark:text-yellow-400'
    },
    low: {
      border: 'border-l-blue-500',
      badge: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300',
      icon: 'text-blue-500 dark:text-blue-400'
    },
    none: {
      border: 'border-l-gray-200 dark:border-l-gray-600',
      badge: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
      icon: 'text-gray-400 dark:text-gray-500'
    },
  };

  const config = priorityConfig[task.priority];

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  // Color coding based on status
  const statusStyles = task.completed
    ? 'bg-green-50 dark:bg-green-900/20 border-l-green-500 border-green-200 dark:border-green-800'
    : `bg-white dark:bg-gray-800/80 ${config.border} border-gray-100 dark:border-gray-700`;

  return (
    <div
      className={`group relative flex items-start gap-4 p-5 rounded-xl border-l-4 hover:shadow-lg transition-all duration-300 hover:scale-[1.01] cursor-pointer border ${statusStyles}`}
      onClick={() => onEdit(task)}
    >
      {/* Checkbox */}
      <div onClick={(e) => e.stopPropagation()}>
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => onToggle(task.id)}
          className="mt-1 w-5 h-5"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3
            className={`font-semibold text-lg ${
              task.completed
                ? 'line-through text-green-600 dark:text-green-400'
                : 'text-foreground'
            }`}
          >
            {task.title}
          </h3>

          <div className="flex items-center gap-2 shrink-0">
            {/* Completed Badge */}
            {task.completed && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 animate-in fade-in duration-200">
                ✓ Completed
              </span>
            )}

            {/* Priority Badge */}
            {task.priority !== 'none' && !task.completed && (
              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${config.badge}`}>
                <Flag className={`w-3 h-3 ${config.icon}`} />
                {task.priority}
              </span>
            )}
          </div>
        </div>

        {task.description && (
          <p className={`text-sm mb-3 ${task.completed ? 'text-green-600/70 dark:text-green-400/70 line-through' : 'text-muted-foreground'}`}>
            {task.description}
          </p>
        )}

        {/* Due Date */}
        {task.dueDate && (
          <div className="flex items-center gap-2">
            <Clock className={`w-4 h-4 ${isOverdue ? 'text-red-500 dark:text-red-400' : 'text-muted-foreground'}`} />
            <span className={`text-xs font-medium ${isOverdue ? 'text-red-600 dark:text-red-400' : 'text-muted-foreground'}`}>
              {isOverdue && 'Overdue: '}
              {new Date(task.dueDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div
        className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => onEdit(task)}
          className="p-2.5 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
          aria-label="Edit task"
        >
          <Edit className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="p-2.5 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
          aria-label="Delete task"
        >
          <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
        </button>
      </div>
    </div>
  );
}
