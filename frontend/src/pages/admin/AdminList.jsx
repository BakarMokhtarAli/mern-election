import { useDispatch, useSelector } from "react-redux";
import { SideBar, Footer, VoterCard, AdminCard } from "../../components/admin";
import { useGetAllAdminsQuery } from "../../store/api/AdminSlice";
import { openModal } from "../../store/redux/AlertModal";
import { PopUpModal } from "../../utils/PopUpModal";
import { useTitle } from "../../Hooks/useTitle";

export const AdminList = () => {
  const { data, error, isLoading } = useGetAllAdminsQuery();

  const { isOpen } = useSelector((state) => state.alert);
  useTitle("All-admins");
  const dispatch = useDispatch();
  const handleOpenModal = (id) => {
    dispatch(openModal(id));
  };
  const changeToVoterMessage =
    "are you sure you want to change this admin as a voter";

  if (isLoading) return <div>loading</div>;
  if (error) return <div>{error}</div>;
  //   console.log("dta", data);

  return (
    <>
      <h1 className="text-2xl mt-20 text-center">
        <span className="flex flex-row items-center justify-center gap-4">
          All Admins{" "}
          <span className="w-5 h-5 text-sm rounded-full bg-black text-slate-100 flex items-center justify-center">
            {data?.results}
          </span>
        </span>
      </h1>
      {isOpen && <PopUpModal changeToVoterMessage={changeToVoterMessage} />}
      <div className="flex justify-between md:gap-5">
        <SideBar />
        <div className="overflow-x-auto w-full mt-5 md:ml-64">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                {/* <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th> */}
                <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  active
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.admin.map((ad) => (
                <AdminCard
                  key={ad._id}
                  admin={ad}
                  onOpenModal={() => handleOpenModal(ad._id)} // Pass the candidate ID
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
