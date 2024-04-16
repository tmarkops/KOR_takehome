import { useAppSelector } from "../../store/hooks";
import { NotificationRow } from "./Components/NotificationRow";

export const Notifications = () => {
  const notifications = useAppSelector(
    (state) => state.notifications.notifications,
  );

  return (
    <div className={"flex flex-col h-full w-full"}>
      <div
        className={"flex w-full h-24 bg-gray-400 items-center justify-center"}
      >
        <h1 className={"text-2xl font-bold"}>Notifications</h1>
      </div>
      {notifications.map((notif) => (
        <NotificationRow notification={notif} />
      ))}
    </div>
  );
};
