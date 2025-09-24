import React, { useState } from 'react';
import { Users, Search, Filter, MoreVertical, Award, BookOpen, TrendingUp, Mail, Phone } from 'lucide-react';

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const employees = [
    {
      id: 1,
      name: 'Иванов Иван Иванович',
      position: 'Старший разработчик',
      department: 'IT',
      email: 'ivanov@company.com',
      phone: '+7 (999) 123-45-67',
      coursesCompleted: 8,
      certificatesEarned: 3,
      currentLevel: 'Специалист',
      points: 450,
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      status: 'active'
    },
    {
      id: 2,
      name: 'Петрова Анна Сергеевна',
      position: 'Менеджер по продажам',
      department: 'Продажи',
      email: 'petrova@company.com',
      phone: '+7 (999) 234-56-78',
      coursesCompleted: 5,
      certificatesEarned: 2,
      currentLevel: 'Младший специалист',
      points: 280,
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      status: 'active'
    },
    {
      id: 3,
      name: 'Сидоров Петр Петрович',
      position: 'HR-специалист',
      department: 'HR',
      email: 'sidorov@company.com',
      phone: '+7 (999) 345-67-89',
      coursesCompleted: 12,
      certificatesEarned: 5,
      currentLevel: 'Старший специалист',
      points: 620,
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      status: 'active'
    },
    {
      id: 4,
      name: 'Козлова Мария Владимировна',
      position: 'Бухгалтер',
      department: 'Финансы',
      email: 'kozlova@company.com',
      phone: '+7 (999) 456-78-90',
      coursesCompleted: 3,
      certificatesEarned: 1,
      currentLevel: 'Стажер',
      points: 150,
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      status: 'training'
    }
  ];

  const departments = [
    { id: 'all', name: 'Все отделы' },
    { id: 'IT', name: 'IT' },
    { id: 'Продажи', name: 'Продажи' },
    { id: 'HR', name: 'HR' },
    { id: 'Финансы', name: 'Финансы' }
  ];

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || employee.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const getLevelColor = (level) => {
    switch (level) {
      case 'Стажер': return 'from-gray-400 to-gray-500';
      case 'Младший специалист': return 'from-blue-400 to-blue-500';
      case 'Специалист': return 'from-green-400 to-green-500';
      case 'Старший специалист': return 'from-purple-400 to-purple-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl shadow-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -ml-12 -mb-12"></div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Сотрудники</h1>
            <p className="text-emerald-100 mt-2">Управление персоналом и отслеживание прогресса обучения</p>
          </div>
          <div className="p-3 bg-white bg-opacity-20 rounded-xl">
            <Users className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Поиск сотрудников..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
            />
          </div>
          <div className="flex items-center space-x-3">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
            >
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>{dept.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Employees Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <div key={employee.id} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group overflow-hidden">
            <div className="p-6">
              {/* Employee Header */}
              <div className="flex items-start space-x-4 mb-4">
                <div className="relative">
                  <img
                    src={employee.avatar}
                    alt={employee.name}
                    className="w-16 h-16 rounded-full object-cover ring-4 ring-emerald-100 group-hover:ring-emerald-200 transition-all duration-300"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${
                    employee.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}></div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300">
                    {employee.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{employee.position}</p>
                  <p className="text-gray-500 text-xs">{employee.department}</p>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300">
                  <MoreVertical className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {/* Level Badge */}
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-white text-sm font-medium bg-gradient-to-r ${getLevelColor(employee.currentLevel)} mb-4`}>
                <Award className="w-4 h-4 mr-1" />
                {employee.currentLevel}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mx-auto mb-1">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{employee.coursesCompleted}</p>
                  <p className="text-xs text-gray-500">Курсов</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg mx-auto mb-1">
                    <Award className="w-5 h-5 text-purple-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{employee.certificatesEarned}</p>
                  <p className="text-xs text-gray-500">Сертификатов</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg mx-auto mb-1">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{employee.points}</p>
                  <p className="text-xs text-gray-500">Баллов</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{employee.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{employee.phone}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-2 px-4 rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 text-sm font-medium hover:shadow-lg hover:scale-105">
                  Назначить курс
                </button>
                <button className="bg-gradient-to-r from-gray-500 to-gray-600 text-white py-2 px-4 rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300 text-sm font-medium hover:shadow-lg hover:scale-105">
                  Профиль
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Employees;