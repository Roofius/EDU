import React, { useState } from 'react';
import { BookOpen, Clock, Users, Star, Play, CheckCircle, Award, Target } from 'lucide-react';
import TestModal from './TestModal';

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showTest, setShowTest] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const courses = [
    {
      id: 1,
      title: 'Основы безопасности труда',
      description: 'Изучение основных принципов и правил безопасности на рабочем месте',
      category: 'safety',
      duration: '2 часа',
      students: 45,
      rating: 4.8,
      hasTest: true,
      progress: 100,
      status: 'completed'
    },
    {
      id: 2,
      title: 'Работа с химическими веществами',
      description: 'Правила обращения с опасными химическими веществами',
      category: 'safety',
      duration: '4 часа',
      students: 32,
      rating: 4.6,
      hasTest: true,
      progress: 60,
      status: 'in-progress'
    },
    {
      id: 3,
      title: 'Пожарная безопасность',
      description: 'Профилактика пожаров и действия при возникновении чрезвычайных ситуаций',
      category: 'safety',
      duration: '3 часа',
      students: 28,
      rating: 4.9,
      hasTest: true,
      progress: 0,
      status: 'not-started'
    },
    {
      id: 4,
      title: 'Эффективное управление временем',
      description: 'Техники планирования и организации рабочего времени',
      category: 'management',
      duration: '1.5 часа',
      students: 52,
      rating: 4.7,
      hasTest: false,
      progress: 0,
      status: 'not-started'
    }
  ];

  const categories = [
    { id: 'all', name: 'Все курсы' },
    { id: 'safety', name: 'Безопасность' },
    { id: 'management', name: 'Управление' },
    { id: 'technical', name: 'Технические' }
  ];

  const filteredCourses = courses.filter(course => {
    return selectedCategory === 'all' || course.category === selectedCategory;
  });

  const handleStartTest = (course) => {
    setSelectedCourse(course);
    setShowTest(true);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Floating background elements */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-blue-100 rounded-full opacity-30 animate-bounce"></div>
      <div className="absolute bottom-20 left-10 w-16 h-16 bg-indigo-100 rounded-full opacity-40 animate-pulse"></div>
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -ml-12 -mb-12"></div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Курсы обучения</h1>
            <p className="text-blue-100 mt-2">Изучайте новые навыки и развивайтесь профессионально</p>
          </div>
          <div className="p-3 bg-white bg-opacity-20 rounded-xl">
            <BookOpen className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700 hover:shadow-md hover:scale-102'
              } group`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 relative">
                  <div className="absolute -top-2 -left-2 w-4 h-4 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">{course.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{course.description}</p>
                </div>
                <div className="flex items-center space-x-1 text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-medium">{course.rating}</span>
                </div>
              </div>

              {/* Course Stats */}
              <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{course.students} студентов</span>
                </div>
                {course.hasTest && (
                  <div className="flex items-center space-x-1 text-purple-600">
                    <Target className="w-4 h-4" />
                    <span>Тест</span>
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Прогресс</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500 shadow-sm"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex space-x-2">
                {course.status === 'completed' ? (
                  <button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl hover:scale-105">
                    <CheckCircle className="w-4 h-4" />
                    <span>Завершен</span>
                  </button>
                ) : course.status === 'in-progress' ? (
                  <button className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl hover:scale-105">
                    <Play className="w-4 h-4" />
                    <span>Продолжить</span>
                  </button>
                ) : (
                  <button className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 px-4 rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl hover:scale-105">
                    <Play className="w-4 h-4" />
                    <span>Начать</span>
                  </button>
                )}
                {course.hasTest && course.progress === 100 && (
                  <button 
                    onClick={() => handleStartTest(course)}
                    className="bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 px-4 rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <Award className="w-4 h-4" />
                    <span>Тест</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Test Modal */}
      {showTest && selectedCourse && (
        <TestModal 
          course={selectedCourse} 
          onClose={() => setShowTest(false)} 
        />
      )}
    </div>
  );
};

export default Courses;