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
function verifyAuthToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SIGNING_KEY, function(err, decoded) {
      if (err) {
        console.log('Invalid JWT!');
        reject(err);
      } else {
        resolve(decoded.id);
      }
    });
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
    const updatedPlayer = await Player.findByIdAndUpdate(user._id, {exp:0,basedBucks:0,level:0,losses:0,wins:0,matchesPlayed:0,roundsPlayed:0,rankingScore:0}, {new: true});
    console.log(updatedPlayer)
    let token = createAuthenticationToken(user._id);
    res.json({ token, playerName });
  } catch (e) {
    return res.status(400).json(e);
  }
})
router.post("/@post-stats-local", async function createAccountEmailPassword(req, res) {
  if(!req.body.status){
    const {exp, token} = req.body
    try {
      const id = await verifyAuthToken(token);
      let user = await Player.findById(id);
      const updatedPlayer = await Player.findByIdAndUpdate(id, {exp:exp+user.exp, basedBucks:exp+user.basedBucks }, {new: true});
      console.log(updatedPlayer)
    } catch (error) {
      console.log(error);
    }
  }
  res.json({});
});
router.post("/@post-stats-online", async function createAccountEmailPassword(req, res) {
  if(!req.body.status){
    const {exp, token, status} = req.body
    if(!status){
      try {
        const id = await verifyAuthToken(token);
        let user = await Player.findById(id);
        const updatedPlayer = await Player.findByIdAndUpdate(id, {exp:exp+user.exp, basedBucks:exp+user.basedBucks }, {new: true});
        console.log(updatedPlayer)
      }
      catch (error) {
        console.log(error);
      }
    }
    
  }
  res.json({});
});