import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <header className="py-6 border-b-2 border-gray-300">
      <div className="container mx-auto flex justify-between items-center px-6">
        <div className="text-white font-bold text-3xl">
          <Link to="/" className="hover:text-gray-300 transition duration-300">
            <img src="https://static-00.iconduck.com/assets.00/todo-icon-1024x1024-7nszgsj6.png" className="h-[50px] w-[50px]"></img>
          </Link>
        </div>
        <nav className="space-x-4">
          <Link
            to="/"
            className="text-white text-lg hover:text-gray-300 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-white text-lg hover:text-gray-300 transition duration-300"
          >
            About
          </Link>
          {user ? (
            <Link
              to={`/user-task/${user?.user?.id}`}
              className="text-white text-lg hover:text-gray-300 transition duration-300"
            >
              User Task
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-white text-lg hover:text-gray-300 transition duration-300"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
