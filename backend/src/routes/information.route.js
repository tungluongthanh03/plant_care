import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { getInformation } from "../controllers/information.controller.js";

const router = express.Router();

router.get("/", authenticate, getInformation); // get all information

export default router;