import express from "express";
import { getDigi, getUserDigis } from "../controllers/digi";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.get("/getUserDigis", verifyToken, getUserDigis);
router.get("/getDigi", verifyToken, getDigi);

export default router;
