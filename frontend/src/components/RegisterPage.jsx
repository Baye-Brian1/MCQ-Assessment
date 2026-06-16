
import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Lock, 
  ArrowLeft, 
  UserPlus,
  Eye,
  EyeOff,
  GraduationCap,
  Briefcase,
  CheckCircle,
  TriangleAlert
} from 'lucide-react';

// const RegisterPage = ({}) =>{
//     const 
// }

function RegisterPage({ onRegister, onBack }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
     if (!name || !email || !password){
      setError('please fill in all fields');
      return;
     }
     if (password.length < 6){
      setError('password must be atleast 6 characters');
      return;
     }
     setLoading(true);
     setTimeout(()=>{
      const userData={
        id: Date.now().toString(),
        email,
        name,
        role: role
      };
      onRegister(userData);
      setLoading(false)

     },1000)
  }
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Square-Net Grid Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 49px, rgba(255,255,255,0.08) 49px, rgba(255,255,255,0.05) 50px),
                            repeating-linear-gradient(90deg, transparent, transparent 49px, rgba(255,255,255,0.08) 49px, rgba(255,255,255,0.05) 50px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      
      <div className="relative z-10 max-w-md w-full">
        {/* Back Button */}
        <button 
          onClick={onBack} 
          className="mb-8 text-gray-400 hover:text-white transition flex items-center gap-2 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition" />
          Back to Home
        </button>
        
        {/* Register Card */}
        <div className="backdrop-blur-xl bg-white/5 rounded-xs border border-white/20 p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-gray-400">Join our assessment platform</p>
          </div>
          
          {error && (
            <div className="mb-4 p-3 rounded-sm bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
              <span><TriangleAlert/></span>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`px-4 py-3 cursor-pointer rounded-xs border transition flex items-center justify-center gap-2 ${
                    role === 'student'
                      ? 'bg-white text-black border-white'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  <GraduationCap className="w-5 h-5" />
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => setRole('teacher')}
                  className={`px-4 py-3 cursor-pointer rounded-xs border transition flex items-center justify-center gap-2 ${
                    role === 'teacher'
                      ? 'bg-white text-black border-white'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  <Briefcase className="w-5 h-5" />
                  Teacher
                </button>
              </div>
            {/* Full Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xs bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition"
                  placeholder="name"
                  required
                />
              </div>
            </div>
            
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xs bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 rounded-xs bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition"
                  placeholder="password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div className="text-xs text-gray-500 space-y-1">
              <p className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Password must be at least 6 characters
              </p>
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xs cursor-pointer bg-white text-black font-semibold hover:bg-gray-200 transition transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>Creating Account...</>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  Sign Up
                </>
              )}
            </button>
          </form>
          
          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <button onClick={onBack} className="text-white cursor-pointer hover:underline font-medium">
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;