import { db, getDbUrl } from "../config/db";

export const getAllUsers = async () => {
  const users = await db.selectFrom("user").selectAll().execute();
  return users;
};

export const getUserByUsername = async (username: string) => {
  const user = await db
    .selectFrom("user")
    .select(["id", "username"])
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
    .returning(["id", "username"])
    .execute();
  return user;
};

// export const getFriendsByUserId = async (userId: number) => {
//   const friends = await db
//     .selectFrom("friend")
//     .innerJoin("user", (join) =>
//       join
//         .onRef("friend.user_id_a", "=", "user.id")
//         .onRef("friend.user_id_b", "=", "user.id"),
//     )
//     .select(["user_id_b", "user_id_a"])
//     .where((eb) =>
//       eb.or([eb("user_id_a", "=", userId), eb("user_id_b", "=", userId)]),
//     )
//     .execute();
//   return friends;
// };

export const getFriendsByUserId = async (userId: number) => {
  const friends = await db
    .selectFrom("friend")
    .innerJoin("user", (join) =>
      join
        .onRef("friend.user_id_a", "=", "user.id")
        .onRef("friend.user_id_b", "=", "user.id"),
    )
    .select(["user.id", "user.username"])
    .where((eb) =>
      eb.or([
        eb("friend.user_id_a", "=", userId),
        eb("friend.user_id_b", "=", userId),
      ]),
    )
    .where((eb) =>
      eb.or([
        eb("friend.user_id_a", "<>", userId),
        eb("friend.user_id_b", "<>", userId),
      ]),
    )
    .execute();

  return friends;
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
  const receiverUser = await db
    .selectFrom("user")
    .where("id", "=", receiverUserId)
    .selectAll()
    .executeTakeFirst();

  return receiverUser;
};

export const getOutgoingFriendRequests = async (userId: number) => {
  const outgoingRequests = await db
    .selectFrom("friend_request")
    .innerJoin("user", (join) =>
      join.onRef("friend_request.user_id_receiver", "=", "user.id"),
    )
    .select(["user.id", "user.username"])
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
    .select(["user.id", "user.username"])
    .where("friend_request.user_id_receiver", "=", userId)
    .execute();

  return outgoingRequests;
};

export const respondFriendRequest = async ({
  senderUserId,
  receiverUserId,
  response,
}: {
  response: "accept" | "decline";
  senderUserId: number;
  receiverUserId: number;
}) => {
  await db
    .deleteFrom("friend_request")
    .where("user_id_receiver", "=", receiverUserId)
    .where("user_id_sender", "=", senderUserId)
    .execute();
  if (response === "accept") {
    await db
      .insertInto("friend")
      .values({
        user_id_a: senderUserId,
        user_id_b: receiverUserId,
      })
      .execute();
  }
};
