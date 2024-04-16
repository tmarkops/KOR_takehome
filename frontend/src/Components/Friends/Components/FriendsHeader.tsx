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
    <div className={`w-full h-20 flex flex-row`}>
      <div
        className={`flex-1 flex items-center rounded-md justify-center bg-gray-100,
        ${requestsToggle === "friends" ? "" : "bg-gray-200"}
        `}
        onClick={() => setRequestsToggle("friends")}
      >
        <p>See Friends</p>
      </div>
      <div
        className={`flex-1 flex items-center rounded-md justify-center bg-gray-100,
        ${requestsToggle === "requests" ? "" : "bg-gray-200"}
        `}
        onClick={() => setRequestsToggle("requests")}
      >
        <p>Friend Requests</p>
      </div>
    </div>
  );
};
