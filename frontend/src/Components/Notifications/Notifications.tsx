import { useAppSelector } from "../../store/hooks";
import { NotificationRow } from "./Components/NotificationRow";

export const Notifications = () => {
  const notifications = useAppSelector(
    (state) => state.notifications.notifications,
  );

  return (
    <div
      className={
        "flex flex-col h-full w-full px-10 py-5 overflow-y-scroll max-h-screen"
      }
    >
      <div
        className={
          "flex w-full h-24 min-h-24 bg-neutral-400 items-center justify-center rounded-lg sticky-top"
        }
      >
        <h1 className={"text-2xl font-bold"}>Notifications</h1>
      </div>
      <div
        className={
          "w-full bg-neutral-200 flex flex-col mt-5 rounded-lg overflow-scroll max-h-full"
        }
      >
        {notifications.map((notif, i) => (
          <NotificationRow key={i} notification={notif} />
        ))}
      </div>
    </div>
  );
};
