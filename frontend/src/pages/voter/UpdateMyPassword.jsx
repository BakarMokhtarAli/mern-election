import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Footer, SideBar } from "../../components/voter";
// import { useGetSingleVoterQuery } from "../../store/api/VoterSlice";
import { useUpdateVoterPasswordMutation } from "../../store/api/VoterSlice";
import { Loading } from "../../utils";
import toast from "react-hot-toast";
import { useTitle } from "../../Hooks/useTitle";

export const UpdateMyPassword = () => {
  useTitle("update your password");
  //   const { id } = useParams();
  const [updateVoterPassword] = useUpdateVoterPasswordMutation();
  const [passwordCurrent, setPasswordCurrent] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPassowrdConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  // const fileRef = useRef();
  //   console.log(firstName);
  //   useEffect(() => {
  //     setFirstName(data?.voter.firstName);
  //     setLastName(data?.voter.lastName);
  //     setEmail(data?.voter.email);
  //   }, [data]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedPassword = {
      passwordCurrent,
      password,
      passwordConfirm,
    };
    // console.log(updatedVoter);
    setLoading(true);
    try {
      const data = await updateVoterPassword(updatedPassword).unwrap();
      console.log(data);
      setLoading(false);
      toast.success(data.message || `password updated success!`);
      navigate("/profile");
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

        {/* <div className="mb-4"> */}
        {/* <label className="block text-gray-700">Profile Image</label> */}
        {/* <input
            type="file"
            accept="image/*"
            ref={fileRef}
            hidden
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div> */}

        {/* <div className="mb-4 flex justify-center items-center">
          {imagePreview && (
            <img
              onClick={() => fileRef.current.click()}
              src={imagePreview}
              alt="Preview"
              className="cursor-pointer self-center w-20 h-20 rounded-full"
            />
          )}
        </div> */}

        <div className="mb-4">
          <label className="block text-gray-700">current password</label>
          <input
            type="password"
            name="passwordCurrent"
            id="passwordCurrent"
            required
            autoComplete="off"
            value={passwordCurrent || ``}
            onChange={(e) => setPasswordCurrent(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
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
