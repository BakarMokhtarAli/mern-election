import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  selectedVoterId: null,
};

const VoteModalSlice = createSlice({
  name: "voteModal",
  initialState,
  reducers: {
    modalOpen: (state, action) => {
      state.isOpen = true;
      state.selectedCandidateId = action.payload;
    },
    modalClose: (state) => {
      state.isOpen = false;
      state.selectedCandidateId = null;
    },
  },
});

export const { modalOpen, modalClose } = VoteModalSlice.actions;

export default VoteModalSlice.reducer;
