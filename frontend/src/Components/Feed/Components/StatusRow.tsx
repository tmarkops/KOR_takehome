import { StatusUpdate } from "../../../types/types";

export const StatusRow = ({ updateStatus }: { updateStatus: StatusUpdate }) => {
  return (
    <>
      <div className={"w-full flex flex-row items-center px-10 gap-10 py-5"}>
        <img
          className={"h-14 w-14 rounded-full"}
          alt={"User"}
          src={require("../../../assets/TempUserImage.jpeg")}
        />
        <p>
          {updateStatus.username}: {updateStatus.content}
        </p>
      </div>
      <div className={"h-0.5 bg-white w-full"}></div>
    </>
  );
};
