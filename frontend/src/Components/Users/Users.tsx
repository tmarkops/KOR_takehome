import { useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import { useGetUsersQuery } from "../../store/services/api";
import { UserRow } from "./Components/UserRow";

export const Users = () => {
  const curUser = useAppSelector((state) => state.user);

  const { data, isSuccess, refetch } = useGetUsersQuery(null);

  //TODO: add Loading component

  useEffect(() => {
    // to repopulate the "allUsers" state when the store is refreshed on sign out
    refetch();
  }, [curUser, refetch]);

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
        <h1 className={"text-2xl font-bold"}>Users</h1>
      </div>
      <div
        className={
          "w-full bg-neutral-200 flex flex-col mt-5 rounded-lg overflow-scroll max-h-full"
        }
      >
        {isSuccess &&
          data.map(
            (user) =>
              user.id !== curUser.id && <UserRow key={user.id} user={user} />,
          )}
      </div>
    </div>
  );
};
