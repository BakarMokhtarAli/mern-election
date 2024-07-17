import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Footer, SideBar } from "../../components/admin";
// import { useGetSingleVoterQuery } from "../../store/api/VoterSlice";
import { useUpdateVoterPasswordMutation } from "../../store/api/AdminSlice";
import { Loading } from "../../utils";
import toast from "react-hot-toast";
import { useTitle } from "../../Hooks/useTitle";

export const UpdateVoterPassword = () => {
  const { id } = useParams();
  const [updateVoterPassword] = useUpdateVoterPasswordMutation();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPassowrdConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useTitle("updated-password");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedPassword = {
      password,
      passwordConfirm,
    };
    // console.log(updatedVoter);
    setLoading(true);
    try {
      const data = await updateVoterPassword({ id, updatedPassword }).unwrap();
      console.log(data);
      setLoading(false);
      toast.success(data.message || `password updated success!`);
      navigate("/admin/voters");
    } catch (err) {
      console.log("error", err);
      setLoading(false);
      toast.error(err.data.message || "Failed to update password");
    }
  };

  return (
    <div>
      <SideBar />
      {/* {isLoading && <Loading />} */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 max-w-xl mx-auto md:ml-64 mt-20 rounded shadow-md mb-10"
      >
        <h2 className="text-2xl font-bold mb-6">update voter</h2>

        <div className="mb-4">
          <label className="block text-gray-700">password</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            autoComplete="off"
            value={password || ""}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Confirm your password</label>
          <input
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            required
            autoComplete="off"
            value={passwordConfirm || ""}
            onChange={(e) => setPassowrdConfirm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        {/* {imagePreview && ( */}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded mt-4"
          disabled={loading}
        >
          {loading ? "loding..." : "update your password"}
        </button>

        <Footer />
      </form>
    </div>
  );
};
