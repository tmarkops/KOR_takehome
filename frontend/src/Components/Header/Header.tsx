import { useAppSelector } from "../../store/hooks";
import { LoginButton } from "./Components/LoginButton";
import { LoggedInButtons } from "./Components/LoggedInButtons";

export const Header = () => {
  const username = useAppSelector((state) => state.user.username);

  return (
    <nav
      className={
        "flex h-16 min-h-16 bg-blue-400 w-full flex-row px-7 top-0 sticky z-50"
      }
    >
      <div
        className={
          "flex-1 w-full h-full flex justify-start items-center text-white text-lg font-bold"
        }
      >
        <p>Tommy Markopoulos' Assessment - tommymarkops@gmail.com</p>
      </div>
      <div
        className={
          "flex flex-1 w-full h-full flex-row items-center justify-end"
        }
      >
        {username === undefined ? <LoginButton /> : <LoggedInButtons />}
      </div>
    </nav>
  );
};
