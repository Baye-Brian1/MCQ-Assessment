// frontend/src/components/LoginPage.jsx
import React, { useState } from "react";
import {
  Mail,
  Lock,
  ArrowLeft,
  LogIn,
  Eye,
  EyeOff,
  TriangleAlert,
} from "lucide-react";

const LoginPage = ({ onLogin, onBack, onNavigateToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please Fill in all fields");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const role = email.includes("teacher") ? "teacher" : "student";
      const userData = {
        id: Date.now().toString(),
        email,
        name: email.split("@")[0],
        role: role,
      };
      onLogin(userData);
      setLoading(false);
    }, 1000);
  };
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-8 relative overflow-hidden">
       <div className="absolute inset-0">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 49px, rgba(255,255,255,0.08) 49px, rgba(255,255,255,0.08) 50px),
                              repeating-linear-gradient(90deg, transparent, transparent 49px, rgba(255,255,255,0.08) 49px, rgba(255,255,255,0.08) 50px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

      <div className="relative z-10  max-w-md w-full">
        <button
          onClick={onBack}
          className="mb-8 gap-2 text-gray-400 hover:text-white transition group items-center flex "
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition" />
          Back to Home
        </button>
        <div className="backdrop-blur-xl bg-white/5 rounded-xs border border-white/20 p-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-400">Login to your account</p>
          </div>
          {error && (
            <div className="mb-4 p-3 rounded-xs bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
              <span><TriangleAlert/></span>
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <label className="block text-sm text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xs bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transiton"
                required
              />
            </div>
            <label className="block text-sm text-gray-300 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type={showPassword ? "type" : "password"}
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xs bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transiton"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition"
              >
                {showPassword ? (
                  <Eye className="w-5 h-5" />
                ) : (
                  <EyeOff className="w-5 h-5" />
                )}
              </button>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xs cursor-pointer bg-white tet-black font-semibold hover:bg-gray-600 transition transform hover:scale-[1.02] disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>Processing...</>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Login
                </>
              )}
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <button
                onClick={onNavigateToRegister}
                className="text-white hover:underline font-medium cursor-pointer"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
