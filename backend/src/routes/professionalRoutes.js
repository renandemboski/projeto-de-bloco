import express from "express";
import { getAllProfessionalsHandle, getProfessionalByIdHandle } from "../controllers/professionalController.js";

const router = express.Router();

router.get("/", getAllProfessionalsHandle);
router.get("/:id", getProfessionalByIdHandle);

export default router;
