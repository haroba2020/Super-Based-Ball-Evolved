import express from "express";
import { REST_PORT } from "./constants.js";
import cors from "cors";
import cookieParser from 'cookie-parser'

// Routers
import accountRouter from "./routes/account.js";
import matchmakingRouter from "./routes/matchmaking.js";

export const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser())

// Routes
app.use(accountRouter);
app.use(matchmakingRouter);

