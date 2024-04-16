import { User } from "../../../types/types";
import { Link } from "react-router-dom";

export const FriendRow = ({ friend }: { friend: User }) => {
  return (
    <Link to={`/friends/${friend.id}`}>
      <div
        className={
          "w-full h-36 flex flex-row items-center px-10 gap-10 hover:bg-gray-200 "
        }
      >
        <img
          className={"h-20 w-20"}
          src={require("../../../assets/TempUserImage.jpeg")}
        />
        <h2 className={"flex-1 w-full items-start"}>{friend.username}</h2>
      </div>
    </Link>
  );
};
