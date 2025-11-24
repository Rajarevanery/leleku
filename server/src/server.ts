import dotenv from "dotenv";
dotenv.config();

import AuthRoutes from "routes/AuthRoutes";
import MaterialRoutes from "routes/MaterialRoutes";
import QuizRoutes from "routes/QuizRoutes";
import NotebookRoutes from "routes/NotebookRoutes";
import DeckRoutes from "routes/DeckRoutes";
import FlashcardRoutes from "routes/FlashcardRoutes";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { port } from "config/db.config";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", AuthRoutes);
app.use("/api/material", MaterialRoutes);
app.use("/api/quiz", QuizRoutes);
app.use("/api/notebook", NotebookRoutes);
app.use("/api/deck", DeckRoutes);
app.use("/api/flashcard", FlashcardRoutes);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
