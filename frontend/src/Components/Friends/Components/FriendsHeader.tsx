export const FriendsHeader = ({
  setRequestsToggle,
  requestsToggle,
}: {
  requestsToggle: "friends" | "requests";
  setRequestsToggle: React.Dispatch<
    React.SetStateAction<"friends" | "requests">
  >;
}) => {
  return (
    <div className={`w-full h-20 min-h-20 flex flex-row`}>
      <div
        className={`flex-1 flex items-center rounded-sm justify-center cursor-pointer bg-gray-100,
        ${requestsToggle === "friends" ? "" : "bg-gray-200"}
        `}
        onClick={() => setRequestsToggle("friends")}
      >
        <p>Your Friends</p>
      </div>
      <div
        className={`flex-1 flex items-center rounded-sm justify-center cursor-pointer bg-gray-100,
        ${requestsToggle === "requests" ? "" : "bg-gray-200"}
        `}
        onClick={() => setRequestsToggle("requests")}
      >
        <p>Friend Requests</p>
      </div>
    </div>
  );
};
