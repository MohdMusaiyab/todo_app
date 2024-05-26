import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white max-w-sm mx-auto rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl text-red-600 font-semibold mb-4">Oops! Error</h1>
          <p className="text-gray-700 text-lg mb-6">Sorry, something went wrong.</p>
          <Link
            to="/"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-flex items-center transition duration-300 ease-in-out"
          >
            Go back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Error;
