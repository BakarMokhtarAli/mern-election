import { VoteCard } from "../../components/admin";
import { SideBar, Footer } from "../../components/candidate";
import { useTitle } from "../../Hooks/useTitle";
import { useGetAllVotesQuery } from "../../store/api/VoteSlice";

export const AllVotesList = () => {
  useTitle("All-votes");
  const { data, error, isLoading } = useGetAllVotesQuery();
  if (isLoading) return <div>loading</div>;
  if (error) return <div>{error}</div>;
  //   console.log("dta", data);
  return (
    <>
      <h1 className="text-2xl mt-20 text-center">
        <span className="flex flex-row items-center justify-center gap-4">
          All votes{" "}
          <span className="w-5 h-5 text-sm rounded-full bg-black text-slate-100 flex items-center justify-center">
            {data.result}
          </span>
        </span>
      </h1>
      {/* {isOpen && <AllVotesModal />} */}
      <div className="flex justify-between md:gap-5">
        <SideBar />
        <div className="overflow-x-auto w-full mt-5 md:ml-64">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Voter
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Candidate
                </th>
                {/* <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th> */}
                {/* <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  active
                </th> */}
              </tr>
            </thead>
            <tbody>
              {data?.votes.map((vote) => (
                <VoteCard
                  key={vote._id}
                  vote={vote}
                  //   onEyeClick={() => handleOpenModal(candidate.id)} // Pass the candidate ID
                />
              ))}
            </tbody>
          </table>
        </div>
        <Footer />
      </div>
    </>
  );
};
