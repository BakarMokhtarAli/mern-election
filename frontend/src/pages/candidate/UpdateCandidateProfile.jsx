import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Footer, SideBar } from "../../components/candidate";
// import { useGetSingleVoterQuery } from "../../store/api/VoterSlice";
import {
  useUpdateCandidateMutation,
  useGetOneCandidateQuery,
} from "../../store/api/CandidateSlice";
import { Loading } from "../../utils";
import toast from "react-hot-toast";
import { useTitle } from "../../Hooks/useTitle";

export const UpdateCandidateProfile = () => {
  const { id } = useParams();
  const { data, error, isLoading, refetch } = useGetOneCandidateQuery(id);
  const [updateCandidate] = useUpdateCandidateMutation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [loading, setLoading] = useState(false);
  const fileRef = useRef();
  //   console.log(firstName);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setImagePreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    setFirstName(data?.candidate.firstName);
    setLastName(data?.candidate.lastName);
    setEmail(data?.candidate.email);
    setImagePreview(data?.candidate.photo);
  }, [data]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedCandidate = {
      firstName,
      lastName,
      email,
      photo,
    };
    setLoading(true);
    try {
      const data = await updateCandidate(updatedCandidate).unwrap();
      console.log(data);
      setLoading(false);
      toast.success(data.message || `candidate updated success!`);
      navigate("/candidate/profile");
    } catch (err) {
      console.log("error", err);
      setLoading(false);
      toast.error(err.data.message || "Failed to update password");
    }
  };
  useTitle("update your profile");
  if (isLoading) <Loading />;
  return (
    <div>
      <SideBar />
      {isLoading && <Loading />}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 max-w-xl mx-auto md:ml-64 mt-20 rounded shadow-md mb-10"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          update candidate
        </h2>

        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            ref={fileRef}
            hidden
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        <div className="mb-4 flex justify-center items-center">
          {imagePreview && (
            <img
              onClick={() => fileRef.current.click()}
              src={imagePreview}
              alt="Preview"
              className="cursor-pointer self-center w-20 h-20 rounded-full"
            />
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            required
            autoComplete="off"
            value={firstName || ``}
            onChange={(e) => setFirstName(e.target.value)}
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
            value={lastName || ""}
            onChange={(e) => setLastName(e.target.value)}
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
            value={email || ""}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        {/* {imagePreview && ( */}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded mt-4"
          disabled={loading}
        >
          {loading ? "loding..." : "update"}
        </button>

        <Footer />
      </form>
    </div>
  );
};
