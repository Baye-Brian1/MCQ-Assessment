// frontend/src/components/TeacherDashboard.jsx
import React, { useState } from 'react';
import { 
  LogOut, 
  BookOpen, 
  Upload, 
  FileText, 
  Users, 
  Plus, 
  ChevronRight,
  CheckCircle,
  Clock,
  BarChart3,
  UserPlus
} from 'lucide-react';

function TeacherDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [quizzes, setQuizzes] = useState([
    {
      id: 1,
      title: "Introduction to Computer Science",
      description: "Basic concepts of computer science",
      questions: 10,
      timeLimit: 30,
      passingScore: 70,
      isActive: true,
      studentCount: 15,
      averageScore: 78
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      description: "ES6+ features and concepts",
      questions: 15,
      timeLimit: 45,
      passingScore: 75,
      isActive: true,
      studentCount: 8,
      averageScore: 82
    }
  ]);

  const [students] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", quizzesTaken: 2, averageScore: 85, joinedAt: "2026-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", quizzesTaken: 1, averageScore: 92, joinedAt: "2026-01-20" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", quizzesTaken: 2, averageScore: 71, joinedAt: "2026-02-01" },
    { id: 4, name: "Sarah Williams", email: "sarah@example.com", quizzesTaken: 1, averageScore: 88, joinedAt: "2026-02-10" },
    { id: 5, name: "David Brown", email: "david@example.com", quizzesTaken: 0, averageScore: 0, joinedAt: "2026-02-15" }
  ]);

  const totalStudents = students.length;
  const totalQuizzes = quizzes.length;
  const totalSubmissions = quizzes.reduce((sum, q) => sum + q.studentCount, 0);
  const averageScoreAcrossQuizzes = Math.round(quizzes.reduce((sum, q) => sum + q.averageScore, 0) / quizzes.length);

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation Bar */}
      <nav className="backdrop-blur-xl bg-white/5 border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-white" />
              <h1 className="text-xl font-bold text-white">MCQ<span className="text-gray-400">Assess</span></h1>
              <span className="ml-3 px-2 py-1 text-xs rounded-lg bg-purple-600/20 text-purple-400 border border-purple-500/20">
                Teacher
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-300 hidden sm:block">Welcome, {user?.name || 'Teacher'}</span>
              <button
                onClick={onLogout}
                className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-4 mb-8 border-b border-white/10">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-6 py-3 transition ${
              activeTab === 'dashboard'
                ? 'text-white border-b-2 border-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`px-6 py-3 transition ${
              activeTab === 'create'
                ? 'text-white border-b-2 border-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Create Quiz
          </button>
          <button
            onClick={() => setActiveTab('quizzes')}
            className={`px-6 py-3 transition ${
              activeTab === 'quizzes'
                ? 'text-white border-b-2 border-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            My Quizzes
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`px-6 py-3 transition ${
              activeTab === 'students'
                ? 'text-white border-b-2 border-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Students
          </button>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div>
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/20 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Total Students</span>
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div className="text-3xl font-bold text-white">{totalStudents}</div>
                <div className="text-sm text-gray-500 mt-2">Registered on platform</div>
              </div>
              <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/20 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Total Quizzes</span>
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div className="text-3xl font-bold text-white">{totalQuizzes}</div>
                <div className="text-sm text-gray-500 mt-2">Created by you</div>
              </div>
              <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/20 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Total Submissions</span>
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div className="text-3xl font-bold text-white">{totalSubmissions}</div>
                <div className="text-sm text-gray-500 mt-2">Quiz attempts by students</div>
              </div>
              <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/20 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Avg. Score</span>
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div className="text-3xl font-bold text-white">{averageScoreAcrossQuizzes}%</div>
                <div className="text-sm text-gray-500 mt-2">Across all quizzes</div>
              </div>
            </div>

            {/* Recent Quiz Performance */}
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/20 p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Quiz Performance
              </h2>
              <div className="space-y-4">
                {quizzes.map(quiz => (
                  <div key={quiz.id} className="flex justify-between items-center p-4 rounded-lg bg-white/5">
                    <div>
                      <h3 className="text-white font-semibold">{quiz.title}</h3>
                      <p className="text-sm text-gray-500">{quiz.studentCount} students took this quiz</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">{quiz.averageScore}%</div>
                      <div className="text-sm text-gray-500">Average Score</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Create Quiz Tab */}
        {activeTab === 'create' && (
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/20 p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Plus className="w-6 h-6" />
              Create New Quiz
            </h2>
            
            <div className="space-y-6">
              {/* Quiz Info */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Quiz Title
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30"
                  placeholder="Enter quiz title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  rows="3"
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30"
                  placeholder="Enter quiz description"
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Time Limit (minutes)
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30"
                    placeholder="0 = no limit"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Passing Score (%)
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30"
                    placeholder="Minimum passing score"
                  />
                </div>
              </div>
              
              {/* PDF Upload Option */}
              <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400 mb-2">Upload Quiz PDF</p>
                <p className="text-xs text-gray-500 mb-4">PDF should contain numbered questions with options A, B, C, D</p>
                <button className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition">
                  Choose PDF File
                </button>
              </div>
              
              {/* Manual Creation Option */}
              <div className="text-center">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-black text-gray-500">OR</span>
                  </div>
                </div>
                
                <button className="mt-6 px-6 py-3 rounded-lg border border-white/20 text-white hover:bg-white/10 transition flex items-center gap-2 mx-auto">
                  <Plus className="w-4 h-4" />
                  Manually Add Questions
                </button>
              </div>
              
              <button className="w-full py-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition">
                Create Quiz
              </button>
            </div>
          </div>
        )}

        {/* My Quizzes Tab */}
        {activeTab === 'quizzes' && (
          <div className="grid gap-6">
            {quizzes.map(quiz => (
              <div key={quiz.id} className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/20 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{quiz.title}</h3>
                    <p className="text-gray-400 mt-1">{quiz.description}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-xs ${
                    quiz.isActive 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/20'
                      : 'bg-red-500/20 text-red-400 border border-red-500/20'
                  }`}>
                    {quiz.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex gap-6 text-sm text-gray-400 mb-4">
                  <span className="flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    {quiz.questions} questions
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {quiz.timeLimit > 0 ? `${quiz.timeLimit} min` : 'No limit'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {quiz.studentCount} students
                  </span>
                  <span className="flex items-center gap-1">
                    <BarChart3 className="w-4 h-4" />
                    Avg: {quiz.averageScore}%
                  </span>
                </div>
                <button className="px-4 py-2 rounded-lg border border-white/20 text-white hover:bg-white/10 transition">
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Students Tab */}
        {activeTab === 'students' && (
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/20 overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5" />
                Registered Students ({totalStudents})
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="text-left px-6 py-4 text-gray-300">Student Name</th>
                    <th className="text-left px-6 py-4 text-gray-300">Email</th>
                    <th className="text-left px-6 py-4 text-gray-300">Quizzes Taken</th>
                    <th className="text-left px-6 py-4 text-gray-300">Average Score</th>
                    <th className="text-left px-6 py-4 text-gray-300">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(student => (
                    <tr key={student.id} className="border-b border-white/10">
                      <td className="px-6 py-4 text-white">{student.name}</td>
                      <td className="px-6 py-4 text-gray-400">{student.email}</td>
                      <td className="px-6 py-4 text-gray-300">{student.quizzesTaken}</td>
                      <td className="px-6 py-4">
                        <span className={student.averageScore >= 70 ? 'text-green-400' : 'text-yellow-400'}>
                          {student.averageScore}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-sm">{student.joinedAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TeacherDashboard;