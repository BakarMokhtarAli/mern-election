import { useNavigate } from "react-router-dom";
import { SideBar, Footer, Hero } from "../../components/candidate";
import { useTitle } from "../../Hooks/useTitle";
import { useEffect } from "react";

export const CandidateHome = () => {
  useTitle("Candidate");
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (currentUser?.role == "voter") {
      navigate("/dashboard");
      console.log(true);
    } else {
      console.log(false);
    }
  }, []);
  return (
    <div>
      <SideBar />
      <Hero />
      <Footer />
    </div>
  );
};
