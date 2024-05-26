import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

const LoginRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hasAccount, setHasAccount] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const response = await axios.post("http://localhost:3000/user/login/", {
        email: formData.email,
        password: formData.password,
      });
      console.log("Login success:", response.data.success);
      if (response.data.success) {
        dispatch(signInSuccess(response.data));
        console.log("Login success:", response.data);
        Cookies.set("token", response.data.token);
        //Naviagting to the Task of Users Page
        navigate(`/user-task/${response.data.user.id}`);
      } else {
        dispatch(signInFailure(response.data));
        console.error("Login error:", response.data);
      }
      // Handle login success, e.g., save token, navigate, etc.
    } catch (error) {
      console.error("Login error:", error);
      dispatch(signInFailure(error));
      // Handle login error, e.g., show error message
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const response = await axios.post(
        "http://localhost:3000/user/register/",
        {
          email: formData.email,
          password: formData.password,
          username: formData.username,
        }
      );
      if (response.data.success) {
        
        navigate("/login");
      }
    } catch (error) {
      dispatch(signInFailure(error));
      // Handle register error, e.g., show error message
    }
  };

  const toggleForm = () => {
    setHasAccount(!hasAccount);
    setFormData({ email: "", password: "", username: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Welcome
        </h2>
        <form
          className="space-y-4"
          onSubmit={hasAccount ? handleLogin : handleRegister}
        >
          {hasAccount ? (
            <>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-bold text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-bold text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none"
                >
                  Login
                </button>
              </div>
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={toggleForm}
                    className="text-indigo-500 hover:underline focus:outline-none"
                  >
                    Create one
                  </button>
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-bold text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  placeholder="Enter a username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-bold text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-bold text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none"
                >
                  Register
                </button>
              </div>
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={toggleForm}
                    className="text-indigo-500 hover:underline focus:outline-none"
                  >
                    Login
                  </button>
                </p>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginRegister;
