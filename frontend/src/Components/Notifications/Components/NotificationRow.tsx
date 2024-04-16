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
          "flex flex-row gap-7 w-full h-20 rounded-lg hover:bg-gray-200 items-center justify-start px-10"
        }
      >
        <img
          className={"h-14 w-14 rounded-full"}
          src={require("../../../assets/TempUserImage.jpeg")}
        />
        <p className={"text-lg"}>{notification.message}</p>
      </div>
    </Link>
  );
};
