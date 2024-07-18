import { Router } from "express";
import Note from "../models/note.model.js";

// add middleware
// import { verifyToken } from "../middleware/auth"; // Import auth middleware

const router = Router();

// Get all user notes (requires authentication)
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find({ user: req.userId }).sort({ updatedAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a note (requires authentication)
router.post("/", async (req, res) => {
  const { title, content, tags, color } = req.body;
  try {
    const newNote = new Note({
      user: req.userId,
      title,
      content,
      tags,
      color,
    });
    const savedNote = await newNote.save();
    res.json(savedNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a note (requires authentication)
router.put("/:id", async (req, res) => {
  const { title, content, tags, color, archived } = req.body;
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: { title, content, tags, color, archived } },
      { new: true }
    );
    if (!updatedNote)
      return res.status(404).json({ message: "Note not found" });
    res.json(updatedNote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a note (mark as deleted, requires authentication)
// router.delete("/:id", verifyToken, async (req, res) => {});

export default router;
