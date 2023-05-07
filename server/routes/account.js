import { Router } from "express";
import { SIGNING_KEY } from "../constants.js";
import { Player } from "../models/player.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();
export default router;

// Utils
// function createAuthenticationToken(email) {
//   return jwt.sign({ email }, SIGNING_KEY, { expiresIn: 10000000 });
// }

function createLocalStorageToken(id){
    return jwt.sign({ _id }, SIGNING_KEY, { expiresIn: '7d' });
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
    const user = await Player.create({email, password, playerName,})
    await user.save();
    console.log(user._id)
    let token = createLocalStorageToken(user._id)
    console.log(email,password,playerName,token)
    res.json({email,password,playerName,token })
  } catch (e) {
    console.log(e)
    return res.status(400).json(e);
  }
  
});
router.post("/@lmao", async function createAccountEmailPassword(req, res) {
  res.cookie('jwt','gaming', { maxAge: 1000000})
  res.json({gaming:'gaming'});
});