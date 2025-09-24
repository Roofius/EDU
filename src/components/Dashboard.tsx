import React from 'react';
import { BarChart3, Users, BookOpen, Award, TrendingUp, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { label: 'Всего сотрудников', value: '156', icon: Users, color: 'from-blue-500 to-cyan-500', change: '+12%' },
    { label: 'Активных курсов', value: '24', icon: BookOpen, color: 'from-green-500 to-emerald-500', change: '+8%' },
    { label: 'Выданных сертификатов', value: '89', icon: Award, color: 'from-purple-500 to-pink-500', change: '+23%' },
    { label: 'Средний балл', value: '87%', icon: TrendingUp, color: 'from-orange-500 to-red-500', change: '+5%' },
  ];

  const recentActivity = [
    { user: 'Иванов И.И.', action: 'Завершил курс "Основы безопасности"', time: '2 часа назад', type: 'success' },
    { user: 'Петрова А.С.', action: 'Начала курс "Управление временем"', time: '4 часа назад', type: 'info' },
    { user: 'Сидоров П.П.', action: 'Получил сертификат "Специалист по продажам"', time: '6 часов назад', type: 'success' },
    { user: 'Козлова М.В.', action: 'Не прошла тест по охране труда', time: '1 день назад', type: 'warning' },
  ];

  const upcomingDeadlines = [
    { course: 'Охрана труда', employees: 12, deadline: '3 дня', priority: 'high' },
    { course: 'Пожарная безопасность', employees: 8, deadline: '1 неделя', priority: 'medium' },
    { course: 'Обновление продукта', employees: 25, deadline: '2 недели', priority: 'low' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl shadow-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -ml-12 -mb-12"></div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Панель управления</h1>
            <p className="text-indigo-100 mt-2">Добро пожаловать в систему обучения и аттестации</p>
          </div>
          <div className="p-3 bg-white bg-opacity-20 rounded-xl">
            <BarChart3 className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`bg-gradient-to-r ${stat.color} rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white text-opacity-80 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  <p className="text-white text-opacity-90 text-sm mt-1">{stat.change} за месяц</p>
                </div>
                <div className="p-3 bg-white bg-opacity-20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Clock className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-bold text-gray-800">Последняя активность</h2>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300">
                <div className={`p-2 rounded-full ${
                  activity.type === 'success' ? 'bg-green-100' :
                  activity.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                }`}>
                  {activity.type === 'success' ? (
                    <CheckCircle className={`w-4 h-4 ${
                      activity.type === 'success' ? 'text-green-600' :
                      activity.type === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                    }`} />
                  ) : activity.type === 'warning' ? (
                    <AlertTriangle className="w-4 h-4 text-yellow-600" />
                  ) : (
                    <BookOpen className="w-4 h-4 text-blue-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{activity.user}</p>
                  <p className="text-gray-600 text-sm">{activity.action}</p>
                  <p className="text-gray-400 text-xs mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <AlertTriangle className="w-6 h-6 text-orange-600" />
            <h2 className="text-2xl font-bold text-gray-800">Ближайшие дедлайны</h2>
          </div>
          <div className="space-y-4">
            {upcomingDeadlines.map((deadline, index) => (
              <div key={index} className="p-4 rounded-xl border-l-4 hover:shadow-md transition-all duration-300" style={{
                borderLeftColor: deadline.priority === 'high' ? '#EF4444' : deadline.priority === 'medium' ? '#F59E0B' : '#10B981'
              }}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800">{deadline.course}</h3>
                    <p className="text-gray-600 text-sm">{deadline.employees} сотрудников</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${
                      deadline.priority === 'high' ? 'text-red-600' :
                      deadline.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {deadline.deadline}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">{deadline.priority} приоритет</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Быстрые действия</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 hover:shadow-lg hover:scale-105">
            <BookOpen className="w-6 h-6 mx-auto mb-2" />
            <span className="block font-medium">Создать курс</span>
          </button>
          <button className="p-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 hover:shadow-lg hover:scale-105">
            <Users className="w-6 h-6 mx-auto mb-2" />
            <span className="block font-medium">Добавить сотрудника</span>
          </button>
          <button className="p-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-300 hover:shadow-lg hover:scale-105">
            <Award className="w-6 h-6 mx-auto mb-2" />
            <span className="block font-medium">Выдать сертификат</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;