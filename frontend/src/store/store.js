import { configureStore } from "@reduxjs/toolkit";
import voter from "./api/VoterSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

import VoterLoginSlice from "./redux/VoterLoginSlice";
import ModalSlice from "./redux/ModalSlice";
import Candidate from "./api/CandidateSlice";
import votes from "./api/VoteSlice";
import Admin from "./api/AdminSlice";

import AlertModal from "./redux/AlertModal";
const Store = configureStore({
  reducer: {
    [voter.reducerPath]: voter.reducer,
    [Candidate.reducerPath]: Candidate.reducer,
    [votes.reducerPath]: votes.reducer,
    [Admin.reducerPath]: Admin.reducer,
    VoterLogin: VoterLoginSlice,
    modal: ModalSlice,
    alert: AlertModal,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(voter.middleware)
      .concat(Candidate.middleware)
      .concat(votes.middleware)
      .concat(Admin.middleware),
});

setupListeners(Store.dispatch);

export default Store;
