import express from "express";
import { login, register, getMe, checkEmail } from "../controllers/auth";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.post("/checkEmail", checkEmail);
router.post("/login", login);
router.post("/register", register);
router.get("/getMe", verifyToken, getMe);

export default router;
