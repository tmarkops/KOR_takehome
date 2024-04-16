import { useAppSelector } from "../../../store/hooks";
import { FriendRequestCard } from "./FriendRequestCard";

export const FriendRequests = () => {
  const incomingFriendRequests = useAppSelector(
    (state) => state.friends.incomingRequests,
  );

  return (
    <div className={"w-full h-full grid grid-cols-4 gap-4 px-8 py-3"}>
      {incomingFriendRequests.map((user) => (
        <FriendRequestCard key={user.id} user={user} />
      ))}
    </div>
  );
};
