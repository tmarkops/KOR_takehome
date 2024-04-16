/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createType("notification_type", [
    "status_update",
    "friend_request",
    "friend_request_accepted",
  ]);

  pgm.createTable("user", {
    id: "serial PRIMARY KEY",
    username: { type: "text", notNull: true, unique: true },
    created_at: { type: "timestamp", default: pgm.func("current_timestamp") },
    status: { type: "text" },
  });

  pgm.createIndex("user", "id");
  pgm.createIndex("user", "username");

  pgm.createTable("status_update", {
    id: "serial PRIMARY KEY",
    user_id: {
      type: "integer",
      references: '"user"(id)',
      notNull: true,
    },
    content: { type: "text", notNull: true },
    created_at: { type: "timestamp", default: pgm.func("current_timestamp") },
  });

  pgm.createIndex("status_update", "id");

  pgm.createIndex("status_update", "user_id");

  pgm.createTable("friend", {
    id: "serial PRIMARY KEY",
    user_id_a: {
      type: "integer",
      references: '"user"(id)',
      notNull: true,
    },
    user_id_b: {
      type: "integer",
      references: '"user"(id)',
      notNull: true,
      check: "user_id_b <> user_id_a",
    },
    created_at: { type: "timestamp", default: pgm.func("current_timestamp") },
  });

  pgm.createIndex("friend", "user_id_a");
  pgm.createIndex("friend", "user_id_b");

  pgm.createTable("friend_request", {
    id: "serial PRIMARY KEY",
    user_id_sender: {
      type: "integer",
      references: '"user"(id)',
      notNull: true,
    },
    user_id_receiver: {
      type: "integer",
      references: '"user"(id)',
      notNull: true,
      check: "user_id_sender <> user_id_receiver",
    },
    created_at: { type: "timestamp", default: pgm.func("current_timestamp") },
  });
  pgm.createIndex("friend_request", "id");
  pgm.createIndex("friend_request", "user_id_sender");
  pgm.createIndex("friend_request", "user_id_receiver");

  pgm.createTable("notification", {
    id: "serial PRIMARY KEY",
    user_id: {
      type: "integer",
      references: '"user"(id)',
      notNull: true,
    },
    type: {
      type: "notification_type",
      notNull: true,
    },
    message: {
      type: "text",
      notNull: true,
    },
    created_at: { type: "timestamp", default: pgm.func("current_timestamp") },
  });

  pgm.createIndex("notification", "user_id");
};

exports.down = (pgm) => {
  pgm.dropTable("notification");
  pgm.dropTable("friend_request");
  pgm.dropTable("friend");
  pgm.dropTable("status_update");
  pgm.dropTable("user");

  pgm.dropType("notification_type");
};
