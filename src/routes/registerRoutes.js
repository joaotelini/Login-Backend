import { registerUserController } from "../controller/registerController.js";
import { registerMiddleware } from "../middleware/registerMiddleware.js";
import express from "express";

const router = express.Router();

router.post("/register", registerMiddleware, registerUserController);

export default router;
