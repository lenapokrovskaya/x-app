const {Schema, model, models} = require("mongoose") 
const User = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: true},
    avatar: {type: String}
})

module.exports = model('User', User )