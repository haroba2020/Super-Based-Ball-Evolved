import mongoose from "mongoose";

const playerSchema = mongoose.Schema({
  // ID
  id: {
    type: String,
  },
  // Login
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  discordUserId: {
    type: String,
  },
  // User info
  playerName: {
    type: String,
  },
  // Stats
  wins: {
    type: Number,
  },
  losses: {
    type: Number,
  },
  rankingScore: {
    type: Number,
  },
  level: {
    type: Number,
  },
  exp: {
    type: Number,
  },
  matchesPlayed:{
    type: Number
  },
  roundsPlayed:{
    type: Number
  }
});

export const Player = mongoose.model("player", playerSchema);
