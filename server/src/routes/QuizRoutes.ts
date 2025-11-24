import {
  createQuiz,
  createSubmitQuiz,
  deleteQuiz,
  getAllQuiz,
  getSingleQuiz,
  updateQuiz,
} from "controllers/RootController/QuizController";
import express from "express";

const router = express.Router();

router.get("/", getAllQuiz);
router.get("/:id", getSingleQuiz);
router.post("/submit", createSubmitQuiz)
router.put("/:id", updateQuiz)
router.post("/", createQuiz);
router.delete("/:id", deleteQuiz);

export default router;
