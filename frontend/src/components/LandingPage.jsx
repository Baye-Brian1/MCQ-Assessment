// // frontend/src/components/LandingPage.jsx
// import React, { useState } from 'react';
// import { useAuth } from '../contexts/AuthContext';

// function LandingPage() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
//   const [role, setRole] = useState('student');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
  
//   const { login, register } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);
    
//     try {
//       if (isLogin) {
//         await login(email, password);
//       } else {
//         await register(email, password, name, role);
//       }
//       window.location.href = '/dashboard';
//     } catch (err) {
//       setError(err.response?.data?.error || 'Authentication failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black relative overflow-hidden">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
//         <div className="absolute top-40 left-40 w-80 h-80 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
//       </div>

//       {/* Main Content */}
//       <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
//         <div className="max-w-6xl w-full mx-auto">
//           {/* Hero Section & Auth Card */}
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             {/* Left Side - Hero Content */}
//             <div className="text-white space-y-6">
//               <div className="inline-block">
//                 <div className="backdrop-blur-lg bg-white/5 rounded-2xl px-4 py-2 border border-white/10">
//                   <span className="text-sm font-medium text-purple-400">✨ AI-Powered Assessment</span>
//                 </div>
//               </div>
              
//               <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
//                 MCQ Grading &
//                 <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"> Assessment System</span>
//               </h1>
              
//               <p className="text-gray-400 text-lg">
//                 Automate your MCQ grading process with AI. Upload answer sheets, get instant results, 
//                 and provide detailed feedback to students.
//               </p>
              
//               {/* Features Grid */}
//               <div className="grid grid-cols-2 gap-4 pt-4">
//                 <div className="backdrop-blur-lg bg-white/5 rounded-xl p-4 border border-white/10">
//                   <div className="text-2xl mb-2">📄</div>
//                   <div className="font-semibold text-sm">PDF Upload</div>
//                   <div className="text-xs text-gray-500">Upload questions & answer keys</div>
//                 </div>
//                 <div className="backdrop-blur-lg bg-white/5 rounded-xl p-4 border border-white/10">
//                   <div className="text-2xl mb-2">🤖</div>
//                   <div className="font-semibold text-sm">AI Grading</div>
//                   <div className="text-xs text-gray-500">Automatic evaluation</div>
//                 </div>
//                 <div className="backdrop-blur-lg bg-white/5 rounded-xl p-4 border border-white/10">
//                   <div className="text-2xl mb-2">📊</div>
//                   <div className="font-semibold text-sm">Instant Reports</div>
//                   <div className="text-xs text-gray-500">Detailed performance analytics</div>
//                 </div>
//                 <div className="backdrop-blur-lg bg-white/5 rounded-xl p-4 border border-white/10">
//                   <div className="text-2xl mb-2">💬</div>
//                   <div className="font-semibold text-sm">Feedback</div>
//                   <div className="text-xs text-gray-500">Personalized corrections</div>
//                 </div>
//               </div>
//             </div>

//             {/* Right Side - Auth Card */}
//             <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 shadow-2xl p-8">
//               <div className="text-center mb-8">
//                 <h2 className="text-3xl font-bold text-white mb-2">
//                   {isLogin ? 'Welcome Back' : 'Create Account'}
//                 </h2>
//                 <p className="text-gray-400">
//                   {isLogin ? 'Login to access your dashboard' : 'Join our assessment platform'}
//                 </p>
//               </div>

//               {error && (
//                 <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
//                   {error}
//                 </div>
//               )}

