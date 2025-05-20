import { connection } from "../config/connection.js";
import bcrypt from "bcryptjs";

export async function loginMiddleware(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "All fields are required",
    });
  }

  try {
    const [results] = await connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    const user = results[0];

    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "Email does not exist",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid password",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("Erro no loginMiddleware:", error);
    return res.status(500).json({
      status: "error",
      message: "Erro interno no servidor",
    });
  }
}
