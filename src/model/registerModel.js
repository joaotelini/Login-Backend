import { connection } from "../config/connection.js";

export const registerUserModel = async (name, email, password) => {
  const [result] = await connection.query(
    "INSERT INTO users (name, email, password, created_at) VALUES (?, ?, ?, NOW())",
    [name, email, password]
  );
  return result;
};
