import express from "express";
import mongoose from "mongoose";
import { DB_URI, PORT } from "./constants.js";

// Routers
import accountRouter from "./routes/account.js";

await mongoose.connect(DB_URI);

const app = express();

// Routes
app.use(accountRouter);

console.log(`Listening on http://0.0.0.0:${PORT}/`);
app.listen(PORT);
