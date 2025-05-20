import { registerUserModel } from "../model/registerModel.js";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;

export async function registerUserController(req, res) {
  try {
    const { name, email, password } = req.body;
    const result = await registerUserModel(name, email, password);

    const token = jwt.sign({ id: result.insertId, email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    return res.status(201).json({
      status: "success",
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    console.error("Erro no registerUserController:", error);
    return res.status(500).json({ message: error.message });
  }
}
