import React from "react";
import { FeatureCard } from "./FeatureCard";

export const FeatureSection = () => {
  return (
    <div className="py-12 bg-gray-100 max-w-full" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Features</h2>
          <p className="mt-4 text-md text-gray-600">
            Explore the amazing features of our election app.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            title="Secure Voting"
            description="Experience secure and transparent voting with our platform."
            icon="🔒"
          />
          <FeatureCard
            title="Real-time Results"
            description="Get real-time updates and results as votes are counted."
            icon="📊"
          />
          <FeatureCard
            title="User Friendly"
            description="Enjoy an intuitive and easy-to-use interface."
            icon="👍"
          />
        </div>
      </div>
    </div>
  );
};
