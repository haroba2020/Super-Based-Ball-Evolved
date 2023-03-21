const mongoose = require('mongoose')

userSchema = new mongoose.Schema({
    playerName:{
        type:String,
        required:[true, 'Please enter a username'],
        maxlength: [20,`username can't be over 20 characters`]
    },
    playerDiscord:{
        type:Number,
    },
    win:{
        type:Number,
    },
    loose:{
        type:Number,
    },
    elo:{
        type:Number,
    },
    lvl:{
        type:Number,
    },
})



const Players = mongoose.model('player',userSchema)

module.exports = Players