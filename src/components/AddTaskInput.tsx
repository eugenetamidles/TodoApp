import { useState, FormEvent } from 'react';
import { Plus, Sparkles } from 'lucide-react';

interface AddTaskInputProps {
  onAdd: (title: string) => void;
}

export default function AddTaskInput({ onAdd }: AddTaskInputProps) {
  const [title, setTitle] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim());
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className={`relative flex gap-3 transition-all duration-200 ${isFocused ? 'scale-[1.01]' : ''}`}>
        <div className="relative flex-1">
          <Sparkles className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="What's on your mind? Add a new task..."
            className="w-full pl-12 pr-4 py-4 border-2 border-input rounded-xl bg-gradient-to-r from-white to-blue-50/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
            maxLength={200}
          />
        </div>
        <button
          type="submit"
          disabled={!title.trim()}
          className="px-8 py-4 bg-gradient-to-r from-primary to-purple-600 text-primary-foreground rounded-xl hover:shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all font-semibold flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">Add Task</span>
        </button>
      </div>
    </form>
  );
}
