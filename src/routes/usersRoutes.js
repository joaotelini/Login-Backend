import { usersController } from "../controller/usersController.js";
import { jwtMiddleware } from "../middleware/jwtMiddleware.js";
import express from "express";

const router = express.Router();

router.get("/users", jwtMiddleware, usersController);

export default router;
