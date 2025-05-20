import { loginUserController } from "../controller/loginController.js";
import { loginMiddleware } from "../middleware/loginMiddleware.js";
import express from "express";

const router = express.Router();

router.post("/login", loginMiddleware, loginUserController);

export default router;
