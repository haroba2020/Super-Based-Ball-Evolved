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

  let correctPassword = await bcrypt.compare(password, user.password);

  if (!correctPassword) {
    return res.status(400).json({ detail: "Wrong password" });
  }

  let token = createAuthenticationToken(email);

  res.json({ token });
});

router.post("/@me", async function createAccountEmailPassword(req, res) {
  let { email, password, playerName } = req.query;

  let salt = await bcrypt.genSalt();
  password = await bcrypt.hash(password, salt);

  try {
    let user = new Player({
      email,
      password,
      playerName,
    });
    await user.save();
  } catch (e) {
    return res.status(400).json(e);
  }
  let token = createAuthenticationToken(email);
  res.json({ token });
});
