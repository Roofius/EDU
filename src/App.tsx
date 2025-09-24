import React, { useState } from 'react';
import { BookOpen, Users, Award, BarChart3, User, Menu, X, Settings } from 'lucide-react';
import Dashboard from './components/Dashboard';
import Courses from './components/Courses';
import Employees from './components/Employees';
import Certifications from './components/Certifications';
import Analytics from './components/Analytics';
import Profile from './components/Profile';
import AdminPanel from './components/AdminPanel';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAdmin] = useState(true); // В реальном приложении это будет из контекста пользователя

  const menuItems = [
    { id: 'dashboard', label: 'Панель управления', icon: BarChart3 },
    { id: 'courses', label: 'Курсы', icon: BookOpen },
    { id: 'employees', label: 'Сотрудники', icon: Users },
    { id: 'certifications', label: 'Сертификация', icon: Award },
    { id: 'analytics', label: 'Аналитика', icon: BarChart3 },
    { id: 'admin', label: 'Администрирование', icon: Settings, adminOnly: true },
    { id: 'profile', label: 'Профиль', icon: User },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'courses': return <Courses />;
      case 'employees': return <Employees />;
      case 'certifications': return <Certifications />;
      case 'analytics': return <Analytics />;
      case 'admin': return <AdminPanel />;
      case 'profile': return <Profile />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-indigo-200 rounded-full opacity-30 animate-bounce-slow"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-purple-200 rounded-full opacity-25 animate-pulse-slow"></div>
        <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-pink-200 rounded-full opacity-20 animate-float-reverse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-12 h-12 bg-cyan-200 rounded-full opacity-30 animate-spin-slow"></div>
      </div>

      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white/95 backdrop-blur-lg shadow-2xl transform transition-all duration-500 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="flex items-center justify-between h-20 px-6 border-b border-gray-200/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">EduPlatform</h1>
              <p className="text-xs text-gray-500">Система обучения</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-8 px-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            if (item.adminOnly && !isAdmin) return null;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-xl transition-all duration-300 group ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 hover:text-blue-700 hover:shadow-md hover:transform hover:scale-102'
                }`}
              >
                <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Info at Bottom */}
        <div className="absolute bottom-6 left-4 right-4">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 border border-gray-200/50">
            <div className="flex items-center space-x-3">
              <img
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
                alt="User"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-200"
              />
              <div>
                <p className="text-sm font-medium text-gray-800">Иван Иванов</p>
                <p className="text-xs text-gray-500">Администратор</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64 min-h-screen">
        <div className="p-6">
          <div className="transition-all duration-700 ease-in-out transform">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Admin floating indicator */}
      {isAdmin && (
        <div className="fixed top-6 right-6 z-30 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg animate-pulse-glow">
          <Settings className="w-4 h-4 inline mr-2" />
          Администратор
        </div>
      )}

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default App;