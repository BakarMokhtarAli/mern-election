import { useEffect } from "react";
import { SideBar, Footer, Hero } from "../../components/admin";
import { useNavigate } from "react-router-dom";
import { useGetSingleVoterQuery } from "../../store/api/AdminSlice";
import { useTitle } from "../../Hooks/useTitle";

export const AdminHome = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  // useEffect(() => {
  //   if (currentUser?.role == "voter") {
  //     navigate("/dashboard");
  //   }
  // }, []);
  useTitle("Admin");
  const { data, refetch } = useGetSingleVoterQuery(currentUser?._id);

  console.log(data);
  // useEffect(() => {
  //   refetch();
  //   if (data?.voter.role === "voter") {
  //     navigate("/dashboard");
  //   }
  // }, []);
  return (
    <div>
      <SideBar />
      <Hero />
      <Footer />
    </div>
  );
};
