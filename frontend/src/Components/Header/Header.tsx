import { useAppSelector } from "../../store/hooks";
import { LoginButton } from "./Components/LoginButton";

export const Header = () => {
  const username = useAppSelector((state) => state.user.username);

  return (
    <nav className={"flex h-14 bg-blue-400 w-full flex-row px-3"}>
      <div className={"flex-1 w-full h-full"}></div>
      <div className={"flex-1 w-full h-full"}></div>
      <div
        className={
          "flex flex-1 w-full h-full flex-row items-center justify-end"
        }
      >
        {username === undefined ? <LoginButton /> : <p>Hi, {username}</p>}
      </div>
    </nav>
  );
};
