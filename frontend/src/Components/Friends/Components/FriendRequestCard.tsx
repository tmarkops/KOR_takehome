import { User } from "../../../types/types";
import { RespondFriendRequestButtons } from "./RespondFriendRequestButtons";

export const FriendRequestCard = ({ user }: { user: User }) => {
  return (
    <div
      className={
        "w-full h-6/6 gap-6 max-h-80 rounded-lg flex flex-col shadow shadow-gray-300 justify-start items-center border-2 border-gray-300"
      }
    >
      <img
        className={"h-3/6 w-full rounded-lg"}
        alt={"User"}
        src={require("../../../assets/TempUserImage.jpeg")}
      />
      <p>{user.username}</p>
      <RespondFriendRequestButtons user={user} />
    </div>
  );
};
