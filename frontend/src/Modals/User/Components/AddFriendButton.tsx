import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { addOutgoingRequest } from "../../../store/features/friends/friendsSlice";
import { User } from "../../../types/types";
import { useCreateFriendRequestMutation } from "../../../store/services/api";
import {
  closeModal,
  openLoginModal,
} from "../../../store/features/modal/modalSlice";
import { userExistsInUserArray } from "../../../util/helpers";
import { Link } from "react-router-dom";

export const AddFriendButton = ({ recipientUser }: { recipientUser: User }) => {
  const user = useAppSelector((state) => state.user);
  const friends = useAppSelector((state) => state.friends.friends);

  const outgoingFriendRequests = useAppSelector(
    (state) => state.friends.outgoingRequests,
  );
  const incomingFriendRequests = useAppSelector(
    (state) => state.friends.incomingRequests,
  );
  const dispatch = useAppDispatch();
  const [createFriendRequest] = useCreateFriendRequestMutation();

  const alreadySentFriendRequest = userExistsInUserArray(
    recipientUser,
    outgoingFriendRequests,
  );

  const sentYouFriendRequest = userExistsInUserArray(
    recipientUser,
    incomingFriendRequests,
  );

  const alreadyFriends = userExistsInUserArray(recipientUser, friends);

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

  const renderAppropriateTextOrButton = () => {
    if (alreadyFriends) {
      return (
        <div className={"w-36 h-10 flex justify-center items-center"}>
          <p className={"italic text-blue-600"}>Already Friends</p>
        </div>
      );
    } else if (alreadySentFriendRequest) {
      return (
        <div className={"w-36 h-10 flex justify-center items-center"}>
          <p className={"italic text-blue-600"}>Request sent</p>
        </div>
      );
    } else if (sentYouFriendRequest) {
      return (
        <Link to={"friends"} state={{ initialToggle: "requests" }}>
          <button
            className={
              "px-3 h-10 rounded-lg bg-blue-600 flex justify-center items-center"
            }
            onClick={() => dispatch(closeModal())}
          >
            <p className={"text-white"}>Respond to their request</p>
          </button>
        </Link>
      );
    }
    return (
      <button
        className={
          "px-5 h-10 rounded-lg bg-blue-600 flex justify-center items-center"
        }
        onClick={handleAddFriend}
      >
        <p className={"text-white"}>Add Friend</p>
      </button>
    );
  };

  return renderAppropriateTextOrButton();
};
