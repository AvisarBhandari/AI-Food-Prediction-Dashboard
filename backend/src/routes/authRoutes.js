import express from "express";
import { regristerUser, loginUser } from "../controllers/authController.js";
const router = express.Router();
router.post("/register", regristerUser);
router.post("/login", loginUser);

export default router;
