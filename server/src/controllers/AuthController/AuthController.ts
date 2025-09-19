import { ILoginRequest, IRegisterRequest } from "types/types";
import { Request, Response } from "express";
import { generateAccessToken } from "utils/utils";
import bcrypt from "bcrypt";
import { prisma } from "config/db.config";

export const login = async (
  req: Request<{}, any, ILoginRequest>,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ msg: "email and password are required" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      res.status(400).json({ auth: false, message: "Wrong credential 🤔" });
      return;
    }

    const isPWMatch = await bcrypt.compare(password, user.password);

    if (isPWMatch) {
      const { id, email } = user;

      const accessToken = generateAccessToken({ id, email });

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24,
      });

      res.status(200).json({
        auth: true,
        token: accessToken,
        user: { id, email },
      });
    } else {
      res.status(400).json({ auth: false, message: "Wrong credential 🤔" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
};

export const register = async (
  req: Request<{}, any, IRegisterRequest>,
  res: Response
): Promise<void> => {
  try {
    const { email, password, confirm_password, username, full_name } = req.body;

    const requiredFields = {
      email,
      password,
      confirm_password,
      username,
      full_name,
    };

    if (password != confirm_password) {
      res
        .status(400)
        .json({ msg: "Password and Confirm password is not the same" });
      return;
    }

    for (const [key, value] of Object.entries(requiredFields)) {
      if (!value) {
        res.status(400).json({ msg: `${key} is required` });
        return;
      }
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      res.status(409).json({ msg: "Email already in use" });
      return;
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        full_name,
        password: hashed,
      },
      select: {
        id: true,
        email: true,
        exp: true,
        full_name: true,
        username: true,
      },
    });

    const accessToken = generateAccessToken({
      id: user.id,
      email: user.email,
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24,
    });

    res.status(201).json({
      auth: true,
      token: accessToken,
      user,
    });
  } catch (err) {
    res.status(500).json({ msg: "Internal server error" });
  }
};
