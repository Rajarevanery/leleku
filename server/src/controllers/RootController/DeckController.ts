import { prisma } from "config/db.config";
import { Request, Response } from "express";
// model Deck {
//   id        String      @id @default(uuid())
//   title     String
//   userId    Int
//   user      User        @relation(fields: [userId], references: [id])
//   cards     Flashcard[]
//   createdAt DateTime    @default(now())
// }

// ! CREATE

export const createDeck = async (req: Request, res: Response) => {
  const { title, userId } = req.body;

  try {
    const response = await prisma.deck.create({
      data: {
        title: title,
        userId: userId,
      },
    });

    res.status(200).json({ msg: "Successfully Created Deck", data: response });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
      error: error.message,
    });
  }
};

// ! READ
export const getAllDeckByUserId = async (req: Request, res: Response) => {
  const { id: userId } = req.params;

  try {
    const response = await prisma.deck.findMany({
      where: {
        userId: Number(userId),
      },
      include: {
        cards: true,
      },
    });

    res.status(200).json({ msg: "Successfully Getting Deck", data: response });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
      error: error.message,
    });
  }
};

// ! UPDATE
export const editDeck = async (req: Request, res: Response) => {
  const { title } = req.body;
  const { id } = req.params;
  try {
    const response = await prisma.deck.update({
      where: {
        id: id,
      },
      data: {
        title: title,
      },
    });

    res.status(200).json({ msg: "Successfully Edited Deck", data: response });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
      error: error.message,
    });
  }
};

// ! DELETE
export const deleteDeck = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const response = await prisma.deck.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({ msg: "Successfully Deleted Deck", data: response });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
      error: error.message,
    });
  }
};
