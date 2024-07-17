import { Link } from "react-router-dom";
import { SideBar, Footer } from "../../components/voter";
import { useGetSingleVoterQuery } from "../../store/api/VoterSlice";
import { useEffect } from "react";
import { useTitle } from "../../Hooks/useTitle";

export const VoterProfile = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const { data: voter, refetch } = useGetSingleVoterQuery(currentUser._id);

  useEffect(() => {
    refetch();
  }, []);
  useTitle(voter?.voter.FullName);

  return (
    <>
      <SideBar />
      <div className="max-w-lg md:ml-60 md:mx-auto mt-20 mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col items-center">
          <img
            className="w-32 h-32 rounded-full shadow-lg"
            src={voter?.voter.photo}
            alt="Profile"
          />
          <h2 className="text-2xl font-semibold mt-4">
            {voter?.voter.FullName}
          </h2>
          <p className="text-gray-600 mt-2">{voter?.voter.email}</p>
          <div className="mt-4">
            <p className="text-gray-800 text-center">
              {`Hello! I'm ${voter?.voter.firstName}, an enthusiastic voter I believe in the power of every vote and actively
              participate in my community's decisions.`}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center mx-2 mt-4 border-t-2 py-4 w-full">
          <button className="bg-blue-600 text-white rounded-md p-2">
            <Link to={`/profile/${voter?.voter._id}`}>update me</Link>
          </button>
          <button className="bg-blue-600 text-white rounded-md p-2">
            <Link to={`/profile/update-password/${voter?.voter._id}`}>
              update password
            </Link>
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};
