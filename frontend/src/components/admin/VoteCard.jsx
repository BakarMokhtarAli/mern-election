export const VoteCard = ({ vote }) => {
  return (
    <>
      <tr>
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 w-2/4">
          <span className="w-full flex flex-row justify-start items-center gap-4">
            <img
              className="w-10 h-10 rounded-full"
              src={vote.voter.photo}
              alt=""
            />
            {vote.voter.FullName}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 w-2/4">
          <span className="w-full flex flex-row justify-start items-center gap-4">
            <img
              className="w-10 h-10 rounded-full"
              src={vote.candidate.photo}
              alt=""
            />
            {vote.candidate.FullName}
          </span>
        </td>
        <td className="px-6 py-4 text-2xl text-blue-600 whitespace-no-wrap border-b border-gray-200">
          {/* <button>
              {voter.active ? (
                <i className="bi bi-person-x text-2xl text-red-600 hover:text-red-500"></i>
              ) : (
                <i className="bi bi-person-check text-2xl text-green-600 hover:text-green-500"></i>
              )}
              {/* <i className="bi bi-person-check"></i> */}
          {/* </button> */}
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
