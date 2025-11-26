// model Flashcard {
//   id       String  @id @default(uuid())
//   question String
//   answer   String
//   hint     String?

//   deckId String
//   deck   Deck   @relation(fields: [deckId], references: [id], onDelete: Cascade)
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt
// }

import { prisma } from "config/db.config";
import { Request, Response } from "express";

export const createFlashcard = async (req: Request, res: Response) => {
  const { question, answer, hint, deckId } = req.body;

  try {
    const response = await prisma.flashcard.create({
      data: {
        question: question,
        answer: answer,
        hint: hint,
        deckId: deckId,
      },
    });

    res.status(200).json({ msg: "Successfully Created", data: response });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
      error: error.message,
    });
  }
};

export const getAllFlashcardByDeckId = async (req: Request, res: Response) => {
  const { id: deckId } = req.params;
  try {
    const response = await prisma.flashcard.findMany({
      where: {
        deckId: deckId,
      },
    });

    res
      .status(200)
      .json({ msg: "Successfully Get All Flashcard By Deck", data: response });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
      error: error.message,
    });
  }
};

export const editFlashcard = async (req: Request, res: Response) => {
  const { question, answer, hint } = req.body;
  const { id: flashcardId } = req.params;
  try {
    const response = await prisma.flashcard.update({
      where: {
        id: flashcardId,
      },
      data: {
        question: question,
        answer: answer,
        hint: hint,
      },
    });

    res.status(200).json({
      msg: "Edited Flashcard",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteFlashcard = async (req: Request, res: Response) => {
  const { id: flashcardId } = req.params;

  try {
    const response = await prisma.flashcard.delete({
      where: {
        id: flashcardId,
      },
    });

    res.status(200).json({ msg: "Successfully Deleted", data: response });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
      error: error.message,
    });
  }
};
