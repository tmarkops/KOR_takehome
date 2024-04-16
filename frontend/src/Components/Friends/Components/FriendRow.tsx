import { User } from "../../../types/types";
import { Link } from "react-router-dom";

export const FriendRow = ({ friend }: { friend: User }) => {
  return (
    <div className={"flex flex-col"}>
      <div
        className={
          "w-full h-32 min-h-32 flex flex-row items-center px-10 gap-10"
        }
      >
        <img
          className={"h-20 w-20"}
          src={require("../../../assets/TempUserImage.jpeg")}
        />
        <h2 className={"flex-1 w-full items-start"}>{friend.username}</h2>
        <p>{friend.status}</p>
      </div>
      <div className={"h-0.5 bg-gray-200 w-full"}></div>
    </div>
  );
};
