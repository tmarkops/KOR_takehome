import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import { useGetUsersQuery } from "../../store/services/api";
import { UserRow } from "./Components/UserRow";

export const Users = () => {
  const allUsers = useAppSelector((state) => state.allUsers.allUsers);
  const curUser = useAppSelector((state) => state.user);

  const { data, isLoading, isSuccess } = useGetUsersQuery(null);

  const dispatch = useAppDispatch();

  //TODO: add Loading component

  return (
    <div className={"flex flex-col gap-3 overflow-scroll w-full"}>
      {isSuccess &&
        data.map(
          (user) =>
            user.id !== curUser.id && <UserRow key={user.id} user={user} />,
        )}
    </div>
  );
};
