import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MyNotification, StatusUpdate, User } from "../../types/types";

export const myApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], null>({
      query: () => "users",
    }),
    loginOrCreateUser: builder.mutation<User, string>({
      query: (username) => ({
        url: "users",
        method: "POST",
        body: { username },
      }),
      transformResponse: (response: any, meta, arg) => {
        if (!response.success || !response.user) {
          throw new Error(response.message || "Error processing response");
        }
        return response.user;
      },
    }),
    getFriends: builder.query<User[], number>({
      query: (userId) => `friends/${userId}`,
    }),
    createFriendRequest: builder.mutation<
      User,
      { senderUserId: number; receiverUserId: number }
    >({
      query: ({ senderUserId, receiverUserId }) => ({
        url: "friends/request/create",
        method: "POST",
        body: {
          senderUserId: senderUserId,
          receiverUserId: receiverUserId,
        },
      }),
      transformResponse: (response: any, meta, arg) => {
        if (!response.success || !response.user) {
          throw new Error(response.message || "Error processing response");
        }
        return response.user;
      },
    }),
    respondFriendRequest: builder.mutation<
      User,
      {
        senderUserId: number;
        receiverUserId: number;
        answer: "accept" | "decline";
      }
    >({
      query: ({ senderUserId, receiverUserId, answer }) => ({
        url: "friends/request/respond",
        method: "POST",
        body: {
          senderUserId: senderUserId,
          receiverUserId: receiverUserId,
          answer: answer,
        },
      }),
      transformResponse: (response: any, meta, arg) => {
        if (!response.success || !response.user) {
          throw new Error(response.message || "Error processing response");
        }
        return response.user;
      },
    }),
    getIncomingFriendRequests: builder.query<User[], number>({
      query: (userId) => `friends/request/incoming/${userId}`,
    }),
    getOutgoingFriendRequests: builder.query<User[], number>({
      query: (userId) => `friends/request/outgoing/${userId}`,
    }),
    getNotifications: builder.query<MyNotification[], number>({
      query: (userId) => `notifications/${userId}`,
    }),
    createStatusUpdate: builder.mutation<
      User,
      { userId: number; status: string }
    >({
      query: ({ userId, status }) => ({
        url: "users/status",
        method: "PUT",
        body: {
          userId: userId,
          status: status,
        },
      }),
    }),
    getStatusUpdates: builder.query<StatusUpdate[], number>({
      query: (userId) => `users/status/${userId}`,
    }),
  }),
});
export const {
  useGetUsersQuery,
  useLoginOrCreateUserMutation,
  useGetFriendsQuery,
  useCreateFriendRequestMutation,
  useGetIncomingFriendRequestsQuery,
  useGetOutgoingFriendRequestsQuery,
  useGetNotificationsQuery,
  useRespondFriendRequestMutation,
  useCreateStatusUpdateMutation,
  useGetStatusUpdatesQuery,
} = myApi;
