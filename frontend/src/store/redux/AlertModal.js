import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  selectedVoter: null,
  deleteModal: false,
};

const AlerSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.selectedVoter = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.selectedVoter = null;
    },
    openDeleteModal: (state, action) => {
      state.deleteModal = true;
      state.selectedVoter = action.payload;
    },
    closeDeleteModal: (state, action) => {
      state.deleteModal = false;
      state.selectedVoter = null;
    },
  },
});

export const { openModal, closeModal, openDeleteModal, closeDeleteModal } =
  AlerSlice.actions;

export default AlerSlice.reducer;
