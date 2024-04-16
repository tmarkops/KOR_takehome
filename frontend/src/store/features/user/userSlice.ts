import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface userState {
  id: number | undefined;
  username: string | undefined;
  status: string;
}

const initialState: userState = {
  id: undefined,
  username: undefined,
  status: "",
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<userState>) => {
      const { id, username, status } = action.payload;
      state.id = id;
      state.username = username;
      state.status = status;
    },
    updateStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, updateStatus } = userSlice.actions;

export default userSlice.reducer;
