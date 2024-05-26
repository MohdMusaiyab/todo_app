import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          About MongoDB To-Do App
        </h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4">
            <p className="text-lg text-gray-700">
              Our MongoDB To-Do App is designed to simplify task management,
              leveraging the power and flexibility of MongoDB for seamless data
              storage and retrieval. Whether you're a solo user organizing
              personal tasks or part of a team coordinating projects, our app
              offers intuitive features to enhance your productivity.
            </p>
            <p className="mt-4 text-lg text-gray-700">
              Built with modern web technologies like React and powered by
              MongoDB's document storage capabilities, our application ensures
              robust performance and scalability. Enjoy real-time updates,
              effortless task creation, and efficient task tracking all within a
              clean and user-friendly interface.
            </p>
            <p className="mt-4 text-lg text-gray-700">
              At MongoDB To-Do, we prioritize simplicity without sacrificing
              functionality. Our goal is to empower users with tools that adapt
              to their needs, providing a seamless experience whether you're
              accessing tasks from your desktop or on the go with mobile
              devices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
