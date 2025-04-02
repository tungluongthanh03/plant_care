import express from "express";
import userRoutes from "./user.route.js";
import authRoutes from "./auth.route.js";
import deviceRoutes from "./device.route.js";
import plantRoutes from "./plant.route.js";
import scheduleRoutes from "./schedule.route.js";


const router = express.Router();

router.use("/user", userRoutes);
router.use("/auth", authRoutes);
router.use("/device", deviceRoutes);
router.use("/plant", plantRoutes);
router.use("/schedule", scheduleRoutes);

export default router;