import { Link } from "react-router-dom";
import { SideBar, Footer } from "../../components/candidate";
import { useGetOneCandidateQuery } from "../../store/api/CandidateSlice";
import { useEffect } from "react";
import { useTitle } from "../../Hooks/useTitle";

export const CandidateProfile = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const { data, refetch } = useGetOneCandidateQuery(currentUser);
  useEffect(() => {
    refetch();
  }, []);
  useTitle(data?.candidate.FullName);

  return (
    <>
      <SideBar />
      <div className="max-w-lg md:ml-60 md:mx-auto mt-20 mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col items-center">
          <img
            className="w-32 h-32 rounded-full shadow-lg"
            src={data?.candidate.photo}
            alt="Profile"
          />
          <h2 className="text-2xl font-semibold mt-4">
            {data?.candidate.FullName}
          </h2>
          <p className="text-gray-600 mt-2">{data?.candidate.email}</p>
          <div className="mt-4">
            <p className="text-gray-800 text-center">
              {`Hello! I'm ${data?.candidate.firstName}, an enthusiastic candidate I believe in the power of every vote and actively
              participate in my community's decisions.`}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center mx-2 mt-4 border-t-2 py-4 w-full">
          <button className="bg-blue-600 text-white rounded-md p-2">
            <Link to={`/candidate/profile/${data?.candidate._id}`}>
              update me
            </Link>
          </button>
          <button className="bg-blue-600 text-white rounded-md p-2">
            <Link to={`/candidate/update-password/${data?.candidate._id}`}>
              update password
            </Link>
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};
