import { Router } from "express";
import { SIGNING_KEY } from "../constants.js";
import { Player } from "../models/player.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();
export default router;

// Utils
function createAuthenticationToken(id) {
  return jwt.sign({ id }, SIGNING_KEY, { expiresIn: "5h" });
}
function verifyAuthToken(token){
  jwt.verify(token, SIGNING_KEY, function(err, decoded) {
    if (err) {
      console.log('Invalid JWT!');
    } else {
      console.log(token)
      console.log(JSON.stringify(decoded.id) + ' decoded token')
      return decoded.id;
    }
  });
}

router.post("/@me/login", async function loginEmailPassword(req, res) {
  let { email, password } = req.body;

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

  let token = createAuthenticationToken(user._id);

  res.json({ token, name:user.playerName});
});
router.post("/@me", async function createAccountEmailPassword(req, res) {
  let { email, password, playerName } = req.body;
  console.log(email +'Yarr this be the password')
  console.log('log 1')
  let salt = await bcrypt.genSalt();
  password = await bcrypt.hash(password, salt);
  console.log('log 2')
  if (email === undefined) {
    return res.status(400).json({ detail: "Missing email" });
  }
  if (password === undefined) {
    return res.status(400).json({ detail: "Missing password" });
  }
  if (playerName === undefined) {
    return res.status(400).json({ detail: "Missing playerName" });
  }

  try {
    let user = new Player({
      email,
      password,
      playerName,
    });
    await user.save();
    let token = createAuthenticationToken(user._id);
    res.json({ token, playerName });
  } catch (e) {
    return res.status(400).json(e);
  }
})
router.post("/@post-stats", async function createAccountEmailPassword(req, res) {
  // wins
  // losses
  // rankingScore
  // level
  // Ballhit
  // MatchesPlayed
  if(!req.body.status){
    const {exp, hits, token} = req.body
    console.log(token)
    const id = verifyAuthToken(token)
    console.log(id)
    let user = await Player.findOne({ id });
    // const updatedPlayer = await Player.findByIdAndUpdate(id, {exp,brand,price,model,articleNumber,createdAt}, {new: true});

    console.log(exp, hits)
  }
  res.json({});
});
