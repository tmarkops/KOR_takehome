import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StatusUpdate } from "../../../types/types";

export interface feedState {
  feed: StatusUpdate[];
}

const initialState: feedState = {
  feed: [],
};
export const userSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setFeed: (state, action: PayloadAction<StatusUpdate[]>) => {
      state.feed = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFeed } = userSlice.actions;

export default userSlice.reducer;
