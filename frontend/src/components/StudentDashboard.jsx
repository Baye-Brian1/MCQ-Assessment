// frontend/src/components/StudentDashboard.jsx
import React, { useState } from 'react';
import { 
  LogOut, 
  BookOpen, 
  Trophy, 
  Clock, 
  CheckCircle, 
  XCircle,
  BarChart3,
  TrendingUp,
  FileText,
  ChevronRight
} from 'lucide-react';

function StudentDashboard({ user, onLogout }) {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  
  // Mock quizzes data
  const [quizzes] = useState([
    {
      id: 1,
      title: "Introduction to Computer Science",
      description: "Basic concepts of computer science including hardware, software, and programming fundamentals",
      questions: [
        {
          id: 1,
          text: "What does CPU stand for?",
          options: [
            { letter: "A", text: "Central Processing Unit" },
            { letter: "B", text: "Computer Personal Unit" },
            { letter: "C", text: "Central Program Unit" },
            { letter: "D", text: "Core Processing Unit" }
          ]
        },
        {
          id: 2,
          text: "Which of these is a programming language?",
          options: [
            { letter: "A", text: "HTML" },
            { letter: "B", text: "CSS" },
            { letter: "C", text: "JavaScript" },
            { letter: "D", text: "All of the above" }
          ]
        },
        {
          id: 3,
          text: "What is the main function of RAM?",
          options: [
            { letter: "A", text: "Store data permanently" },
            { letter: "B", text: "Execute program instructions" },
            { letter: "C", text: "Temporarily store data for quick access" },
            { letter: "D", text: "Control input/output devices" }
          ]
        }
      ],
      timeLimit: 30,
      passingScore: 70,
      totalAttempts: 1,
      bestScore: 85
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      description: "ES6+ features, async programming, and modern JavaScript concepts",
      questions: [],
      timeLimit: 45,
      passingScore: 75,
      totalAttempts: 0,
      bestScore: 0
    }
  ]);
  
  // Mock attempts data with quiz results
  const [attempts, setAttempts] = useState([
    {
      id: 1,
      quizId: 1,
      quizTitle: "Introduction to Computer Science",
      score: 85,
      percentage: 85,
      passed: true,
      submittedAt: new Date().toISOString(),
      answers: [
        {
          questionId: 1,
          questionText: "What does CPU stand for?",
          studentAnswer: "A",
          correctAnswer: "A",
          isCorrect: true,
          explanation: "CPU stands for Central Processing Unit, the primary component of a computer."
        },
        {
          questionId: 2,
          questionText: "Which of these is a programming language?",
          studentAnswer: "C",
          correctAnswer: "D",
          isCorrect: false,
          explanation: "HTML, CSS, and JavaScript are all used in web development, with JavaScript being the programming language."
        },
        {
          questionId: 3,
          questionText: "What is the main function of RAM?",
          studentAnswer: "C",
          correctAnswer: "C",
          isCorrect: true,
          explanation: "RAM (Random Access Memory) temporarily stores data for quick access by the CPU."
        }
      ]
    }
  ]);

  // Calculate overall percentage
  const totalScore = attempts.reduce((sum, attempt) => sum + attempt.percentage, 0);
  const overallPercentage = attempts.length > 0 ? Math.round(totalScore / attempts.length) : 0;
  const passedQuizzes = attempts.filter(a => a.passed).length;

  const startQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setAnswers({});
    setCurrentView('taking');
  };

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const submitQuiz = () => {
    // Mock grading - in real app, this would be done by backend
    const correctAnswers = { 1: "A", 2: "D", 3: "C" };
    let correctCount = 0;
    const feedback = selectedQuiz.questions.map(q => {
      const isCorrect = answers[q.id] === correctAnswers[q.id];
      if (isCorrect) correctCount++;
      return {
        questionId: q.id,
        questionText: q.text,
        studentAnswer: answers[q.id] || 'Not answered',
        correctAnswer: correctAnswers[q.id],
        isCorrect: isCorrect,
        explanation: isCorrect ? 'Correct!' : `The correct answer is ${correctAnswers[q.id]}.`
      };
    });
    
    const percentage = (correctCount / selectedQuiz.questions.length) * 100;
    const passed = percentage >= selectedQuiz.passingScore;
    
    const newAttempt = {
      id: Date.now(),
      quizId: selectedQuiz.id,
      quizTitle: selectedQuiz.title,
      score: Math.round(percentage),
      percentage: Math.round(percentage),
      passed: passed,
      submittedAt: new Date().toISOString(),
      answers: feedback
    };
    
    setAttempts([newAttempt, ...attempts]);
    setResult({
      score: Math.round(percentage),
      correctCount,
      totalQuestions: selectedQuiz.questions.length,
      passed,
      feedback
    });
    setCurrentView('results');
  };

  const viewAttempt = (attempt) => {
    setResult({
      score: attempt.percentage,
      correctCount: attempt.answers.filter(a => a.isCorrect).length,
      totalQuestions: attempt.answers.length,
      passed: attempt.passed,
      feedback: attempt.answers
    });
    setCurrentView('results');
  };

  // Quiz Taking View
  if (currentView === 'taking' && selectedQuiz) {
    return (
      <div className="min-h-screen bg-black">
        <nav className="backdrop-blur-xl bg-white/5 border-b border-white/10 sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">{selectedQuiz.title}</h2>
              <button
                onClick={() => setCurrentView('dashboard')}
                className="text-gray-400 hover:text-white"
              >
                Exit
              </button>
            </div>
          </div>
        </nav>
        
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="space-y-6">
            {selectedQuiz.questions.map((question, idx) => (
              <div key={question.id} className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/20 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  {idx + 1}. {question.text}
                </h3>
                <div className="space-y-3">
                  {question.options.map((opt) => (
                    <label key={opt.letter} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 cursor-pointer hover:bg-white/10 transition">
                      <input
                        type="radio"
                        name={`q${question.id}`}
                        value={opt.letter}
                        onChange={() => handleAnswer(question.id, opt.letter)}
                        checked={answers[question.id] === opt.letter}
                        className="w-4 h-4"
                      />
                      <span className="text-white font-medium">{opt.letter})</span>
                      <span className="text-gray-300">{opt.text}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            
            <button
              onClick={submitQuiz}
              className="w-full py-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition"
            >
              Submit Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // Results View
  if (currentView === 'results' && result) {
    return (
      <div className="min-h-screen bg-black">
        <nav className="backdrop-blur-xl bg-white/5 border-b border-white/10 sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <button
              onClick={() => {
                setCurrentView('dashboard');
                setResult(null);
                setSelectedQuiz(null);
              }}
              className="text-gray-400 hover:text-white"
            >
              ← Back to Dashboard
            </button>
          </div>
        </nav>
        
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Score Card */}
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/20 p-8 text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Quiz Results</h2>
            <div className="inline-flex items-center justify-center w-40 h-40 rounded-full bg-gradient-to-r from-white/20 to-white/5 mb-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-white">{result.score}%</div>
                <div className="text-sm text-gray-400">{result.correctCount}/{result.totalQuestions} Correct</div>
              </div>
            </div>
            <div className={`text-lg font-semibold ${result.passed ? 'text-green-400' : 'text-red-400'}`}>
              {result.passed ? '✓ You Passed!' : '✗ You Failed'}
            </div>
          </div>
          
          {/* Detailed Feedback */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">Detailed Feedback</h3>
            {result.feedback.map((item, idx) => (
              <div key={idx} className={`backdrop-blur-xl rounded-2xl border p-6 ${
                item.isCorrect 
                  ? 'bg-green-500/5 border-green-500/20' 
                  : 'bg-red-500/5 border-red-500/20'
              }`}>
                <div className="flex justify-between items-start mb-3">
                  <span className="font-semibold text-white">Question {item.questionId}</span>
                  {item.isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400" />
                  )}
                </div>
                <p className="text-gray-300 mb-3">{item.questionText}</p>
                <div className="space-y-1 text-sm">
                  <p>Your answer: <span className="font-semibold text-white">{item.studentAnswer}</span></p>
                  {!item.isCorrect && (
                    <>
                      <p>Correct answer: <span className="font-semibold text-green-400">{item.correctAnswer}</span></p>
                      <p className="text-gray-400 mt-2">{item.explanation}</p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Dashboard View
  return (
    <div className="min-h-screen bg-black">
      {/* Navigation Bar */}
      <nav className="backdrop-blur-xl bg-white/5 border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-white" />
              <h1 className="text-xl font-bold text-white">MCQ<span className="text-gray-400">Assess</span></h1>
              <span className="ml-3 px-2 py-1 text-xs rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/20">
                Student
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-300 hidden sm:block">Welcome, {user?.name || 'Student'}</span>
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/20 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Available Quizzes</span>
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div className="text-3xl font-bold text-white">{quizzes.length}</div>
          </div>
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/20 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Quizzes Taken</span>
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <div className="text-3xl font-bold text-white">{attempts.length}</div>
          </div>
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/20 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Passed Quizzes</span>
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div className="text-3xl font-bold text-white">{passedQuizzes}</div>
          </div>
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/20 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Overall Score</span>
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div className="text-3xl font-bold text-white">{overallPercentage}%</div>
          </div>
        </div>

        {/* Available Quizzes Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Available Quizzes
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {quizzes.map(quiz => (
              <div key={quiz.id} className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/20 p-6 hover:bg-white/10 transition cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-white">{quiz.title}</h3>
                  {quiz.totalAttempts > 0 && (
                    <span className="px-2 py-1 rounded-lg text-xs bg-green-500/20 text-green-400">
                      Best: {quiz.bestScore}%
                    </span>
                  )}
                </div>
                <p className="text-gray-400 mb-4">{quiz.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      {quiz.questions.length || 10} questions
                    </span>
                    {quiz.timeLimit > 0 && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {quiz.timeLimit} min
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => startQuiz(quiz)}
                    className="px-4 py-2 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition flex items-center gap-2"
                  >
                    Take Quiz
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Attempts Section */}
        {attempts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Your Previous Attempts
            </h2>
            <div className="space-y-4">
              {attempts.map(attempt => (
                <div key={attempt.id} className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/20 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{attempt.quizTitle}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(attempt.submittedAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${attempt.passed ? 'text-green-400' : 'text-red-400'}`}>
                        {attempt.percentage}%
                      </div>
                      <div className={`text-sm ${attempt.passed ? 'text-green-400/70' : 'text-red-400/70'}`}>
                        {attempt.passed ? 'Passed' : 'Failed'}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => viewAttempt(attempt)}
                    className="w-full py-2 rounded-lg border border-white/20 text-white hover:bg-white/10 transition"
                  >
                    View Feedback
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;