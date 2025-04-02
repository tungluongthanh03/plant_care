import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { addPlant, deletePlant, getPlant, getPlants, updatePlant } from "../controllers/plant.controller.js";

const router = express.Router();

router.get('/all', authenticate, getPlants); // get all plants
router.get("/:id", authenticate, getPlant); // get device by plant id
router.post("/", authenticate, addPlant); // add plant
router.put('/', authenticate, updatePlant); // update plant's attributes
router.delete('/:id', authenticate, deletePlant); // delete plant

export default router;
