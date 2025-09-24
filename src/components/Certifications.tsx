import React, { useState } from 'react';
import { Award, Calendar, User, Download, Filter, Search, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

const Certifications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const certifications = [
    {
      id: 1,
      employeeName: 'Иванов Иван Иванович',
      employeeAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      certificateName: 'Специалист по безопасности труда',
      courseName: 'Основы безопасности труда',
      issueDate: '2024-01-15',
      expiryDate: '2025-01-15',
      status: 'active',
      score: 95,
      certificateId: 'CERT-2024-001'
    },
    {
      id: 2,
      employeeName: 'Петрова Анна Сергеевна',
      employeeAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      certificateName: 'Эксперт по продажам',
      courseName: 'Техники продаж',
      issueDate: '2024-02-20',
      expiryDate: '2025-02-20',
      status: 'active',
      score: 88,
      certificateId: 'CERT-2024-002'
    },
    {
      id: 3,
      employeeName: 'Сидоров Петр Петрович',
      employeeAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      certificateName: 'Специалист по управлению персоналом',
      courseName: 'HR-менеджмент',
      issueDate: '2023-12-10',
      expiryDate: '2024-12-10',
      status: 'expiring',
      score: 92,
      certificateId: 'CERT-2023-045'
    },
    {
      id: 4,
      employeeName: 'Козлова Мария Владимировна',
      employeeAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      certificateName: 'Младший бухгалтер',
      courseName: 'Основы бухгалтерского учета',
      issueDate: '2023-11-05',
      expiryDate: '2023-11-05',
      status: 'expired',
      score: 76,
      certificateId: 'CERT-2023-032'
    }
  ];

  const statusOptions = [
    { id: 'all', name: 'Все статусы' },
    { id: 'active', name: 'Активные' },
    { id: 'expiring', name: 'Истекающие' },
    { id: 'expired', name: 'Истекшие' }
  ];

  const filteredCertifications = certifications.filter(cert => {
    const matchesSearch = cert.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.certificateName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || cert.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'from-green-500 to-emerald-600';
      case 'expiring': return 'from-yellow-500 to-orange-600';
      case 'expired': return 'from-red-500 to-pink-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'expiring': return Clock;
      case 'expired': return AlertTriangle;
      default: return CheckCircle;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Активен';
      case 'expiring': return 'Истекает';
      case 'expired': return 'Истек';
      default: return 'Неизвестно';
    }
  };

  const handleDownloadCertificate = (cert) => {
    // Симуляция скачивания сертификата
    const certificateData = `
Сертификат: ${cert.certificateName}
Сотрудник: ${cert.employeeName}
Курс: ${cert.courseName}
Дата выдачи: ${cert.issueDate}
Срок действия: ${cert.expiryDate}
Оценка: ${cert.score}%
ID сертификата: ${cert.certificateId}
    `;
    
    const blob = new Blob([certificateData], { type: 'text/plain;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `certificate_${cert.certificateId}.txt`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-700 rounded-2xl shadow-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -ml-12 -mb-12"></div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Сертификация</h1>
            <p className="text-purple-100 mt-2">Управление сертификатами и отслеживание сроков действия</p>
          </div>
          <div className="p-3 bg-white bg-opacity-20 rounded-xl">
            <Award className="w-8 h-8" />
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
              placeholder="Поиск по сотруднику или сертификату..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            />
          </div>
          <div className="flex items-center space-x-3">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            >
              {statusOptions.map((option) => (
                <option key={option.id} value={option.id}>{option.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCertifications.map((cert) => {
          const StatusIcon = getStatusIcon(cert.status);
          return (
            <div key={cert.id} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-102 group overflow-hidden">
              <div className="p-6">
                {/* Certificate Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={cert.employeeAvatar}
                      alt={cert.employeeName}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-100 group-hover:ring-purple-200 transition-all duration-300"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                        {cert.certificateName}
                      </h3>
                      <p className="text-gray-600 text-sm">{cert.employeeName}</p>
                    </div>
                  </div>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-white text-sm font-medium bg-gradient-to-r ${getStatusColor(cert.status)}`}>
                    <StatusIcon className="w-4 h-4 mr-1" />
                    {getStatusText(cert.status)}
                  </div>
                </div>

                {/* Certificate Details */}
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 mb-1">Курс</p>
                      <p className="font-medium text-gray-800">{cert.courseName}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Оценка</p>
                      <p className="font-medium text-gray-800">{cert.score}%</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Дата выдачи</p>
                      <p className="font-medium text-gray-800">{new Date(cert.issueDate).toLocaleDateString('ru-RU')}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Действителен до</p>
                      <p className="font-medium text-gray-800">{new Date(cert.expiryDate).toLocaleDateString('ru-RU')}</p>
                    </div>
                  </div>
                </div>

                {/* Certificate ID */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">ID: {cert.certificateId}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Сертифицирован</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleDownloadCertificate(cert)}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 px-4 rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <Download className="w-4 h-4" />
                    <span>Скачать</span>
                  </button>
                  {cert.status === 'expired' && (
                    <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl hover:scale-105">
                      <Award className="w-4 h-4" />
                      <span>Обновить</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Статистика сертификации</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Всего сертификатов', value: certifications.length, color: 'from-blue-500 to-cyan-500' },
            { label: 'Активных', value: certifications.filter(c => c.status === 'active').length, color: 'from-green-500 to-emerald-500' },
            { label: 'Истекающих', value: certifications.filter(c => c.status === 'expiring').length, color: 'from-yellow-500 to-orange-500' },
            { label: 'Истекших', value: certifications.filter(c => c.status === 'expired').length, color: 'from-red-500 to-pink-500' },
          ].map((stat, index) => (
            <div key={index} className={`bg-gradient-to-r ${stat.color} rounded-xl p-4 text-white text-center hover:shadow-lg transition-all duration-300 hover:scale-105`}>
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-sm opacity-90">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certifications;