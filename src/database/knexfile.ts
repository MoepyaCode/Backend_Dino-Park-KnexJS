import type { Knex } from "knex";

// Update with your config settings.

const config: Knex.Config = {
  client: "postgresql",
  connection: {
    host: "localhost",
    port: 5433,
    database: "dino_park_db",
    user: "root",
    password: "rootpassword"
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    directory: './migrations'
  },
  seeds: {
    directory: './seeds'
  }
};

export default {
  development: config
}