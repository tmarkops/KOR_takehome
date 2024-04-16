import { User } from "../../../types/types";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useRespondFriendRequestMutation } from "../../../store/services/api";
import {
  addFriend,
  deleteIncomingRequest,
} from "../../../store/features/friends/friendsSlice";

export const RespondFriendRequestButtons = ({ user }: { user: User }) => {
  const curUser = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const [respondMutation] = useRespondFriendRequestMutation();

  const handleRequest = async (answer: "accept" | "decline") => {
    if (!curUser.id) {
      throw new Error("Trying to add friend without being logged in");
    }
    if (answer === "accept") {
      dispatch(addFriend(user));
    }
    dispatch(deleteIncomingRequest(user));
    await respondMutation({
      answer: answer,
      senderUserId: user.id,
      receiverUserId: curUser.id,
    });
  };

  return (
    <div className={"flex flex-row px-6 gap-6 py-3 w-full h-1/6"}>
      <button
        className={
          "flex flex-1 justify-center items-center w-full h-full border-1 border-gray-300 bg-green-400 rounded-lg"
        }
        onClick={() => handleRequest("accept")}
      >
        <p className={"text-sm text-white"}>accept</p>
      </button>
      <button
        className={
          "flex flex-1 justify-center items-center w-full h-full border-1 border-gray-300 bg-red-400 rounded-lg"
        }
        onClick={() => handleRequest("decline")}
      >
        <p className={"text-sm text-white"}>decline</p>
      </button>
    </div>
  );
};
