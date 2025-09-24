import React, { useState, useEffect } from 'react';
import { X, Clock, CheckCircle, AlertCircle, Award, Target } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface TestModalProps {
  course: any;
  onClose: () => void;
}

const TestModal: React.FC<TestModalProps> = ({ course, onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 минут
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const questions: Question[] = [
    {
      id: 1,
      question: "Какой основной принцип безопасности следует соблюдать при работе с электрооборудованием?",
      options: [
        "Работать только в резиновых перчатках",
        "Отключить питание перед началом работ",
        "Работать только днем",
        "Использовать только металлические инструменты"
      ],
      correctAnswer: 1,
      explanation: "Перед началом любых работ с электрооборудованием необходимо полностью отключить питание для обеспечения безопасности."
    },
    {
      id: 2,
      question: "Что должен делать сотрудник при обнаружении пожара на рабочем месте?",
      options: [
        "Попытаться потушить огонь самостоятельно",
        "Немедленно покинуть помещение и вызвать пожарную службу",
        "Продолжить работу, если огонь небольшой",
        "Закрыть все окна и двери"
      ],
      correctAnswer: 1,
      explanation: "При обнаружении пожара необходимо немедленно покинуть опасную зону и вызвать службу экстренного реагирования."
    },
    {
      id: 3,
      question: "Как часто должны проводиться инструктажи по охране труда?",
      options: [
        "Раз в год",
        "Раз в полгода",
        "Раз в квартал",
        "По мере необходимости"
      ],
      correctAnswer: 1,
      explanation: "Повторные инструктажи по охране труда должны проводиться не реже одного раза в полгода."
    }
  ];

  useEffect(() => {
    if (!showResults && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResults) {
      handleFinishTest();
    }
  }, [timeLeft, showResults]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleFinishTest();
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleFinishTest = () => {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    setScore(Math.round((correctAnswers / questions.length) * 100));
    setShowResults(true);
  };

  const isPassed = score >= 70;

  if (showResults) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideIn">
          <div className={`p-8 text-center ${isPassed ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-red-500 to-pink-600'} text-white rounded-t-2xl`}>
            <div className="flex justify-center mb-4">
              {isPassed ? (
                <Award className="w-16 h-16" />
              ) : (
                <AlertCircle className="w-16 h-16" />
              )}
            </div>
            <h2 className="text-3xl font-bold mb-2">
              {isPassed ? 'Поздравляем!' : 'Тест не пройден'}
            </h2>
            <p className="text-xl">
              Ваш результат: {score}%
            </p>
            <p className="mt-2 opacity-90">
              {isPassed 
                ? 'Вы успешно прошли тестирование и получили сертификат!'
                : 'Для прохождения теста необходимо набрать минимум 70%. Попробуйте еще раз.'
              }
            </p>
          </div>

          <div className="p-8">
            <h3 className="text-xl font-bold mb-6 text-gray-800">Результаты по вопросам:</h3>
            <div className="space-y-4">
              {questions.map((question, index) => {
                const userAnswer = answers[index];
                const isCorrect = userAnswer === question.correctAnswer;
                return (
                  <div key={question.id} className={`p-4 rounded-xl border-2 ${isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                    <div className="flex items-start space-x-3">
                      <div className={`p-1 rounded-full ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}>
                        {isCorrect ? (
                          <CheckCircle className="w-4 h-4 text-white" />
                        ) : (
                          <X className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 mb-2">{question.question}</p>
                        <p className={`text-sm ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                          Ваш ответ: {question.options[userAnswer] || 'Не отвечено'}
                        </p>
                        {!isCorrect && (
                          <p className="text-sm text-green-700 mt-1">
                            Правильный ответ: {question.options[question.correctAnswer]}
                          </p>
                        )}
                        {question.explanation && (
                          <p className="text-sm text-gray-600 mt-2 italic">
                            {question.explanation}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center space-x-4 mt-8">
              {!isPassed && (
                <button
                  onClick={() => {
                    setCurrentQuestion(0);
                    setAnswers([]);
                    setTimeLeft(1800);
                    setShowResults(false);
                    setScore(0);
                  }}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  Пройти заново
                </button>
              )}
              <button
                onClick={onClose}
                className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slideIn">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Target className="w-6 h-6" />
              <div>
                <h2 className="text-2xl font-bold">Тестирование: {course.title}</h2>
                <p className="text-indigo-100">Вопрос {currentQuestion + 1} из {questions.length}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white bg-opacity-20 px-3 py-1 rounded-lg">
                <Clock className="w-4 h-4" />
                <span className="font-mono">{formatTime(timeLeft)}</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors duration-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 bg-gray-50">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="p-8">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              {questions[currentQuestion].question}
            </h3>
            
            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-md ${
                    answers[currentQuestion] === index
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-lg transform scale-102'
                      : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      answers[currentQuestion] === index
                        ? 'border-indigo-500 bg-indigo-500'
                        : 'border-gray-300'
                    }`}>
                      {answers[currentQuestion] === index && (
                        <CheckCircle className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span className="font-medium">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevQuestion}
              disabled={currentQuestion === 0}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-md"
            >
              Назад
            </button>

            <div className="flex space-x-2">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentQuestion
                      ? 'bg-indigo-500 scale-125'
                      : answers[index] !== undefined
                      ? 'bg-green-400'
                      : 'bg-gray-300'
                  }`}
                ></div>
              ))}
            </div>

            <button
              onClick={handleNextQuestion}
              disabled={answers[currentQuestion] === undefined}
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              {currentQuestion === questions.length - 1 ? 'Завершить тест' : 'Далее'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestModal;