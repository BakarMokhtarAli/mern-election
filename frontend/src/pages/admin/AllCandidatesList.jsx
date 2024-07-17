import { Footer, SideBar } from "../../components/admin";
import { useGetCandidatesQuery } from "../../store/api/CandidateSlice";
import { AllVotesModal } from "../../utils/AllVotesModal";
import { CandidateCard } from "../../components/admin";
import { useTitle } from "../../Hooks/useTitle";
import { useSelector, useDispatch } from "react-redux";
import {
  modalOpen,
  openDeleteCandidateModal,
} from "../../store/redux/ModalSlice";
import { Loading } from "../../utils";
import { PopUpModal } from "../../utils/PopUpModal";

export const AllCandidatesList = () => {
  useTitle("All-candidates");
  const { data, error, isLoading } = useGetCandidatesQuery();
  const dispatch = useDispatch();
  const { isOpen, openDeletCandidate } = useSelector((state) => state.modal);
  console.log(openDeletCandidate);
  const handleOpenModal = (candidate) => {
    dispatch(modalOpen(candidate));
  };
  const handleOpenDeleteCandidate = (candidate) => {
    dispatch(openDeleteCandidateModal(candidate));
  };
  console.log(data);
  if (isLoading)
    return (
      <>
        <SideBar />
        <Loading />
      </>
    );
  if (error) return <p>An error occurred</p>;
  const deleteCandidateMessage = `Are you sure you want to delete this candidate`;
  return (
    <>
      <h1 className="text-2xl mt-20 text-center">
        Vote Your Favorite Candidate
      </h1>
      {isOpen && <AllVotesModal />}
      {openDeletCandidate && (
        <PopUpModal deleteCandidateMessage={deleteCandidateMessage} />
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
                  onDeleteCandidate={() => handleOpenDeleteCandidate(candidate)}
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
