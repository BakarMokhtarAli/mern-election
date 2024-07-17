import toast from "react-hot-toast";
import { SideBar, Footer, VoterCard } from "../../components/admin";
import { useGetUnverifiedVotersQuery } from "../../store/api/AdminSlice";
import { Loading } from "../../utils";
import { Link, useNavigate } from "react-router-dom";
import { Home } from "../voter";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PopUpModal } from "../../utils/PopUpModal";
import { openModal, openDeleteModal } from "../../store/redux/AlertModal";
import { FaUserEdit } from "react-icons/fa";
import { useTitle } from "../../Hooks/useTitle";
export const UnverifiedVoters = () => {
  const { data, error, isLoading, refetch } = useGetUnverifiedVotersQuery();
  useTitle("unverified-voters");
  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       refetch();
  //     }, 500);
  //     return () => clearInterval(interval);
  //   });

  console.log(data);
  if (isLoading)
    return (
      <div>
        <SideBar />
        <Loading />
      </div>
    );
  if (error)
    return (
      <div>
        {toast.error("something went very wrong")}
        <Home />
      </div>
    );
  return (
    <>
      <h1 className="text-2xl mt-20 text-center">
        <span className="flex flex-row items-center justify-center gap-4">
          All Unverfied voters{" "}
          <span className="w-5 h-5 text-sm rounded-full bg-black text-slate-100 flex items-center justify-center">
            {data?.result}
          </span>
        </span>
      </h1>

      <div className="flex justify-between md:gap-5">
        <SideBar />
        {/* {isLoading && <Loading />} */}
        {data.voters.length === 0 ? (
          <div className="flex justify-start mx-auto items-center">
            <p className="text-2xl text-red-500">
              No unverified voters at this moment
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto w-full mt-5 md:ml-64">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.voters.map((voter) => (
                  <tr key={voter._id}>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <img
                        src={voter.photo}
                        alt={voter.firstName}
                        className="h-10 w-10 rounded-full"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      {voter.FullName}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <Link
                        to={`/admin/update-voter/${voter._id}`}
                        className="hover:text-blue-500 cursor-pointer"
                      >
                        <FaUserEdit className="text-blue-500 text-xl" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Footer />
      </div>
    </>
  );
};
