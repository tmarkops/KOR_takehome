import { SidebarButton } from "./Components/SidebarButton";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <div className={"flex flex-col w-2/6 h-full bg-red-500 gap-5"}>
      <Link to={"/"}>
        <SidebarButton label={"Explore"} />
      </Link>
      <Link to={"/feed"}>
        <SidebarButton label={"Feed"} />
      </Link>
      <Link to={"/friends"}>
        <SidebarButton label={"Friends"} />
      </Link>
      <Link to={"/notifications"}>
        <SidebarButton label={"Notifications"} />
      </Link>
    </div>
  );
};
