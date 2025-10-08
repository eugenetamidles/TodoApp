import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { CheckSquare, Mail, Lock, Moon, Sun } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-black dark:to-gray-900 transition-colors duration-300">
      <div className="w-full max-w-md px-6">
        {/* Theme Toggle */}
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleTheme}
            className="p-3 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md border border-transparent dark:border-gray-600"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* Logo and Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4 shadow-lg">
            <CheckSquare className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            TaskApp
          </h1>
          <p className="text-muted-foreground mt-2">
            {isLogin ? 'Welcome back! Sign in to continue' : 'Create your account to get started'}
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white dark:bg-gray-800/95 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 backdrop-blur-sm transition-all duration-300">
          <div className="space-y-5">
            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-foreground">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  className="w-full pl-11 pr-4 py-3 border-2 border-input rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-foreground">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="password"
                  type="password"
                  className="w-full pl-11 pr-4 py-3 border-2 border-input rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Forgot Password (Login only) */}
            {isLogin && (
              <div className="flex justify-end">
                <button className="text-sm text-primary hover:underline font-medium">
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full bg-gradient-to-r from-primary to-purple-600 text-primary-foreground py-3.5 rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all font-semibold text-lg"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-gray-800 text-muted-foreground">or</span>
            </div>
          </div>

          {/* Toggle Auth Mode */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-primary hover:underline font-semibold"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
