import express from "express";
import { getUsers, getUser, updateText } from "../controllers/user";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.get("/all", verifyToken, getUsers);
router.get("/single", verifyToken, getUser);
router.post("/updateText", verifyToken, updateText);

export default router;
