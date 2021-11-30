const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true ///дополнительно воледирует если емейл в безе даных спомощью мангуста
    },

    password: {
        type: String,
        required: true
    }


})

module.exports = mongoose.model('users', userSchema)

