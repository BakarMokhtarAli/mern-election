import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetOneCandidateQuery } from "../../store/api/CandidateSlice";
import { useLogOutVoterMutation } from "../../store/api/VoterSlice";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/redux/VoterLoginSlice";
export const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logOutVoter] = useLogOutVoterMutation();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  // const voterId = currentUser ? currentUser.id : null;

  const {
    data: candidate,
    isLoading,
    isError,
  } = useGetOneCandidateQuery(currentUser, {
    // skip: !voterId, // Skip query if voterId is not available
  });
  const handleLogOut = async () => {
    try {
      await logOutVoter().unwrap();
      dispatch(logOut());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {/* Full-width header */}
      <header className="w-full bg-blue-600 text-white font-bold text-lg p-4 fixed top-0 left-0 z-10 flex justify-between items-center">
        {currentUser ? (
          <Link to="/candidate">welcome {candidate?.candidate.FullName}</Link>
        ) : (
          <Link to="/">Election</Link>
        )}
        {/* Toggle button */}
        {isOpen ? (
          <i
            onClick={toggleSidebar}
            className="bi bi-x-lg text-2xl md:hidden cursor-pointer"
          ></i>
        ) : (
          <i
            onClick={toggleSidebar}
            className="bi bi-list text-2xl md:hidden cursor-pointer"
          ></i>
        )}
      </header>

      {/* Sidebar container */}
      <nav
        className={`bg-white shadow-lg h-screen fixed top-16 left-0 min-w-[240px] py-6 px-4 font-[sans-serif] overflow-auto transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-10`}
      >
        {/* Main navigation */}
        {currentUser ? (
          <>
            <ul>
              <li>
                {/* Link to Dashboard */}
                <Link
                  to="/candidate"
                  className="text-black hover:text-blue-600 text-[15px] block hover:bg-blue-50 rounded px-4 py-2.5 transition-all"
                >
                  Dashboard
                </Link>
              </li>
            </ul>

            {/* Actions section */}
            <div className="mt-4">
              <h6 className="text-blue-600 text-sm font-bold px-4">Actions</h6>
              {/* <li className="list-none">
                {/* Link to Profile */}

              <ul className="mt-2">
                <li>
                  {/* Link to Logout */}
                  <Link
                    onClick={handleLogOut}
                    className="text-black hover:text-blue-600 text-[15px] block hover:bg-blue-50 rounded px-4 py-2.5 transition-all"
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <ul>
              <li>
                {/* Link to Dashboard */}
                <Link
                  to="/"
                  className="text-black hover:text-blue-600 text-[15px] block hover:bg-blue-50 rounded px-4 py-2.5 transition-all"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                {/* Link to login */}
                <Link
                  to="/login"
                  className="text-black hover:text-blue-600 text-[15px] block hover:bg-blue-50 rounded px-4 py-2.5 transition-all"
                >
                  Login
                </Link>
              </li>
            </ul>
          </>
        )}

        {currentUser && (
          <div className="w-full h-7 flex flex-row justify-between mt-8 pb-6 absolute bottom-20">
            <Link to="/candidate/profile">
              <img
                src={candidate?.candidate.photo}
                alt="Profile"
                className="rounded-full w-12 h-12 mb-4"
              />
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};
