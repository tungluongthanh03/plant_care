import express from 'express';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

router.get("/", authenticate, getInformation); // get all information

export default router;