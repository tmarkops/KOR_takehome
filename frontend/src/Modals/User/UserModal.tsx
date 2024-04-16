import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { closeModal } from "../../store/features/modal/modalSlice";
import { AddFriendButton } from "./Components/AddFriendButton";

export const UserModal = () => {
  const curModal = useAppSelector((state) => state.modal);
  const outgoingFriendRequests = useAppSelector(
    (state) => state.friends.outgoingRequests,
  );
  const incomingFriendRequests = useAppSelector(
    (state) => state.friends.incomingRequests,
  );

  const dispatch = useAppDispatch();

  if (!curModal.user) {
    dispatch(closeModal());
    return null;
  }
  return (
    <div
      className={
        "flex w-full h-full bg-opacity-70 bg-black justify-center items-center"
      }
    >
      <div
        className={
          "relative w-4/12 h-4/6 bg-white border-4 border-blue-400 rounded-lg items-center justify-center flex flex-col gap-8"
        }
      >
        <button
          className={
            "absolute flex top-2 left-2 bg-gray-400 w-12 h-12 rounded-full justify-center items-center hover:bg-gray-600 cursor-pointer"
          }
          onClick={() => dispatch(closeModal())}
        >
          <h3 className={"text-lg font-bold"}>X</h3>
        </button>
        <img
          className={"h-4/12 w-4/12"}
          src={require("../../assets/TempUserImage.jpeg")}
        />
        <h1>{curModal.user.username}</h1>
        <h2>{curModal.user.status}</h2>

        <AddFriendButton recipientUser={curModal.user} />
      </div>
    </div>
  );
};
