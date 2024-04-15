import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../types/types";

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
    getIncomingFriendRequests: builder.query<User[], number>({
      query: (userId) => `friends/request/incoming/${userId}`,
    }),
    getOutgoingFriendRequests: builder.query<User[], number>({
      query: (userId) => `friends/request/outgoing/${userId}`,
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
} = myApi;
