import { HTMLProps } from "react";

type SidebarButtonProps = HTMLProps<HTMLDivElement> & {
  label: string;
  imageSource: string;
};
export const SidebarButton = ({
  label,
  imageSource,
  ...props
}: SidebarButtonProps) => {
  return (
    <div
      {...props}
      className={
        "w-full h-20  rounded-lg hover:bg-gray-200 flex flex-row items-center justify-start gap-7 px-2"
      }
    >
      <img className={"h-3/6 hover:bg-gray-200"} src={imageSource} />
      <h4>{label}</h4>
    </div>
  );
};
