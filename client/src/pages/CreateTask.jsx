import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const CreateTask = () => {
    const navigate=useNavigate();
    const user=useSelector((state)=>state.user.currentUser)
    console.log(user?.user?.id)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("token");
    try {
      await axios.post("http://localhost:3000/task/create-task", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Optionally, you can redirect or show a success message after task creation
      console.log("Task created successfully!");
      // Reset form fields after submission
      setFormData({ title: "", description: "", dueDate: "" });
      navigate(`/user-task/${user?.user?.id}`)
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Create New Task
        </h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <form onSubmit={handleSubmit} className="p-4">
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                rows="4"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                htmlFor="dueDate"
                className="block text-sm font-medium text-gray-700"
              >
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Create Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
