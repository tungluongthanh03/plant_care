import express from "express";
import { getUsers, me } from "../controllers/user.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/me", authenticate, me);
router.get("/users", authenticate, getUsers); // get all users

export default router;
