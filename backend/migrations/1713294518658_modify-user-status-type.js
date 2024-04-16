/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.alterColumn("user", "status", {
    notNull: true,
    default: "",
  });
};

exports.down = (pgm) => {
  pgm.alterColumn("user", "status", {
    notNull: false,
  });
};
