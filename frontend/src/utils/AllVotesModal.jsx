import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalClose } from "../store/redux/ModalSlice";
import { useGetCandidateVotersQuery } from "../store/api/CandidateSlice";
import { SideBar } from "../components/admin";
import { Loading } from "./Loading";

export const AllVotesModal = () => {
  const dispatch = useDispatch();
  const { selectedCandidateId } = useSelector((state) => state.modal);
  const { data, error, isLoading } = useGetCandidateVotersQuery(
    selectedCandidateId.id
  );
  console.log(selectedCandidateId);

  const handleCloseModal = () => {
    dispatch(modalClose());
  };

  if (isLoading)
    return (
      <>
        <SideBar />
        <Loading />
      </>
    );

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg max-w-2xl w-full">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-xl font-semibold">
            Votes List for {selectedCandidateId.FullName}
          </h2>
          <button
            onClick={handleCloseModal}
            className="text-gray-500 hover:text-gray-800"
          >
            Close
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.votes.length === 0 ? (
                <tr>
                  <td
                    colSpan="2"
                    className="px-6 py-4 whitespace-no-wrap border-b border-gray-200"
                  >
                    <div className="flex justify-start mx-auto items-center">
                      <p className="text-2xl text-red-500">
                        {"this candidate still hasn't get any votes"}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                data?.votes.map((voter) => (
                  <tr key={voter._id}>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <img
                        src={voter.voter.photo}
                        alt={voter.voter.FullName}
                        className="h-10 w-10 rounded-full"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      {voter.voter.FullName}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
