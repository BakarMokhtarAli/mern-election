import React from "react";
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const navigate = useNavigate();
  console.log(navigate);
  const handleGoBack = () => {
    navigate(-1);
    console.log(navigate);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="text-center">
        <div className="mb-8">
          <svg
            className="w-24 h-24 mx-auto text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01M4.929 4.929a10.004 10.004 0 0114.142 0m-1.414 1.414a8.003 8.003 0 00-11.314 0m1.414 1.414a6 6 0 118.486 0m1.414 1.414a4.002 4.002 0 01-5.657 0m-1.414 1.414a2.002 2.002 0 002.828 0"
            />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          Waan ka xunahay, bogga aad raadineyso ma jiro.
        </p>
        <button
          onClick={handleGoBack}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        >
          Back
        </button>
      </div>
    </div>
  );
};
