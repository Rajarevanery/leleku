import { access_jwt_secret } from "config/db.config";
import jwt from "jsonwebtoken";
import { IJWTPayload } from "types/types";

export const generateAccessToken = (data: IJWTPayload) => {
  return jwt.sign(data, access_jwt_secret, { expiresIn: "1d" });
};

