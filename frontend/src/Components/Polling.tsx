import { useEffect, useRef } from "react";
import {
  useGetFriendsQuery,
  useGetIncomingFriendRequestsQuery,
  useGetNotificationsQuery,
  useGetOutgoingFriendRequestsQuery,
  useGetStatusUpdatesQuery,
} from "../store/services/api";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";
import { skipToken } from "@reduxjs/toolkit/query/react";
import {
  setFriends,
  setIncomingRequests,
  setOutgoingRequests,
} from "../store/features/friends/friendsSlice";
import { setNotifications } from "../store/features/notifications/notificationsSlice";
import { setFeed } from "../store/features/feed/feedSlice";

export const Polling = () => {
  const user = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const { data: friendsData } = useGetFriendsQuery(user.id ?? skipToken);
  const { data: outgoingRequests } = useGetOutgoingFriendRequestsQuery(
    user.id ?? skipToken,
  );
  const { data: incomingRequests } = useGetIncomingFriendRequestsQuery(
    user.id ?? skipToken,
  );
  const { data: notifications } = useGetNotificationsQuery(
    user.id ?? skipToken,
  );
  const { data: statusUpdates } = useGetStatusUpdatesQuery(
    user.id ?? skipToken,
  );

  useEffect(() => {
    if (!user.id) {
      return;
    }
    if (friendsData) {
      dispatch(setFriends(friendsData));
    }
    if (outgoingRequests) {
      dispatch(setOutgoingRequests(outgoingRequests));
    }
    if (incomingRequests) {
      dispatch(setIncomingRequests(incomingRequests));
    }
    if (notifications) {
      dispatch(setNotifications(notifications));
    }
    if (statusUpdates) {
      dispatch(setFeed(statusUpdates));
    }
  }, [
    friendsData,
    outgoingRequests,
    incomingRequests,
    notifications,
    statusUpdates,
  ]);

  return null;
};
