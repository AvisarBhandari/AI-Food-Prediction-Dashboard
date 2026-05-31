import express from "express";
import {
  getPrediction,
  savePrediction,
  getAnalytics,
  deletePrediction,
} from "../controllers/predictionController.js";
import protect from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", protect, savePrediction);
router.get("/", protect, getPrediction);
router.get("/analytics", protect, getAnalytics);
router.delete("/:id", protect, deletePrediction);

export default router;