//               <form onSubmit={handleSubmit} className="space-y-4">
//                 {!isLogin && (
//                   <>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-300 mb-2">
//                         Full Name
//                       </label>
//                       <input
//                         type="text"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
//                         placeholder="Enter your full name"
//                         required
//                       />
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-300 mb-2">
//                         Role
//                       </label>
//                       <div className="grid grid-cols-2 gap-3">
//                         <button
//                           type="button"
//                           onClick={() => setRole('student')}
//                           className={`px-4 py-3 rounded-lg border transition ${
//                             role === 'student'
//                               ? 'bg-purple-600 border-purple-500 text-white'
//                               : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
//                           }`}
//                         >
//                           🎓 Student
//                         </button>
//                         <button
//                           type="button"
//                           onClick={() => setRole('teacher')}
//                           className={`px-4 py-3 rounded-lg border transition ${
//                             role === 'teacher'
//                               ? 'bg-purple-600 border-purple-500 text-white'
//                               : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
//                           }`}
//                         >
//                           👨‍🏫 Teacher
//                         </button>
//                       </div>
//                     </div>
//                   </>
//                 )}

//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-2">
//                     Email Address
//                   </label>
//                   <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
//                     placeholder="you@example.com"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-2">
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
//                     placeholder="••••••••"
//                     required
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold hover:from-purple-700 hover:to-cyan-700 transition transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {loading ? 'Processing...' : (isLogin ? 'Login' : 'Create Account')}
//                 </button>
//               </form>

//               <div className="mt-6 text-center">
//                 <button
//                   onClick={() => setIsLogin(!isLogin)}
//                   className="text-gray-400 hover:text-white transition"
//                 >
//                   {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
//                 </button>
//               </div>

//               {/* Demo Credentials */}
//               <div className="mt-8 p-4 rounded-lg bg-white/5 border border-white/10">
//                 <p className="text-xs text-gray-500 text-center">
//                   Demo Credentials:
//                 </p>
//                 <div className="text-xs text-gray-400 text-center mt-2 space-y-1">
//                   <p>Teacher: teacher@example.com / password123</p>
//                   <p>Student: student@example.com / password123</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="relative z-10 text-center py-8 border-t border-white/10">
//         <p className="text-gray-500 text-sm">
//           © 2026 MCQ Assessment System. All rights reserved.
//         </p>
//       </div>

//       <style jsx>{`
//         @keyframes blob {
//           0% { transform: translate(0px, 0px) scale(1); }
//           33% { transform: translate(30px, -50px) scale(1.1); }
//           66% { transform: translate(-20px, 20px) scale(0.9); }
//           100% { transform: translate(0px, 0px) scale(1); }
//         }
//         .animate-blob {
//           animation: blob 7s infinite;
//         }
//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }
//         .animation-delay-4000 {
//           animation-delay: 4s;
//         }
//       `}</style>
//     </div>
//   );
// }

// export default LandingPage;

// frontend/src/components/LandingPage.jsx
// frontend/src/components/LandingPage.jsx
// frontend/src/components/LandingPage.jsx

// frontend/src/components/LandingPage.jsx
import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Brain, 
  Upload,
  CheckCircle,
  ChevronRight,
  Sparkles,
  GraduationCap,
  BarChart3,
  Users
} from 'lucide-react';
import Navbar from './Navbar';

