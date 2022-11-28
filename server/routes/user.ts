import express from "express";
import { getUsers, getUser } from "../controllers/user";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.get("/all", getUsers);
router.get("/:userId", getUser);

export default router;
