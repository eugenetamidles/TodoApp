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
      badge: 'bg-red-100 text-red-700',
      icon: 'text-red-500'
    },
    medium: {
      border: 'border-l-yellow-500',
      badge: 'bg-yellow-100 text-yellow-700',
      icon: 'text-yellow-500'
    },
    low: {
      border: 'border-l-blue-500',
      badge: 'bg-blue-100 text-blue-700',
      icon: 'text-blue-500'
    },
    none: {
      border: 'border-l-gray-200',
      badge: 'bg-gray-100 text-gray-700',
      icon: 'text-gray-400'
    },
  };

  const config = priorityConfig[task.priority];

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <div
      className={`group relative flex items-start gap-4 p-5 bg-white dark:bg-gray-800 rounded-xl border-l-4 ${config.border} hover:shadow-lg transition-all duration-200 hover:scale-[1.01] cursor-pointer`}
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
                ? 'line-through text-muted-foreground'
                : 'text-foreground'
            }`}
          >
            {task.title}
          </h3>

          {/* Priority Badge */}
          {task.priority !== 'none' && (
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${config.badge} shrink-0`}>
              <Flag className={`w-3 h-3 ${config.icon}`} />
              {task.priority}
            </span>
          )}
        </div>

        {task.description && (
          <p className={`text-sm mb-3 ${task.completed ? 'text-muted-foreground/70' : 'text-muted-foreground'}`}>
            {task.description}
          </p>
        )}

        {/* Due Date */}
        {task.dueDate && (
          <div className="flex items-center gap-2">
            <Clock className={`w-4 h-4 ${isOverdue ? 'text-red-500' : 'text-muted-foreground'}`} />
            <span className={`text-xs font-medium ${isOverdue ? 'text-red-600' : 'text-muted-foreground'}`}>
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
          className="p-2.5 hover:bg-blue-50 rounded-lg transition-colors"
          aria-label="Edit task"
        >
          <Edit className="w-4 h-4 text-blue-600" />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="p-2.5 hover:bg-red-50 rounded-lg transition-colors"
          aria-label="Delete task"
        >
          <Trash2 className="w-4 h-4 text-red-600" />
        </button>
      </div>
    </div>
  );
}
