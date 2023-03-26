import { Router } from "express";
import { Player } from "../models/player.js";
import { getAuthenticationInfo } from "../utils.js";
import {v4 as uuidv4} from "uuid";

const router = Router();
export default router;

let matches = [];

router.post("/matchmaking", async function createLobby(req, res) {
    let email = getAuthenticationInfo(req.headers.Authorization);

    let player = await Player.findOne({email});

    let match = {
        id: uuidv4(),
        playing: false,
        ended: false,
        players: [player]
    };

    matches.push({owner: player});
    res.json(match);
});
router.get("/matchmaking", async function getLobbies(req, res) {
    res.json(matches);
});
