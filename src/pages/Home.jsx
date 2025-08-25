import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Tasks from "../components/Tasks";
import MainLayout from "../layouts/MainLayout";

const Home = () => {
  const authState = useSelector((state) => state.authReducer);
  const { isLoggedIn } = authState;

  useEffect(() => {
    document.title = authState.isLoggedIn
      ? `${authState.user.name}'s tasks`
      : "Task Manager";
  }, [authState]);

  return (
    <MainLayout>
      {/* 3D Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute w-full h-full animate-gradient-move bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] opacity-90"></div>
        <div className="absolute w-96 h-96 bg-purple-700 opacity-30 rounded-full blur-3xl top-10 left-10 animate-float-slow" />
        <div className="absolute w-80 h-80 bg-blue-600 opacity-20 rounded-full blur-2xl bottom-20 right-20 animate-float" />
      </div>
      <div className="min-h-screen flex justify-center items-center">
        {!isLoggedIn ? (
          <div className="max-w-2xl w-full p-12 rounded-3xl glassmorphism text-center shadow-2xl border border-white/20">
            <h1 className="text-5xl font-extrabold text-white mb-6 drop-shadow-lg">
              Welcome to <span className="text-blue-400">Task Manager</span>
            </h1>
            <p className="text-gray-200 mb-10 text-lg">
              Organize, track, and manage all your tasks with ease.
            </p>
            <Link
              to="/signup"
              className="inline-block px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 text-xl border-0"
            >
              Get Started
            </Link>
          </div>
        ) : (
          <div className="max-w-4xl w-full mx-auto p-12 glassmorphism-loggedin shadow-2xl border border-white/20 flex flex-col items-center mt-16 mb-16">
            <div className="mb-8 flex flex-col items-center">
              <span className="block mb-3">
                <svg className="w-16 h-16 text-green-400 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="rgba(34,197,94,0.1)" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2l4-4" />
                </svg>
              </span>
              <h1 className="text-5xl font-extrabold text-white drop-shadow-lg text-center">
                Welcome back, <span className="text-blue-400">{authState.user.name}</span>
              </h1>
              <p className="text-gray-300 mt-3 text-lg text-center">You're signed in! Manage your tasks below.</p>
            </div>
            <div className="w-full max-h-[60vh] overflow-y-auto custom-scrollbar">
              <Tasks />
            </div>
          </div>
        )}
      </div>
      {/* Glassmorphism and 3D animation styles */}
      <style>{`
        .glassmorphism {
          background: rgba(30, 41, 59, 0.55);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          border-radius: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.18);
        }
        .glassmorphism-loggedin {
          background: rgba(30, 41, 59, 0.85);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border-radius: 2rem;
          border: 1.5px solid rgba(255, 255, 255, 0.22);
          transition: box-shadow 0.3s, background 0.3s;
        }
        .glassmorphism-loggedin:hover {
          box-shadow: 0 16px 48px 0 rgba(31, 38, 135, 0.55);
          background: rgba(30, 41, 59, 0.92);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(100, 116, 139, 0.3);
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        @keyframes gradient-move {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-move {
          background-size: 200% 200%;
          animation: gradient-move 10s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float 14s ease-in-out infinite;
        }
      `}</style>
    </MainLayout>
  );
};

export default Home;
