// CandidateCard.js
import React from "react";
import { FaUserEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDeActiveVoterMutation } from "../../store/api/AdminSlice";
export const VoterCard = ({
  voter,
  openModal,
  openDeleteModal,
  showButtons,
  showDeleteButton,
}) => {
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
        {showButtons && (
          <td className="px-6 py-4 text-2xl text-blue-600 whitespace-no-wrap border-b border-gray-200">
            <span className="flex justify-start items-center gap-2">
              {voter.active ? (
                <i
                  onClick={openModal}
                  className="bi bi-person-x text-2xl text-yellow-600 hover:text-yellow-500 cursor-pointer"
                ></i>
              ) : (
                <i
                  onClick={openModal}
                  className="bi bi-person-check text-2xl text-green-600 hover:text-green-500 cursor-pointer"
                ></i>
              )}
              <i
                onClick={openDeleteModal}
                className="bi bi-trash3-fill text-xl text-red-600 hover:text-red-500 cursor-pointer"
              ></i>

              <Link
                to={`/admin/update-voter/${voter._id}`}
                className="hover:text-blue-500 cursor-pointer"
              >
                <FaUserEdit />
              </Link>
            </span>
          </td>
        )}
        {showDeleteButton && (
          <td className="px-6 py-4 text-2xl text-blue-600 whitespace-no-wrap border-b border-gray-200">
            <i
              onClick={openDeleteModal}
              className="bi bi-trash3-fill text-xl text-red-600 hover:text-red-500 cursor-pointer"
            ></i>
          </td>
        )}
      </tr>
    </>
  );
};
