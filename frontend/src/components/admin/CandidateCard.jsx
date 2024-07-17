// CandidateCard.js
import React from "react";
import { FaVoteYea, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

export const CandidateCard = ({ candidate, onEyeClick, onDeleteCandidate }) => {
  return (
    <>
      <tr>
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
          <img
            src={candidate.photo}
            alt={candidate.FullName}
            className="h-10 w-10 rounded-full"
          />
        </td>
        {candidate.isVerified ? (
          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
            {candidate.FullName}
          </td>
        ) : (
          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
            {candidate.FullName}
            <i className="bi bi-exclamation-triangle ml-2 text-xl text-yellow-400"></i>
          </td>
        )}
        <td className="px-6 py-4 text-2xl text-blue-600 whitespace-no-wrap border-b border-gray- flex justify-start items-center">
          <button onClick={onDeleteCandidate}>
            <i className="bi bi-trash3-fill text-red-600 hover:text-red-500 hover:scale-y-95"></i>
          </button>
          <button className="mx-2" onClick={onEyeClick}>
            <FaEye />
          </button>
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
          {candidate.votes}
        </td>
      </tr>
    </>
  );
};
