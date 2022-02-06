import { config, } from 'dotenv';

config();

export default {
  db: {
    dbName: process.env.DB,
    userName: process.env.DB_USERNAME,
    password: process.env.PASSWORD,
    dbHost: process.env.DB_HOST,
  },
  server: {
    port: process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3000,
    host: process.env.SERVER_HOST ? process.env.SERVER_HOST : 'localhost',
  },
};
