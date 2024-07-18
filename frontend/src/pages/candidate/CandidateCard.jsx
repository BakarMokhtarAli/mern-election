// CandidateCard.js
import React, { useEffect } from "react";
import { FaVoteYea, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetSingleVoterQuery } from "../../store/api/VoterSlice";

export const CandidateCard = ({
  candidate,
  onEyeClick,
  onOpenVoteModal,
  showVoteButton,
}) => {
  // console.log(candidate);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // Function to check if the current user has voted for the candidate
  const hasVoted = candidate.all_votes.some(
    (vote) => vote.voter._id === currentUser._id
  );
  // console.log(currentUser);
  return (
    <>
      <tr>
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
          <img
            src={candidate.photo}
            alt={candidate.name}
            className="h-10 w-10 rounded-full"
          />
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
          {candidate.FullName}
        </td>
        <td className="px-6 py-4 text-2xl text-blue-600 whitespace-no-wrap border-b border-gray-200 flex flex-wrap justify-center items-center">
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
