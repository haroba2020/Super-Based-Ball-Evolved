import express from "express";
import { REST_PORT } from "./constants.js";
import cors from "cors";

// Routers
import accountRouter from "./routes/account.js";
import matchmakingRouter from "./routes/matchmaking.js";

export const app = express();
app.use(cors());

// Routes
app.use(accountRouter);
app.use(matchmakingRouter);

