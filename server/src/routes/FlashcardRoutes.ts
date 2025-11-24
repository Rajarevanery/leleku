import {
  createFlashcard,
  deleteFlashcard,
  editFlashcard,
  getAllFlashcardByDeckId,
} from "controllers/RootController/FlashcardController";
import express from "express";

const router = express.Router();

// Create
router.post("/", createFlashcard);

// Read one
router.get("/:id", getAllFlashcardByDeckId);

// Update
router.put("/:id", editFlashcard);

// Delete
router.delete("/:id", deleteFlashcard);

export default router;
