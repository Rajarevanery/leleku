import {
  createDeck,
  deleteDeck,
  editDeck,
  getAllDeckByUserId,
} from "controllers/RootController/DeckController";
import express from "express";

const router = express.Router();

// Create
router.post("/", createDeck);

// Read one
router.get("/:id", getAllDeckByUserId);

// Update
router.put("/:id", editDeck);

// Delete
router.delete("/:id", deleteDeck);

export default router;
