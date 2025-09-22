import express from "express";

import {
  login,
  register,
  getUser,
} from "controllers/AuthController/AuthController";
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/user", getUser);

export default router;
