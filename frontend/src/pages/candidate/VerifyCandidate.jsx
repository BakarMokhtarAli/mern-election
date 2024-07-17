// src/VerifyCode.js

import { SideBar, Footer } from "../../components/voter";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTitle } from "../../Hooks/useTitle";

export const VerifyCandidate = () => {
  const [loading, setLoading] = useState();
  const [code, setCode] = useState("");
  const email = sessionStorage.getItem("email");
  const navigate = useNavigate();

  //   console.log(email);
  // useEffect(() => {
  //   if (!email) {
  //     navigate("/login");
  //   }
  // }, []);
  useTitle("Verify candidate");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("/api/v1/candidates/verify-candidate", {
        code,
        email,
      });
      // sessionStorage.removeItem("email");
      console.log(data);
      toast.success(data.message);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message || error.message);
      console.log(error);
    }
  };

  return (
    <>
      <SideBar />
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-900">
            Verify Code
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="code"
                className="block text-sm font-medium text-gray-700"
              >
                Verification Code
              </label>
              <input
                type="text"
                id="code"
                autoComplete="off"
                onChange={(e) => setCode(e.target.value)}
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? "verifying.." : "Verify"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};
