const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const Players = require("../modules/Players.js");

const SIGNING_KEY = process.env.SIGNING_KEY;

function createAuthenticationToken(email) {
    return jwt.sign({email}, SIGNING_KEY, {expiresIn: "5h"});
}


function getAuthenticationInfo(token) {
    return jwt.verify({email}, SIGNING_KEY);
}

async function loginDirect(req, res) {
    let email = req.query.email;
    let password = req.query.password;

    let user = await Players.findOne({email});

    if (user === null) {
        return res.status(400).json({detail: "Bad email"});
    }
    let correctPassword = await bcrypt.compare(password,user.password);

    if (!correctPassword) {
        return res.status(400).json({detail: "Wrong pass"});
    }

    let token = createAuthenticationToken(email);

    res.json(token);
}

async function createUserDirect(req, res) {
    let {email, password, playerName } = req.query;

    let salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);

    try {
        let user = new Players({
            email,
            password,
            playerName
        });
        await user.save()
        res.status(200).json({detail: "Ok"});
    } catch (e) {
        res.status(400).json(e);
    }
}


module.exports = {createAuthenticationToken, getAuthenticationInfo, loginDirect, createUserDirect};
