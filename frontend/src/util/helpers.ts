import { User } from "../types/types";

export const userExistsInUserArray = (user: User, users: User[]): boolean => {
  return users.some((u) => u.id === user.id);
};
