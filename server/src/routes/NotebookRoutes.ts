import express from "express";
import {
  createNotebook,
  getAllNotebooks,
  getSingleNotebook,
  updateNotebook,
  deleteNotebook,
} from "controllers/RootController/NotebookController";

const router = express.Router();

// Create
router.post("/", createNotebook);

// Read all
router.get("/", getAllNotebooks);

// Read one
router.get("/:id", getSingleNotebook);

// Update
router.put("/:id", updateNotebook);

// Delete
router.delete("/:id", deleteNotebook);

export default router;
