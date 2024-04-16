import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setUser } from "../../../store/features/user/userSlice";

export const LoggedInButtons = () => {
  const username = useAppSelector((state) => state.user.username);
  const dipatch = useAppDispatch();

  const handleSignOut = () => {
    dipatch({ type: "logout/LOGOUT" });
  };

  return (
    <div
      className={"flex flex-row gap-3 items-center justify-end w-full h-full"}
    >
      <p className={"font-bold"}>Hi, {username}</p>
      <button
        className={
          "w-24  h-8  bg-red-400 rounded-lg flex items-center justify-center cursor-pointer"
        }
        onClick={handleSignOut}
      >
        <p>Sign Out</p>
      </button>
    </div>
  );
};
