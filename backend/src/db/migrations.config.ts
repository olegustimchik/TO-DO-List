import "dotenv/config";
import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type       : "postgres",
  database   : process.env.DATABASE_NAME,
  host       : process.env.DATABASE_HOST,
  username   : process.env.DATABASE_USER,
  password   : process.env.DATABASE_PASSWORD,
  port       : process.env.DATABASE_PORT ? +process.env.DATABASE_PORT : 3300,
  schema     : "public",
  synchronize: true,
  // url: process.env.DATABASE_URL,
  migrations : [`${__dirname}/../**/migrations/*{.js,.ts}`],
  entities   : [`${__dirname}/../**/*.entity{.js,.ts}`],
});
