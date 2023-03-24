import express from "express";
import { REST_PORT } from "./constants.js";

// Routers
import accountRouter from "./routes/account.js";
import matchmakingRouter from "./routes/matchmaking.js";

export const app = express();

// Routes
app.use(accountRouter);
app.use(matchmakingRouter);

