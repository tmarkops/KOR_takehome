import React from "react";
import { useAppDispatch } from "../../../store/hooks";
import { openLoginModal } from "../../../store/features/modal/modalSlice";

export const LoginButton = () => {
  const dispatch = useAppDispatch();

  return (
    <div className={"h-full flex items-center"}>
      <button
        className={
          "px-2 h-8  rounded-md border-1 border-neutral-200 hover:bg-blue-300"
        }
        type={"button"}
        onClick={() => dispatch(openLoginModal())}
      >
        <p className={"text-white"}>Login / Sign Up</p>
      </button>
    </div>
  );
};
