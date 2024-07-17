// CandidateCard.js
import React from "react";
import { FaUserEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDeActiveVoterMutation } from "../../store/api/AdminSlice";
export const VoterCard = ({ voter, openModal, openDeleteModal }) => {
  // console.log(activateMessage);

  return (
    <>
      <tr>
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

        {/* <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
          <span className="bg-green-400 rounded-md p-2 text-black hover:text-white text-center">
            active
          </span>
        </td> */}
      </tr>
    </>
  );
};
