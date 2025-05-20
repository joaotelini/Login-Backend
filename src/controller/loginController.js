import { loginUserModel } from "../model/loginModel.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET;

export async function loginUserController(req, res) {
  try {
    await loginUserModel(req.body.email);
    const user = await loginUserModel(req.body.email);

    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "User not found",
      });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
