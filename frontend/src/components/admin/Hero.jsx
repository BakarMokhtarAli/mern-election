import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserGraduate, FaVoteYea } from "react-icons/fa";
import { TbUserCancel } from "react-icons/tb";

import {
  useGetDeactivatedVotersQuery,
  useGetVotersQuery,
} from "../../store/api/VoterSlice";
import { useGetCandidatesQuery } from "../../store/api/CandidateSlice";
import { useGetAllVotesQuery } from "../../store/api/VoteSlice";
import {
  useGetAllAdminsQuery,
  useGetUnverifiedVotersQuery,
} from "../../store/api/AdminSlice";

export const Hero = () => {
  const { data: votes, refetch: refetchVotes } = useGetAllVotesQuery();
  const { data: candidates, refetch: refetchCandidates } =
    useGetCandidatesQuery();
  const { data: daActiveVoters, refetch: refetchDeactivatedVoters } =
    useGetDeactivatedVotersQuery();
  const { data: voters, refetch: refetchVoters } = useGetVotersQuery();
  const { data: admins, refetch: refetchAdmins } = useGetAllAdminsQuery();
  const { data: unverifiedVoters, refetch: refetchUnverifiedVoters } =
    useGetUnverifiedVotersQuery();

  useEffect(() => {
    refetchVotes();
    refetchCandidates();
    refetchDeactivatedVoters();
    refetchVoters();
    refetchAdmins();
    refetchUnverifiedVoters();
  }, [
    refetchAdmins,
    refetchCandidates,
    refetchDeactivatedVoters,
    refetchVoters,
    refetchVotes,
    refetchUnverifiedVoters,
  ]);

  return (
    <div className="max-w-5xl md:ml-56 md:mx-auto mt-20 p-6 grid sm:grid-cols-2 md:grid-cols-3 bg-white gap-8 mx-auto">
      <div className="bg-gray-200 px-4 shadow flex flex-col gap-4 p-4">
        <h2 className="text-xl font-bold text-blue-500">{voters?.result}</h2>
        <span className="text-xl flex flex-row items-center">
          <span className="text-sm text-gray-500">voters</span>
          <i className="bi bi-people-fill text-gray-500 ml-2"></i>
        </span>
        <Link
          to="/admin/voters"
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
          to="/admin/candidates"
          className="text-blue-400 hover:underline text-2xl"
        >
          view
        </Link>
      </div>

      <div className="bg-gray-200 px-4 shadow h-auto flex flex-col gap-4 p-4">
        <h2 className="text-xl font-bold text-blue-500">
          {daActiveVoters?.result}
        </h2>
        <span className="text-xl flex flex-row items-center">
          <span className="text-sm text-red-500">deactive voters</span>
          {/* <i className="bi bi-people-fill text-gray-500 ml-2"></i> */}
          <TbUserCancel className="text-gray-500 ml-2" />
        </span>
        {/* {daActiveVoters && ( */}
        <Link
          to="/admin/deactive-voters"
          className="text-blue-400 hover:underline text-2xl"
        >
          view
        </Link>
        {/* // )} */}
      </div>

      <div className="bg-gray-200 px-4 shadow h-auto flex flex-col gap-4 p-4">
        <h2 className="text-xl font-bold text-blue-500">{votes?.result}</h2>
        <span className="text-xl flex flex-row items-center">
          <span className="text-sm text-gray-500">votes</span>
          {/* <i className="bi bi-people-fill "></i> */}
          <FaVoteYea className="text-gray-500 ml-2" />
        </span>
        <Link
          to="/admin/votes"
          className="text-blue-400 hover:underline text-2xl"
        >
          view
        </Link>
      </div>

      <div className="bg-gray-200 px-4 shadow h-auto flex flex-col gap-4 p-4">
        <h2 className="text-xl font-bold text-blue-500">{admins?.results}</h2>
        <span className="text-xl flex flex-row items-center">
          <span className="text-sm">admins</span>
          <i className="bi bi-person-fill-gear text-gray-500 ml-2"></i>
        </span>
        <Link to="/admins" className="text-blue-400 hover:underline text-2xl">
          view
        </Link>
      </div>

      <div className="bg-gray-200 px-4 shadow h-auto flex flex-col gap-4 p-4">
        <h2 className="text-xl font-bold text-blue-500">
          {unverifiedVoters?.result}
        </h2>
        <span className="text-xl flex flex-row items-center">
          <span className="text-sm text-yellow-400">Unverified Voters</span>
          <i className="bi bi-person-fill-gear text-gray-500 ml-2"></i>
        </span>
        <Link
          to="/admin/unverified-voters"
          className="text-blue-400 hover:underline text-2xl"
        >
          view
        </Link>
      </div>
    </div>
  );
};
