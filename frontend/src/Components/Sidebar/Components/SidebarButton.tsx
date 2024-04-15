import { HTMLProps } from "react";

type SidebarButtonProps = HTMLProps<HTMLDivElement> & {
  label: string;
};
export const SidebarButton = ({ label, ...props }: SidebarButtonProps) => {
  return (
    <div
      {...props}
      className={
        "w-full h-20 bg-yellow-400 rounded-lg hover:bg-gray-200 flex flex-row items-center justify-center"
      }
    >
      <h4>{label}</h4>
    </div>
  );
};
