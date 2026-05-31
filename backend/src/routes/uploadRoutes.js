import express from "express";
import { Router } from "express";
import upload from "../middleware/upload.js";

const router = Router();

router.post("/", upload.single("file"), (req, res) => {
  try {
    const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;

    res.json({ imageUrl });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
