import express from "express";
import {
  registrarHandle,
  loginHandle,
  getUserByIdHandle,
  updateUserHandle,
  deleteUserHandle
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registrarHandle);
router.post("/login", loginHandle);
router.get("/:id", getUserByIdHandle);
router.put("/:id", updateUserHandle);
router.delete("/:id", deleteUserHandle);

export default router;
