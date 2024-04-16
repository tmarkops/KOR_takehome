import {
  AnyAction,
  combineReducers,
  configureStore,
  PayloadAction,
} from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import modalReducer from "./features/modal/modalSlice";
import allUsersReducer from "./features/allUsers/allUsersSlice";
import friendsReducer from "./features/friends/friendsSlice";
import notificationsReducer from "./features/notifications/notificationsSlice";
import feedReducer from "./features/feed/feedSlice";

import { myApi } from "./services/api";

// to be able to reset state of store
const appReducer = combineReducers({
  [myApi.reducerPath]: myApi.reducer,
  user: userReducer,
  modal: modalReducer,
  allUsers: allUsersReducer,
  friends: friendsReducer,
  notifications: notificationsReducer,
  feed: feedReducer,
});
const reducerProxy = (state: any, action: AnyAction) => {
  if (action.type === "logout/LOGOUT") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: reducerProxy,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(myApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
