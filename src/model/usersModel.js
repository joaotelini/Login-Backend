import { connection } from "../config/connection.js";

export const usersModel = async () => {
  const [res] = await connection.query("SELECT * FROM users");
  return res;
};
