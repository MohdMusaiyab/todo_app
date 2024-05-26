import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          About MERN Stack Todo App
        </h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4">
            <p className="text-lg text-gray-700">
              Our MERN Stack Todo App is designed to streamline task management
              with comprehensive authentication features. Whether you're managing
              personal tasks or collaborating within a team, our application
              provides essential functionalities in a user-friendly interface.
            </p>
            <p className="mt-4 text-lg text-gray-700">
              Powered by MongoDB for flexible and scalable data storage, Express
              for robust backend API development, React for responsive frontend
              interfaces, and Node.js for server-side execution, our app ensures
              seamless performance across devices.
            </p>
            <p className="mt-4 text-lg text-gray-700">
              Enjoy features such as user authentication, secure task creation
              and management, real-time updates, and intuitive task tracking.
              Whether accessed on desktop or mobile, our application prioritizes
              usability and security without compromising on functionality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
