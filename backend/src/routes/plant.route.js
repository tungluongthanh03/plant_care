import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { addPlant, getPlants } from "../controllers/plant.controller.js";

const router = express.Router();

router.get('/all', authenticate, getPlants); // get all plants
router.get("/:id", ); // get device by plant id
router.post("/", authenticate, addPlant); // add plant
router.put('/', ); // update plant's attributes
router.delete('/', ); // delete plant


export default router;
