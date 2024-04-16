import { UpdateStatusBox } from "./Components/UpdateStatusBox";
import { useAppSelector } from "../../store/hooks";
import { FeedBox } from "./Components/FeedBox";

export const Feed = () => {
  const curUser = useAppSelector((state) => state.user);

  return (
    <div
      className={"w-full h-full px-10 py-5 flex flex-col justify-start gap-8"}
    >
      <UpdateStatusBox />
      <div className={"w-full flex justify-center text-lg flex-row"}>
        {curUser.status === "" || !curUser.status ? (
          <h3>Create your first status above!</h3>
        ) : (
          <h3>Your current status is: "{curUser.status}"</h3>
        )}
      </div>
      <FeedBox />
    </div>
  );
};
