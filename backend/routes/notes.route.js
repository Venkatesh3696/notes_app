import { Router } from "express";
import {
  getNotes,
  createNotes,
  updateNotes,
  deleteNotes,
  getSingleNotes,
} from "../controllers/notes.controller.js";
import { verifyToken } from "../middleware/auth.js"; // Import auth middleware

const router = Router();

router.get("/", verifyToken, getNotes);
router.get("/:id", verifyToken, getSingleNotes);
router.post("/", verifyToken, createNotes);
router.patch("/:id", verifyToken, updateNotes);
router.delete("/:id", verifyToken, deleteNotes);

export default router;
