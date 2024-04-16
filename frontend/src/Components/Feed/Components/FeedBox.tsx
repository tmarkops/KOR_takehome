import { useAppSelector } from "../../../store/hooks";
import { StatusRow } from "./StatusRow";

export const FeedBox = () => {
  const feed = useAppSelector((state) => state.feed);

  return (
    <div
      className={
        "w-full h-full bg-neutral-200 flex flex-col items-center rounded-lg"
      }
    >
      {feed.feed.map((statusUpdate, index) => (
        <StatusRow key={index} updateStatus={statusUpdate} />
      ))}
    </div>
  );
};
