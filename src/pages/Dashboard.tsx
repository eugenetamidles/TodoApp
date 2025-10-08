import { useState } from 'react';
import { useTaskStore } from '../stores/taskStore';
import type { Task } from '../stores/taskStore';
import { useTheme } from '../contexts/ThemeContext';
import AddTaskInput from '../components/AddTaskInput';
import TaskList from '../components/TaskList';
import TaskDetailModal from '../components/TaskDetailModal';
import { Search, CheckSquare, Menu, Settings, LogOut, Home, ChevronRight, Moon, Sun } from 'lucide-react';

export default function Dashboard() {
  const { tasks, addTask, toggleTask, deleteTask, updateTask, searchTasks } = useTaskStore();
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const displayTasks = searchQuery ? searchTasks(searchQuery) : tasks;
  const completedCount = tasks.filter(t => t.completed).length;
  const activeCount = tasks.filter(t => !t.completed).length;

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-black dark:to-gray-900 transition-colors duration-300">
      {/* Header/Navbar */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-border sticky top-0 z-10 shadow-sm transition-colors duration-300">
        <div className="container mx-auto px-4 py-4 max-w-6xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-xl">
                <CheckSquare className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  TaskFlow
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 hover:bg-accent rounded-lg transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-muted-foreground" />
                )}
              </button>
              <button className="p-2 hover:bg-accent rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-muted-foreground" />
              </button>
              <button className="p-2 hover:bg-accent rounded-lg transition-colors">
                <LogOut className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <a href="/" className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
            <Home className="w-4 h-4" />
            <span>Home</span>
          </a>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <span className="font-semibold text-foreground">Dashboard</span>
          {searchQuery && (
            <>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Search: "{searchQuery}"</span>
            </>
          )}
        </nav>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-border transition-colors duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Total Tasks</p>
                <p className="text-3xl font-bold text-foreground mt-1">{tasks.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <CheckSquare className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-border transition-colors duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Active</p>
                <p className="text-3xl font-bold text-foreground mt-1">{activeCount}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-border transition-colors duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Completed</p>
                <p className="text-3xl font-bold text-foreground mt-1">{completedCount}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <div className="w-6 h-6 border-4 border-green-600 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-border p-6 md:p-8 transition-colors duration-300">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">Your Tasks</h2>
            <p className="text-muted-foreground">Stay organized and productive</p>
          </div>

          <AddTaskInput onAdd={addTask} />

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tasks..."
                className="w-full pl-12 pr-4 py-3 border-2 border-input rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
          </div>

          <TaskList
            tasks={displayTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onEdit={handleEditTask}
          />

          <TaskDetailModal
            task={selectedTask}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onUpdate={updateTask}
          />
        </main>
      </div>
    </div>
  );
}
