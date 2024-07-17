import { SideBar, Footer } from "../../components/voter";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  logInSuccess,
  loginFailure,
} from "../../store/redux/VoterLoginSlice";
import { useTitle } from "../../Hooks/useTitle";

export const VoterLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  useTitle("Login");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.VoterLogin);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const { data } = await axios.post("/api/v1/auth/signin", formData);
      console.log(data);
      const { _id, role } = data.voter;
      console.log(role);
      if (role != "voter") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

      toast.success(data.message);
      dispatch(logInSuccess({ _id, role }));
      // console.log(dispatch(logInSuccess()));
    } catch (error) {
      dispatch(loginFailure(error));
      toast.error(error.response ? error.response.data.message : error.message);
      const message = `Your account is not yet validated. Another verification code has been sent to your email.`;

      if (error.response.data.message == message) {
        navigate("/verify-email");
      }
    }
  };

  return (
    <>
      <SideBar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 mt-10 sm:ml-28">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6">Login</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              autoComplete="off"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              required
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded mt-4"
            disabled={loading}
          >
            {loading ? "login..." : "Login"}
          </button>
          <div className="mt-6 text-center flex justify-between">
            <span className="text-sm text-slate-950 hover:underline">
              Login as a{" "}
              <Link to="/candidate/login" className="text-blue-600">
                candidate{" "}
              </Link>
              ||{" "}
              <Link to={"/signup"} className="text-blue-600">
                signup
              </Link>
            </span>
            <Link to="/forgotPassword" className="text-red-500">
              Forgot Password
            </Link>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};
