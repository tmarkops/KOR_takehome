import { User } from "../../../types/types";
import { useAppDispatch } from "../../../store/hooks";
import { openUserModal } from "../../../store/features/modal/modalSlice";

export const UserRow = ({ user }: { user: User }) => {
  const dispatch = useAppDispatch();

  return (
    <div className={"flex flex-col"}>
      <div
        className={
          "w-full h-32 min-h-32 flex flex-row items-center px-10 gap-10 hover:bg-neutral-300 rounded-lg"
        }
        onClick={() => dispatch(openUserModal({ user: user }))}
      >
        {/*<div className={"flex-1 w-full h-full flex items-center"}>*/}
        <img
          className={"h-20 w-20 rounded-full"}
          alt={"User"}
          src={require("../../../assets/TempUserImage.jpeg")}
        />
        {/*</div>*/}
        <h2 className={"flex-1 w-full items-start"}>{user.username}</h2>
      </div>
      <div className={"h-0.5 bg-white w-full"}></div>
    </div>
  );
};
