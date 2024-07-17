import { useEffect, useState } from "react";
import {
  SideBar,
  Footer,
  Hero,
  FeatureSection,
  TestimonialSection,
  FAQ,
} from "../../components/voter";
import { useNavigate } from "react-router-dom";
import { useGetSingleVoterQuery } from "../../store/api/VoterSlice";
import { useTitle } from "../../Hooks/useTitle";
export const Home = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const { data, refetch } = useGetSingleVoterQuery(currentUser?._id);
  useTitle("Home");
  console.log(data);
  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <SideBar />
      <div
        className={`flex-grow
           md:ml-64 transition-all duration-300`}
      >
        <Hero />
        <FeatureSection />
        <TestimonialSection />
        <FAQ />
      </div>
      <Footer />
    </div>
  );
};
