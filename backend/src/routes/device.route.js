import express from "express";
import { getDevices } from "../controllers/device.controller";

const router = express.Router();

router.get('/all', getDevices); // get all devices
router.get("/", ); // get device by device id
router.post("/", ); // add device
router.put('/', ); // update device's foreign key (add or remove device from a plant)
router.delete('/', ); // delete device


export default router;
