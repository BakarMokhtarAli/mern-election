import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openDeletCandidate: false,
  isOpen: false,
  openVoteModal: false,
  selectedCandidateId: null,
};

const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    modalOpen: (state, action) => {
      state.isOpen = true;
      state.openVoteModal = false;
      state.selectedCandidateId = action.payload;
    },
    modalClose: (state) => {
      state.isOpen = false;
      state.openVoteModal = false;
      state.selectedCandidateId = null;
    },
    openDeleteCandidateModal: (state, action) => {
      state.openDeletCandidate = true;
      state.openVoteModal = false;
      state.isOpen = false;
      state.selectedCandidateId = action.payload;
    },
    closeDeleteCandidateModal: (state) => {
      state.openDeletCandidate = false;
      state.openVoteModal = false;
      state.isOpen = false;
      state.selectedCandidateId = null;
    },
    openVote_Modal: (state, action) => {
      state.openVoteModal = true;
      state.selectedCandidateId = action.payload;
    },
    closeVoteModal: (state) => {
      state.openVoteModal = false;
      state.selectedCandidateId = null;
    },
  },
});

export const {
  modalOpen,
  modalClose,
  openVote_Modal,
  closeVoteModal,
  openDeleteCandidateModal,
  closeDeleteCandidateModal,
} = ModalSlice.actions;

export default ModalSlice.reducer;
