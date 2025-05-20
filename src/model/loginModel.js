import { connection } from "../config/connection.js";

export const loginUserModel = async (email) => {
  const [res] = await connection.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return res;
};
