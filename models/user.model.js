const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        require: true
    },
    email:{
        type:String,
        unique: true,
        require: true
    },
    lastname:{
        type:String,
        require:true
    },
    password:{
        type:String,
        required: true,
    },
    tel: {
        type: Number,
        required: true
    },
});

const User = mongoose.model("User", UserSchema)

module.exports = User