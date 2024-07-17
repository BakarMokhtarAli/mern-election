import React, { useState } from "react";
import { Footer, SideBar } from "../../components/admin";
import { useNavigate } from "react-router-dom";
import { useCreateCandidateMutation } from "../../store/api/AdminSlice";
import toast from "react-hot-toast";
import { useTitle } from "../../Hooks/useTitle";

export const CreateCandidate = () => {
  useTitle("add-candidate");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [createCandidate] = useCreateCandidateMutation();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await createCandidate(formData).unwrap();
      console.log(data);
      setLoading(false);
      toast.success(data.message || "candidate created success");
      navigate("/admin");
    } catch (error) {
      setLoading(false);
      console.log(error);
      //   console.log(error.data.message);
      toast.error(error.data.message);
    }
  };

  return (
    <>
      <SideBar />
      <div className="max-w-5xl md:ml-56 md:mx-auto flex items-center justify-center bg-gray-100 mt-20 mb-10 sm:ml-28">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6">Signup</h2>

          <div>
            <div className="mb-4">
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                required
                autoComplete="off"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                required
                autoComplete="off"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
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
          </div>

          {/*  */}

          <div>
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
            <div className="mb-4">
              <label className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                name="passwordConfirm"
                id="passwordConfirm"
                required
                value={formData.passwordConfirm}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded mt-4"
            disabled={loading}
          >
            {loading ? "loading..." : "Signup"}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};
