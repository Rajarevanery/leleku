import dotenv from "dotenv";
dotenv.config();

import AuthRoutes from "routes/AuthRoutes";

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

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
