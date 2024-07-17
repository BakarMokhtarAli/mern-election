import { Footer, SideBar, CandidateCard } from "../../components/voter";
import { useGetVerifiedCandidatesQuery } from "../../store/api/CandidateSlice";
import { AllVotesModal } from "../../utils/AllVotesModal";

import { useSelector, useDispatch } from "react-redux";
import { modalOpen, openVote_Modal } from "../../store/redux/ModalSlice";
import { PopUpModal } from "../../utils/PopUpModal";
import { useEffect } from "react";
import { useTitle } from "../../Hooks/useTitle";
import { Loading } from "../../utils/Loading";
export const AllCandidates = () => {
  useTitle("all-candidates");
  const { data, error, isLoading, refetch } = useGetVerifiedCandidatesQuery();
  const dispatch = useDispatch();
  const { isOpen, openVoteModal } = useSelector((state) => state.modal);

  useEffect(() => {
    refetch();
  }, []);

  const handleOpenModal = (id) => {
    dispatch(modalOpen(id));
  };

  const handleOpenVoteModal = (id) => {
    dispatch(openVote_Modal(id));
  };

  if (isLoading)
    return (
      <>
        <SideBar />
        <Loading />
      </>
    );
  if (error) console.log(error);

  const voteMessage = `are you sure you want to vote this candidate!`;

  return (
    <>
      <h1 className="text-2xl mt-20 text-center">
        Vote Your Favorite Candidate
      </h1>
      {isOpen && <AllVotesModal />}
      {openVoteModal && (
        <PopUpModal
          voteMessage={voteMessage}
          voteIcon={
            <i className="bi bi-bookmark-check-fill text-green-500 text-3xl"></i>
          }
        />
      )}
      <div className="flex justify-between md:gap-5">
        <SideBar />
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
                  Actions
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Votes
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.candidates.map((candidate) => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  onEyeClick={() => handleOpenModal(candidate)} // Pass the candidate ID
                  onOpenVoteModal={() => handleOpenVoteModal(candidate)}
                  showVoteButton={true}
                />
              ))}
            </tbody>
          </table>
        </div>
        <Footer />
      </div>
    </>
  );
};
