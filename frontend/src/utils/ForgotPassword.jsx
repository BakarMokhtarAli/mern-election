// eslint-disable-next-line no-unused-vars
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useTitle } from "../Hooks/useTitle";

const ForgotPassword = () => {
  useTitle("forgot password");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("/api/v1/auth/forgot-password", {
        email,
      });
      toast.success(data.message);
      setLoading(false);
      setEmail("");
    } catch (error) {
      toast.error(error.response.data || "Something went wrong.");
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              autoComplete="off"
              className="mt-2 w-full p-2 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:border-blue-600 transition duration-200"
          >
            {loading ? "loading..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
