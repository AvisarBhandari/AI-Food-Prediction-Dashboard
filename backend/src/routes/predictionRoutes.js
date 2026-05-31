import express from "express";
import {
  getPrediction,
  savePrediction,
} from "../controllers/predictionController.js";
import protect from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", protect, savePrediction);
router.get("/", protect, getPrediction);

export default router;
