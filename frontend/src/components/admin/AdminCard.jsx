// CandidateCard.js
import React from "react";
import { FaVoteYea, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GrUserAdmin } from "react-icons/gr";

export const AdminCard = ({ admin, onOpenModal }) => {
  return (
    <>
      <tr>
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
          <img
            src={admin.photo}
            alt={admin.FullName}
            className="h-10 w-10 rounded-full"
          />
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
          {admin.FullName}
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
          <button className="mx-2" onClick={onOpenModal}>
            <GrUserAdmin />
          </button>
        </td>
        {/* <td className="px-6 py-4 text-2xl text-blue-600 whitespace-no-wrap border-b border-gray- flex justify-start items-center">
          <button>
            <i className="bi bi-trash3-fill text-red-600 hover:text-red-500 hover:scale-y-95"></i>
          </button>
          {/* <button className="mx-2" onClick={onEyeClick}>
            <FaEye />
          </button> */}
        {/* </td> */}
        {/* <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
      
        </td> */}
      </tr>
    </>
  );
};
