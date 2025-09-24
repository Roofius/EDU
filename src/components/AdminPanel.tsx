import React, { useState } from 'react';
import { Download, FileText, Users, BookOpen, TrendingUp, Settings, Bell, Shield, UserPlus, UserMinus, Key, Eye, EyeOff, Save, Trash2, Edit3 } from 'lucide-react';

const AdminPanel = () => {
  const [selectedReport, setSelectedReport] = useState('');
  const [activeAdminTab, setActiveAdminTab] = useState('reports');
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Иванов Иван Иванович',
      email: 'ivanov@company.com',
      role: 'admin',
      department: 'IT',
      status: 'active',
      lastLogin: '2024-01-15 14:30',
      permissions: ['read', 'write', 'delete', 'admin']
    },
    {
      id: 2,
      name: 'Петрова Анна Сергеевна',
      email: 'petrova@company.com',
      role: 'manager',
      department: 'Продажи',
      status: 'active',
      lastLogin: '2024-01-15 12:15',
      permissions: ['read', 'write']
    },
    {
      id: 3,
      name: 'Сидоров Петр Петрович',
      email: 'sidorov@company.com',
      role: 'user',
      department: 'HR',
      status: 'inactive',
      lastLogin: '2024-01-10 09:45',
      permissions: ['read']
    }
  ]);

  const [editingUser, setEditingUser] = useState(null);
  const [showAddUser, setShowAddUser] = useState(false);

  const reports = [
    { id: 'employees', name: 'Отчет по сотрудникам', icon: Users, description: 'Полная информация о всех сотрудниках' },
    { id: 'courses', name: 'Отчет по курсам', icon: BookOpen, description: 'Статистика прохождения курсов' },
    { id: 'certifications', name: 'Отчет по сертификации', icon: Shield, description: 'Данные о сертификации сотрудников' },
    { id: 'analytics', name: 'Аналитический отчет', icon: TrendingUp, description: 'Подробная аналитика обучения' },
  ];

  const adminTabs = [
    { id: 'reports', name: 'Отчеты', icon: FileText },
    { id: 'users', name: 'Пользователи', icon: Users },
    { id: 'permissions', name: 'Права доступа', icon: Key },
    { id: 'settings', name: 'Настройки', icon: Settings },
  ];

  const roles = [
    { id: 'admin', name: 'Администратор', color: 'from-red-500 to-pink-600' },
    { id: 'manager', name: 'Менеджер', color: 'from-blue-500 to-indigo-600' },
    { id: 'user', name: 'Пользователь', color: 'from-green-500 to-emerald-600' }
  ];

  const permissions = [
    { id: 'read', name: 'Чтение', description: 'Просмотр контента' },
    { id: 'write', name: 'Запись', description: 'Создание и редактирование' },
    { id: 'delete', name: 'Удаление', description: 'Удаление контента' },
    { id: 'admin', name: 'Администрирование', description: 'Полный доступ к системе' }
  ];

  const handleDownloadReport = (reportType) => {
    const data = generateReportData(reportType);
    const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${reportType}_report_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generateReportData = (reportType) => {
    switch (reportType) {
      case 'employees':
        return 'ФИО,Отдел,Должность,Курсы пройдены,Баллы,Статус\nИванов И.И.,IT,Разработчик,5,450,Специалист\nПетров П.П.,Продажи,Менеджер,3,280,Младший специалист';
      case 'courses':
        return 'Название курса,Участников,Завершили,Средний балл,Статус\nВведение в компанию,25,23,85,Активный\nОхрана труда,30,28,92,Активный';
      case 'certifications':
        return 'Сотрудник,Сертификат,Дата получения,Действителен до,Статус\nИванов И.И.,Специалист по продажам,2024-01-15,2025-01-15,Действителен';
      case 'analytics':
        return 'Метрика,Значение,Период\nОбщее количество курсов,15,2024\nСредний процент завершения,87%,2024\nОбщее количество сертификатов,45,2024';
      default:
        return 'Данные не найдены';
    }
  };

  const handleUserStatusToggle = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Вы уверены, что хотите удалить этого пользователя?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleSaveUser = (userData) => {
    if (editingUser) {
      setUsers(users.map(user => 
        user.id === editingUser.id ? { ...user, ...userData } : user
      ));
      setEditingUser(null);
    } else {
      const newUser = {
        id: Date.now(),
        ...userData,
        lastLogin: 'Никогда',
        status: 'active'
      };
      setUsers([...users, newUser]);
      setShowAddUser(false);
    }
  };

  const renderReports = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((report) => {
          const Icon = report.icon;
          return (
            <div key={report.id} className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-500 hover:scale-105 group">
              <div className="flex items-start space-x-4">
                <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{report.name}</h3>
                  <p className="text-gray-600 mb-4">{report.description}</p>
                  <button
                    onClick={() => handleDownloadReport(report.id)}
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 hover:shadow-lg hover:scale-105"
                  >
                    <Download className="w-5 h-5" />
                    <span>Скачать</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-gray-800">Управление пользователями</h3>
        <button
          onClick={() => setShowAddUser(true)}
          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center space-x-2"
        >
          <UserPlus className="w-5 h-5" />
          <span>Добавить пользователя</span>
        </button>
      </div>

      <div className="grid gap-4">
        {users.map((user) => (
          <div key={user.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${roles.find(r => r.id === user.role)?.color || 'from-gray-400 to-gray-500'} flex items-center justify-center text-white font-bold text-lg`}>
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-800">{user.name}</h4>
                  <p className="text-gray-600">{user.email}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${roles.find(r => r.id === user.role)?.color ? `bg-gradient-to-r ${roles.find(r => r.id === user.role).color} text-white` : 'bg-gray-200 text-gray-800'}`}>
                      {roles.find(r => r.id === user.role)?.name || user.role}
                    </span>
                    <span className="text-sm text-gray-500">{user.department}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {user.status === 'active' ? 'Активен' : 'Неактивен'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setEditingUser(user)}
                  className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors duration-300"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleUserStatusToggle(user.id)}
                  className={`p-2 rounded-lg transition-colors duration-300 ${user.status === 'active' ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200' : 'bg-green-100 text-green-600 hover:bg-green-200'}`}
                >
                  {user.status === 'active' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors duration-300"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Последний вход: {user.lastLogin}</span>
                <div className="flex space-x-2">
                  {user.permissions.map(perm => (
                    <span key={perm} className="px-2 py-1 bg-gray-100 rounded text-xs">
                      {permissions.find(p => p.id === perm)?.name || perm}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPermissions = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800">Управление правами доступа</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => (
          <div key={role.id} className={`bg-gradient-to-r ${role.color} rounded-2xl p-6 text-white hover:shadow-xl transition-all duration-300 hover:scale-105`}>
            <h4 className="text-xl font-bold mb-4">{role.name}</h4>
            <div className="space-y-2">
              {permissions.map((perm) => (
                <div key={perm.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    defaultChecked={role.id === 'admin' || (role.id === 'manager' && perm.id !== 'admin') || (role.id === 'user' && perm.id === 'read')}
                    className="rounded"
                  />
                  <span className="text-sm">{perm.name}</span>
                </div>
              ))}
            </div>
            <button className="mt-4 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors duration-300">
              Сохранить
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800">Системные настройки</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
          <h4 className="text-lg font-bold text-gray-800 mb-4">Общие настройки</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Минимальный проходной балл
              </label>
              <input
                type="number"
                defaultValue="70"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Срок действия сертификата (месяцы)
              </label>
              <input
                type="number"
                defaultValue="12"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
          <h4 className="text-lg font-bold text-gray-800 mb-4">Уведомления</h4>
          <div className="space-y-4">
            {[
              { name: 'Автоматические уведомления', desc: 'Отправлять напоминания о курсах' },
              { name: 'Email уведомления', desc: 'Уведомления на электронную почту' },
              { name: 'Push уведомления', desc: 'Браузерные уведомления' },
              { name: 'Автоматическая сертификация', desc: 'Выдавать сертификаты автоматически' }
            ].map((setting, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h5 className="font-medium text-gray-800">{setting.name}</h5>
                  <p className="text-sm text-gray-600">{setting.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center space-x-2">
          <Save className="w-5 h-5" />
          <span>Сохранить настройки</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -ml-12 -mb-12 animate-bounce-slow"></div>
        <div className="flex items-center space-x-4">
          <div className="p-4 bg-white bg-opacity-20 rounded-xl">
            <Settings className="w-10 h-10" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Панель администратора</h1>
            <p className="text-purple-100 mt-2 text-lg">Управление системой обучения и отчетность</p>
          </div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-2 border border-gray-200/50">
        <div className="flex space-x-2">
          {adminTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveAdminTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 px-6 py-4 rounded-xl font-medium transition-all duration-300 ${
                  activeAdminTab === tab.id
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:bg-gradient-to-r hover:from-gray-50 hover:to-indigo-50 hover:text-indigo-700 hover:scale-102'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="transition-all duration-500 ease-in-out">
        {activeAdminTab === 'reports' && renderReports()}
        {activeAdminTab === 'users' && renderUsers()}
        {activeAdminTab === 'permissions' && renderPermissions()}
        {activeAdminTab === 'settings' && renderSettings()}
      </div>
    </div>
  );
};

export default AdminPanel;