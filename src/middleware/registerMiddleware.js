import bcrypt from "bcryptjs";
import { connection } from "../config/connection.js";

export async function registerMiddleware(req, res, next) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "All fields are required",
    });
  }

  if (password.length <= 6) {
    return res.status(400).json({
      status: "fail",
      message: "Password must be at least 6 characters long",
    });
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({
      status: "fail",
      message: "Email is not valid",
    });
  }

  try {
    const [results] = await connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (results.length > 0) {
      return res.status(400).json({
        status: "fail",
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;

    next();
  } catch (error) {
    console.error("Erro no registerMiddleware:", error);
    return res.status(500).json({
      status: "error",
      message: "Erro interno no servidor",
    });
  }
}
