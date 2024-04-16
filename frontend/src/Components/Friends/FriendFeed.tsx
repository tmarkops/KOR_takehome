import { useParams } from "react-router-dom";

export const FriendFeed = () => {
  const { id } = useParams<{ id: string }>();

  return <div></div>;
};
