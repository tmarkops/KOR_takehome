import { SidebarButton } from "./Components/SidebarButton";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <div
      className={
        "flex flex-col w-2/6 h-full bg-white gap-5 px-5 pt-5 border-r-2"
      }
    >
      <Link to={"/"}>
        <SidebarButton
          label={"Explore"}
          imageSource={require("../../assets/ExploreIcon.jpeg")}
        />
      </Link>
      <Link to={"/feed"}>
        <SidebarButton
          label={"Feed"}
          imageSource={require("../../assets/FeedIcon.png")}
        />
      </Link>
      <Link to={"/friends"}>
        <SidebarButton
          label={"Friends"}
          imageSource={require("../../assets/FriendsIcon.jpeg")}
        />
      </Link>
      <Link to={"/notifications"}>
        <SidebarButton
          label={"Notifications"}
          imageSource={require("../../assets/NotificationsIcon.png")}
        />
      </Link>
    </div>
  );
};
