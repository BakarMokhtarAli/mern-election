import toast from "react-hot-toast";
import { SideBar, Footer } from "../../components/voter";
import { VoterCard } from "../../components/candidate";
import { useGetVotersQuery } from "../../store/api/VoterSlice";
import { useGetVotersVoteQuery } from "../../store/api/VoteSlice";
import { Loading } from "../../utils";
import { useNavigate } from "react-router-dom";
import { Home } from "../voter";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PopUpModal } from "../../utils/PopUpModal";
import { openDeleteModal, openModal } from "../../store/redux/AlertModal";
import { useTitle } from "../../Hooks/useTitle";

export const Voters = () => {
  const {
    data: votersVote,
    isLoading,
    error,
    refetch: refetchVotersVote,
  } = useGetVotersVoteQuery();
  useEffect(() => {
    refetchVotersVote();
  }, []);
  useTitle("your vote");
  const { deleteModal } = useSelector((state) => state.alert);

  // console.log(votersVote?.vote.candidate.FullName);

  const dispatch = useDispatch();

  const handleOpneDeleteModal = (voter) => {
    dispatch(openDeleteModal(voter));
  };

  if (isLoading)
    return (
      <div>
        <SideBar />
        <Loading />
      </div>
    );
  // if (error)
  //   return (
  //     <div>
  //       {toast.error("something went very wrong")}
  //       <Home />
  //     </div>
  //   );
  const deleteVoteMessage = "Are you sure you want to delete this vote";
  return (
    <>
      <h1 className="text-2xl mt-20 text-center">
        <span className="flex flex-row items-center justify-center gap-4">
          All voters{" "}
          <span className="w-5 h-5 text-sm rounded-full bg-black text-slate-100 flex items-center justify-center">
            {votersVote?.vote ? "1" : "0"}
          </span>
        </span>
      </h1>

      {deleteModal && <PopUpModal deleteVoteMessage={deleteVoteMessage} />}
      <div className="flex justify-between md:gap-5">
        <SideBar />
        {/* {isLoading && <Loading />} */}

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
              <VoterCard
                key={votersVote?.vote._id}
                voter={votersVote?.vote.candidate}
                openDeleteModal={() => handleOpneDeleteModal(votersVote?.vote)}
                showButtons={false}
                showDeleteButton={true}
              />
            </tbody>
          </table>
        </div>
        <Footer />
      </div>
    </>
  );
};
