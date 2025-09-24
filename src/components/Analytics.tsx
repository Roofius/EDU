import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, BookOpen, Award, Calendar, Filter, Download } from 'lucide-react';

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('completion');

  const periods = [
    { id: 'week', name: 'Неделя' },
    { id: 'month', name: 'Месяц' },
    { id: 'quarter', name: 'Квартал' },
    { id: 'year', name: 'Год' }
  ];

  const metrics = [
    { id: 'completion', name: 'Завершение курсов' },
    { id: 'engagement', name: 'Активность' },
    { id: 'performance', name: 'Успеваемость' },
    { id: 'certification', name: 'Сертификация' }
  ];

  const departmentStats = [
    { name: 'IT', employees: 45, completed: 38, inProgress: 7, avgScore: 92 },
    { name: 'Продажи', employees: 32, completed: 28, inProgress: 4, avgScore: 87 },
    { name: 'HR', employees: 12, completed: 12, inProgress: 0, avgScore: 95 },
    { name: 'Финансы', employees: 18, completed: 15, inProgress: 3, avgScore: 89 },
    { name: 'Маркетинг', employees: 25, completed: 20, inProgress: 5, avgScore: 84 }
  ];

  const coursePopularity = [
    { name: 'Основы безопасности труда', enrolled: 156, completed: 142, rating: 4.8 },
    { name: 'Пожарная безопасность', enrolled: 134, completed: 128, rating: 4.9 },
    { name: 'Техники продаж', enrolled: 89, completed: 76, rating: 4.6 },
    { name: 'Управление временем', enrolled: 67, completed: 58, rating: 4.7 },
    { name: 'HR-менеджмент', enrolled: 45, completed: 41, rating: 4.5 }
  ];

  const monthlyProgress = [
    { month: 'Янв', courses: 45, certificates: 32, avgScore: 85 },
    { month: 'Фев', courses: 52, certificates: 38, avgScore: 87 },
    { month: 'Мар', courses: 48, certificates: 35, avgScore: 89 },
    { month: 'Апр', courses: 61, certificates: 45, avgScore: 91 },
    { month: 'Май', courses: 58, certificates: 42, avgScore: 88 },
    { month: 'Июн', courses: 67, certificates: 51, avgScore: 92 }
  ];

  const handleExportData = () => {
    const data = `
Аналитика обучения - ${new Date().toLocaleDateString('ru-RU')}

СТАТИСТИКА ПО ОТДЕЛАМ:
${departmentStats.map(dept => 
  `${dept.name}: ${dept.completed}/${dept.employees} завершили (${Math.round(dept.completed/dept.employees*100)}%), средний балл: ${dept.avgScore}%`
).join('\n')}

ПОПУЛЯРНЫЕ КУРСЫ:
${coursePopularity.map(course => 
  `${course.name}: ${course.completed}/${course.enrolled} завершили (${Math.round(course.completed/course.enrolled*100)}%), рейтинг: ${course.rating}`
).join('\n')}

ПРОГРЕСС ПО МЕСЯЦАМ:
${monthlyProgress.map(month => 
  `${month.month}: ${month.courses} курсов, ${month.certificates} сертификатов, средний балл: ${month.avgScore}%`
).join('\n')}
    `;
    
    const blob = new Blob([data], { type: 'text/plain;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `analytics_${new Date().toISOString().split('T')[0]}.txt`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-700 rounded-2xl shadow-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -ml-12 -mb-12"></div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Аналитика</h1>
            <p className="text-orange-100 mt-2">Детальная статистика и отчеты по обучению</p>
          </div>
          <div className="p-3 bg-white bg-opacity-20 rounded-xl">
            <BarChart3 className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
              >
                {periods.map((period) => (
                  <option key={period.id} value={period.id}>{period.name}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
              >
                {metrics.map((metric) => (
                  <option key={metric.id} value={metric.id}>{metric.name}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={handleExportData}
            className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-2 rounded-lg hover:from-orange-600 hover:to-red-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Download className="w-4 h-4" />
            <span>Экспорт</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Общий прогресс', value: '87%', icon: TrendingUp, color: 'from-green-500 to-emerald-600', change: '+5%' },
          { label: 'Активных учеников', value: '132', icon: Users, color: 'from-blue-500 to-cyan-600', change: '+12' },
          { label: 'Завершенных курсов', value: '342', icon: BookOpen, color: 'from-purple-500 to-pink-600', change: '+28' },
          { label: 'Выданных сертификатов', value: '89', icon: Award, color: 'from-orange-500 to-red-600', change: '+15' },
        ].map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className={`bg-gradient-to-r ${metric.color} rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white text-opacity-80 text-sm font-medium">{metric.label}</p>
                  <p className="text-3xl font-bold mt-2">{metric.value}</p>
                  <p className="text-white text-opacity-90 text-sm mt-1">{metric.change} за период</p>
                </div>
                <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                  <Icon className="w-8 h-8" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Performance */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Производительность по отделам</h2>
          <div className="space-y-4">
            {departmentStats.map((dept, index) => {
              const completionRate = Math.round((dept.completed / dept.employees) * 100);
              return (
                <div key={index} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">{dept.name}</h3>
                    <span className="text-sm text-gray-600">{dept.completed}/{dept.employees}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div
                      className="bg-gradient-to-r from-orange-500 to-red-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${completionRate}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Завершение: {completionRate}%</span>
                    <span>Средний балл: {dept.avgScore}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Course Popularity */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Популярность курсов</h2>
          <div className="space-y-4">
            {coursePopularity.map((course, index) => {
              const completionRate = Math.round((course.completed / course.enrolled) * 100);
              return (
                <div key={index} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-800 flex-1">{course.name}</h3>
                    <div className="flex items-center space-x-1 text-yellow-500">
                      <span className="text-sm font-medium">{course.rating}</span>
                      <span className="text-xs">★</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${completionRate}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Записано: {course.enrolled}</span>
                    <span>Завершили: {course.completed} ({completionRate}%)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Monthly Progress Chart */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Прогресс по месяцам</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {monthlyProgress.map((month, index) => (
            <div key={index} className="text-center">
              <div className="bg-gradient-to-t from-orange-500 to-red-600 rounded-lg p-4 text-white mb-2 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <p className="text-2xl font-bold">{month.courses}</p>
                <p className="text-xs opacity-90">Курсов</p>
              </div>
              <div className="bg-gradient-to-t from-purple-500 to-pink-600 rounded-lg p-4 text-white mb-2 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <p className="text-2xl font-bold">{month.certificates}</p>
                <p className="text-xs opacity-90">Сертификатов</p>
              </div>
              <p className="text-sm font-medium text-gray-800">{month.month}</p>
              <p className="text-xs text-gray-600">Балл: {month.avgScore}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;