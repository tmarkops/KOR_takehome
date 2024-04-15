import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { closeModal } from "../../store/features/modal/modalSlice";
import { useLoginOrCreateUserMutation } from "../../store/services/api";
import { setUser } from "../../store/features/user/userSlice";
import { AddFriendButton } from "./Components/AddFriendButton";

export const UserModal = () => {
  const curModal = useAppSelector((state) => state.modal);
  const outgoingFriendRequests = useAppSelector(
    (state) => state.friends.outgoingRequests,
  );
  const incomingFriendRequests = useAppSelector(
    (state) => state.friends.incomingRequests,
  );

  const dispatch = useAppDispatch();
  const [loginOrCreate, result] = useLoginOrCreateUserMutation();

  const handleAddFriend = async () => {};

  // const submit = async () => {
  //   //TODO: validation on the input
  //
  //   try {
  //     await loginOrCreate(curText);
  //   } catch (e) {
  //     // TODO: surface error. ex: use a Toast
  //     console.log("Error logging/creating user");
  //   }
  // };

  // const setUserCloseModal = () => {
  //   if (!result.isSuccess || !result.data) {
  //     return console.log("mutation didn't return a user");
  //   }
  //   dispatch(
  //     setUser({
  //       id: result.data.id,
  //       username: result.data.username,
  //     }),
  //   );
  //   dispatch(closeModal());
  // };
  //
  // useEffect(() => {
  //   setUserCloseModal();
  // }, [result.isSuccess]);

  if (!curModal.user) {
    dispatch(closeModal());
    return null;
  }
  return (
    <div
      className={
        "flex w-full h-full bg-opacity-70 bg-black justify-center items-center"
      }
    >
      <div
        className={
          "relative w-4/12 h-4/6 bg-white border-4 border-blue-400 rounded-lg items-center justify-center flex flex-col gap-8"
        }
      >
        <button
          className={
            "absolute flex top-2 left-2 bg-gray-400 w-12 h-12 rounded-full justify-center items-center hover:bg-gray-600 cursor-pointer"
          }
          onClick={() => dispatch(closeModal())}
        >
          <h3 className={"text-lg font-bold"}>X</h3>
        </button>
        <img
          className={"h-4/12 w-4/12"}
          src={require("../../assets/TempUserImage.jpeg")}
        />
        <h1>{curModal.user.username}</h1>
        <h2>{curModal.user.status}</h2>

        <AddFriendButton recipientUser={curModal.user} />
      </div>
    </div>
  );
};
