import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { addOutgoingRequest } from "../../../store/features/friends/friendsSlice";
import { User } from "../../../types/types";
import {
  useCreateFriendRequestMutation,
  useGetFriendsQuery,
} from "../../../store/services/api";
import { skipToken } from "@reduxjs/toolkit/dist/query/react";
import { openLoginModal } from "../../../store/features/modal/modalSlice";
import { userExistsInUserArray } from "../../../util/helpers";

export const AddFriendButton = ({ recipientUser }: { recipientUser: User }) => {
  const user = useAppSelector((state) => state.user);
  const outgoingFriendRequests = useAppSelector(
    (state) => state.friends.outgoingRequests,
  );
  const dispatch = useAppDispatch();
  const [createFriendRequest, result] = useCreateFriendRequestMutation();

  const alreadySentFriendRequest = userExistsInUserArray(
    recipientUser,
    outgoingFriendRequests,
  );

  const handleAddFriend = async () => {
    if (!user.id) {
      return dispatch(openLoginModal());
    }
    //optimistic update first
    dispatch(addOutgoingRequest(recipientUser));

    //now send the request
    await createFriendRequest({
      senderUserId: user.id,
      receiverUserId: recipientUser.id,
    });
  };

  return alreadySentFriendRequest ? (
    <div className={"w-36 h-10 flex justify-center items-center"}>
      <p className={"italic text-blue-600"}>Request sent</p>
    </div>
  ) : (
    <button
      className={
        "w-36 h-10 rounded-lg bg-blue-600 flex justify-center items-center"
      }
      onClick={handleAddFriend}
    >
      <p className={"text-white"}>Add Friend</p>
    </button>
  );
};
