import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  openDeleteVote: false,
  selectedVoter: null,
  deleteModal: false,
};

const AlerSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.deleteModal = false;
      state.selectedVoter = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.deleteModal = false;
      state.selectedVoter = null;
    },
    openDeleteModal: (state, action) => {
      state.deleteModal = true;
      state.isOpen = false;
      state.selectedVoter = action.payload;
    },
    closeDeleteModal: (state, action) => {
      state.deleteModal = false;
      state.isOpen = false;
      state.selectedVoter = null;
    },
    openDeleteVoteModal: (state, action) => {
      state.deleteModal = false;
      state.isOpen = false;
      state.openDeleteVote = true;
      state.selectedVoter = action.payload;
    },
    closeDeleteVoteModal: (state, action) => {
      state.deleteModal = false;
      state.isOpen = false;
      state.openDeleteVote = false;
      state.selectedVoter = null;
    },
  },
});

export const {
  openModal,
  closeModal,
  openDeleteModal,
  closeDeleteModal,
  openDeleteVoteModal,
  closeDeleteVoteModal,
} = AlerSlice.actions;

export default AlerSlice.reducer;
