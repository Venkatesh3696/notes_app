import Note from "../models/note.model.js";

// Get all notes
export const getNotes =
  ("/",
  async (req, res) => {
    console.log("user id ", req.userId);
    try {
      const notes = await Note.find({ user: req.userId }).sort({
        updatedAt: -1,
      });
      res.json(notes);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
export const getSingleNotes =
  ("/",
  async (req, res) => {
    const id = req.params.id;
    // console.log("id note", id);
    try {
      const notes = await Note.findById(id);
      res.json(notes);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// Create a note
export const createNotes =
  ("/",
  async (req, res) => {
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

// Update a note
export const updateNotes =
  ("/",
  async (req, res) => {
    const { title, content, tags, color, archived } = req.body;
    try {
      const updatedNote = await Note.findByIdAndUpdate(req.params.id, {
        $set: { title, content, tags, color, archived },
      });
      if (!updatedNote)
        return res.status(404).json({ message: "Note not found" });
      res.json(updatedNote);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// Delete a note
export const deleteNotes =
  ("/",
  (req, res) => {
    try {
      Note.findByIdAndDelete(req.params.id).then((deletedNote) =>
        res.json({ deletedNote, message: "notes deleted" })
      );
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
