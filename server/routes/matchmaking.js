import { Router } from "express";
import { Player } from "../models/player.js";
import { getAuthenticationInfo } from "../utils.js";
import {v4 as uuidv4} from "uuid";

const router = Router();
export default router;

let matches = [];

router.post("/matchmaking", async function createLobby(req, res) {
    let { name } = req.query;

    let match = {
        name,
        id: uuidv4(),
        playing: false,
    };

    matches.push(match);
    res.json(match);
});
router.get("/matchmaking", async function getLobbies(req, res) {
    res.json(matches);
});
router.post("/matchmaking/match/:matchId/status", async function updateMatchStatus(req, res) {
    let { matchId, status } = req.query;
    
    if (status === "playing") {
        let match = matches.filter(match => match.id === matchId)[0];
        if (match === undefined) {
            res.status(400).json({detail: "Match not found"});
            return;
        }
        match.playing = true;
    } else if (status === "done") {
        matches = matches.filter(match => match.id !== matchId);
    }
    res.status(200).send();
})
