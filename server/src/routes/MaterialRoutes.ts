import {
  createMaterial,
  deleteMaterial,
  editMaterial,
  getMaterial,
  getMaterials,
} from "controllers/RootController/MaterialController";
import express from "express";

const router = express.Router();

router.post("/", createMaterial);
router.get("/", getMaterials);
router.get("/:id", getMaterial);
router.post("/:id", editMaterial);
router.delete("/:id", deleteMaterial);

export default router;
