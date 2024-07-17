import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SideBar, Footer } from "../../components/voter";
import {
  FaVoteYea,
  FaUsers,
  FaRegChartBar,
  FaUserGraduate,
} from "react-icons/fa";

import { useGetVotersVoteQuery } from "../../store/api/VoteSlice";
import { useGetSingleVoterQuery } from "../../store/api/VoterSlice";
import { useTitle } from "../../Hooks/useTitle";

export const VoterDashboard = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const { data, refetch } = useGetSingleVoterQuery(currentUser?._id);
  console.log(data);
  if (data?.voter.role == "admin") {
    navigate("/admin");
    console.log(true);
  }
  useEffect(() => {
    if (currentUser?.role !== "voter") {
      navigate("/admin");
      console.log(true);
    } else {
      console.log(false);
    }
  }, []);
  useTitle("Voter");
  const { data: votersVote, refetch: refetchVotersVote } =
    useGetVotersVoteQuery();

  // const { data, refetch } = useGetSingleVoterQuery(currentUser?._id);
  // console.log(data);
  // useEffect(() => {
  //   if (data?.voter.role === "admin") {
  //     navigate("/admin");
  //   }
  // }, []);

  useEffect(() => {
    refetchVotersVote();
  }, []);
  return (
    <div>
      <div className="flex justify-between md:gap-10">
        <SideBar />
        <div className="w-[1280px] md:ml-52 md:mx-auto mt-24 p-6 grid grid-cols-1 md:grid-cols-2 bg-white gap-8 mx-auto">
          <div className="bg-gray-200 w-full px-4 shadow flex flex-col gap-4 p-4">
            <h2 className="text-xl font-bold text-blue-500">
              {votersVote?.vote ? "1" : "0"}
            </h2>
            <span className="text-xl flex flex-row items-center">
              <span className="text-sm text-gray-500">your vote</span>
              <i className="bi bi-people-fill text-gray-500 ml-2"></i>
            </span>
            {votersVote?.vote && (
              <Link
                to="/voters"
                className="text-blue-400 hover:underline text-2xl"
              >
                view
              </Link>
            )}
          </div>

          <div className="bg-gray-200 w-full px-4 shadow h-auto flex flex-col gap-4 p-4">
            <h2 className="text-xl font-bold text-blue-500">{2}</h2>
            <span className="text-xl flex flex-row items-center">
              <span className="text-sm text-gray-500">candidates</span>
              {/* <i className="bi bi-people-fill "></i> */}
              <FaUserGraduate className="text-gray-500 ml-2" />
            </span>
            <Link
              to="/candidates"
              className="text-blue-400 hover:underline text-2xl"
            >
              view
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};
