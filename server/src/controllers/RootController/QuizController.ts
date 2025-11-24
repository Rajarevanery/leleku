import { access_jwt_secret, prisma } from "config/db.config";
import { Request, Response } from "express";

// Create Quiz
export const createQuiz = async (req: Request, res: Response) => {
  const { title, summary, materialId, questions } = req.body;

  console.log(req.body);

  try {
    const quiz = await prisma.quiz.create({
      data: {
        title,
        summary,
        materialId: Number(materialId),
        questions: {
          create: questions.map((q: any) => ({
            question: q.question,
            choices: q.choices,
            correctAnswer: q.correctAnswer,
          })),
        },
      },
      include: {
        questions: true,
      },
    });

    res.status(200).json({
      msg: "Quiz Successfully Created",
      quiz,
    });
  } catch (error) {
    console.error("Error creating quiz:", error);
    res.status(500).json({ msg: "Error creating quiz" });
  }
};

// ! GET ALL QUIZ
export const getAllQuiz = async (req: Request, res: Response) => {
  try {
    const quiz = await prisma.quiz.findMany({
      include: {
        questions: true,
        material: true,
      },
    });
    res.status(200).json({
      msg: "Quiz fetched",
      quiz,
    });
  } catch (error) {
    console.error("Error creating quiz:", error);
    res.status(500).json({ msg: "Error creating quiz" });
  }
};

// ! EDIT QUIZ
export const updateQuiz = async (req: Request, res: Response) => {
  const quizId = Number(req.params.id);
  const { title, summary, questions } = req.body;

  try {
    const existingQuestions = await prisma.question.findMany({
      where: { quizId },
      select: { id: true },
    });

    const existingIds = existingQuestions.map((q) => q.id);
    const incomingIds = questions
      .filter((q: any) => typeof q.id === "number")
      .map((q: any) => q.id);
    const toDelete = existingIds.filter((id) => !incomingIds.includes(id));

    await prisma.$transaction(async (tx) => {
      await tx.quiz.update({
        where: { id: quizId },
        data: { title, summary },
      });

      if (toDelete.length > 0) {
        await tx.question.deleteMany({
          where: { id: { in: toDelete } },
        });
      }

      for (const q of questions) {
        if (q.id && typeof q.id === "number") {
          await tx.question.update({
            where: { id: q.id },
            data: {
              question: q.question,
              correctAnswer: q.correctAnswer,
              choices: q.choices,
            },
          });
        } else {
          await tx.question.create({
            data: {
              question: q.question,
              correctAnswer: q.correctAnswer,
              choices: q.choices,
              quizId,
            },
          });
        }
      }
    });

    return res.json({ msg: "Quiz updated successfully" });
  } catch (err) {
    return res.status(500).json({ msg: "Failed to update quiz" });
  }
};


//Get Single Quiz
export const getSingleQuiz = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const quiz = await prisma.quiz.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        questions: true,
        material: true,
      },
    });
    res.status(200).json(quiz);
  } catch (error) {
    console.error("Error getting single quiz", error);
    res.status(500).json({ msg: "Error quiz" });
  }
};

// ! Delete Quiz
export const deleteQuiz = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const quiz = await prisma.quiz.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ msg: "Error" });
    return;
  }
};

// ! USER QUIZ SUBMIT
export const createSubmitQuiz = async (req: Request, res: Response) => {
  const { userId, quizId, expReward } = req.body;

  console.log(userId, quizId, expReward);

  try {
    const existing = await prisma.userQuiz.findUnique({
      where: {
        userId_quizId: {
          userId,
          quizId,
        },
      },
    });

    if (existing) {
      return res.status(400).json({
        msg: "You already completed this quiz, no more EXP!",
      });
    }

    await prisma.$transaction([
      prisma.userQuiz.create({
        data: {
          userId,
          quizId,
          expClaimed: true,
        },
      }),

      prisma.user.update({
        where: { id: userId },
        data: {
          exp: {
            increment: expReward,
          },
        },
      }),
    ]);

    res.status(200).json({
      msg: "Quiz submitted and EXP rewarded",
    });
  } catch (error) {
    console.error("Error submitting:", error);
    res.status(500).json({ msg: "Error when submitting" });
  }
};
