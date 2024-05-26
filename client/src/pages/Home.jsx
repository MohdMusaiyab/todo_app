import React from "react";
import {Link} from "react-router-dom";
import { useSelector } from "react-redux";
const Home = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <div className=" min-h-screen">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-5xl font-extrabold text-blue-100 leading-tight mb-4">
              Welcome to Todo App
            </h1>
            <p className="text-xl text-white mb-6">
              Organize your tasks efficiently with our powerful Todo
              application. Keep track of what needs to be done and stay
              productive.
            </p>
            <Link className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300" to="/login">
              Get Started
            </Link>
          </div>
          <div className="text-center">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/todo-list-2839461-2371075.png"
              alt="Todo App"
              className="mx-auto rounded-lg shadow-xl border-4 border-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
