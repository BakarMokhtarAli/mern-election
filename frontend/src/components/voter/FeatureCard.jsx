import React from "react";

export const FeatureCard = ({ title, description, icon }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-lg text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
};
