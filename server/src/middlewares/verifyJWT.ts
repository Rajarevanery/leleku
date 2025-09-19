import { access_jwt_secret } from "config/db.config";
import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "types/types";

export function verifyJwt(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.cookies?.accessToken;

  if (!token) {
    res.status(401).json({ error: "Failed" });
    return;
  }

  try {
    const decoded = jwt.verify(token, access_jwt_secret) as { id: string };
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid" });
  }
}
