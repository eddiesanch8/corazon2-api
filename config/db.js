import mysql from "mysql2";
import dbConfig from "./config.js";
const connectToDatabase = async () => {
  try {
    const pool = mysql.createPool(dbConfig);
    console.log("Connected to MySQL database");
    return pool;
  } catch (err) {
    console.error("Database connection failed:", err.message);
    throw err;
  }
};

export default connectToDatabase;
