export type User = {
  id: number;
  username: string;
  status: string | undefined;
};

export type MyNotification = {
  type: "status_update" | "friend_request" | "friend_request_accepted";
  message: string;
};
