import { useEffect, useRef } from "react";
import {
  useGetFriendsQuery,
  useGetOutgoingFriendRequestsQuery,
} from "../store/services/api";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";
import { skipToken } from "@reduxjs/toolkit/query/react";
import {
  setFriends,
  setOutgoingRequests,
} from "../store/features/friends/friendsSlice";

export const Polling = () => {
  const user = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const { data: friendsData } = useGetFriendsQuery(user.id ?? skipToken);
  const { data: outgoingRequests } = useGetOutgoingFriendRequestsQuery(
    user.id ?? skipToken,
  );

  useEffect(() => {
    if (!user.id) {
      return;
    }
    console.log(typeof outgoingRequests);
    if (friendsData) {
      dispatch(setFriends(friendsData || []));
    }
    if (outgoingRequests) {
      dispatch(setOutgoingRequests(outgoingRequests || []));
    }
  }, [friendsData, outgoingRequests]);

  return null;
};
