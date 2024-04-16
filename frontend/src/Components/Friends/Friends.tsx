import { useState } from "react";
import { FriendsHeader } from "./Components/FriendsHeader";
import { useAppSelector } from "../../store/hooks";
import { FriendRow } from "./Components/FriendRow";
import { FriendRequests } from "./Components/FriendRequests";

export const Friends = () => {
  const friends = useAppSelector((state) => state.friends.friends);
  const [requestsToggle, setRequestsToggle] = useState<"friends" | "requests">(
    "friends",
  );
  console.log("friendslength " + friends.length);
  return (
    <div className={"w-full h-full flex flex-col"}>
      <FriendsHeader
        requestsToggle={requestsToggle}
        setRequestsToggle={setRequestsToggle}
      />
      {requestsToggle === "friends" ? (
        friends.map((friend) => <FriendRow friend={friend} />)
      ) : (
        <FriendRequests />
      )}
    </div>
  );
};
