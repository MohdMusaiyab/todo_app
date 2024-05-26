import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const UpdateTask = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const token = Cookies.get("token");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getSingleTask = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/task/get-single-task/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const formattedDueDate = formatDate(response.data.task.dueDate);
      setFormData({ ...response.data.task, dueDate: formattedDueDate });
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  };

  useEffect(() => {
    getSingleTask();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3000/task/update-task/${id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Task updated successfully");
      // Handle success or navigate to another page
    } catch (error) {
      console.error("Error updating task:", error);
      // Handle error state or display error message
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Update Task</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Task Name
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter task name"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Task Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter task description"
            rows="4"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="dueDate"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Update Task
        </button>
      </form>
    </div>
  );
};

export default UpdateTask;
