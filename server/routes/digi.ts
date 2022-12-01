import express from "express";
import { getDigi, getUserDigis, getDigis, buyDigi } from "../controllers/digi";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.get("/getUserDigis", verifyToken, getUserDigis);
router.get("/getDigi", verifyToken, getDigi);
router.get("/getDigis", verifyToken, getDigis);
router.post("/buyDigi", verifyToken, buyDigi);

export default router;
