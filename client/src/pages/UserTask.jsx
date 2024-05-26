import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const UserTask = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);

  const token = Cookies.get("token");
  const getUsertasks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/task/get-task/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    getUsertasks();
  }, []);

  const handleChange = async (taskId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:3000/task/update-status`,
        { taskId, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Update local tasks state after successful update
      setTasks(
        tasks.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3000/task/delete-task/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Update local tasks state after successful deletion
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">User Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <li
            key={task._id} // Correct the key to task._id
            className="flex justify-between items-center mb-2 p-4 bg-white rounded shadow"
          >
            <div>
              <h2 className="text-xl font-semibold">{task.title}</h2>
              <p>{task.description}</p>
              <p>Due Date: {task.dueDate}</p>
              <select
                value={task.status}
                className="mr-2 p-2 border border-gray-300 rounded"
                onChange={(e) => handleChange(task._id, e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div>
              <Link
                to={`/update-task/${task._id}`}
                className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Update
              </Link>
              <button
                onClick={() => handleDelete(task._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-center">
        <Link
          to="/create-task"
          className="bg-gray-600 text-gray-900 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
        >
          Create Task
        </Link>
      </div>
    </div>
  );
};

export default UserTask;
