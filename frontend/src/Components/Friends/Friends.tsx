import { useState } from "react";
import { FriendsHeader } from "./Components/FriendsHeader";
import { useAppSelector } from "../../store/hooks";
import { FriendRow } from "./Components/FriendRow";
import { FriendRequests } from "./Components/FriendRequests";
import { useLocation } from "react-router-dom";

export const Friends = () => {
  let { state } = useLocation(); // use the state send in the <Link>
  const initialToggle = (state as any)?.initialToggle || "friends";

  const friends = useAppSelector((state) => state.friends.friends);
  const [requestsToggle, setRequestsToggle] = useState<"friends" | "requests">(
    initialToggle || "friends",
  );

  return (
    <div
      className={
        // "w-full h-full flex flex-col"
        "flex flex-col h-full w-full px-10 py-5 overflow-y-scroll max-h-screen"
      }
    >
      <div
        className={
          "flex w-full h-24 min-h-24 items-center justify-center rounded-lg sticky-top"
        }
      >
        <FriendsHeader
          requestsToggle={requestsToggle}
          setRequestsToggle={setRequestsToggle}
        />
      </div>

      <div
        className={
          "w-full flex flex-col mt-5 rounded-lg overflow-scroll max-h-full"
        }
      >
        {requestsToggle === "friends" ? (
          friends.map((friend) => <FriendRow key={friend.id} friend={friend} />)
        ) : (
          <FriendRequests />
        )}
      </div>
    </div>
  );
};
