import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserGraduate, FaVoteYea } from "react-icons/fa";
import { TbUserCancel } from "react-icons/tb";

import {
  useGetCandidatesQuery,
  useGetCandidateVotersQuery,
} from "../../store/api/CandidateSlice";
import { useGetAllVotesQuery } from "../../store/api/VoteSlice";

export const Hero = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const { data: votes, refetch: refetchVotes } = useGetAllVotesQuery();
  const { data: candidates, refetch: refetchCandidates } =
    useGetCandidatesQuery();
  const { data: voters, refetch: refetchVoters } =
    useGetCandidateVotersQuery(currentUser);

  useEffect(() => {
    refetchVotes();
    refetchCandidates();
    refetchVoters();
  }, [refetchCandidates, refetchVoters, refetchVotes]);

  return (
    <div className="max-w-5xl md:ml-56 md:mx-auto mt-20 p-6 grid sm:grid-cols-2 md:grid-cols-3 bg-white gap-8 mx-auto">
      <div className="bg-gray-200 px-4 shadow flex flex-col gap-4 p-4">
        <h2 className="text-xl font-bold text-blue-500">{voters?.result}</h2>
        <span className="text-xl flex flex-row items-center">
          <span className="text-sm text-gray-500">your voters</span>
          <i className="bi bi-people-fill text-gray-500 ml-2"></i>
        </span>
        <Link
          to="/candidate/voters"
          className="text-blue-400 hover:underline text-2xl"
        >
          view
        </Link>
      </div>

      <div className="bg-gray-200 px-4 shadow h-auto flex flex-col gap-4 p-4">
        <h2 className="text-xl font-bold text-blue-500">
          {candidates?.result}
        </h2>
        <span className="text-xl flex flex-row items-center">
          <span className="text-sm text-gray-500">candidates</span>
          {/* <i className="bi bi-people-fill "></i> */}
          <FaUserGraduate className="text-gray-500 ml-2" />
        </span>
        <Link
          to="/candidate/candidates"
          className="text-blue-400 hover:underline text-2xl"
        >
          view
        </Link>
      </div>

      <div className="bg-gray-200 px-4 shadow h-auto flex flex-col gap-4 p-4">
        <h2 className="text-xl font-bold text-blue-500">{votes?.result}</h2>
        <span className="text-xl flex flex-row items-center">
          <span className="text-sm text-gray-500">votes</span>
          {/* <i className="bi bi-people-fill "></i> */}
          <FaVoteYea className="text-gray-500 ml-2" />
        </span>
        <Link
          to="/candidate/votes"
          className="text-blue-400 hover:underline text-2xl"
        >
          view
        </Link>
      </div>
    </div>
  );
};
