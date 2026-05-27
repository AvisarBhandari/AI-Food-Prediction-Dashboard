import express from "express";
import { regristerUser } from "../controllers/authController.js";
const router = express.Router();
router.post("/register", regristerUser);

export default router;
