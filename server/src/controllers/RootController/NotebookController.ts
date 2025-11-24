import { prisma } from "config/db.config";
import { Request, Response } from "express";

export const createNotebook = async (req: Request, res: Response) => {
  const { title, content, userId } = req.body;

  try {
    const response = await prisma.notebookEntry.create({
      data: {
        title,
        content,
        userId,
      },
    });
    res.status(200).json({
      msg: "Created Notebook",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
      error: error.message,
    });
  }
};

export const getAllNotebooks = async (req: Request, res: Response) => {
  try {
    const response = await prisma.notebookEntry.findMany();
    res.status(200).json({ msg: "Successfully Fetched Data", data: response });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
      error: error.message,
    });
  }
};

export const getSingleNotebook = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const response = await prisma.notebookEntry.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({ msg: "Successfully Fetched Data", data: response });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
      error: error.message,
    });
  }
};

export const updateNotebook = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const id = req.params.id;

  try {
    await prisma.notebookEntry.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        content,
      },
    });
    res.status(200).json({
      msg: "Edited Notebook",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteNotebook = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    await prisma.notebookEntry.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({
      msg: "Notebook Deleted",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
      error: error.message,
    });
  }
};
