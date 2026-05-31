import express from "express";
import {
  getPrediction,
  savePrediction,
  getAnalytics,
} from "../controllers/predictionController.js";
import protect from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", protect, savePrediction);
router.get("/", protect, getPrediction);
router.get("/analytics", protect, getAnalytics);

export default router;
