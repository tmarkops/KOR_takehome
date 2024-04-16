import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  useCreateStatusUpdateMutation,
  useRespondFriendRequestMutation,
} from "../../../store/services/api";
import { updateStatus } from "../../../store/features/user/userSlice";
import { openLoginModal } from "../../../store/features/modal/modalSlice";

export const UpdateStatusBox = () => {
  const curUser = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [newStatus, setNewStatus] = useState<string>("");
  const [createStatusUpdateMutation] = useCreateStatusUpdateMutation();

  const handleUpdateStatus = async () => {
    if (!curUser.id) {
      return dispatch(openLoginModal());
    }
    dispatch(updateStatus(newStatus));
    await createStatusUpdateMutation({ userId: curUser.id, status: newStatus });
    setNewStatus("");
  };
  return (
    <div
      className={
        "w-full h-36 bg-neutral-200 rounded-lg flex flex-row items-center justify-center gap-20 px-20"
      }
    >
      <img
        className={"h-24 w-24 rounded-full"}
        src={require("../../../assets/TempUserImage.jpeg")}
      />
      <div className={"w-full px-20"}>
        <input
          className={`border-1 border-gray-600 rounded-lg w-2/6 h-10 px-3 cursor-text w-full`}
          placeholder={`What's on your mind, ${curUser.username}?`}
          value={newStatus}
          onChange={(event) => setNewStatus(event.target.value)}
        />
      </div>
      <button
        className={`w-2/6 h-10 bg-blue-300 rounded-lg border-1 border-blue-500`}
        disabled={newStatus.length === 0}
        onClick={handleUpdateStatus}
      >
        <p className={"text-white"}>Update Status</p>
      </button>
    </div>
  );
};
