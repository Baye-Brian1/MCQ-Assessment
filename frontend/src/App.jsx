// // frontend/src/App.jsx
// import React from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider, useAuth } from './contexts/AuthContext';
// import LandingPage from './components/LandingPage';
// import TeacherDashboard from './components/TeacherDashboard';
// import StudentDashboard from './components/StudentDashboard';

// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const { user, loading } = useAuth();
  
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center">
//         <div className="text-white">Loading...</div>
//       </div>
//     );
//   }
  
//   if (!user) return <Navigate to="/" />;
//   if (allowedRoles && !allowedRoles.includes(user.role)) {
//     return <Navigate to="/dashboard" />;
//   }
//   return children;
// };

// const DashboardRouter = () => {
//   const { user } = useAuth();
//   if (!user) return <Navigate to="/" />;
//   return user.role === 'teacher' ? <TeacherDashboard /> : <StudentDashboard />;
// };

// function App() {
//   return (
//     <BrowserRouter>
//       <AuthProvider>
//         <Routes>
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/dashboard" element={
//             <ProtectedRoute>
//               <DashboardRouter />
//             </ProtectedRoute>
//           } />
//         </Routes>
//       </AuthProvider>
//     </BrowserRouter>
//   );
// }

// export default App;

import React,{ useState } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('landing');
  };

  // Show login page
  if (currentPage === 'login') {
    return <LoginPage onLogin={handleLogin} onBack={() => setCurrentPage('landing')} onNavigateToRegister={() => setCurrentPage('register')} />;
  }

  // Show register page
  if (currentPage === 'register') {
    return <RegisterPage onRegister={handleLogin} onBack={() => setCurrentPage('login')} />;
  }

  // Show dashboard based on role
  if (currentPage === 'dashboard' && user) {
    if (user.role === 'teacher') {
      return <TeacherDashboard user={user} onLogout={handleLogout} />;
    }
    return <StudentDashboard user={user} onLogout={handleLogout} />;
  }

  // Show landing page
  return <LandingPage onNavigate={(page) => setCurrentPage(page)} />;
}

export default App;