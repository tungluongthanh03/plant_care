import express from "express";
import { getDevices } from "../controllers/device.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get('/all', authenticate, getDevices); // get all devices
router.get("/:id", ); // get device by device id
router.post("/", ); // add device
router.put('/', ); // update device's foreign key (add or remove device from a plant)
router.delete('/', ); // delete device


export default router;