function LandingPage({ onNavigate }) {
  const [currentSection, setCurrentSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'features', 'how-it-works', 'cta'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-black">
      <Navbar onNavigate={onNavigate} currentSection={currentSection} onSectionChange={setCurrentSection} />
      
      {/* Hero Section with Square-Net Grid Background */}
      <section id="hero" className="min-h-screen flex items-center relative overflow-hidden pt-16">
        {/* Square-Net Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 49px, rgba(255,255,255,0.08) 49px, rgba(255,255,255,0.08) 50px),
                              repeating-linear-gradient(90deg, transparent, transparent 49px, rgba(255,255,255,0.08) 49px, rgba(255,255,255,0.08) 50px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        {/* Animated Glow Effects */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Smart MCQ
              <span className="block text-gray-400">Grading & Assessment System</span>
            </h1>
            
            <p className="text-[17px] text-gray-400 max-w-2xl mx-auto mb-4">
              Teachers upload quizzes via PDF or manually. Students take quizzes, get instant grades, 
              and receive detailed feedback on correct and incorrect answers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('login')}
                className="px-7 py-2 rounded-xs bg-white text-black font-semibold hover:bg-gray-200 transition transform hover:scale-105 flex items-center gap-2"
              >
                Get Started
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
              onClick={()=>{document.getElementById('features').scrollIntoView({behavior: 'smooth'})}}
                
                className="px-8 py-2 rounded-xs border border-white/20 text-white hover:bg-white/10 transition"
              >
                Learn More
              </button>
            </div>
            
            <div className="mt-12 flex justify-center gap-8 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                For Teachers & Students
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                PDF or Manual Quiz Creation
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Automatic Grading & Feedback
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Features for Everyone
            </h2>
            <p className="text-[17px] text-gray-400 max-w-2xl mx-auto">
              Built for both teachers and students to streamline the assessment process
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Teacher Features */}
            <div className="backdrop-blur-lg bg-white/5 rounded-2xl border border-white/10 p-8">
              <div className="flex justify-center mb-6">
                  <div className="relative z-10">
                    <GraduationCap className="w-12 h-12 text-white" />
                  </div>
              </div>
              <h3 className="text-xl font-semibold text-white text-center mb-4">For Teachers</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center gap-2">✓ Create quizzes via PDF upload</li>
                <li className="flex items-center gap-2">✓ Manually create questions</li>
                <li className="flex items-center gap-2">✓ Upload answer keys for automatic grading</li>
                <li className="flex items-center gap-2">✓ View all registered students</li>
                <li className="flex items-center gap-2">✓ Track student performance</li>
              </ul>
            </div>
            
            {/* Student Features */}
            <div className="backdrop-blur-lg bg-white/5 rounded-2xl border border-white/10 p-8">
              <div className="flex justify-center mb-6">
                  <div className="relative z-10">
                    <Users className="w-12 h-12 text-white" />
                  </div>
              </div>
              <h3 className="text-xl font-semibold text-white text-center mb-4">For Students</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center gap-2">✓ View all available quizzes</li>
                <li className="flex items-center gap-2">✓ Take quizzes with timer</li>
                <li className="flex items-center gap-2">✓ Get instant grades and scores</li>
                <li className="flex items-center gap-2">✓ See correct/incorrect answers</li>
                <li className="flex items-center gap-2">✓ Receive detailed feedback</li>
                <li className="flex items-center gap-2">✓ Track overall performance percentage</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-black/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Simple process from quiz creation to student results
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center text-2xl font-bold text-white border border-white/20">
                1
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Teacher Creates Quiz</h3>
              <p className="text-gray-400">Upload PDF or manually create questions with answer key</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center text-2xl font-bold text-white border border-white/20">
                2
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Student Takes Quiz</h3>
              <p className="text-gray-400">Access available quizzes and submit answers</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center text-2xl font-bold text-white border border-white/20">
                3
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Instant Results & Feedback</h3>
              <p className="text-gray-400">Get grades, correct answers, and personalized feedback</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-24 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to Transform Your Assessment Process?
            </h2>
            <p className="text-[17px] text-gray-400 max-w-2xl mx-auto mb-8">
              Join us today and experience automated MCQ grading with detailed feedback for students.
            </p>
            <button
              onClick={() => onNavigate('login')}
              className="px-7 py-3 rounded-xs bg-white text-black font-semibold hover:bg-gray-200 transition transform hover:scale-105 flex items-center gap-2 mx-auto"
            >
              Get Started Now
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                MCQAssess
              </h3>
              <p className="text-gray-500 text-sm">
                Automated MCQ grading and assessment platform for modern education.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition">How It Works</a></li>
                <li><button onClick={() => onNavigate('login')} className="hover:text-white transition">Login</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="text-center text-gray-500 text-sm pt-8 border-t border-white/10">
            <p>&copy; 2026 MCQAssess. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;