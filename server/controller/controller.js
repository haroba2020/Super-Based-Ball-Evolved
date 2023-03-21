const Players = require("../modules/Players");

module.exports.stats_post = async (req, res)=>{
    const {playerName, playerDiscord, win, loose, elo, lvl} = req.body
    try {
        //Lager stats til bruker
        console.log(playerName,playerDiscord, win, loose, elo, lvl)
        await Players.create({playerName, playerDiscord, win, loose, elo, lvl})
        res.status(200).send('Stats saved successfully!, (hopefully)');
    }
    catch(error){
        res.status(500).send('Internal Server Error'+error);
    }
}