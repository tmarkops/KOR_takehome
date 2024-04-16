import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../types/types";

export interface friendsState {
  friends: User[];
  incomingRequests: User[];
  outgoingRequests: User[];
}

const initialState: friendsState = {
  friends: [],
  incomingRequests: [],
  outgoingRequests: [],
};
export const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    setFriends: (state, action: PayloadAction<User[]>) => {
      state.friends = action.payload;
    },
    setIncomingRequests: (state, action: PayloadAction<User[]>) => {
      state.incomingRequests = action.payload;
    },
    setOutgoingRequests: (state, action: PayloadAction<User[]>) => {
      state.outgoingRequests = action.payload;
    },
    addOutgoingRequest: (state, action: PayloadAction<User>) => {
      state.outgoingRequests.push(action.payload);
    },
    addFriend: (state, action: PayloadAction<User>) => {
      state.friends.push(action.payload);
    },
    deleteIncomingRequest: (state, action: PayloadAction<User>) => {
      state.incomingRequests = state.incomingRequests.filter(
        (request) => request.id !== action.payload.id,
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setFriends,
  addOutgoingRequest,
  setOutgoingRequests,
  setIncomingRequests,
  addFriend,
  deleteIncomingRequest,
} = friendsSlice.actions;

export default friendsSlice.reducer;
