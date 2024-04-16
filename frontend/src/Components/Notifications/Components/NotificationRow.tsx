import { MyNotification } from "../../../types/types";
import { Link } from "react-router-dom";

export const NotificationRow = ({
  notification,
}: {
  notification: MyNotification;
}) => {
  return (
    <Link to={notification.type === "status_update" ? "/feed" : "/friends"}>
      <div
        className={
          "flex flex-row gap-7 w-full h-20 hover:bg-neutral-300 items-center justify-start px-10 py-5"
        }
      >
        <img
          className={"h-14 w-14 rounded-full"}
          alt={"User"}
          src={require("../../../assets/TempUserImage.jpeg")}
        />
        <p className={"text-lg"}>{notification.message}</p>
      </div>
      <div className={"h-0.5 bg-white w-full"}></div>
    </Link>
  );
};
