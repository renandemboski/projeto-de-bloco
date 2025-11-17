import express from "express";
import { registrarHandle, loginHandle } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registrarHandle);
router.post("/login", loginHandle);

export default router;
