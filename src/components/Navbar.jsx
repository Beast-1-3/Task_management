import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/actions/authActions";

const Navbar = () => {
  const authState = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen);
  const handleLogoutClick = () => dispatch(logout());

  return (
    <header className="sticky top-0 z-50 flex justify-between items-center px-6 py-4 
      backdrop-blur-xl bg-black/20 border-b border-white/20 shadow-lg">
      
      {/* Logo / Title */}
      <h2 className="cursor-pointer text-2xl font-bold tracking-wide">
        <Link
          to="/"
          className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent"
        >
          Task Manager
        </Link>
      </h2>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6 items-center text-sm font-medium uppercase text-white">
        {authState.isLoggedIn ? (
          <>
            <li>
              <Link
                to="/tasks/add"
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 transition-all"
              >
                <i className="fa-solid fa-plus mr-1"></i> Add Task
              </Link>
            </li>
            <li
              className="py-2 px-3 cursor-pointer text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition"
              onClick={handleLogoutClick}
            >
              Logout
            </li>
          </>
        ) : (
          <li>
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-all"
            >
              Login
            </Link>
          </li>
        )}
      </ul>

      {/* Mobile Menu Button */}
      <span
        className="md:hidden cursor-pointer text-white text-xl"
        onClick={toggleNavbar}
      >
        <i className="fa-solid fa-bars"></i>
      </span>

      {/* Mobile Sidebar */}
      <div
        className={`fixed md:hidden right-0 top-0 bottom-0 w-screen sm:w-9/12 h-screen 
          backdrop-blur-xl bg-black/40 shadow-xl transform transition-transform duration-300 
          ${isNavbarOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-end p-4">
          <span
            className="cursor-pointer text-white text-2xl"
            onClick={toggleNavbar}
          >
            <i className="fa-solid fa-xmark"></i>
          </span>
        </div>
        <ul className="flex flex-col gap-6 uppercase font-medium text-center mt-10 text-white">
          {authState.isLoggedIn ? (
            <>
              <li>
                <Link
                  to="/tasks/add"
                  className="block mx-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90"
                  onClick={toggleNavbar}
                >
                  <i className="fa-solid fa-plus mr-2"></i> Add Task
                </Link>
              </li>
              <li
                className="py-3 cursor-pointer text-gray-300 hover:text-white hover:bg-white/10 rounded-md mx-6"
                onClick={() => {
                  handleLogoutClick();
                  toggleNavbar();
                }}
              >
                Logout
              </li>
            </>
          ) : (
            <li>
              <Link
                to="/login"
                className="block mx-6 py-3 rounded-lg bg-white/20 hover:bg-white/30"
                onClick={toggleNavbar}
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
