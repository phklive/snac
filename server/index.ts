import express, { Express } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import multer from "multer";
import { updateBanner, updateProfile } from "./controllers/user";
import { verifyToken } from "./middleware/auth";

// Configuration
dotenv.config();
const app: Express = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// File storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage });

// Image routes
app.post(
  "/user/updateBanner",
  upload.single("banner"),
  verifyToken,
  updateBanner
);

app.post(
  "/user/updateProfile",
  upload.single("profile"),
  verifyToken,
  updateProfile
);

// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

// Server setup
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
  })
  .catch((error) => console.log(error));
