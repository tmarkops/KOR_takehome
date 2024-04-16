import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MyNotification } from "../../../types/types";

export interface notificationsState {
  notifications: MyNotification[];
}

const initialState: notificationsState = {
  notifications: [],
};
export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<MyNotification[]>) => {
      state.notifications = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNotifications } = notificationsSlice.actions;

export default notificationsSlice.reducer;
