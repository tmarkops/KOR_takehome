import pg, {Pool} from "pg";
import "dotenv/config";
import { Kysely, PostgresDialect } from "kysely";
import {DB} from "kysely-codegen";

export const getDbUrl = (): string => {
  return `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
};

export const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: getDbUrl(),
    }),
  }),
});


