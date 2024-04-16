import { useEffect, useRef } from "react";
import {
  useGetFriendsQuery,
  useGetIncomingFriendRequestsQuery,
  useGetNotificationsQuery,
  useGetOutgoingFriendRequestsQuery,
  useGetStatusUpdatesQuery,
  useGetUsersQuery,
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
import { setAllUsers } from "../store/features/allUsers/allUsersSlice";

export const Polling = () => {
  const user = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const { data: friendsData, refetch: getFriendsRefetch } = useGetFriendsQuery(
    user.id ?? skipToken,
  );
  const { data: outgoingRequests, refetch: getOutgoingRequestsRefetch } =
    useGetOutgoingFriendRequestsQuery(user.id ?? skipToken);
  const { data: incomingRequests, refetch: getIncomingRequestsRefetch } =
    useGetIncomingFriendRequestsQuery(user.id ?? skipToken);
  const { data: notifications, refetch: getNotificationsRefetch } =
    useGetNotificationsQuery(user.id ?? skipToken);
  const { data: statusUpdates, refetch: getStatusUpdatesRefetch } =
    useGetStatusUpdatesQuery(user.id ?? skipToken);
  const { data: allUsers, refetch: getUsersRefetch } = useGetUsersQuery(null);

  const fetchData = () => {
    if (!user.id) {
      return; // if not logged in
    }
    console.log("FETCHED DATA PASSED USERID CHECK");
    // refetch the data
    getFriendsRefetch();
    getOutgoingRequestsRefetch();
    getIncomingRequestsRefetch();
    getNotificationsRefetch();
    getStatusUpdatesRefetch();
    getUsersRefetch();

    //update state with refreshed data
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
    if (allUsers) {
      dispatch(setAllUsers(allUsers));
    }
  };
  useEffect(() => {
    // Fetch data initially
    fetchData();

    // Poll data every 10 seconds
    const intervalId = setInterval(() => {
      fetchData();
    }, 10000);

    // Cleanup interval on unmount
    return () => {
      clearInterval(intervalId);
    };
  }, [
    friendsData,
    outgoingRequests,
    incomingRequests,
    notifications,
    statusUpdates,
    user,
    allUsers,
  ]);

  return null;
};
