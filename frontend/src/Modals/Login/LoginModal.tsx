import { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { closeModal } from "../../store/features/modal/modalSlice";
import { useLoginOrCreateUserMutation } from "../../store/services/api";
import { setUser } from "../../store/features/user/userSlice";

export const LoginModal = () => {
  const [curText, setCurText] = useState<string>("");
  const dispatch = useAppDispatch();
  const [loginOrCreate, result] = useLoginOrCreateUserMutation();

  const submit = async () => {
    //TODO: validation on the input

    try {
      await loginOrCreate(curText);
    } catch (e) {
      // TODO: surface error. ex: use a Toast
      console.log("Error logging/creating user");
    }
  };

  const setUserCloseModal = () => {
    if (!result.isSuccess || !result.data) {
      return console.log("mutation didn't return a user");
    }
    dispatch(
      setUser({
        id: result.data.id,
        username: result.data.username,
      }),
    );
    dispatch(closeModal());
  };

  useEffect(() => {
    setUserCloseModal();
  }, [result.isSuccess]);

  return (
    <div
      className={
        "flex w-full h-full bg-opacity-70 bg-black justify-center items-center"
      }
    >
      <div
        className={
          "relative w-6/12 h-3/6 bg-white border-4 border-blue-400 rounded-lg items-center justify-center flex flex-col gap-8"
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
        <p>Enter your username:</p>
        <input
          className={
            "border-4 border-gray-600 rounded-lg w-2/6 h-10 px-3 cursor-text"
          }
          value={curText}
          onChange={(event) => setCurText(event.target.value)}
        />
        <button className={"w-36 h-10 rounded-lg bg-blue-600"} onClick={submit}>
          <p>Login / Sign Up</p>
        </button>
      </div>
    </div>
  );
};
