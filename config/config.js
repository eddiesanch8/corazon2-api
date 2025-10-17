import dotenv from "dotenv";
dotenv.config();
const dbConfig = {
  host: process.env.HOST,
  user: process.env.DB_USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
};

export default dbConfig;
