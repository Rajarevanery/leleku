import { access_jwt_secret, prisma } from "config/db.config";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const createMaterial = async (req: Request, res: Response) => {
  const { title, content, difficulty, expReward, expectedTime, image_url } =
    req.body;

  if (!title || !content || !difficulty || !expReward || !expectedTime) {
    res.status(400).json({ msg: "Please fill all of the inputs" });
    return;
  }

  try {
    const response = await prisma.material.create({
      data: {
        title: title,
        content: content,
        difficulty: difficulty,
        expReward: expReward,
        expectedTime: expectedTime,
        image_url: image_url,
      },
    });

    if (!response) {
      res.status(400).json({ msg: "Error creating a material" });
      return;
    }

    res.status(200).json({
      materialCreated: response,
      msg: "Sucessfull",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
      error: error.message,
    });
  }
};

export const getMaterials = async (req: Request, res: Response) => {
  try {
    const response = await prisma.material.findMany({
      include: {
        quiz: true,
      },
    });

    if (!response) {
      res.status(400).json({ msg: "Error getting materials" });
      return;
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
      error: error.message,
    });
  }
};

export const getMaterial = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const response = await prisma.material.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        quiz: {
          include: {
            questions: true,
          },
        },
      },
    });

    if (!response) {
      res.status(400).json({ msg: "Error getting single material" });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
      error: error.message,
    });
  }
};

export const editMaterial = async (req: Request, res: Response) => {
  const { title, content, difficulty, expReward, expectedTime } = req.body;
  const id = req.params.id;

  if (!title || !content || !difficulty || !expReward || !expectedTime) {
    res.status(400).json({ msg: "Please fill all of the inputs" });
    return;
  }

  try {
    const response = await prisma.material.update({
      where: {
        id: Number(id),
      },
      data: {
        title: title,
        content: content,
        difficulty: difficulty,
        expReward: expReward,
        expectedTime: expectedTime,
      },
    });

    if (!response) {
      res.status(400).json({ msg: "Error creating a material" });
      return;
    }

    res.status(200).json({
      materialCreated: response,
      msg: "Sucessfull",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteMaterial = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const response = await prisma.material.delete({
      where: {
        id: Number(id),
      },
      include: {
        quiz: true,
      },
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
      error: error.message,
    });
  }
};
