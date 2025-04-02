import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { addSchedule, deleteSchedule, getSchedule, getSchedules, updateSchedule } from "../controllers/schedule.controller.js";

const router = express.Router();

router.get("/", authenticate, getSchedules); // get all schedules
router.get("/:deviceId", authenticate, getSchedule); // get schedule by device id
router.post("/", authenticate, addSchedule); // add schedule
router.put("/", authenticate, updateSchedule); // update schedule
router.delete("/:scheduleId", authenticate, deleteSchedule); // delete schedule

export default router