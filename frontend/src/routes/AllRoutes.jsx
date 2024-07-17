import { Route, Routes } from "react-router-dom";

// admin
import {
  AdminHome,
  AdminList,
  AllCandidatesList,
  AllVotersList,
  CreateCandidate,
  CreateVoter,
  DeActivatedVoters,
  UnverifiedVoters,
  UpdateVoter,
  UpdateVoterPassword,
  VotesList,
} from "../pages/admin";

// candidate
import {
  CandidateHome,
  CandidateLogin,
  CandidateList,
  VerifyCandidate,
  AllVotesList,
  VotersList,
  CandidateProfile,
  UpdateCandidateProfile,
  UpdateCandidatePassword,
} from "../pages/candidate";

// candidate
import {
  VerifyVoter,
  Home,
  VoterLogin,
  VoterProfile,
  VoterSignUp,
  VoterDashboard,
  Voters,
  AllCandidates,
  UpdateMe,
  UpdateMyPassword,
} from "../pages/voter";
import ForgotPassword from "../utils/ForgotPassword";
import ResetPassword from "../utils/ResetPassword";
import { PrivateRoutes } from "./PrivateRoutes";
import { NotFoundPage } from "../utils";
export const AllRoutes = () => {
  return (
    <div>
      <Routes>
        {/* admin routes */}

        <Route
          path="/admin"
          element={
            <PrivateRoutes>
              <AdminHome />
            </PrivateRoutes>
          }
        />
        {/* <Route path="/admin/login" element={<AdminLogin />} /> */}
        <Route
          path="/admin/candidates"
          element={
            <PrivateRoutes>
              <AllCandidatesList />
            </PrivateRoutes>
          }
        />
        <Route
          path="/admin/voters"
          element={
            <PrivateRoutes>
              <AllVotersList />{" "}
            </PrivateRoutes>
          }
        />
        <Route
          path="/admin/deactive-voters"
          element={
            <PrivateRoutes>
              <DeActivatedVoters />
            </PrivateRoutes>
          }
        />
        <Route
          path="/admin/votes"
          element={
            <PrivateRoutes>
              <VotesList />
            </PrivateRoutes>
          }
        />
        <Route
          path="/admins"
          element={
            <PrivateRoutes>
              <AdminList />
            </PrivateRoutes>
          }
        />
        <Route
          path="/admin/update-voter/:id"
          element={
            <PrivateRoutes>
              <UpdateVoter />
            </PrivateRoutes>
          }
        />
        <Route
          path="/admin/voter-password/:id"
          element={
            <PrivateRoutes>
              <UpdateVoterPassword />
            </PrivateRoutes>
          }
        />
        <Route
          path="/admin/add-voter/"
          element={
            <PrivateRoutes>
              <CreateVoter />
            </PrivateRoutes>
          }
        />
        <Route
          path="/admin/add-candidate/"
          element={
            <PrivateRoutes>
              {" "}
              <CreateCandidate />
            </PrivateRoutes>
          }
        />
        <Route
          path="/admin/unverified-voters/"
          element={
            <PrivateRoutes>
              <UnverifiedVoters />
            </PrivateRoutes>
          }
        />
        {/* admin routes ends here */}

        {/* candidate routes */}
        <Route
          path="/candidate"
          element={
            <PrivateRoutes>
              <CandidateHome />
            </PrivateRoutes>
          }
        />
        <Route path="/candidate/login" element={<CandidateLogin />} />
        {/* <Route path="/candidates" element={<CandidateList />} /> */}
        <Route path="/candidate/verify" element={<VerifyCandidate />} />

        <Route
          path="/candidate/votes"
          element={
            <PrivateRoutes>
              <AllVotesList />
            </PrivateRoutes>
          }
        />
        <Route
          path="/candidate/voters"
          element={
            <PrivateRoutes>
              <VotersList />
            </PrivateRoutes>
          }
        />
        <Route
          path="/candidate/candidates"
          element={
            <PrivateRoutes>
              <CandidateList />
            </PrivateRoutes>
          }
        />
        <Route
          path="/candidate/profile"
          element={
            <PrivateRoutes>
              <CandidateProfile />
            </PrivateRoutes>
          }
        />
        <Route
          path="/candidate/profile/:id"
          element={
            <PrivateRoutes>
              <UpdateCandidateProfile />
            </PrivateRoutes>
          }
        />
        <Route
          path="/candidate/update-password/:id"
          element={
            <PrivateRoutes>
              <UpdateCandidatePassword />
            </PrivateRoutes>
          }
        />
        {/* candidate routes ends here */}

        {/* voter routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<VoterLogin />} />
        <Route path="/signup" element={<VoterSignUp />} />

        <Route path="/verify-email" element={<VerifyVoter />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route
          path="/profile"
          element={
            <PrivateRoutes>
              <VoterProfile />
            </PrivateRoutes>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <PrivateRoutes>
              {" "}
              <UpdateMe />
            </PrivateRoutes>
          }
        />
        <Route
          path="/profile/update-password/:id"
          element={
            <PrivateRoutes>
              <UpdateMyPassword />
            </PrivateRoutes>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoutes>
              {" "}
              <VoterDashboard />
            </PrivateRoutes>
          }
        />
        <Route
          path="/voters"
          element={
            <PrivateRoutes>
              <Voters />
            </PrivateRoutes>
          }
        />
        <Route
          path="/candidates"
          element={
            <PrivateRoutes>
              <AllCandidates />
            </PrivateRoutes>
          }
        />
        <Route path="*" element={<NotFoundPage />} />

        {/* voter routes ends here */}
      </Routes>
    </div>
  );
};
