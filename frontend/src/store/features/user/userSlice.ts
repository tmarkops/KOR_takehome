import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface userState {
  id: number | undefined;
  username: string | undefined;
}

const initialState: userState = {
  id: undefined,
  username: undefined,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<userState>) => {
      const { id, username } = action.payload;
      state.id = id;
      state.username = username;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
