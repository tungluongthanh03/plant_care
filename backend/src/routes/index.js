import express from "express";
import userRoutes from "./user.route.js";
import authRoutes from "./auth.route.js";
import deviceRoutes from "./device.route.js";
import plantRoutes from "./plant.route.js";


const router = express.Router();

router.use("/user", userRoutes);
router.use("/auth", authRoutes);
router.use("/device", deviceRoutes);
router.use("/plant", plantRoutes);

export default router;