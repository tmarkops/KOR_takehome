import { db, getDbUrl } from "../config/db";
import { NotificationType, User } from "kysely-codegen";

export const getAllUsers = async () => {
  const users = await db.selectFrom("user").selectAll().execute();
  return users;
};

export const getUserByUserId = async (userId: number) => {
  const user = await db
    .selectFrom("user")
    .select(["id", "username", "status"])
    .where("id", "=", userId)
    .executeTakeFirst();
  return user;
};

export const getUserByUsername = async (username: string) => {
  const user = await db
    .selectFrom("user")
    .select(["id", "username", "status"])
    .where("username", "=", username)
    .executeTakeFirst();
  return user;
};

export const createUser = async (username: string) => {
  const user = await db
    .insertInto("user")
    .values({
      username: username,
    })
    .returning(["id", "username", "status"])
    .executeTakeFirst();
  return user;
};

export const updateStatus = async ({
  userId,
  status,
}: {
  userId: number;
  status: string;
}) => {
  await db
    .updateTable("user")
    .set({
      status: status,
    })
    .where("id", "=", userId)
    .returning(["id", "username", "status"])
    .executeTakeFirst();

  const updateStatusEntry = await db
    .insertInto("status_update")
    .values({
      content: status,
      user_id: userId,
    })
    .returning(["content", "user_id"])
    .executeTakeFirst();

  return updateStatusEntry;
};

export const getFriendsByUserId = async (userId: number) => {
  //TODO: solve commented-out code to do this operation in one Kysely operation
  const friendRelations = await db
    .selectFrom("friend")
    .where((eb) =>
      eb.or([eb("user_id_b", "=", userId), eb("user_id_a", "=", userId)]),
    )
    .select(["user_id_a", "user_id_b"])
    .execute();

  let friends: { id: number; status: string | null; username: string }[] = [];

  for (const relation of friendRelations) {
    if (relation.user_id_a === userId) {
      const friend = await getUserByUserId(relation.user_id_b);
      if (friend) {
        friends.push(friend);
      }
      continue;
    }
    const friend = await getUserByUserId(relation.user_id_a);
    if (friend) {
      friends.push(friend);
    }
  }

  return friends;
  // try {
  //   const friends = await db
  //     .selectFrom("friend")
  //     .innerJoin("user", (join) =>
  //       join
  //         .onRef("friend.user_id_a", "=", "user.id")
  //         .onRef("friend.user_id_b", "=", "user.id"),
  //     )
  //     .select(["user.id", "user.username", "user.status"])
  //     .where((eb) =>
  //       eb.or([
  //         eb("friend.user_id_a", "=", userId),
  //         eb("friend.user_id_b", "=", userId),
  //       ]),
  //     )
  //     .where((eb) =>
  //       eb.or([
  //         eb("friend.user_id_a", "<>", userId),
  //         eb("friend.user_id_b", "<>", userId),
  //       ]),
  //     )
  //     .execute();
  //   console.log("in get friend function. FRIENDS: " + friends);
  //   return friends;
  // } catch (error) {
  //   console.error("Error fetching friends:", error); // Log any errors
  //   throw error; // Re-throw the error to handle it at the calling side
  // }
};

export const createFriendRequest = async ({
  senderUserId,
  receiverUserId,
}: {
  senderUserId: number;
  receiverUserId: number;
}) => {
  const friendRequest = await db
    .insertInto("friend_request")
    .values({
      user_id_receiver: receiverUserId,
      user_id_sender: senderUserId,
    })
    .returning("id")
    .execute();
  const receiverUser = await getUserByUserId(receiverUserId);

  return receiverUser;
};

export const getOutgoingFriendRequests = async (userId: number) => {
  const outgoingRequests = await db
    .selectFrom("friend_request")
    .innerJoin("user", (join) =>
      join.onRef("friend_request.user_id_receiver", "=", "user.id"),
    )
    .select(["user.id", "user.username", "user.status"])
    .where("friend_request.user_id_sender", "=", userId)
    .execute();

  return outgoingRequests;
};

export const getIncomingFriendRequests = async (userId: number) => {
  const outgoingRequests = await db
    .selectFrom("friend_request")
    .innerJoin("user", (join) =>
      join.onRef("friend_request.user_id_sender", "=", "user.id"),
    )
    .select(["user.id", "user.username", "user.status"])
    .where("friend_request.user_id_receiver", "=", userId)
    .execute();

  return outgoingRequests;
};

export const respondFriendRequest = async ({
  senderUserId,
  receiverUserId,
  answer,
}: {
  answer: "accept" | "decline";
  senderUserId: number;
  receiverUserId: number;
}) => {
  await db
    .deleteFrom("friend_request")
    .where("user_id_receiver", "=", receiverUserId)
    .where("user_id_sender", "=", senderUserId)
    .execute();
  if (answer === "accept") {
    await db
      .insertInto("friend")
      .values({
        user_id_a: senderUserId,
        user_id_b: receiverUserId,
      })
      .execute();
  }
  const senderUser = await getUserByUserId(senderUserId);

  if (!senderUser) {
    throw new Error("could not get sender user");
  }
  return senderUser;
};

export const getNotifications = async (userId: number) => {
  const notifications = await db
    .selectFrom("notification")
    .where("user_id", "=", userId)
    .orderBy("created_at desc")
    .select(["type", "message"])
    .execute();

  return notifications;
};

export const createNotification = async ({
  receiverUserId,
  senderUserId,
  type,
}: {
  senderUserId: number;
  receiverUserId: number;

  type: NotificationType;
}) => {
  // NOTE: the "receiver" means the user that should receive this notification
  const senderUser = await getUserByUserId(senderUserId);

  if (!senderUser) {
    throw new Error("could not get sender user");
  }
  let messageBody: string;
  switch (type) {
    case "friend_request":
      messageBody = `${senderUser.username} sent you a friend request`;
      break;
    case "friend_request_accepted":
      messageBody = `${senderUser.username} accepted your friend request`;
      break;
    case "status_update":
      messageBody = `${senderUser.username} updated their status`;
      break;
  }

  await db
    .insertInto("notification")
    .values({
      user_id: receiverUserId,
      type: type,
      message: messageBody,
    })
    .execute();
};

export const createStatusUpdateNotifications = async (userId: number) => {
  const curUser = await getUserByUserId(userId);
  if (!curUser) {
    throw new Error();
  }
  const friends = await getFriendsByUserId(userId);

  await db
    .insertInto("notification")
    .values(
      friends.map((friend) => {
        return {
          type: "status_update",
          user_id: friend.id,
          message: `${curUser.username} updated their status`,
        };
      }),
    )
    .execute();
};

export const getStatusUpdatesByUserId = async (userId: number) => {
  const friends = await getFriendsByUserId(userId);
  if (friends.length === 0) {
    return [];
  }
  const friendsUserIds = friends.map((friend) => friend.id);
  const statusUpdates = await db
    .selectFrom("status_update")
    .innerJoin("user", (join) =>
      join.onRef("status_update.user_id", "=", "user.id"),
    )
    .where("user_id", "in", friendsUserIds)
    .orderBy("status_update.created_at desc")
    .select(["status_update.content", "status_update.user_id", "user.username"])
    .execute();

  return statusUpdates;
};
