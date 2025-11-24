import { prisma } from "config/db.config";
import { Request, Response } from "express";

export const createQuestion = async (req: Request, res: Response) => {
  const { text, quizId } = req.body;

  try {
    const response = await prisma.question.create({
      data: {
        text: text,
        quizId: quizId,
      },
    });

    if (response) {
      res.status(200).json({ msg: "Success" });
      return;
    }
  } catch (error) {
    res.status(500).json({ msg: "Error" });
    return;
  }
};

export const deleteQuestion = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const response = await prisma.question.delete({
      where: {
        id: Number(id),
      },
    });

    if (response) {
      res.status(200).json({ msg: "Successfully deleted" });
      return;
    }
  } catch (error) {
    res.status(500).json({ msg: "Error" });
    return;
  }
};
