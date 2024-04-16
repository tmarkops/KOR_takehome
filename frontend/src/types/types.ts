export type User = {
  id: number;
  username: string;
  status: string;
};

export type MyNotification = {
  type: "status_update" | "friend_request" | "friend_request_accepted";
  message: string;
};

export type StatusUpdate = {
  content: string;
  user_id: number;
  username: string;
};
