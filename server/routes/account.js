import { Router } from "express";
import { SIGNING_KEY } from "../constants.js";
import { Player } from "../models/player.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();
export default router;

// Utils
function createAuthenticationToken(email) {
  return jwt.sign({ email }, SIGNING_KEY, { expiresIn: "5h" });
}

router.post("/@me/login", async function loginEmailPassword(req, res) {
  let { email, password } = req.query;

  let user = await Player.findOne({ email });

  if (user === null) {
    return res.status(400).json({ detail: "Bad email" });
  }
  if (password === undefined) {
    return res.status(400).json({ detail: "Missing password" });
  }

  let correctPassword = await bcrypt.compare(password, user.password);

  if (!correctPassword) {
    return res.status(400).json({ detail: "Wrong password" });
  }

  let token = createAuthenticationToken(email);

  res.json({ token });
});

router.post("/@lmao", async function createAccountEmailPassword(req, res) {
  res.cookie('fakk off','gaming', { maxAge: 1000000})
  res.json({});
});
