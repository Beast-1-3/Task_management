import React from "react";
import Navbar from "../components/Navbar";

const MainLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden font-sans flex flex-col">
      {/* Background - Permanent Glassmorphism Dark Theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]"></div>

      {/* Neon Blobs */}
      <div className="absolute w-[400px] h-[400px] bg-purple-500/30 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-[500px] h-[500px] bg-pink-500/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>
      <div className="absolute w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping"></div>

      {/* Glass Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-2xl"></div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/10 border-b border-white/20">
        <Navbar />
      </header>

      {/* Content */}
      <main className="relative z-10 flex-grow px-4 sm:px-6 lg:px-8 py-6 text-white">
        <div className="max-w-7xl mx-auto rounded-xl p-6 bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
          {children}
        </div>
      </main>

      {/* Sticky Footer */}
      <footer className="relative z-10 text-center py-4 text-sm bg-white/10 backdrop-blur-lg text-gray-200 border-t border-white/20">
        © {new Date().getFullYear()} Task_Manager. Crafted with ❤️.
      </footer>
    </div>
  );
};

export default MainLayout;
