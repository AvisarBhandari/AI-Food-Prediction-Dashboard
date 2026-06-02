import exports from "express";
import upload from "../middleware/cloudinaryUpload";

const router = express.Router();

router.post("/", upload.single("file"), (req, res) => {
  try {
    res.json({
      imageUrl: req.file.path,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
