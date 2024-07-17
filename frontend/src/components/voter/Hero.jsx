import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="bg-blue-500 text-white py-20 text-center">
      <h1 className="text-3xl md:text-5xl font-bold mb-4">
        Welcome to the Election App
      </h1>
      <p className="text-lg md:text-xl">
        Your one-stop platform for all election activities.
      </p>
      <button className="mt-8 px-4 py-2 md:px-6 md:py-3 bg-white text-blue-500 font-semibold rounded-lg">
        <Link to={"/signup"}>Get Started</Link>
      </button>
    </div>
  );
};
