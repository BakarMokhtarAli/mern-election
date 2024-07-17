import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Footer, SideBar } from "../../components/admin";
import { openModal } from "../../store/redux/AlertModal";
import {
  useUpdateVoterMutation,
  useGetSingleVoterQuery,
} from "../../store/api/AdminSlice";
import { Loading } from "../../utils";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { PopUpModal } from "../../utils/PopUpModal";
import { RiAdminFill } from "react-icons/ri";
import { useTitle } from "../../Hooks/useTitle";
export const UpdateVoter = () => {
  const { id } = useParams();
  const { data, error, isLoading, refetch } = useGetSingleVoterQuery(id);
  const [updateVoter] = useUpdateVoterMutation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  //   const fileRef = useRef();
  //   console.log(firstName);
  useEffect(() => {
    setFirstName(data?.voter.firstName);
    setLastName(data?.voter.lastName);
    setEmail(data?.voter.email);
  }, [data]);
  const navigate = useNavigate();
  useTitle(`update-${firstName}`);
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedVoter = {
      firstName,
      lastName,
      email,
    };
    // console.log(updatedVoter);
    setLoading(true);
    updateVoter({ id, updatedVoter })
      .unwrap()
      .then((data) => {
        // console.log(data);
        toast.success(data.message);
        refetch();
        setLoading(false);
        navigate("/admin/voters");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error(err.data.message || `failed to updated`);
      });
  };

  if (isLoading) <Loading />;
  const { isOpen, deleteModal } = useSelector((state) => state.alert);

  const dispatch = useDispatch();
  const handleOpenModal = (id) => {
    dispatch(openModal(id));
  };
  const changeToAdminMessage =
    "are you sure you want to change this voter as an admin";
  return (
    <div>
      <SideBar />
      {isLoading && <Loading />}
      {isOpen && <PopUpModal changeToAdminMessage={changeToAdminMessage} />}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 max-w-xl mx-auto md:ml-64 mt-20 rounded shadow-md mb-10"
      >
        <div className="flex justify-between items-center mx-2">
          <h2 className="text-2xl font-bold mb-6">update voter</h2>
          <button
            onClick={() => handleOpenModal(id)}
            type="button"
            className="p-2 rounded-sm bg-blue-500 text-white"
          >
            <RiAdminFill title="make admin" />
          </button>
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
        <span className="text-sm text-slate-950 hover:underline">
          update voters{" "}
          <Link to={`/admin/voter-password/${id}`} className="text-blue-600">
            password
          </Link>
        </span>

        <Footer />
      </form>
    </div>
  );
};
