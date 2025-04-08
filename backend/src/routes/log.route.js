import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { getAllLogs, getLogsByDeviceId } from "../controllers/log.controller.js";

const router = express.Router();

router.get('/', authenticate, getAllLogs); // get all logs
router.get('/:deviceId', authenticate, getLogsByDeviceId); // get logs by device id
export default router;
