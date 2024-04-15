import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../types/types";

export interface ModalState {
  isOpen: boolean;
  type: "login" | "user" | null;
  user: User | undefined;
}

const initialState: ModalState = {
  isOpen: false,
  type: null,
  user: undefined,
};
export const modalSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    openLoginModal: (state) => {
      state.isOpen = true;
      state.type = "login";
    },
    openUserModal: (state, action: PayloadAction<Pick<ModalState, "user">>) => {
      const { user } = action.payload;
      state.isOpen = true;
      state.type = "user";
      state.user = user;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.type = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openLoginModal, openUserModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
