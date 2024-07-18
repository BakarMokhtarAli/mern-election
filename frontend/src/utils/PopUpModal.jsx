import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeModal,
  closeDeleteModal,
  closeDeleteVoteModal,
} from "../store/redux/AlertModal";
import {
  useActivateVoterMutation,
  useChangeToAdminMutation,
  useChangeToVoterMutation,
  useDeActiveVoterMutation,
  useDeleteVoterMutation,
  useDeleteCandidateMutation,
} from "../store/api/AdminSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  useDeactiveYourAccountMutation,
  useGetDeactivatedVotersQuery,
  useGetVotersQuery,
} from "../store/api/VoterSlice";
import {
  closeDeleteCandidateModal,
  closeVoteModal,
} from "../store/redux/ModalSlice";
import {
  useCreateVoteMutation,
  useDeleteVoteMutation,
} from "../store/api/VoteSlice";
import { logOut } from "../store/redux/VoterLoginSlice";
export const PopUpModal = ({
  message,
  voteMessage,
  activateMessage,
  deleteMessage,
  deleteVoteMessage,
  deactiveAccountMessage,
  voteIcon,
  changeToAdminMessage,
  changeToVoterMessage,
  deleteCandidateMessage,
}) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const dispatch = useDispatch();
  let { selectedVoter, deleteModal } = useSelector((state) => state.alert);
  let { selectedCandidateId } = useSelector((state) => state.modal);
  // console.log(selectedCandidateId);

  let { data: activeVoters, refetch: refetchActiveVoters } =
    useGetVotersQuery();
  const { data: deactiveVoters, refetch: refetchDeActiveVoters } =
    useGetDeactivatedVotersQuery();

  const [deactiveYourAccount] = useDeactiveYourAccountMutation();

  const [createVote] = useCreateVoteMutation();
  const [deleteVote] = useDeleteVoteMutation();
  const navigate = useNavigate();

  const handleCloseModal = () => {
    dispatch(closeModal());
    dispatch(closeDeleteModal());
    dispatch(closeVoteModal());
    dispatch(closeDeleteCandidateModal());
    dispatch(closeDeleteVoteModal());
  };

  const [DeActiveVoter] = useDeActiveVoterMutation();
  const [ActiveVoter] = useActivateVoterMutation();
  const [deleteVoter] = useDeleteVoterMutation();

  const [loading, setLoading] = useState(false);

  // deactive your account
  const handleDeActiveAccount = async () => {
    setLoading(true);
    try {
      await deactiveYourAccount().unwrap();
      dispatch(closeDeleteModal());
      dispatch(logOut());
      setLoading(false);
      navigate("/login");
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err.data.message || "failed to deactive this account");
    }
  };

  // handle active
  const handleDeActive = async (id) => {
    setLoading(true);
    try {
      await DeActiveVoter(id).unwrap();
      refetchActiveVoters();
      setLoading(false);
      dispatch(closeModal());
      toast.success("voter deactivated success");
      navigate("/admin");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.data.message || "failed to deactive this account");
    }
  };

  // handle active account
  const handleActive = async (id) => {
    setLoading(true);
    try {
      await ActiveVoter(id).unwrap();
      refetchDeActiveVoters();
      setLoading(false);
      dispatch(closeModal());
      toast.success("voter activated success!");
      navigate("/admin");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.data.message || "failed to active this account");
    }
  };
  // delete voter
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteVoter(id).unwrap();
      setLoading(false);
      toast.success("voter deleted successfully!");
      navigate("/admin");
    } catch (error) {
      console.log(error);
      toast.error(error.data.message || "failed to delete voter");
    }
  };
  // handle vote
  const handleVote = async (id) => {
    setLoading(true);
    try {
      const { data, error } = await createVote(id).unwrap();

      if (error) {
        throw new Error(error.data.message);
      }

      console.log(data);
      toast.success("Your vote has been accepted!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating voter:", error);
      toast.error(
        error.data.message || "Failed to submit vote. Please try again later."
      );
    } finally {
      setLoading(false);
      dispatch(closeVoteModal());
    }
  };

  const handleDeleteVote = async () => {
    setLoading(true);
    try {
      const data = await deleteVote().unwrap();

      console.log(data);
      setLoading(false);
      dispatch(closeDeleteModal());
      toast.success(data.message || "vote deleted success!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating voter:", error);
      toast.error(
        error.data.message || "Failed to submit vote. Please try again later."
      );
    } finally {
      setLoading(false);
      dispatch(closeVoteModal());
    }
  };

  // change a voter to an admin
  const [changeToAdmin] = useChangeToAdminMutation();
  const handleChangeToAdmin = async (id) => {
    setLoading(true);
    try {
      const data = await changeToAdmin(id).unwrap();
      console.log(data);
      setLoading(false);
      dispatch(closeModal());
      toast.success(data.message || "voter has changed to admin");
      navigate("/admin");
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error(err.data.message || "failed to make an admin");
      dispatch(closeModal());
    }
  };

  const [changeToVoter] = useChangeToVoterMutation();
  // change admin to a voter
  const handleChangeToVoter = async (id) => {
    setLoading(true);
    try {
      const data = await changeToVoter(id).unwrap();
      setLoading(false);
      toast.success(data.message || `admin changed to a voter`);
      dispatch(closeModal());
      navigate("/admin");
    } catch (err) {
      setLoading(false);
      console.log(err);
      dispatch(closeModal());
      toast.error(err.data.message || "Failed to change an admin");
    }
  };

  // delete candidate
  const [deleteCandidate] = useDeleteCandidateMutation();
  const handleDeleteCandidate = async (id) => {
    setLoading(true);
    try {
      const data = await deleteCandidate(id).unwrap();
      setLoading(false);
      dispatch(closeDeleteCandidateModal());
      toast.success(data.message || "Candidate deleted success");
      navigate("/admin");
    } catch (err) {
      setLoading(false);
      console.log(err);
      dispatch(closeDeleteCandidateModal());
      toast.error(err.data.message || "failed to delete");
    }
  };
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow ">
            <button
              onClick={handleCloseModal}
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            >
              <i className="bi bi-x text-xl"></i>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
              {voteIcon ? (
                voteIcon
              ) : (
                <i className="bi bi-exclamation-circle text-red-500 text-3xl"></i>
              )}

              <h3 className="mb-5 text-lg font-normal ">{message}</h3>
              <h3 className="mb-5 text-lg font-normal ">{activateMessage}</h3>
              <h3 className="mb-5 text-lg font-normal ">{deleteMessage}</h3>
              <h3 className="mb-5 text-lg font-normal ">{voteMessage}</h3>
              <h3 className="mb-5 text-lg font-normal ">{deleteVoteMessage}</h3>
              <h3 className="mb-5 text-lg font-normal ">
                {deactiveAccountMessage}
              </h3>
              <h3 className="mb-5 text-lg font-normal ">
                {changeToAdminMessage}
              </h3>
              <h3 className="mb-5 text-lg font-normal ">
                {changeToVoterMessage}
              </h3>
              <h3 className="mb-5 text-lg font-normal ">
                {deleteCandidateMessage}
              </h3>
              {message && (
                <button
                  onClick={() => handleDeActive(selectedVoter._id)}
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  {loading ? "loading..." : "Yes, I'm sure"}
                </button>
              )}
              {activateMessage && (
                <button
                  onClick={() => handleActive(selectedVoter._id)}
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  {loading ? "loading..." : "Yes, I'm sure"}
                </button>
              )}
              {deleteMessage && (
                <button
                  onClick={() => handleDelete(selectedVoter._id)}
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  {loading ? "loading..." : "Yes, I'm sure"}
                </button>
              )}
              {voteMessage && (
                <button
                  onClick={() => handleVote(selectedCandidateId._id)}
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  {loading ? "loading..." : "Yes, I'm sure"}
                </button>
              )}
              {deleteVoteMessage && (
                <button
                  onClick={() => handleDeleteVote()}
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  {loading ? "loading..." : "Yes, I'm sure"}
                </button>
              )}
              {deactiveAccountMessage && (
                <button
                  onClick={() => handleDeActiveAccount()}
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  {loading ? "loading..." : "Yes, I'm sure"}
                </button>
              )}
              {changeToAdminMessage && (
                <button
                  onClick={() => handleChangeToAdmin(selectedVoter)}
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  {loading ? "loading..." : "Yes, I'm sure"}
                </button>
              )}
              {changeToVoterMessage && (
                <button
                  onClick={() => handleChangeToVoter(selectedVoter)}
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  {loading ? "loading..." : "Yes, I'm sure"}
                </button>
              )}
              {deleteCandidateMessage && (
                <button
                  onClick={() => handleDeleteCandidate(selectedCandidateId._id)}
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  {loading ? "loading..." : "Yes, I'm sure"}
                </button>
              )}

              <button
                onClick={handleCloseModal}
                data-modal-hide="popup-modal"
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
