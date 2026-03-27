import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useState } from "react";
import { FaBriefcase, FaMoon, FaSun } from "react-icons/fa";

function Navbar() {

  const { user, logout } = useContext(AuthContext);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);

    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md px-6 py-4 flex justify-between items-center">

      {/* Logo */}
      <div className="flex items-center space-x-2 text-blue-600 text-xl font-bold">
        <FaBriefcase />
        <span>CareerConnect</span>
      </div>

      {/* Navigation */}
      <div className="hidden md:flex space-x-6 text-gray-700 dark:text-gray-200">

        <Link to="/" className="hover:text-blue-600">Home</Link>
        <Link to="/jobs" className="hover:text-blue-600">Jobs</Link>
        <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>

      </div>

      {/* Right Side */}
<div className="flex items-center space-x-4">

  <button
    onClick={toggleDarkMode}  
    className="text-gray-700 dark:text-gray-200"
  >
    {darkMode ? <FaSun /> : <FaMoon />}
  </button>

  {user?.role === "jobseeker" && (
    <a href="/my-applications" className="hover:text-blue-600">
      My Applications
    </a>
  )}

  {user ? (

    <>
      <span className="text-gray-700 dark:text-gray-200">
        Hello {user.name}
      </span>

      <button
        onClick={logout}
        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
      >
        Logout
      </button>
    </>

  ) : (

    <>
      <Link
        to="/login"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Login
      </Link>

      <Link
        to="/register"
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
      >
        Register
      </Link>
    </>

  )}

</div>

    </nav>
  );
}

export default Navbar;