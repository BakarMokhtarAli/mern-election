import { SideBar, Footer, Hero } from "../../components/candidate";
import { useTitle } from "../../Hooks/useTitle";

export const CandidateHome = () => {
  useTitle("Candidate");
  return (
    <div>
      <SideBar />
      <Hero />
      <Footer />
    </div>
  );
};
