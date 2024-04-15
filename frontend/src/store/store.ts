import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import modalReducer from "./features/modal/modalSlice";
import allUsersReducer from "./features/allUsers/allUsersSlice";
import friendsReducer from "./features/friends/friendsSlice";

import { myApi } from "./services/api";
export const store = configureStore({
  reducer: {
    [myApi.reducerPath]: myApi.reducer,
    user: userReducer,
    modal: modalReducer,
    allUsers: allUsersReducer,
    friends: friendsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(myApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
