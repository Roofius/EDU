import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Award, BookOpen, TrendingUp, Edit, Save, X } from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Иванов Иван Иванович',
    position: 'Старший разработчик',
    department: 'IT',
    email: 'ivanov@company.com',
    phone: '+7 (999) 123-45-67',
    location: 'Москва, Россия',
    joinDate: '2022-03-15',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
  });

  const achievements = [
    { id: 1, name: 'Первый курс', description: 'Завершил первый курс обучения', date: '2022-04-01', icon: '🎯' },
    { id: 2, name: 'Специалист', description: 'Получил статус "Специалист"', date: '2022-08-15', icon: '⭐' },
    { id: 3, name: 'Наставник', description: 'Стал наставником для новых сотрудников', date: '2023-01-20', icon: '👨‍🏫' },
    { id: 4, name: 'Эксперт', description: 'Достиг уровня "Эксперт"', date: '2023-06-10', icon: '🏆' },
  ];

  const completedCourses = [
    { id: 1, name: 'Основы безопасности труда', completedDate: '2022-04-01', score: 95, certificate: true },
    { id: 2, name: 'Пожарная безопасность', completedDate: '2022-05-15', score: 88, certificate: true },
    { id: 3, name: 'Управление проектами', completedDate: '2022-07-20', score: 92, certificate: true },
    { id: 4, name: 'Лидерство и командная работа', completedDate: '2022-09-10', score: 89, certificate: true },
    { id: 5, name: 'Техническое обучение', completedDate: '2023-02-14', score: 96, certificate: true },
  ];

  const currentCourses = [
    { id: 1, name: 'Продвинутые техники программирования', progress: 75, deadline: '2024-02-15' },
    { id: 2, name: 'Архитектура программного обеспечения', progress: 45, deadline: '2024-03-01' },
  ];

  const stats = {
    totalCourses: completedCourses.length,
    totalCertificates: completedCourses.filter(c => c.certificate).length,
    averageScore: Math.round(completedCourses.reduce((sum, course) => sum + course.score, 0) / completedCourses.length),
    currentLevel: 'Старший специалист',
    totalPoints: 1250
  };

  const handleSave = () => {
    setIsEditing(false);
    // Здесь бы был запрос к API для сохранения данных
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Здесь бы был сброс изменений
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-700 rounded-2xl shadow-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -ml-12 -mb-12"></div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <img
              src={profileData.avatar}
              alt={profileData.name}
              className="w-20 h-20 rounded-full object-cover ring-4 ring-white ring-opacity-30"
            />
            <div>
              <h1 className="text-3xl font-bold">{profileData.name}</h1>
              <p className="text-teal-100 mt-1">{profileData.position}</p>
              <p className="text-teal-200 text-sm">{profileData.department}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-white bg-opacity-20 rounded-xl">
              <User className="w-8 h-8" />
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2"
            >
              <Edit className="w-4 h-4" />
              <span>Редактировать</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Personal Info */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Личная информация</h2>
              {isEditing && (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleCancel}
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                {isEditing ? (
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                ) : (
                  <span className="text-gray-700">{profileData.email}</span>
                )}
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                ) : (
                  <span className="text-gray-700">{profileData.phone}</span>
                )}
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                ) : (
                  <span className="text-gray-700">{profileData.location}</span>
                )}
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">В компании с {new Date(profileData.joinDate).toLocaleDateString('ru-RU')}</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Статистика</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Курсов завершено</span>
                </div>
                <span className="font-bold text-blue-600">{stats.totalCourses}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-purple-600" />
                  <span className="text-gray-700">Сертификатов</span>
                </div>
                <span className="font-bold text-purple-600">{stats.totalCertificates}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Средний балл</span>
                </div>
                <span className="font-bold text-green-600">{stats.averageScore}%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">⭐</span>
                  <span className="text-gray-700">Уровень</span>
                </div>
                <span className="font-bold text-yellow-600">{stats.currentLevel}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Courses */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Текущие курсы</h2>
            <div className="space-y-4">
              {currentCourses.map((course) => (
                <div key={course.id} className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">{course.name}</h3>
                    <span className="text-sm text-gray-600">До {new Date(course.deadline).toLocaleDateString('ru-RU')}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div
                      className="bg-gradient-to-r from-teal-500 to-cyan-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Прогресс: {course.progress}%</span>
                    <button className="text-teal-600 hover:text-teal-700 font-medium">Продолжить</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Достижения</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl hover:shadow-md transition-all duration-300 hover:scale-102">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-800">{achievement.name}</h3>
                      <p className="text-gray-600 text-sm">{achievement.description}</p>
                      <p className="text-gray-500 text-xs mt-1">{new Date(achievement.date).toLocaleDateString('ru-RU')}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Completed Courses */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Завершенные курсы</h2>
            <div className="space-y-3">
              {completedCourses.map((course) => (
                <div key={course.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">{course.name}</h3>
                      <p className="text-gray-600 text-sm">Завершен {new Date(course.completedDate).toLocaleDateString('ru-RU')}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-bold text-green-600">{course.score}%</p>
                      <p className="text-xs text-gray-500">Оценка</p>
                    </div>
                    {course.certificate && (
                      <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <Award className="w-4 h-4 text-yellow-600" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;