import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoute from "./routes/authRoutes.js";
import userRoute from "./routes/UserRoutes.js";
import predictionRoute from "./routes/predictionRoutes.js";
import path from "path";
import uploadRoute from "./routes/uploadRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// 1. Global Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

const uploadsPath = path.resolve("uploads");

app.use("/uploads", express.static(uploadsPath));
app.use(express.json());
// 2. Request Logger (Moved up to catch ALL requests)
app.use((req, res, next) => {
  console.log("Request method:", req.method, "req path:", req.path);
  next();
});

// 3. Routes
app.get("/", (req, res) => {
  res.send("API running");
});
app.use("/api/predictions", predictionRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/upload", uploadRoute);

// 4. Database & Server Start
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
