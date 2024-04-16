import React from "react";
import { useAppDispatch } from "../../../store/hooks";
import { openLoginModal } from "../../../store/features/modal/modalSlice";

export const LoginButton = () => {
  const dispatch = useAppDispatch();

  return (
    <div className={"max-w-24 w-full h-full flex items-center"}>
      <button
        className={"w-full h-8 bg-gray-400 rounded-md border-2 border-gray-600"}
        type={"button"}
        onClick={() => dispatch(openLoginModal())}
      >
        <p>Login</p>
      </button>
    </div>
  );
};
