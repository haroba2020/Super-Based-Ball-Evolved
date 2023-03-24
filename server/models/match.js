import mongoose from "mongoose";

const matchSchema = mongoose.Schema({
    player1Id: String,
    player2Id: String
});

export const Match = mongoose.model("match", playerSchema);
