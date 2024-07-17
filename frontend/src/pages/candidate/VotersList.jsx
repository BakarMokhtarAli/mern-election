import toast from "react-hot-toast";
import { SideBar, Footer, VoterCard } from "../../components/candidate";
import { useGetCandidateVotersQuery } from "../../store/api/CandidateSlice";
import { Loading } from "../../utils";
import { useNavigate } from "react-router-dom";
import { Home } from "../voter";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PopUpModal } from "../../utils/PopUpModal";
import { openDeleteModal, openModal } from "../../store/redux/AlertModal";
import { useTitle } from "../../Hooks/useTitle";

export const VotersList = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const { data, error, isLoading, refetch } =
    useGetCandidateVotersQuery(currentUser);
  console.log(data);
  useEffect(() => {
    refetch();
  }, [refetch]);

  const { isOpen, deleteModal } = useSelector((state) => state.alert);
  useTitle("your voters");
  const dispatch = useDispatch();
  const handleOpneModal = (voter) => {
    dispatch(openModal(voter));
  };
  const handleOpneDeleteModal = (voter) => {
    dispatch(openDeleteModal(voter));
  };
  // console.log(data);
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
  const message = "Are you sure you want to deactivate this voter";
  const deleteMessage = "Are you sure you want to delete this voter";
  return (
    <>
      <h1 className="text-2xl mt-20 text-center">
        <span className="flex flex-row items-center justify-center gap-4">
          All your favorite voters{" "}
          <span className="w-5 h-5 text-sm rounded-full bg-black text-slate-100 flex items-center justify-center">
            {data?.result}
          </span>
        </span>
      </h1>

      {isOpen && <PopUpModal message={message} />}
      {deleteModal && <PopUpModal deleteMessage={deleteMessage} />}
      <div className="flex justify-between md:gap-5">
        <SideBar />
        {/* {isLoading && <Loading />} */}
        {data.votes.length === 0 ? (
          <div className="flex justify-start mx-auto items-center">
            <p className="text-2xl text-red-500">
              there are No voters at this moment
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
                  {/* <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th> */}
                  {/* <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  active
                </th> */}
                </tr>
              </thead>
              <tbody>
                {data?.votes.map((vote) => (
                  <VoterCard
                    key={vote.voter.id}
                    voter={vote.voter}
                    openModal={() => handleOpneModal(vote.voter)}
                    openDeleteModal={() => handleOpneDeleteModal(vote.voter)}
                    showButtons={false}
                  />
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
