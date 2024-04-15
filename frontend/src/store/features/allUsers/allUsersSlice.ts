import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { User } from "../../../types/types";

export interface allUsersState {
  allUsers: User[];
}

const initialState: allUsersState = {
  allUsers: [],
};
export const allUsersSlice = createSlice({
  name: "allUsers",
  initialState,
  reducers: {
    setAllUsers: (state, action: PayloadAction<User[]>) => {
      state.allUsers = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAllUsers } = allUsersSlice.actions;

export default allUsersSlice.reducer;
