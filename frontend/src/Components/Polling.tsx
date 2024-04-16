import { useEffect, useRef } from "react";
import {
  useGetFriendsQuery,
  useGetIncomingFriendRequestsQuery,
  useGetNotificationsQuery,
  useGetOutgoingFriendRequestsQuery,
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
  }, [friendsData, outgoingRequests, incomingRequests, notifications]);

  return null;
};
