import express from "express";
import { addDevice, deleteDevice, getDevice, getDevices, updateDevice } from "../controllers/device.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get('/all', authenticate, getDevices); // get all devices
router.get("/:id", authenticate, getDevice); // get device by device id
router.post("/", authenticate, addDevice); // add device
router.put('/', authenticate, updateDevice); // update device's foreign key (add or remove device from a plant)
router.delete('/:id', authenticate, deleteDevice); // delete device

export default router;
