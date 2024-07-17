import { SideBar, Footer } from "../../components/voter";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useTitle } from "../../Hooks/useTitle";

export const VoterSignUp = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };
  useTitle("Sign up");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("firstName", formData.firstName);
      formDataToSubmit.append("lastName", formData.lastName);
      formDataToSubmit.append("email", formData.email);
      formDataToSubmit.append("password", formData.password);
      formDataToSubmit.append("passwordConfirm", formData.passwordConfirm);

      if (image) {
        formDataToSubmit.append("photo", image);
      }

      const { data } = await axios.post(
        "api/v1/auth/signup",
        formDataToSubmit,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Store the email in the session
      sessionStorage.setItem("email", formData.email);

      setLoading(false);
      toast.success(data.message);

      // Redirect to another page or show success message
      navigate("/verify-email"); // Adjust the path as necessary
    } catch (error) {
      toast.error(error.response ? error.response.data.message : error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SideBar />
      <div className="flex items-center justify-center min-h-60 bg-gray-100 mt-10 sm:ml-28">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6">Signup</h2>
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
          <div className="mb-4">
            <label className="block text-gray-700">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          {imagePreview && (
            <div className="mb-4 flex items-center">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-52 h-52 rounded-full self-center"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded mt-4"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};
