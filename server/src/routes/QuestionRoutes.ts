import {
  createQuestion,
  deleteQuestion,
} from "controllers/RootController/QuestionController";
import express from "express";

const router = express.Router();

router.post("/", createQuestion);
router.delete("/:id", deleteQuestion);

export default router;
