import express from "express";
import { signIn, signOut, signUp, verifyEmail } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/sign-up", signUp); // sign up route
router.post('/sign-in', signIn); // sign in route
router.get('/sign-out', signOut); // sign out route
router.get("/verify-email", verifyEmail); // verify email after sign up


export default router;
